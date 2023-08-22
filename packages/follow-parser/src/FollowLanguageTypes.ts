import { Token } from 'antlr4ts';
import { ArgASTNodeImpl } from './FollowParserListener';
import { Range } from 'vscode-languageserver';

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
  readonly semanticType?: string;
  readonly type?: string | BaseASTNode;
  readonly args?: BaseASTNode[];
  readonly definition?: BaseASTNode;
  readonly reference?: BaseASTNode[];
  readonly assumptions?: Array<ASTNode[]>;
  readonly target?: ASTNode[];
  readonly proof?: Array<ASTNode[]>;
  readonly error?: string;
  toString(): string;
  toStringSimp(): string;
  getRange(): Range;
  addArg(arg: BaseASTNode): void;
}
export interface KeywordASTNode extends BaseASTNode {
  readonly semanticType: 'keyword';
  readonly type: 'keyword';
}
export interface TypeDefASTNode extends BaseASTNode {
  readonly semanticType: 'type';
  readonly type: 'type';
  readonly reference: ASTNode[];
}
export interface ConstDefASTNode extends BaseASTNode {
  readonly semanticType: 'const';
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
}
export interface VarDefASTNode extends BaseASTNode {
  readonly semanticType: 'variable';
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
}
export interface ArgDefASTNode extends BaseASTNode {
  readonly semanticType: 'argument';
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
}
export interface PropDefASTNode extends BaseASTNode {
  readonly semanticType: 'prop';
  readonly type: TypeASTNode;
  readonly reference: ASTNode[];
  readonly args: ArgDefASTNode[];
}
export interface AxiomDefASTNode extends BaseASTNode {
  readonly semanticType: 'axiom';
  readonly type: 'axiom';
  readonly reference: ASTNode[];
  readonly args: ArgDefASTNode[];
  readonly assumptions: Array<ASTNode[]>;
  readonly target: ASTNode[];
}
export interface TheoremDefASTNode extends BaseASTNode {
  readonly semanticType: 'theorem';
  readonly type: 'theorem';
  readonly reference: ASTNode[];
  readonly args: ArgDefASTNode[];
  readonly assumptions: Array<ASTNode[]>;
  readonly target: ASTNode[];
  readonly proof: Array<ASTNode[]>;
}
export interface TypeASTNode extends BaseASTNode {
  readonly definition: TypeDefASTNode;
  readonly token: Token;
}
export interface ConstASTNode extends BaseASTNode {
  readonly definition: ConstDefASTNode;
  readonly token: Token;
}
export interface VarASTNode extends BaseASTNode {
  readonly definition: VarDefASTNode;
  readonly token: Token;
}
export interface ArgASTNode extends BaseASTNode {
  readonly definition: ArgDefASTNode;
  readonly token: Token;
}
export interface PropASTNode extends BaseASTNode {
  readonly definition: PropDefASTNode;
  readonly args: ASTNode[];
  readonly token: Token;
}
export interface AxiomASTNode extends BaseASTNode {
  readonly definition: AxiomDefASTNode;
  readonly args: ASTNode[];
  readonly token: Token;
}
export interface TheoremASTNode extends BaseASTNode {
  readonly definition: TheoremDefASTNode;
  readonly args: ASTNode[];
  readonly token: Token;
}
