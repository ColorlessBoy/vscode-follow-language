import { Position, Range, DiagnosticSeverity, Diagnostic, Hover, URI } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CommonTokenStream, Token, ANTLRErrorListener, CharStreams, Recognizer, RecognitionException } from 'antlr4ts';
import { ANTLRFollowLexer } from './antlr4/ANTLRFollowLexer';
import { ANTLRFollowParser } from './antlr4/ANTLRFollowParser';
import { SemanticErrorListener } from './SemanticErrorListener';
import { FollowParserListener } from './FollowParserListener';
import { ASTNode } from './FollowLanguageTypes';

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
  public semanticErrorListenerMap: Map<string, SemanticErrorListener> = new Map();
  public definitionMapDocMap: Map<string, Map<string, ASTNode>> = new Map();
  public semanticTokenListDocMap: Map<string, Array<ASTNode>> = new Map();
  public semanticErrorDocMap: Map<string, Diagnostic[]> = new Map();

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
    const followParserListener = new FollowParserListener(definitionMap, semanticTokenList, semanticErrors);
    parser.removeParseListeners();
    parser.removeErrorListeners();
    parser.addErrorListener(syntaxErrorListener);
    parser.addParseListener(followParserListener);
    parser.root();
    const diagnosticList = syntaxErrorListener.diagnosticList.concat(semanticErrors);
    this.semanticErrorDocMap.set(document.uri, diagnosticList);
    this.definitionMapDocMap.set(document.uri, definitionMap);
    this.semanticTokenListDocMap.set(document.uri, semanticTokenList);
  }
}
