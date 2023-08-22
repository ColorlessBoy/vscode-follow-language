import { Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode-languageserver';
import {
  ASTNode,
  ArgASTNode,
  ArgDefASTNode,
  AxiomASTNode,
  AxiomDefASTNode,
  BaseASTNode,
  ConstASTNode,
  ConstDefASTNode,
  KeywordASTNode,
  PropASTNode,
  PropDefASTNode,
  TheoremASTNode,
  TheoremDefASTNode,
  TypeASTNode,
  TypeDefASTNode,
  VarASTNode,
  VarDefASTNode,
} from './FollowLanguageTypes';
import {
  AssumeBlockContext,
  AxiomBlockContext,
  ConstBlockContext,
  ParamPairContext,
  PropBlockContext,
  TargetBlockContext,
  TheoremBlockContext,
  TypeBlockContext,
  TypeIDContext,
  VarBlockContext,
} from './antlr4/ANTLRFollowParser';
import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import { ParserRuleContext, Token } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';

export class FollowParserListener implements ANTLRFollowParserListener {
  private argList: Array<ArgDefASTNode> = new Array();
  private argMap: Map<string, ArgDefASTNode> = new Map();
  private assumptions: Array<Array<ASTNode>> = new Array();
  private target: Array<ASTNode> = new Array();
  private hasError = false;
  constructor(
    public readonly definitionMap: Map<string, ASTNode>,
    public readonly semanticTokenList: Array<ASTNode>,
    public readonly semanticErrors: Diagnostic[] = [],
  ) {}
  public enterTypeBlock(ctx: TypeBlockContext): void {
    this.createKeywordASTNode(ctx.start);
  }
  public exitTypeDef(ctx: TypeIDContext): void {
    const token = ctx.start;
    if (token.text) {
      if (this.nameHasBeenUsedCheck(token)) {
        const typeDefASTNode = new TypeDefASTNodeImpl(token);
        this.semanticTokenList.push(typeDefASTNode);
        this.definitionMap.set(token.text, typeDefASTNode);
      }
    }
  }
  public exitConstBlock(ctx: ConstBlockContext): void {
    this.createKeywordASTNode(ctx.start);
    const typeToken = ctx.typeID().start;
    var typeASTNode: TypeASTNode | undefined = this.createTypeASTNode(typeToken);
    if (typeASTNode) {
      for (const constID of ctx.constID()) {
        const token = constID.start;
        if (token.text) {
          if (this.nameHasBeenUsedCheck(constID.start)) {
            const constDefASTNode = new ConstDefASTNodeImpl(typeASTNode, token);
            this.semanticTokenList.push(constDefASTNode);
            this.definitionMap.set(token.text, constDefASTNode);
          }
        }
      }
    }
  }

  public exitVarBlock(ctx: VarBlockContext): void {
    this.createKeywordASTNode(ctx.start);
    const typeToken = ctx.typeID().start;
    var typeASTNode: TypeASTNode | undefined = this.createTypeASTNode(typeToken);
    if (typeASTNode) {
      for (const varID of ctx.varID()) {
        const token = varID.start;
        if (token.text) {
          if (this.nameHasBeenUsedCheck(varID.start)) {
            const varDefASTNode = new VarDefASTNodeImpl(typeASTNode, token);
            this.semanticTokenList.push(varDefASTNode);
            this.definitionMap.set(token.text, varDefASTNode);
          }
        }
      }
    }
  }
  public exitParamPair(ctx: ParamPairContext): void {
    const arg = ctx.argID().start;
    const argType = ctx.typeID().start;
    var typeASTNode: TypeASTNode | undefined = this.createTypeASTNode(argType);
    if (typeASTNode) {
      if (arg && arg.text) {
        if (this.nameHasBeenUsedCheck(arg)) {
          const argNode = new ArgDefASTNodeImpl(typeASTNode, arg);
          this.argMap.set(arg.text, argNode);
          this.argList.push(argNode);
        }
      }
    }
  }
  public enterPropBlock(ctx: PropBlockContext): void {
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
  }
  public exitPropBlock(ctx: PropBlockContext): void {
    if (this.hasError) {
      return;
    }
    this.createKeywordASTNode(ctx.start);
    const typeToken = ctx.typeID().start;
    var typeASTNode: TypeASTNode | undefined = this.createTypeASTNode(typeToken);
    if (typeASTNode) {
      const propID = ctx.propID().start;
      if (propID.text) {
        if (this.nameHasBeenUsedCheck(propID)) {
          const propASTNode = new PropDefASTNodeImpl(typeASTNode, propID, this.argList);
          this.semanticTokenList.push(propASTNode);
          this.definitionMap.set(propID.text, propASTNode);
        }
      }
    }
    this.argList = new Array();
    this.argMap = new Map();
  }
  public exitAssumeBlock(ctx: AssumeBlockContext): void {
    var assumeList: Array<ASTNode> = new Array();
    for (const assumeID of ctx.assumeID()) {
      const token = assumeID.start;
      if (this.defMissingCheck(token)) {
        const opNode = this.createOpNode(token);
        if (opNode) {
          assumeList.push(opNode);
        } else {
          return;
        }
      } else {
        return;
      }
    }
    if (this.checkFunctionStack(assumeList)) {
      this.assumptions.push(assumeList);
    }
  }
  public exitTargetBlock(ctx: TargetBlockContext): void {
    for (const targetID of ctx.targetID()) {
      const token = targetID.start;
      if (this.defMissingCheck(token)) {
        const opNode = this.createOpNode(token);
        if (opNode) {
          this.target.push(opNode);
        } else {
          return;
        }
      } else {
        return;
      }
    }
    this.checkFunctionStack(this.target);
  }
  public enterAxiomBlock(ctx: AxiomBlockContext): void {
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
    this.assumptions = new Array();
    this.target = new Array();
  }

  public exitAxiomBlock(ctx: AxiomBlockContext): void {
    if (this.hasError) {
      return;
    }
    this.createKeywordASTNode(ctx.start);
    const axiomID = ctx.axiomID().start;
    if (axiomID.text) {
      if (this.nameHasBeenUsedCheck(axiomID)) {
        const axiomDefASTNode = new AxiomDefASTNodeImpl(axiomID, this.argList, this.assumptions, this.target);
        this.semanticTokenList.push(axiomDefASTNode);
        this.definitionMap.set(axiomID.text, axiomDefASTNode);
      }
    }
  }

  public enterTheoremBlock(ctx: TheoremBlockContext): void {
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
    this.assumptions = new Array();
    this.target = new Array();
  }

  public exitTheoremBlock(ctx: TheoremBlockContext): void {
    if (this.hasError) {
      return;
    }
    this.createKeywordASTNode(ctx.start);
    const theoremID = ctx.theoremID().start;
    if (theoremID.text) {
      if (this.nameHasBeenUsedCheck(theoremID)) {
        const theoremDefASTNode = new TheoremDefASTNodeImpl(theoremID, this.argList, this.assumptions, this.target);
        this.semanticTokenList.push(theoremDefASTNode);
        this.definitionMap.set(theoremID.text, theoremDefASTNode);
      }
    }
  }

  public createTypeASTNode(typeToken: Token): TypeASTNode | undefined {
    if (typeToken.text) {
      if (this.defMissingCheck(typeToken)) {
        const definition = this.definitionMap.get(typeToken.text);
        if (definition instanceof TypeDefASTNodeImpl) {
          const typeASTNode = new TypeASTNodeImpl(definition, typeToken);
          this.semanticTokenList.push(typeASTNode);
          definition.reference.push(typeASTNode);
          return typeASTNode;
        }
      }
    }
  }

  public createKeywordASTNode(token: Token): void {
    if (token.text) {
      const typeASTNode: KeywordASTNode = new KeywordASTNodeImpl(token);
      this.semanticTokenList.push(typeASTNode);
    }
  }

  private getRange(token: Token): Range {
    const line = token.line - 1;
    const startCol = token.charPositionInLine;
    const endCol = token.text ? startCol + token.text.length : startCol;
    const startPos: Position = Position.create(line, startCol);
    const endPos: Position = Position.create(line, endCol);
    const range: Range = Range.create(startPos, endPos);
    return range;
  }

  private nameHasBeenUsedCheck(token: Token): boolean {
    if (token.text && this.definitionMap.has(token.text)) {
      this.addSemanticDiagnostic(token, `${token.text} has been used.`);
      return false;
    }
    if (token.text && this.argMap.has(token.text)) {
      this.addSemanticDiagnostic(token, `${token.text} has been used.`);
      return false;
    }
    return true;
  }

  private defMissingCheck(token: Token): boolean {
    if (token.text && !(this.argMap.has(token.text) || this.definitionMap.has(token.text))) {
      this.addSemanticDiagnostic(token, `${token.text} has not been declared.`);
      return false;
    }
    return true;
  }

  private addSemanticDiagnostic(token: Token, msg: string) {
    const range: Range = this.getRange(token);
    const diagnostic = {
      severity: DiagnosticSeverity.Error,
      range,
      message: msg,
      source: 'follow',
    };
    this.semanticErrors.push(diagnostic);
    this.hasError = true;
  }

  private createOpNode(token: Token): ASTNode | undefined {
    var definition: ASTNode | undefined = undefined;
    var opNode: ASTNode | undefined = undefined;
    if (token.text) {
      if (this.argMap.has(token.text)) {
        definition = this.argMap.get(token.text);
      } else if (this.definitionMap.has(token.text)) {
        definition = this.definitionMap.get(token.text);
      }
      if (definition instanceof AxiomDefASTNodeImpl) {
        opNode = new AxiomASTNodeImpl(definition, token);
      } else if (definition instanceof TheoremDefASTNodeImpl) {
        opNode = new TheoremASTNodeImpl(definition, token);
      } else if (definition instanceof PropDefASTNodeImpl) {
        opNode = new PropASTNodeImpl(definition, token);
      } else if (definition instanceof ArgDefASTNodeImpl) {
        opNode = new ArgASTNodeImpl(definition, token);
      } else if (definition instanceof VarDefASTNodeImpl) {
        opNode = new VarASTNodeImpl(definition, token);
      } else if (definition instanceof ConstDefASTNodeImpl) {
        opNode = new ConstASTNodeImpl(definition, token);
      }
      if (opNode && definition && definition.reference) {
        definition.reference.push(opNode);
        this.semanticTokenList.push(opNode);
      }
    }
    return opNode;
  }
  private checkFunctionStack(opNodeList: Array<ASTNode>): boolean {
    var stack: Array<ASTNode> = new Array();
    var opStack: Array<ASTNode> = new Array();
    var isStart: boolean = true;
    for (const opNode of opNodeList) {
      if (opNode.definition && opNode.definition.type instanceof TypeASTNodeImpl) {
        if (!isStart) {
          if (stack.length === 0) {
            this.addSemanticDiagnostic(opNode.token, `${opNode.token.text} is no needed.`);
            return false;
          }
          const argASTNode = stack.pop();
          opStack.pop();
          const typeDefASTNode = argASTNode?.definition;
          const opNodeType = opNode.type;
          if (opNodeType instanceof TypeASTNodeImpl) {
            if (opNodeType.token.text !== typeDefASTNode?.token.text) {
              this.addSemanticDiagnostic(
                opNode.token,
                `${opNode.token.text} is ${opNodeType.token.text}, want ${typeDefASTNode?.token.text}`,
              );
              return false;
            }
          }
        } else {
          isStart = false;
        }
        if (opNode.definition.args) {
          for (const arg of opNode.definition.args.reverse()) {
            stack.push(arg);
            opStack.push(opNode);
          }
        }
      } else {
        return false;
      }
    }
    const opNode = opStack.pop();
    if (opNode) {
      const token = opNode.token;
      const argType = stack.pop();
      this.addSemanticDiagnostic(
        token,
        //@ts-ignore
        `${token.text} is missing argument (${argType?.type.token.text}, ${argType?.token.text})`,
      );
      return false;
    }
    return true;
  }

  visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
  visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
  enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
  exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}

export class BaseASTNodeImpl implements BaseASTNode {
  constructor(public readonly token: Token) {}

  public toString(): string {
    return this.token.text || '';
  }

  public getRange(): Range {
    const line = this.token.line - 1;
    const startCol = this.token.charPositionInLine;
    const endCol = this.token.text ? startCol + this.token.text.length : startCol;
    const startPos: Position = Position.create(line, startCol);
    const endPos: Position = Position.create(line, endCol);
    const range: Range = Range.create(startPos, endPos);
    return range;
  }
}

export class KeywordASTNodeImpl extends BaseASTNodeImpl implements KeywordASTNode {
  public readonly semanticType = 'keyword';
  public readonly type = 'keyword';

  constructor(public readonly token: Token) {
    super(token);
  }

  public toString(): string {
    return this.type + ' ' + this.token.text;
  }
}

export class TypeDefASTNodeImpl extends BaseASTNodeImpl implements TypeDefASTNode {
  public readonly semanticType = 'type';
  public readonly type = 'type';

  constructor(
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return this.type + ' ' + this.token.text;
  }
}

export class TypeASTNodeImpl extends BaseASTNodeImpl implements TypeASTNode {
  constructor(
    public readonly definition: TypeDefASTNode,
    public readonly token: Token,
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}

export class ConstDefASTNodeImpl extends BaseASTNodeImpl implements ConstDefASTNode {
  public readonly semanticType = 'const';

  constructor(
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return 'const ' + this.type.token.text + ' ' + this.token.text;
  }
}

export class VarDefASTNodeImpl extends BaseASTNodeImpl implements VarDefASTNode {
  public readonly semanticType = 'variable';

  constructor(
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return 'var ' + this.type.token.text + ' ' + this.token.text;
  }
}

export class PropDefASTNodeImpl extends BaseASTNodeImpl implements PropDefASTNode {
  public readonly semanticType = 'prop';

  constructor(
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly args: ArgDefASTNode[] = new Array(),
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    var str = 'prop ' + this.type.token.text + ' ' + this.token.text;
    if (this.args.length > 0) {
      const argStr = this.args
        .map((e) => {
          return e.type.token.text + ' ' + e.token.text;
        })
        .join(', ');
      str = str + '(' + argStr + ')';
    }
    return str;
  }
}

export class ArgDefASTNodeImpl extends BaseASTNodeImpl implements ArgDefASTNode {
  public readonly semanticType = 'argument';

  constructor(
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return 'argument ' + this.type.token.text + ' ' + this.token.text;
  }
}

export class AxiomDefASTNodeImpl extends BaseASTNodeImpl implements AxiomDefASTNode {
  public readonly semanticType = 'axiom';
  public readonly type = 'axiom';

  constructor(
    public readonly token: Token,
    public readonly args: ArgDefASTNode[] = new Array(),
    public readonly assumptions: Array<ASTNode[]> = new Array(),
    public readonly target: ASTNode[] = new Array(),
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    var str = 'axiom ' + this.token.text;
    if (this.args.length > 0) {
      const argStr = this.args
        .map((e) => {
          return e.type.token.text + ' ' + e.token.text;
        })
        .join(', ');
      str = str + '(' + argStr + ')';
    }

    str += ' {';
    if (this.assumptions.length > 0) {
      for (const assumption of this.assumptions) {
        const assumeStr = assumption.map((e) => e.token.text).join(' ');
        str += '  \n-| ' + assumeStr;
      }
    }
    if (this.target.length > 0) {
      const targetStr = this.target.map((e) => e.token.text).join(' ');
      str += '  \n|- ' + targetStr;
    }
    str += '  \n}';
    return str;
  }
}
export class TheoremDefASTNodeImpl extends BaseASTNodeImpl implements TheoremDefASTNode {
  public readonly semanticType = 'theorem';
  public readonly type = 'theorem';

  constructor(
    public readonly token: Token,
    public readonly args: ArgDefASTNode[] = new Array(),
    public readonly assumptions: Array<ASTNode[]> = new Array(),
    public readonly target: ASTNode[] = new Array(),
    public readonly reference: ASTNode[] = new Array(),
    public readonly proof: Array<ASTNode[]> = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    var str = 'thm ' + this.token.text;
    if (this.args.length > 0) {
      const argStr = this.args
        .map((e) => {
          return e.type.token.text + ' ' + e.token.text;
        })
        .join(', ');
      str = str + '(' + argStr + ')';
    }

    str += ' {';
    if (this.assumptions.length > 0) {
      for (const assumption of this.assumptions) {
        const assumeStr = assumption.map((e) => e.token.text).join(' ');
        str += '  \n-| ' + assumeStr;
      }
    }
    if (this.target.length > 0) {
      const targetStr = this.target.map((e) => e.token.text).join(' ');
      str += '  \n|- ' + targetStr;
    }
    str += '  \n}';
    return str;
  }
}

export class ConstASTNodeImpl extends BaseASTNodeImpl implements ConstASTNode {
  constructor(
    public readonly definition: ConstDefASTNode,
    public readonly token: Token,
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}

export class VarASTNodeImpl extends BaseASTNodeImpl implements VarASTNode {
  constructor(
    public readonly definition: VarDefASTNode,
    public readonly token: Token,
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}

export class PropASTNodeImpl extends BaseASTNodeImpl implements PropASTNode {
  constructor(
    public readonly definition: PropDefASTNode,
    public readonly token: Token,
    public readonly args: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}
export class ArgASTNodeImpl extends BaseASTNodeImpl implements ArgASTNode {
  constructor(
    public readonly definition: ArgDefASTNode,
    public readonly token: Token,
    public readonly args: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}

export class AxiomASTNodeImpl extends BaseASTNodeImpl implements AxiomASTNode {
  constructor(
    public readonly definition: AxiomDefASTNode,
    public readonly token: Token,
    public readonly args: ASTNode[] = new Array(),
    public readonly assumptions: Array<ASTNode[]> = new Array(),
    public readonly target: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}

export class TheoremASTNodeImpl extends BaseASTNodeImpl implements TheoremASTNode {
  constructor(
    public readonly definition: TheoremDefASTNode,
    public readonly token: Token,
    public readonly args: ASTNode[] = new Array(),
    public readonly assumptions: Array<ASTNode[]> = new Array(),
    public readonly target: ASTNode[] = new Array(),
  ) {
    super(token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}
