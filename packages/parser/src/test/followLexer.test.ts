import * as assert from 'assert';
import * as followParser from '../followParser';
import { Token } from 'antlr4ts';
import { FollowLexer } from '../antlr4/FollowLexer';

function checkToken(token: Token, typeId: number, start: number, end: number, text:string) {
    assert.equal(token.type, typeId);
    assert.equal(token.startIndex, start);
    assert.equal(token.stopIndex, end);
    assert.equal(token.text, text);
}

suite('FollowLexer Tests', () => {
    test('Basic Lexing', () => {
        let tokens = followParser.getTokens("var wff w0");
        assert.equal(tokens.length, 3);
        checkToken(tokens[0], FollowLexer.KW_VAR, 0,  2, "var");
        checkToken(tokens[1], FollowLexer.ID, 4, 6, "wff");
        checkToken(tokens[2], FollowLexer.ID, 8, 9, "w0");
    });
});
