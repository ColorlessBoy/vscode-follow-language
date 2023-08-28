import {
  Position,
  Range,
  DiagnosticSeverity,
  Diagnostic,
  Hover,
  DefinitionLink,
  Location,
  WorkspaceEdit,
  SemanticTokensBuilder,
  SemanticTokenModifiers,
  SemanticTokens,
  SemanticTokensLegend,
  SemanticTokenTypes,
  SemanticTokensDelta,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CommonTokenStream, Token, ANTLRErrorListener, CharStreams, Recognizer, RecognitionException } from 'antlr4ts';
import { ANTLRFollowLexer } from './antlr4/ANTLRFollowLexer';
import { ANTLRFollowParser } from './antlr4/ANTLRFollowParser';
import { FollowParserListener } from './FollowParserListener';
import { ASTNode } from './FollowLanguageTypes';
import { FollowImportListener } from './FollowImportListener';
import { existsSync, readFileSync } from 'fs';
import { URI } from 'vscode-uri';

/*
 * Test antlr4.
 */
function createLexer(input: string) {
  const chars = CharStreams.fromString(input);
  const lexer = new ANTLRFollowLexer(chars);
  return lexer;
}

export function getTokens(input: string): Token[] {
  return createLexer(input).getAllTokens();
}

function createParserFromLexer(lexer: ANTLRFollowLexer) {
  const tokens = new CommonTokenStream(lexer);
  return new ANTLRFollowParser(tokens);
}

export function parseTreeStr(input: string) {
  const lexer = createLexer(input);
  const parser = createParserFromLexer(lexer);
  const tree = parser.root();
  return tree.toStringTree(parser);
}

/*
 * Parser for server.
 */
export class SyntaxErrorListener implements ANTLRErrorListener<any> {
  public diagnosticList: Diagnostic[] = [];

  public syntaxError<T>(
    _recognizer: Recognizer<T, any>,
    offendingSymbol: T,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: RecognitionException | undefined,
  ): void {
    const startPos: Position = Position.create(line - 1, charPositionInLine);
    // @ts-ignore
    const endPos: Position = Position.create(line - 1, charPositionInLine + offendingSymbol.text.length);
    const range: Range = Range.create(startPos, endPos);
    const diagnostic = {
      severity: DiagnosticSeverity.Error,
      range,
      message: msg,
      source: 'follow',
    };
    this.diagnosticList.push(diagnostic);
  }
}

export class FollowParser {
  public semanticTokensLegend: SemanticTokensLegend = {
    tokenTypes: [
      SemanticTokenTypes.keyword,
      SemanticTokenTypes.type,
      SemanticTokenTypes.number,
      SemanticTokenTypes.variable,
      SemanticTokenTypes.parameter,
      SemanticTokenTypes.operator,
      SemanticTokenTypes.method,
      SemanticTokenTypes.function,
      SemanticTokenTypes.comment,
      SemanticTokenTypes.string,
    ],
    tokenModifiers: [SemanticTokenModifiers.declaration],
  };

  public semanticTokensMap: Map<string, number> = new Map([
    [SemanticTokenTypes.keyword, 0],
    [SemanticTokenTypes.type, 1],
    [SemanticTokenTypes.number, 2],
    [SemanticTokenTypes.variable, 3],
    [SemanticTokenTypes.parameter, 4],
    [SemanticTokenTypes.operator, 5],
    [SemanticTokenTypes.method, 6],
    [SemanticTokenTypes.function, 7],
    [SemanticTokenTypes.comment, 8],
    [SemanticTokenTypes.string, 9],
  ]);

  public definitionMapDocMap: Map<string, Map<string, ASTNode>> = new Map();
  public semanticTokenListDocMap: Map<string, Array<ASTNode>> = new Map();
  public semanticErrorDocMap: Map<string, Diagnostic[]> = new Map();
  public parentDocMap: Map<string, string[]> = new Map();
  public childDocMap: Map<string, string[]> = new Map();
  public isParseImportVisitedDoc: Set<string> = new Set();
  public isParseRecVisitedDoc: Set<string> = new Set();
  public isBuildParentVisitedDoc: Set<string> = new Set();

  public getSemanticToken(document?: TextDocument): SemanticTokens {
    const builder = new SemanticTokensBuilder();
    if (document) {
      if (!this.semanticTokenListDocMap.has(document.uri)) {
        this.parseImport(document.uri);
        this.buildParent();
        this.parseRec(document);
      }
      const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
      if (semanticTokenList) {
        for (const semanticNode of semanticTokenList) {
          const type = this.semanticTokensMap.get(semanticNode.semanticType || '') || 0;
          const token = semanticNode.token;
          builder.push(token.line - 1, token.charPositionInLine, token.text?.length || 0, type, 0);
        }
      }
    }
    return builder.build();
  }
  public getSemanticTokenDelta(
    previousResultId: string,
    document?: TextDocument,
  ): SemanticTokens | SemanticTokensDelta {
    const builder = new SemanticTokensBuilder();
    builder.previousResult(previousResultId);
    if (document) {
      if (!this.semanticTokenListDocMap.has(document.uri)) {
        this.parseImport(document.uri);
        this.buildParent();
        this.parseRec(document);
      }
      const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
      if (semanticTokenList) {
        for (const semanticNode of semanticTokenList) {
          const type = this.semanticTokensMap.get(semanticNode.semanticType || '') || 0;
          const token = semanticNode.token;
          builder.push(token.line - 1, token.charPositionInLine, token.text?.length || 0, type, 0);
        }
      }
    }
    return builder.buildEdits();
  }

  private addEdit(edit: WorkspaceEdit, node: ASTNode, newName: string) {
    if (edit.changes![node.document.uri]) {
      edit.changes![node.document.uri].push({
        range: node.getRange(),
        newText: newName,
      });
    } else {
      edit.changes![node.document.uri] = [
        {
          range: node.getRange(),
          newText: newName,
        },
      ];
    }
  }

  public getRename(document: TextDocument, position: Position, newName: string): WorkspaceEdit {
    const edit: WorkspaceEdit = { changes: {} };
    if (document) {
      if (!this.semanticTokenListDocMap.has(document.uri)) {
        this.parseImport(document.uri);
        this.buildParent();
        this.parseRec(document);
      }
      const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
      if (semanticTokenList) {
        const offset = document.offsetAt(position);
        for (const semanticToken of semanticTokenList) {
          if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
            const definition = semanticToken.definition || semanticToken;
            if (definition) {
              this.addEdit(edit, definition, newName);
            }
            if (definition && definition.reference) {
              for (const ref of definition.reference) {
                this.addEdit(edit, ref, newName);
              }
            }
          }
        }
      }
    }
    return edit;
  }

  public getReference(document: TextDocument, position: Position): Location[] {
    if (!document) {
      return new Array();
    }
    if (!this.semanticTokenListDocMap.has(document.uri)) {
      this.parseImport(document.uri);
      this.buildParent();
      this.parseRec(document);
    }
    const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
    if (semanticTokenList) {
      const offset = document.offsetAt(position);
      for (const semanticToken of semanticTokenList) {
        if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
          const definition = semanticToken.definition || semanticToken;
          if (definition && definition.reference) {
            const result: Location[] = [];
            for (const ref of definition.reference) {
              result.push({
                uri: ref.document.uri,
                range: ref.getRange(),
              });
            }
            return result;
          }
        }
      }
    }
    return new Array();
  }

  public getDefinition(document: TextDocument, position: Position): DefinitionLink[] {
    if (!document) {
      return new Array();
    }
    if (!this.semanticTokenListDocMap.has(document.uri)) {
      this.parseImport(document.uri);
      this.buildParent();
      this.parseRec(document);
    }
    const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
    if (semanticTokenList) {
      const offset = document.offsetAt(position);
      for (const semanticToken of semanticTokenList) {
        if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
          const definition = semanticToken.definition || semanticToken;
          if (definition) {
            const definitionLink: DefinitionLink = {
              targetUri: definition.document.uri,
              targetRange: definition.getRange(),
              targetSelectionRange: definition.getRange(),
              originSelectionRange: semanticToken.getRange(),
            };
            return [definitionLink];
          }
        }
      }
    }
    return new Array();
  }

  public getHover(document: TextDocument, position: Position): Hover | undefined {
    if (!document) {
      return;
    }
    if (!this.semanticTokenListDocMap.has(document.uri)) {
      this.parseImport(document.uri);
      this.buildParent();
      this.parseRec(document);
    }
    const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
    if (semanticTokenList) {
      const offset = document.offsetAt(position);
      for (const semanticToken of semanticTokenList) {
        if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
          const hover: Hover = {
            contents: semanticToken.toString(),
            range: semanticToken.getRange(),
          };
          return hover;
        }
      }
    }
    return;
  }

  public async getDiagnostics(document: TextDocument): Promise<Map<string, Diagnostic[]>> {
    return new Promise((resolve, reject) => {
      if (!document) {
        reject(new Error('Follow: Invalid document.'));
        return;
      }
      this.isParseImportVisitedDoc.delete(document.uri);
      this.isBuildParentVisitedDoc.delete(document.uri);
      this.parseImport(document.uri);
      this.buildParent();
      this.parseRec(document);
      resolve(this.semanticErrorDocMap);
    });
  }

  public parseImport(uri: string) {
    const filePath: string = URI.parse(uri).path;
    if (this.isParseImportVisitedDoc.has(uri) || !existsSync(filePath)) {
      return;
    }
    const text = readFileSync(filePath, 'utf-8');
    // Create the lexer and parser
    const inputStream = CharStreams.fromString(text);
    const lexer = new ANTLRFollowLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ANTLRFollowParser(tokenStream);
    const followImportListener = new FollowImportListener(uri, this.parentDocMap, this.childDocMap);
    parser.removeParseListeners();
    parser.removeErrorListeners();
    parser.addParseListener(followImportListener);
    parser.root();

    const parentList = this.parentDocMap.get(uri);
    this.isParseImportVisitedDoc.add(uri);
    if (parentList) {
      for (const parentFilePath of parentList) {
        if (!this.isParseImportVisitedDoc.has(parentFilePath)) {
          this.parseImport(parentFilePath);
        }
      }
    }
  }

  public buildParent() {
    var nodeList = [];
    for (const node of this.childDocMap.keys()) {
      if (!this.isBuildParentVisitedDoc.has(node)) {
        nodeList.push(node);
      }
    }
    for (const node of this.parentDocMap.keys()) {
      if (!this.isBuildParentVisitedDoc.has(node) && !nodeList.includes(node)) {
        nodeList.push(node);
      }
    }
    // large to small
    nodeList.sort((a, b) => (this.childDocMap.get(b)?.length || 0) - (this.childDocMap.get(a)?.length || 0));
    for (const node of nodeList) {
      const parentList = this.parentDocMap.get(node);
      const childList = this.childDocMap.get(node);
      if (childList) {
        for (const child of childList) {
          var child_parent = this.parentDocMap.get(child) || [];
          if (!child_parent.includes(node)) {
            child_parent.push(node);
          }
          if (parentList) {
            for (const parent of parentList) {
              if (!child_parent.includes(parent)) {
                child_parent.push(parent);
              }
            }
          }
          this.parentDocMap.set(child, child_parent);
        }
      }
      this.isBuildParentVisitedDoc.add(node);
    }
  }

  private parseRec(document: TextDocument) {
    const uri = document.uri;
    var nodeList = Array.from(this.parentDocMap.get(uri) || []);
    // large to small
    nodeList.sort((a, b) => (this.childDocMap.get(b)?.length || 0) - (this.childDocMap.get(a)?.length || 0));
    for (const node of nodeList) {
      const definitions = this.definitionMapDocMap.get(node);
      if (definitions === undefined) {
        const nodeFilePath: string = URI.parse(node).path;
        const content = readFileSync(nodeFilePath, 'utf-8');
        const nodeDocument = TextDocument.create(node, 'fol', 0, content);
        this.parse(nodeDocument);
      }
    }
    this.parse(document);
    const childList = this.childDocMap.get(uri);
    if (childList) {
      for (const child of childList) {
        const nodeFilePath: string = URI.parse(child).path;
        const content = readFileSync(nodeFilePath, 'utf-8');
        const nodeDocument = TextDocument.create(child, 'fol', 0, content);
        this.parse(nodeDocument);
      }
    }
  }

  private parse(document: TextDocument) {
    if (!document) {
      return;
    }
    const text = document.getText();
    // Create the lexer and parser
    const inputStream = CharStreams.fromString(text);
    const lexer = new ANTLRFollowLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ANTLRFollowParser(tokenStream);
    const syntaxErrorListener = new SyntaxErrorListener();
    const definitionMap: Map<string, ASTNode> = new Map();
    const semanticTokenList: Array<ASTNode> = new Array();
    const semanticErrors: Diagnostic[] = new Array();
    const followParserListener = new FollowParserListener(
      document,
      definitionMap,
      semanticTokenList,
      semanticErrors,
      this.definitionMapDocMap,
      this.parentDocMap,
    );
    parser.removeParseListeners();
    parser.removeErrorListeners();
    parser.addErrorListener(syntaxErrorListener);
    parser.addParseListener(followParserListener);
    parser.root();
    const diagnosticList = syntaxErrorListener.diagnosticList.concat(semanticErrors);
    this.semanticErrorDocMap.set(document.uri, diagnosticList);
    this.definitionMapDocMap.set(document.uri, definitionMap);
    semanticTokenList.sort((a, b) => {
      return a.token.startIndex - b.token.startIndex;
    });
    this.semanticTokenListDocMap.set(document.uri, semanticTokenList);
  }
}
