import {CommonTokenStream, Token, ANTLRErrorListener, CharStreams } from 'antlr4ts';
import { FollowLexer } from './antlr4/FollowLexer';
import { FollowParser } from './antlr4/FollowParser';

class ConsoleErrorListener implements ANTLRErrorListener<Token> {
    // @ts-ignore
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        console.log("ERROR " + msg);
    }
}

function createLexer(input: string) {
    const chars = CharStreams.fromString(input);
    const lexer = new FollowLexer(chars);    
    return lexer;
}

export function getTokens(input: string) : Token[] {
    return createLexer(input).getAllTokens();
}

function createParserFromLexer(lexer: FollowLexer) {
    const tokens = new CommonTokenStream(lexer);
    return new FollowParser(tokens);
}

export function parseTreeStr(input: string) {
    const lexer = createLexer(input);
    lexer.removeErrorListeners();
    lexer.addErrorListener(new ConsoleErrorListener());

    const parser = createParserFromLexer(lexer);
    parser.removeErrorListeners();
    parser.addErrorListener(new ConsoleErrorListener());
    const tree = parser.root();
    return tree.toStringTree(parser);
}