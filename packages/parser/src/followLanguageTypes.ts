export const enum ScanError {
  None = 0,
  UnknownCharacter = 1,
  UnexpectedEndOfComment = 2,
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
  ProofProcess,
  ProofOp,
  Type,
  Name,
  Arg,
  LineComment,
  BlockComment,
  Root,
  Unknown,
  TokenError
}

export interface Node {
  readonly type: NodeType,
  readonly value: string,
  readonly line: number,
  readonly offset: number,
  readonly length: number,
  readonly children: Node[],
  readonly parent?: Node,
  readonly error?: ParseError,
  readonly argsStart?: number,
  readonly proofInputStart?: number,
  readonly proofOutputStart?: number,
  readonly proofProcessStart?: number,
  readonly comments?: Node[], 
  readonly errorToken?: Node[]
}
export interface FollowDocument {
  roots: Node[];
}

export const enum ParseError {
  None = 0,
  TypeBlockNameMissing,
  ConstBlockTypeMissing,
  ConstBlockNameMissing,
  VarBlockTypeMissing,
  VarBlockNameMissing,
  PropBlockTypeMissing,
  PropBlockNameMissing,
  PropBlockArgColonMissing,
  PropBlockArgMissing,
  AxiomBlockNameMissing,
  AxiomBlockArgColonMissing,
  AxiomBlockArgMissing,
  AxiomBlockProofColonMissing,
  AxiomBlockProofInputOpMissing,
  AxiomBlockProofOutputMissing,
  TheoremBlockNameMissing,
  TheoremBlockArgColonMissing,
  TheoremBlockArgMissing,
  TheoremBlockProofColonMissing,
  TheoremBlockProofInputOpMissing,
  TheoremBlockProofOutputMissing,
  TheoremBlockProofProcessColonMissing,
  TheoremBlockProofProcessOpMissing,
  ProofInputOpMissing,
  ProofOutputMissing,
  ProofOutputOpMissing,
  ProofProcessOpMissing,
  UnknownCharacter,
  UnexpectedEndOfComment,
  UnknownTokenError
}
