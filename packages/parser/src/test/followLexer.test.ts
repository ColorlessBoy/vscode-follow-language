import * as assert from 'assert';
import { getTokens } from '../followParser';
import { Token } from 'antlr4ts';
import { ANTLRFollowLexer } from '../antlr4/ANTLRFollowLexer';

function checkToken(token: Token, typeId: number, start: number, end: number, text: string) {
  assert.equal(token.type, typeId);
  assert.equal(token.startIndex, start);
  assert.equal(token.stopIndex, end);
  assert.equal(token.text, text);
}

suite('FollowLexer Tests', () => {
  test('Lexing VarBlock', () => {
    let tokens = getTokens('var wff w0');
    assert.equal(tokens.length, 3);
    checkToken(tokens[0], ANTLRFollowLexer.KW_VAR, 0, 2, 'var');
    checkToken(tokens[1], ANTLRFollowLexer.ID, 4, 6, 'wff');
    checkToken(tokens[2], ANTLRFollowLexer.ID, 8, 9, 'w0');
  });
  test('Lexing PropBlock', () => {
    let tokens = getTokens('prop wff imp (wff w0, wff w1)');
    assert.equal(tokens.length, 10);
    checkToken(tokens[0], ANTLRFollowLexer.KW_PROP, 0, 3, 'prop');
    checkToken(tokens[1], ANTLRFollowLexer.ID, 5, 7, 'wff');
    checkToken(tokens[2], ANTLRFollowLexer.ID, 9, 11, 'imp');
    checkToken(tokens[3], ANTLRFollowLexer.LPAREN, 13, 13, '(');
    checkToken(tokens[4], ANTLRFollowLexer.ID, 14, 16, 'wff');
    checkToken(tokens[5], ANTLRFollowLexer.ID, 18, 19, 'w0');
    checkToken(tokens[6], ANTLRFollowLexer.COMMA, 20, 20, ',');
    checkToken(tokens[7], ANTLRFollowLexer.ID, 22, 24, 'wff');
    checkToken(tokens[8], ANTLRFollowLexer.ID, 26, 27, 'w1');
    checkToken(tokens[9], ANTLRFollowLexer.RPAREN, 28, 28, ')');
  });
});
