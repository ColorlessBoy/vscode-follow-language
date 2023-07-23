import * as assert from 'assert';
import { createScanner } from '../scanner';
import { TokenType } from '../followLanguageTypes';

suite('Follow Scanner', () => {
  interface Token {
    offset: number;
    length: number;
    line: number;
    type: TokenType;
    content?: string;
  }
  function assertTokens(tests: { input: string; tokens: Token[] }[]) {
    for (const t of tests) {
      const scanner = createScanner(t.input);
      let tokenType = scanner.scan();
      const actual: Token[] = [];
      while (tokenType !== TokenType.EOF) {
        const actualToken: Token = { 
          offset: scanner.getTokenOffset(), 
          length: scanner.getTokenLength(),
          line: scanner.getTokenStartLine(), 
          type: tokenType,
          content: scanner.getTokenValue()
        };
        actual.push(actualToken);
        tokenType = scanner.scan();
      }
      assert.deepEqual(actual, t.tokens);
    }
  }

  test('Single Character Token', () => {
    // A singleCharacterToken does not have content, 
    // because its value is included in its token type.
    assertTokens([
      {
        input: '{}[]():',
        tokens: [
          {offset: 0, length: 1, line: 0, type: TokenType.OpenBrace, content: ''},
          {offset: 1, length: 1, line: 0, type: TokenType.CloseBrace, content: ''},
          {offset: 2, length: 1, line: 0, type: TokenType.OpenBracket, content: ''},
          {offset: 3, length: 1, line: 0, type: TokenType.CloseBracket, content: ''},
          {offset: 4, length: 1, line: 0, type: TokenType.OpenParen, content: ''},
          {offset: 5, length: 1, line: 0, type: TokenType.CloseParen, content: ''},
          {offset: 6, length: 1, line: 0, type: TokenType.Colon, content: ''}
        ],
      },
    ]);
  });

  test('Keyword Token', () => {
    assertTokens([
      {
        input: 'type const var axiom thm -| |- imp',
        tokens: [
          {offset: 0,  length: 4, line: 0, type: TokenType.Type, content: 'type'},
          {offset: 5,  length: 5, line: 0, type: TokenType.Const, content: 'const'},
          {offset: 11, length: 3, line: 0, type: TokenType.Var, content: 'var'},
          {offset: 15, length: 5, line: 0, type: TokenType.Axiom, content: 'axiom'},
          {offset: 21, length: 3, line: 0, type: TokenType.Theorem, content: 'thm'},
          {offset: 25, length: 2, line: 0, type: TokenType.ProofBlockInput, content: '-|'},
          {offset: 28, length: 2, line: 0, type: TokenType.ProofBlockOutput, content: '|-'},
          {offset: 31, length: 3, line: 0, type: TokenType.Operator, content: 'imp'}
        ],
      },
    ]);
  });

  test('CommentToken and LineBreak', () => {
    assertTokens([
      {
        input: 'type //This is an inline comment.\r\n/*\nThis is a block comment.\n*/\nconst',
        tokens: [
          {offset: 0, length: 4, line: 0, type: TokenType.Type, content: 'type'},
          {offset: 5, length: 28, line: 0, type: TokenType.LineComment, content: '//This is an inline comment.'},
          {offset: 33, length: 2, line: 0, type: TokenType.LineBreak, content: ''},
          {offset: 35, length: 30, line: 1, type: TokenType.BlockComment, content: '/*\nThis is a block comment.\n*/'},
          {offset: 65, length: 1, line: 3, type: TokenType.LineBreak, content: ''},
          {offset: 66, length: 5, line: 4, type: TokenType.Const, content: 'const'}
        ]
      }
    ])
  })

});
