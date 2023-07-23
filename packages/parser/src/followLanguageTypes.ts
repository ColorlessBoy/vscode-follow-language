export const enum ScanError {
  None = 0,
  InvalidCharacter = 1,
  UnexpectedEndOfComment = 2,
  RecurrentBrace = 3,
}

export const enum TokenType {
  OpenBrace = 1, // {
  CloseBrace, // }
  OpenBracket, // [
  CloseBracket, // ]
  OpenParen, // (
  CloseParen, // )
  Colon, // :
  LineComment, // line comment started with `//`
  BlockComment, // block comment between `/*` and `*/`
  ProofInput, // proof block input `-|`
  ProofOutput, // proof block output `|-`
  Type, // `type`
  Const, // `const`
  Var, // `var`
  Prop, // `prop`
  Axiom, // `axiom`
  Theorem, // `thm`
  Operator, // Valid Operator
  LineBreak, // `\r?\n`
  Unknown,
  EOF,
}

export interface FollowScanner {
  setPosition(pos: number): void;
  scan(): TokenType;
  getPosition(): number;
  getToken(): TokenType;
  getTokenValue(): string;
  getTokenOffset(): number;
  getTokenLength(): number;
  getTokenStartLine(): number;
  getTokenStartCharacter(): number;
  getTokenError(): ScanError;
}

export const enum NodeType {
  TypeBlock = 1,
  ConstBlock,
  VarBlock,
  PropBlock,
  AxiomBlock,
  TheoremBlock,
  ProofInput,
  ProofOutput,
  ProofOp,
  Type,
  Name,
  Arg,
  Comment,
  Root,
  Unknown,
  OpenBrace,
}

export interface Node {
  readonly type: NodeType;
  readonly value: any;
  readonly offset: number;
  readonly length: number;
  readonly children: Node[];
  readonly parent?: Node;
}
export interface FollowDocument {
  roots: Node[];
}

export interface ParseError {
  error: ParseErrorCode;
  offset: number;
  length: number;
}

export const enum ParseErrorCode {
  None = 0,
  TypeBlockNameMissing,
  ConstBlockTypeMissing,
  ConstBlockNameMissing,
  VarBlockTypeMissing,
  VarBlockNameMissing,
  PropBlockTypeMissing,
  PropBlockNameMissing,
  PropBlockArgMissing,
  AxiomBlockNameMissing,
  AxiomBlockArgMissing,
  AxiomBlockProofOutputMissing,
  TheoremBlockNameMissing,
  TheoremBlockArgMissing,
  TheoremBlockProofOutputMissing,
  TheoremProofOpMissing
}
