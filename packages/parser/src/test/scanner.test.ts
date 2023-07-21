import * as assert from 'assert';
import { createScanner } from '../scanner';
import { TokenType } from '../followLanguageTypes';

suite('Follow Scanner', () => {
  interface Token {
    offset: number;
    type: TokenType;
    content?: string;
  }
  function assertTokens(tests: { input: string; tokens: Token[] }[]) {
    for (const t of tests) {
      const scanner = createScanner(t.input);
      let tokenType = scanner.scan();
      const actual: Token[] = [];
      while (tokenType !== TokenType.EOF) {
        const actualToken: Token = { offset: scanner.getTokenOffset(), type: tokenType };
        actual.push(actualToken);
        tokenType = scanner.scan();
      }
      assert.deepEqual(actual, t.tokens);
    }
  }

  test('Token.OpenBrace', () => {
    assertTokens([
      {
        input: '{',
        tokens: [{ offset: 0, type: TokenType.OpenBrace }],
      },
    ]);
  });
});
