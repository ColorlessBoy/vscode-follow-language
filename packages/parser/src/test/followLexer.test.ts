import * as assert from 'assert';
import * as followParser from '../followParser';
import { Token } from 'antlr4ts';
import { FollowLexer } from '../antlr4/FollowLexer';

function checkToken(token: Token, typeId: number, start: number, end: number, text: string) {
  assert.equal(token.type, typeId);
  assert.equal(token.startIndex, start);
  assert.equal(token.stopIndex, end);
  assert.equal(token.text, text);
}

suite('FollowLexer Tests', () => {
  test('Lexing VarBlock', () => {
    let tokens = followParser.getTokens('var wff w0');
    assert.equal(tokens.length, 3);
    checkToken(tokens[0], FollowLexer.KW_VAR, 0, 2, 'var');
    checkToken(tokens[1], FollowLexer.ID, 4, 6, 'wff');
    checkToken(tokens[2], FollowLexer.ID, 8, 9, 'w0');
  });
  test('Lexing PropBlock', () => {
    let tokens = followParser.getTokens('prop wff imp (wff w0, wff w1)');
    assert.equal(tokens.length, 10);
    checkToken(tokens[0], FollowLexer.KW_PROP, 0, 3, 'prop');
    checkToken(tokens[1], FollowLexer.ID, 5, 7, 'wff');
    checkToken(tokens[2], FollowLexer.ID, 9, 11, 'imp');
    checkToken(tokens[3], FollowLexer.LPAREN, 13, 13, '(');
    checkToken(tokens[4], FollowLexer.ID, 14, 16, 'wff');
    checkToken(tokens[5], FollowLexer.ID, 18, 19, 'w0');
    checkToken(tokens[6], FollowLexer.COMMA, 20, 20, ',');
    checkToken(tokens[7], FollowLexer.ID, 22, 24, 'wff');
    checkToken(tokens[8], FollowLexer.ID, 26, 27, 'w1');
    checkToken(tokens[9], FollowLexer.RPAREN, 28, 28, ')');
  });
});
