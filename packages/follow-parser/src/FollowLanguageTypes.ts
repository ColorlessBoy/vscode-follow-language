import { Token } from 'antlr4ts';
import { Range, SemanticTokenModifiers, SemanticTokenTypes } from 'vscode-languageserver';

export type ASTNode =
  | BaseASTNode
  | KeywordASTNode
  | TypeDefASTNode
  | ConstDefASTNode
  | VarDefASTNode
  | PropDefASTNode
  | AxiomDefASTNode
  | TheoremDefASTNode
  | ArgDefASTNode
  | TypeASTNode
  | ConstASTNode
  | VarASTNode
  | PropASTNode
  | AxiomASTNode
  | TheoremASTNode
  | ArgASTNode;

export interface BaseASTNode {
  readonly token: Token;
  readonly semanticType?: SemanticTokenTypes;
  readonly type?: string | BaseASTNode;
  readonly args?: BaseASTNode[];
  readonly definition?: BaseASTNode;
  readonly reference?: BaseASTNode[];
  readonly assumptions?: Array<ASTNode[]>;
  readonly target?: ASTNode[];
  readonly proof?: Array<ASTNode[]>;
  readonly error?: string;
  readonly assumptionStrList?: string[];
  readonly targetStr?: string;
  readonly untilNowAssumptionStrSet?: Set<string>;
  readonly untilNowTargetStrSet?: Set<string>;
  readonly prevAssumptionStrSet?: Set<string>;
  readonly prevTargetStrSet?: Set<string>;

  readonly untilNowProofState?: string[];
  readonly prevProofState?: string[];
  toString(): string;
  toStringSimp(): string;
  getRange(): Range;
  addArg(arg: BaseASTNode): void;
}
export interface KeywordASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.keyword;
  readonly type: 'keyword';
}
export interface TypeDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.type;
  readonly type: 'type';
  readonly reference: ASTNode[];
}
export interface ConstDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.number;
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
}
export interface VarDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.variable;
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
}
export interface ArgDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.parameter;
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
}
export interface PropDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.operator;
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
  readonly args: ArgDefASTNode[];
}
export interface AxiomDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.method;
  readonly type: 'axiom';
  readonly reference: ASTNode[];
  readonly args: ArgDefASTNode[];
  readonly assumptions: Array<ASTNode[]>;
  readonly target: ASTNode[];
  readonly assumptionStrList: string[];
  readonly targetStr: string;
}
export interface TheoremDefASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.function;
  readonly type: 'theorem';
  readonly reference: ASTNode[];
  readonly args: ArgDefASTNode[];
  readonly assumptions: Array<ASTNode[]>;
  readonly target: ASTNode[];
  readonly proof: Array<ASTNode[]>;
  readonly untilNowAssumptionStrSet: Set<string>;
  readonly untilNowTargetStrSet: Set<string>;

  readonly untilNowProofState: string[];
  isProved(): boolean;
}
export interface TypeASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.type;
  readonly definition: TypeDefASTNode;
  readonly token: Token;
}
export interface ConstASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.number;
  readonly definition: ConstDefASTNode;
  readonly token: Token;
}
export interface VarASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.variable;
  readonly definition: VarDefASTNode;
  readonly token: Token;
}
export interface ArgASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.parameter;
  readonly definition: ArgDefASTNode;
  readonly token: Token;
}
export interface PropASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.operator;
  readonly definition: PropDefASTNode;
  readonly args: ASTNode[];
  readonly token: Token;
}
export interface AxiomASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.method;
  readonly definition: AxiomDefASTNode;
  readonly args: ASTNode[];
  readonly token: Token;
  readonly assumptionStrList: string[];
  readonly targetStr: string;
  readonly untilNowAssumptionStrSet: Set<string>;
  readonly untilNowTargetStrSet: Set<string>;
  readonly prevAssumptionStrSet: Set<string>;
  readonly prevTargetStrSet: Set<string>;

  readonly untilNowProofState: string[];
  readonly prevProofState: string[];
}
export interface TheoremASTNode extends BaseASTNode {
  readonly semanticType: SemanticTokenTypes.function;
  readonly definition: TheoremDefASTNode;
  readonly args: ASTNode[];
  readonly token: Token;
  readonly untilNowAssumptionStrSet: Set<string>;
  readonly untilNowTargetStrSet: Set<string>;
  readonly prevAssumptionStrSet: Set<string>;
  readonly prevTargetStrSet: Set<string>;

  readonly untilNowProofState: string[];
  readonly prevProofState: string[];
}
