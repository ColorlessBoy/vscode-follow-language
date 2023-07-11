export const enum ScanError {
  None = 0,
  InvalidCharacter = 1,
  UnexpectedEndOfComment = 2,
  RecurrentBrace = 3,
}

export const enum SyntaxKind {
  OpenBraceToken = 1, // {
  CloseBraceToken = 2, // }
  ColonToken = 3, // :
  LineCommentToken = 4, // line comment started with `//`
  BlockCommentToken = 5, // block comment between `/*` and `*/`
  WordToken = 6, // Valid words
  ProofBlockInputToken = 7, // proof block input `-|`
  ProofBlockOutputToken = 8, // proof block output `|-`
  LineBreakToken = 9, // `\r?\n`
  Unknown = 16,
  EOF = 17,
}

export interface FollowScanner {
  setPosition(pos: number): void;
  scan(): SyntaxKind;
  getPosition(): number;
  getToken(): SyntaxKind;
  getTokenValue(): string;
  getTokenOffset(): number;
  getTokenLength(): number;
  getTokenStartLine(): number;
  getTokenStartCharacter(): number;
  getTokenError(): ScanError;
}

export type NodeType = 'unknown' | 'keyword' | 'var' | 'prop' | 'axiom' | 'theorem' | 'comment' | 'operater';

export interface Node {
  readonly type: NodeType;
  readonly value?: any;
  readonly offset: number;
  readonly length: number;
  readonly parent?: Node;
  readonly children?: Node[];
}

export interface FollowScanner {
  setPosition(pos: number): void;
  scan(): SyntaxKind;
  getPosition(): number;
  getToken(): SyntaxKind;
  getTokenValue(): string;
  getTokenOffset(): number;
  getTokenLength(): number;
  getTokenStartLine(): number;
  getTokenStartCharacter(): number;
  getTokenError(): ScanError;
}

export interface ParseError {
  error: ParseErrorCode;
  offset: number;
  length: number;
}

export const enum ParseErrorCode {
  None = 0,
  InvalidCharacter = 1,
  UnexpectedEndOfComment = 2,
  InvalidSymbol = 3,
}
