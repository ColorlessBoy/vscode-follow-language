import { Position, Range, DiagnosticSeverity, Diagnostic } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { CommonTokenStream, Token, ANTLRErrorListener, CharStreams, Recognizer, RecognitionException } from 'antlr4ts';
import { ANTLRFollowLexer } from './antlr4/ANTLRFollowLexer';
import { ANTLRFollowParser } from './antlr4/ANTLRFollowParser';
import { SemanticErrorListener } from './SemanticErrorListener';

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
  public semanticErrorListener = new SemanticErrorListener();
  public async getDiagnostics(document: TextDocument): Promise<Map<string, Diagnostic[]>> {
    return new Promise((resolve, reject) => {
      if (!document) {
        reject(new Error('Follow: Invalid document.'));
        return;
      }

      const diagnosticCollection: Map<string, Diagnostic[]> = new Map();

      const text = document.getText();
      // Create the lexer and parser
      const inputStream = CharStreams.fromString(text);
      const lexer = new ANTLRFollowLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new ANTLRFollowParser(tokenStream);
      const syntaxErrorListener = new SyntaxErrorListener();
      this.semanticErrorListener = new SemanticErrorListener();
      parser.removeParseListeners();
      parser.removeErrorListeners();
      parser.addErrorListener(syntaxErrorListener);
      parser.addParseListener(this.semanticErrorListener);

      parser.root();
      const diagnosticList = syntaxErrorListener.diagnosticList.concat(
        this.semanticErrorListener.semanticDiagnosticList,
      );

      diagnosticCollection.set(document.uri, diagnosticList);
      resolve(diagnosticCollection);
    });
  }
}