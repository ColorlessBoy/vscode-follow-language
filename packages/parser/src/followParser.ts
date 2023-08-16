import { CommonTokenStream, Token, ANTLRErrorListener, CharStreams } from 'antlr4ts';
import { ANTLRFollowLexer } from './antlr4/ANTLRFollowLexer';
import { ANTLRFollowParser } from './antlr4/ANTLRFollowParser';

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

export class ANTLRBackend {}
