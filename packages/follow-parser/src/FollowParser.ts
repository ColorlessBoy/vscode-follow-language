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
  public isVisitedDoc: Set<string> = new Set();

  public getSemanticToken(document?: TextDocument): SemanticTokens {
    const builder = new SemanticTokensBuilder();
    if (document) {
      if (!this.semanticTokenListDocMap.has(document.uri)) {
        this.parse(document);
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
        this.parse(document);
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

  public getRename(document: TextDocument, position: Position, newName: string): WorkspaceEdit {
    const edit: WorkspaceEdit = { changes: {} };
    if (document) {
      edit.changes![document.uri] = [];
      if (!this.semanticTokenListDocMap.has(document.uri)) {
        this.parse(document);
      }
      var editList = edit.changes![document.uri];
      const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
      const definitionMap = this.definitionMapDocMap.get(document.uri);
      if (semanticTokenList && definitionMap) {
        const offset = document.offsetAt(position);
        for (const semanticToken of semanticTokenList) {
          if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
            const definition =
              semanticToken.definition || definitionMap.get(semanticToken.token.text || '') || semanticToken;
            if (definition && definition.reference) {
              editList.push({
                range: definition.getRange(),
                newText: newName,
              });
              for (const ref of definition.reference) {
                editList.push({
                  range: ref.getRange(),
                  newText: newName,
                });
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
      this.parse(document);
    }
    const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
    const definitionMap = this.definitionMapDocMap.get(document.uri);
    if (semanticTokenList && definitionMap) {
      const offset = document.offsetAt(position);
      for (const semanticToken of semanticTokenList) {
        if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
          const definition =
            semanticToken.definition || definitionMap.get(semanticToken.token.text || '') || semanticToken;
          if (definition && definition.reference) {
            const result: Location[] = [];
            for (const ref of definition.reference) {
              result.push({
                uri: document.uri,
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
      this.parse(document);
    }
    const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
    const definitionMap = this.definitionMapDocMap.get(document.uri);
    if (semanticTokenList && definitionMap) {
      const offset = document.offsetAt(position);
      for (const semanticToken of semanticTokenList) {
        if (semanticToken.token.startIndex <= offset && semanticToken.token.stopIndex >= offset) {
          const definition =
            semanticToken.definition || definitionMap.get(semanticToken.token.text || '') || semanticToken;
          if (definition) {
            const definitionLink: DefinitionLink = {
              targetUri: document.uri, // local search
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
      this.parse(document);
    }
    const semanticTokenList = this.semanticTokenListDocMap.get(document.uri);
    const definitionMap = this.definitionMapDocMap.get(document.uri);
    if (semanticTokenList && definitionMap) {
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
      this.parse(document);
      resolve(this.semanticErrorDocMap);
    });
  }
  public parseImport(filePath: string) {
    if (this.isVisitedDoc.has(filePath) || !existsSync(filePath)) {
      return;
    }
    const text = readFileSync(filePath, 'utf-8');
    // Create the lexer and parser
    const inputStream = CharStreams.fromString(text);
    const lexer = new ANTLRFollowLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ANTLRFollowParser(tokenStream);
    const followImportListener = new FollowImportListener(filePath, this.parentDocMap, this.childDocMap);
    parser.removeParseListeners();
    parser.removeErrorListeners();
    parser.addParseListener(followImportListener);
    parser.root();

    const parentList = this.parentDocMap.get(filePath);
    this.isVisitedDoc.add(filePath);
    if (parentList) {
      for (const parentFilePath of parentList) {
        if (!this.isVisitedDoc.has(parentFilePath)) {
          this.parseImport(parentFilePath);
        }
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
      this.childDocMap,
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
