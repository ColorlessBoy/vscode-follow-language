import { Diagnostic, DiagnosticSeverity, Position, Range, SemanticTokenTypes } from 'vscode-languageserver';
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
  LineCommentBlock,
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
  ImportBlockContext,
  ParamPairContext,
  ProofBlockContext,
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
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import path from 'path';

export class FollowParserListener implements ANTLRFollowParserListener {
  private argList: Array<ArgDefASTNode> = new Array();
  private argMap: Map<string, ArgDefASTNode> = new Map();
  private assumptions: Array<Array<ASTNode>> = new Array();
  private target: Array<ASTNode> = new Array();
  private hasError = false;
  private proof: Array<ASTNode[]> = new Array();
  private parentUri: string[] = [];
  private folderPath: string;
  private filePath: string;
  constructor(
    public readonly document: TextDocument,
    public readonly definitionMap: Map<string, ASTNode>,
    public readonly semanticTokenList: Array<ASTNode>,
    public readonly semanticErrors: Diagnostic[],
    public readonly definitionMapDocMap: Map<string, Map<string, ASTNode>>,
    public readonly parentDocMap: Map<string, string[]>,
  ) {
    this.parentUri = parentDocMap.get(document.uri) || [];
    this.filePath = URI.parse(document.uri).path;
    this.folderPath = path.dirname(this.filePath);
  }

  public exitImportBlock(ctx: ImportBlockContext): void {
    const start = ctx.start;
    this.createKeywordASTNode(start);

    const tokenStr = ctx.STRING().toString();
    if (tokenStr.length > 0) {
      const subPath = tokenStr.slice(1, tokenStr.length - 1);
      const absPath = path.resolve(path.join(this.folderPath, subPath));
      const absUri = URI.parse(absPath).toString();
      if (!this.definitionMapDocMap.has(absUri)) {
        const token = ctx.stop;
        if (token) {
          this.addSemanticDiagnostic(token, 'can not import this file');
        }
      }
    }
  }

  public enterTypeBlock(ctx: TypeBlockContext): void {
    this.createKeywordASTNode(ctx.start);
  }
  public exitTypeDef(ctx: TypeIDContext): void {
    const token = ctx.start;
    if (token.text) {
      if (this.nameHasBeenUsedCheck(token)) {
        const typeDefASTNode = new TypeDefASTNodeImpl(this.document, token);
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
            const constDefASTNode = new ConstDefASTNodeImpl(this.document, typeASTNode, token);
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
            const varDefASTNode = new VarDefASTNodeImpl(this.document, typeASTNode, token);
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
        if (this.nameHasBeenUsedCheck(arg, false)) {
          const argNode = new ArgDefASTNodeImpl(this.document, typeASTNode, arg);
          this.argMap.set(arg.text, argNode);
          this.argList.push(argNode);
          this.semanticTokenList.push(argNode);
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
      this.semanticTokenList.push(typeASTNode);
      const propID = ctx.propID().start;
      if (propID.text) {
        if (this.nameHasBeenUsedCheck(propID)) {
          const propASTNode = new PropDefASTNodeImpl(this.document, typeASTNode, propID, this.argList);
          this.semanticTokenList.push(propASTNode);
          this.definitionMap.set(propID.text, propASTNode);
        }
      }
    }
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
  }
  public exitAssumeBlock(ctx: AssumeBlockContext): void {
    this.createKeywordASTNode(ctx.start);

    var assumeList: Array<ASTNode> = new Array();
    for (const assumeID of ctx.assumeID()) {
      const token = assumeID.start;
      if (token.text === '(' || token.text === ')') {
        continue;
      }
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
    this.createKeywordASTNode(ctx.start);

    for (const targetID of ctx.targetID()) {
      const token = targetID.start;
      if (token.text === '(' || token.text === ')') {
        continue;
      }
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
        const axiomDefASTNode = new AxiomDefASTNodeImpl(
          this.document,
          axiomID,
          this.argList,
          this.assumptions,
          this.target,
        );
        this.semanticTokenList.push(axiomDefASTNode);
        this.definitionMap.set(axiomID.text, axiomDefASTNode);
      }
    }
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
    this.assumptions = new Array();
    this.target = new Array();
  }

  public enterTheoremBlock(ctx: TheoremBlockContext): void {
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
    this.assumptions = new Array();
    this.target = new Array();
    this.proof = new Array();
  }

  public exitProofBlock(ctx: ProofBlockContext): void {
    if (this.hasError) {
      return;
    }
    this.proof = new Array();
    var proofList: ASTNode[] = new Array();
    for (const proofOp of ctx.proofID()) {
      const token = proofOp.start;
      if (token.text === '(' || token.text === ')') {
        continue;
      }
      if (this.defMissingCheck(token)) {
        const opNode = this.createOpNode(token);
        if (opNode && opNode.definition) {
          if (
            proofList.length > 0 &&
            (opNode.definition instanceof AxiomDefASTNodeImpl || opNode.definition instanceof TheoremDefASTNodeImpl)
          ) {
            this.proof.push(proofList);
            proofList = new Array();
          }
          proofList.push(opNode);
        } else {
          return;
        }
      } else {
        return;
      }
    }
    if (proofList.length > 0) {
      this.proof.push(proofList);
    }
  }

  public exitTheoremBlock(ctx: TheoremBlockContext): void {
    if (this.hasError || this.target.length === 0) {
      return;
    }
    this.createKeywordASTNode(ctx.start);
    const theoremID = ctx.theoremID().start;
    var validProof: ASTNode[][] = new Array();
    for (const proofCommand of this.proof) {
      this.checkFunctionStack(proofCommand);
      validProof.push(proofCommand);
    }
    if (theoremID.text) {
      if (this.nameHasBeenUsedCheck(theoremID)) {
        const theoremDefASTNode = new TheoremDefASTNodeImpl(
          this.document,
          theoremID,
          this.argList,
          this.assumptions,
          this.target,
          validProof,
        );
        this.semanticTokenList.push(theoremDefASTNode);
        this.definitionMap.set(theoremID.text, theoremDefASTNode);

        for (const proofCommand of theoremDefASTNode.proof) {
          const proofOp = proofCommand[0];
          if (proofOp.isValid === false && (proofOp.targetStr?.length || 0) > 0) {
            var errorMsg: string = 'Proof command is useless. Input state:  \n';
            errorMsg += proofOp.prevProofState?.join('  \n');
            this.addSemanticDiagnostic(proofOp.token, errorMsg);
          } else {
            if (proofOp.untilNowAssumptionStrSet) {
              for (const assume of proofOp.untilNowAssumptionStrSet) {
                if (!this.checkDiffStatement(assume)) {
                  this.addSemanticDiagnostic(proofOp.token, 'Invalid distinct condition.');
                  break;
                }
              }
            }
            if (proofOp.isValid && proofOp.untilNowTargetStrSet) {
              for (const target of proofOp.untilNowTargetStrSet) {
                if (!this.checkDiffStatement(target)) {
                  this.addSemanticDiagnostic(proofOp.token, 'Invalid distinct condition.');
                  break;
                }
              }
            }
          }
        }
        if (!theoremDefASTNode.isProved()) {
          var errorMsg: string = 'Without valid proof. Current state:  \n';
          errorMsg += theoremDefASTNode.untilNowProofState.join('  \n');
          this.addSemanticDiagnostic(theoremDefASTNode.token, errorMsg);
        } else {
          if (theoremDefASTNode.untilNowAssumptionStrSet) {
            for (const assume of theoremDefASTNode.untilNowAssumptionStrSet) {
              if (!this.checkDiffStatement(assume)) {
                this.addSemanticDiagnostic(theoremDefASTNode.token, 'Invalid distinct condition.');
                break;
              }
            }
          }
          if (theoremDefASTNode.untilNowTargetStrSet) {
            for (const target of theoremDefASTNode.untilNowTargetStrSet) {
              if (!this.checkDiffStatement(target)) {
                this.addSemanticDiagnostic(theoremDefASTNode.token, 'Invalid distinct condition.');
                break;
              }
            }
          }
        }
      }
    }
    this.argList = new Array();
    this.argMap = new Map();
    this.hasError = false;
    this.assumptions = new Array();
    this.target = new Array();
    this.proof = new Array();
  }

  public createTypeASTNode(typeToken: Token): TypeASTNode | undefined {
    if (typeToken.text) {
      if (this.defMissingCheck(typeToken)) {
        const definition = this.getDefinition(typeToken);
        if (definition instanceof TypeDefASTNodeImpl) {
          const typeASTNode = new TypeASTNodeImpl(this.document, definition, typeToken);
          this.semanticTokenList.push(typeASTNode);
          definition.reference.push(typeASTNode);
          return typeASTNode;
        }
      }
    }
  }
  public createKeywordASTNode(token: Token): void {
    if (token.text) {
      const typeASTNode: KeywordASTNode = new KeywordASTNodeImpl(this.document, token);
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

  private nameHasBeenUsedCheck(token: Token, onlyArg: boolean = false): boolean {
    if (token.text && this.argMap.has(token.text)) {
      const definition = this.argMap.get(token.text);
      this.addSemanticDiagnostic(
        token,
        `${token.text} has been used. \n${definition?.document.uri}:${definition?.token
          .line}  \n${definition?.toString()}`,
      );
      return false;
    }
    if (onlyArg) {
      return true;
    }
    const definition = this.getDefinition(token);
    if (definition) {
      this.addSemanticDiagnostic(
        token,
        `${token.text} has been used.  \n${definition?.document.uri}:${definition?.token
          .line}  \n${definition?.toString()}`,
      );
      return false;
    }
    return true;
  }

  private defMissingCheck(token: Token): boolean {
    const definition = this.getDefinition(token);
    if (definition === undefined) {
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

  private getDefinition(token: Token): ASTNode | undefined {
    if (!token.text) {
      return;
    }
    if (this.argMap.has(token.text)) {
      return this.argMap.get(token.text);
    } else if (this.definitionMap.has(token.text)) {
      return this.definitionMap.get(token.text);
    }
    var parentList: Array<string> = this.parentUri.slice();
    for (const parent of parentList) {
      const nodeDefinition = this.definitionMapDocMap.get(parent);
      if (nodeDefinition?.has(token.text)) {
        return nodeDefinition.get(token.text);
      }
    }
    return;
  }

  private createOpNode(token: Token): ASTNode | undefined {
    var definition: ASTNode | undefined = undefined;
    var opNode: ASTNode | undefined = undefined;
    if (token.text) {
      definition = this.getDefinition(token);
      if (definition instanceof AxiomDefASTNodeImpl) {
        opNode = new AxiomASTNodeImpl(this.document, definition, token);
      } else if (definition instanceof TheoremDefASTNodeImpl) {
        opNode = new TheoremASTNodeImpl(this.document, definition, token);
      } else if (definition instanceof PropDefASTNodeImpl) {
        opNode = new PropASTNodeImpl(this.document, definition, token);
      } else if (definition instanceof ArgDefASTNodeImpl) {
        opNode = new ArgASTNodeImpl(this.document, definition, token);
      } else if (definition instanceof VarDefASTNodeImpl) {
        opNode = new VarASTNodeImpl(this.document, definition, token);
      } else if (definition instanceof ConstDefASTNodeImpl) {
        opNode = new ConstASTNodeImpl(this.document, definition, token);
      }
      if (opNode) {
        if (definition && definition.reference) {
          definition.reference.push(opNode);
        }
        this.semanticTokenList.push(opNode);
      }
    }
    return opNode;
  }
  private checkFunctionStack(opNodeList: Array<ASTNode>): boolean {
    var argDefStack: Array<ArgDefASTNode> = new Array();
    var parentStack: Array<ASTNode> = new Array();
    var isStart: boolean = true;
    for (const opNode of opNodeList) {
      if (
        opNode.definition &&
        (opNode.definition.type instanceof TypeASTNodeImpl ||
          opNode.definition.type === 'axiom' ||
          opNode.definition.type === 'theorem')
      ) {
        if (!isStart) {
          if (argDefStack.length === 0) {
            this.addSemanticDiagnostic(opNode.token, `${opNode.token.text} is not needed.`);
            return false;
          }
          const argDefASTNode = argDefStack.pop();
          const opNodeType = opNode.definition.type;
          if (opNodeType instanceof TypeASTNodeImpl) {
            if (opNodeType.token.text !== argDefASTNode?.type.token.text) {
              this.addSemanticDiagnostic(
                opNode.token,
                `${opNode.token.text} is ${opNodeType.token.text}, want ${argDefASTNode?.type.token.text}`,
              );
              return false;
            }
          }
          const parentASTNode = parentStack.pop();
          if (parentASTNode) {
            parentASTNode.addArg(opNode);
          }
        } else {
          isStart = false;
        }
        if (opNode.definition.args) {
          for (var i = opNode.definition.args.length - 1; i >= 0; i--) {
            const arg = opNode.definition.args[i];
            // @ts-ignore
            argDefStack.push(arg);
            parentStack.push(opNode);
          }
        }
      } else {
        return false;
      }
    }
    const opNode = parentStack.pop();
    if (opNode) {
      const token = opNode.token;
      const argType = argDefStack.pop();
      this.addSemanticDiagnostic(
        token,
        //@ts-ignore
        `Missing argument (${argType?.type.token.text} ${argType?.token.text})`,
      );
      return false;
    }
    for (const opNode of opNodeList) {
      if (opNode.token.text === 'diffs') {
        const args = opNode.args;
        if (args) {
          const arg0 = args[0].token.text || '';
          const arg1 = args[1].token.text || '';
          if (arg0 === arg1) {
            this.addSemanticDiagnostic(opNode.token, `Invalid distinct condition: diffs ${arg0} ${arg1}.`);
            return false;
          }
        }
      } else if (opNode.token.text === 'diff') {
        const args = opNode.args;
        if (args) {
          const arg0 = args[0].token.text || '';
          const arg1 = args[1].toStringSimp();
          const arg1List = arg1?.split(' ') || [];
          if (arg1List.includes(arg0)) {
            this.addSemanticDiagnostic(opNode.token, `Invalid distinct condition: diff ${arg0} ${arg1}.`);
            return false;
          }
        }
      }
    }
    const startOpNode = opNodeList[0];
    if (startOpNode) {
      startOpNode.isValid = true;
      opNodeList[0].toString(); // Generate state information.
    }
    return true;
  }

  private getArgsCount(op: string): number {
    if (!op) {
      return 0;
    }
    if (this.argMap.has(op)) {
      return this.argMap.get(op)?.args?.length || 0;
    } else if (this.definitionMap.has(op)) {
      return this.definitionMap.get(op)?.args?.length || 0;
    }
    var parentList: Array<string> = this.parentUri.slice();
    for (const parent of parentList) {
      const nodeDefinition = this.definitionMapDocMap.get(parent);
      if (nodeDefinition?.has(op)) {
        return nodeDefinition.get(op)?.args?.length || 0;
      }
    }
    return 0;
  }

  private checkDiffStatement(statement: string): boolean {
    if (!statement || !statement.includes('diff')) {
      return true;
    }
    const opList = statement.split(' ').reverse() || [];
    var stack: Array<string> = [];
    for (const op of opList) {
      const argsCount = this.getArgsCount(op);
      if (argsCount === 0) {
        stack.push(op);
        continue;
      }
      var args: string[] = [];
      for (var i = 0; i < argsCount; i++) {
        args.push(stack.pop() || '');
      }
      if (op === 'diffsc' && args[1]?.split(' ').includes(args[0])) {
        return false;
      } else if (op === 'diffs' && args[0] === args[1]) {
        return false;
      } else if (op === 'diff' && args[1]?.split(' ').includes(args[0])) {
        return false;
      }
      const newOp = op + ' ' + args.join(' ');
      stack.push(newOp);
    }
    return true;
  }

  visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
  visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
  enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
  exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}

export class BaseASTNodeImpl implements BaseASTNode {
  public isValid = false;

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
  ) {}

  public toString(): string {
    return this.token.text || '';
  }
  public toStringSimp(): string {
    return this.toString();
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

  public addArg(args: ASTNode): void {}
}

export class KeywordASTNodeImpl extends BaseASTNodeImpl implements KeywordASTNode {
  public readonly semanticType = SemanticTokenTypes.keyword;
  public readonly type = 'keyword';

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
  ) {
    super(document, token);
  }

  public toString(): string {
    return this.type + ' ' + this.token.text;
  }
}

export class TypeDefASTNodeImpl extends BaseASTNodeImpl implements TypeDefASTNode {
  public readonly semanticType = SemanticTokenTypes.type;
  public readonly type = 'type';

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
  }

  public toString(): string {
    return this.type + ' ' + this.token.text;
  }
}

export class TypeASTNodeImpl extends BaseASTNodeImpl implements TypeASTNode {
  public readonly semanticType = SemanticTokenTypes.type;

  constructor(
    public readonly document: TextDocument,
    public readonly definition: TypeDefASTNode,
    public readonly token: Token,
  ) {
    super(document, token);
  }

  public toString(): string {
    return this.definition.toString();
  }
}

export class ConstDefASTNodeImpl extends BaseASTNodeImpl implements ConstDefASTNode {
  public readonly semanticType = SemanticTokenTypes.number;

  constructor(
    public readonly document: TextDocument,
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
  }

  public toString(): string {
    return 'const ' + this.type.token.text + ' ' + this.token.text;
  }
}

export class VarDefASTNodeImpl extends BaseASTNodeImpl implements VarDefASTNode {
  public readonly semanticType = SemanticTokenTypes.variable;

  constructor(
    public readonly document: TextDocument,
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
  }

  public toString(): string {
    return 'var ' + this.type.token.text + ' ' + this.token.text;
  }
}

export class PropDefASTNodeImpl extends BaseASTNodeImpl implements PropDefASTNode {
  public readonly semanticType = SemanticTokenTypes.operator;

  constructor(
    public readonly document: TextDocument,
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly args: ArgDefASTNode[] = new Array(),
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
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
  public readonly semanticType = SemanticTokenTypes.parameter;

  constructor(
    public readonly document: TextDocument,
    public readonly type: TypeASTNode,
    public readonly token: Token,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
  }

  public toString(): string {
    return 'argument ' + this.type.token.text + ' ' + this.token.text;
  }
}

export class AxiomDefASTNodeImpl extends BaseASTNodeImpl implements AxiomDefASTNode {
  public readonly semanticType = SemanticTokenTypes.method;
  public readonly type = 'axiom';
  public assumptionStrList: string[] = new Array();
  public targetStr: string = '';

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
    public readonly args: ArgDefASTNode[],
    public readonly assumptions: Array<ASTNode[]>,
    public readonly target: ASTNode[],
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
    if (this.assumptions.length > 0) {
      for (const assumption of this.assumptions) {
        const assumeStr = assumption[0].toStringSimp();
        this.assumptionStrList.push(assumeStr);
      }
    }
    if (this.target.length > 0) {
      this.targetStr = this.target[0].toStringSimp();
    }
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
    if (this.target.length > 0) {
      str += '  \n  |- ' + this.targetStr;
    }
    if (this.assumptionStrList.length > 0) {
      for (const assumptionStr of this.assumptionStrList) {
        str += '  \n  -| ' + assumptionStr;
      }
    }
    str += '  \n}';
    return str;
  }
}
export class TheoremDefASTNodeImpl extends BaseASTNodeImpl implements TheoremDefASTNode {
  public readonly semanticType = SemanticTokenTypes.function;
  public readonly type = 'theorem';
  public assumptionStrList: string[] = new Array();
  public targetStr: string = '';
  public untilNowAssumptionStrSet: Set<string> = new Set();
  public untilNowTargetStrSet: Set<string> = new Set();
  public untilNowProofState: string[] = new Array();

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
    public readonly args: ArgDefASTNode[],
    public readonly assumptions: Array<ASTNode[]>,
    public readonly target: ASTNode[],
    public readonly proof: Array<ASTNode[]>,
    public readonly reference: ASTNode[] = new Array(),
  ) {
    super(document, token);
    if (this.assumptions.length > 0) {
      for (const assumption of this.assumptions) {
        const assumeStr = assumption[0].toStringSimp();
        this.assumptionStrList.push(assumeStr);
      }
    }
    if (this.target.length > 0) {
      this.targetStr = this.target[0].toStringSimp();
    }
    this.compile();
    this.untilNowProofState = this.getProofState(this.untilNowAssumptionStrSet, this.untilNowTargetStrSet);
  }

  public isUseful(untilNowAssumptionStrSet: Set<string>, untilNowTargetStrSet: Set<string>): boolean {
    return false;
  }

  public isProved(): boolean {
    if (this.untilNowTargetStrSet.size !== 1) {
      return false;
    }
    if (!this.untilNowTargetStrSet.has(this.targetStr)) {
      return false;
    }
    if (this.assumptionStrList.length !== this.untilNowAssumptionStrSet.size) {
      return false;
    }
    for (const assumeStr of this.assumptionStrList) {
      if (!this.untilNowAssumptionStrSet.has(assumeStr)) {
        return false;
      }
    }
    return true;
  }

  private compile(): void {
    var currentAssumptions: Set<string> = new Set();
    var currentTargets: Set<string> = new Set();
    var isStart = true;
    for (const proofCommand of this.proof) {
      const proofOp = proofCommand[0];
      if (proofOp instanceof AxiomASTNodeImpl || proofOp instanceof TheoremASTNodeImpl) {
        // proofOp.toString(); // generate targetStr and assumptionStr
        proofOp.prevAssumptionStrSet = new Set(currentAssumptions);
        proofOp.prevTargetStrSet = new Set(currentTargets);
        proofOp.prevProofState = this.getProofState(proofOp.prevAssumptionStrSet, proofOp.prevTargetStrSet);

        const proofOpTarget: string = proofOp.targetStr || '';
        const proofOpAssumptions: string[] = proofOp.assumptionStrList || new Array();
        if (isStart) {
          if (proofOpTarget === this.targetStr) {
            isStart = false;
            currentTargets.add(proofOpTarget);
            proofOpAssumptions.forEach((e) => {
              currentAssumptions.add(e);
            });
          } else {
            proofOp.isValid = false;
          }
        } else {
          if (currentAssumptions.has(proofOpTarget)) {
            // proof one assumption
            currentAssumptions.delete(proofOpTarget);
            proofOpAssumptions.forEach((e) => {
              currentAssumptions.add(e);
            });
          } else {
            // proof nothing
            proofOp.isValid = false;
          }
        }
        proofOp.untilNowAssumptionStrSet = new Set(currentAssumptions);
        proofOp.untilNowTargetStrSet = new Set(currentTargets);
        proofOp.untilNowProofState = this.getProofState(proofOp.untilNowAssumptionStrSet, proofOp.untilNowTargetStrSet);
      }
    }
    this.untilNowAssumptionStrSet = currentAssumptions;
    this.untilNowTargetStrSet = currentTargets;
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
    if (this.target.length > 0) {
      str += '  \n  |- ' + this.targetStr;
    }
    if (this.assumptionStrList.length > 0) {
      for (const assumptionStr of this.assumptionStrList) {
        str += '  \n  -| ' + assumptionStr;
      }
    }
    str += '  \n}';
    str = '```  \n' + str + '  \n```';
    return str;
  }

  public getProofState(untilNowAssumptionStrSet: Set<string>, untilNowTargetStrSet: Set<string>): string[] {
    var proofState: string[] = new Array();
    if (untilNowTargetStrSet.has(this.targetStr)) {
      proofState.push(' [Y] |- ' + this.targetStr);
    } else {
      proofState.push(' [N] |- ' + this.targetStr);
    }
    for (const assumption of untilNowAssumptionStrSet) {
      if (this.assumptionStrList.includes(assumption)) {
        proofState.push(' [Y] -| ' + assumption);
      }
    }
    for (const assumption of this.assumptionStrList) {
      if (!untilNowAssumptionStrSet.has(assumption)) {
        proofState.push(' [N] -| ' + assumption);
      }
    }
    proofState.push('---');
    for (const target of untilNowTargetStrSet) {
      if (target !== this.targetStr) {
        proofState.push(' [*] |- ' + target);
      }
    }
    for (const assumption of untilNowAssumptionStrSet) {
      if (!this.assumptionStrList.includes(assumption)) {
        proofState.push(' [*] -| ' + assumption);
      }
    }
    return proofState;
  }
}

export class ConstASTNodeImpl extends BaseASTNodeImpl implements ConstASTNode {
  public readonly semanticType = SemanticTokenTypes.number;
  constructor(
    public readonly document: TextDocument,
    public readonly definition: ConstDefASTNode,
    public readonly token: Token,
  ) {
    super(document, token);
  }

  public toString(): string {
    return this.definition.toString();
  }

  public toStringSimp(): string {
    return this.token.text || '';
  }
}

export class VarASTNodeImpl extends BaseASTNodeImpl implements VarASTNode {
  public readonly semanticType = SemanticTokenTypes.variable;
  constructor(
    public readonly document: TextDocument,
    public readonly definition: VarDefASTNode,
    public readonly token: Token,
  ) {
    super(document, token);
  }

  public toString(): string {
    return this.definition.toString();
  }

  public toStringSimp(): string {
    return this.token.text || '';
  }
}

export class PropASTNodeImpl extends BaseASTNodeImpl implements PropASTNode {
  public readonly semanticType = SemanticTokenTypes.operator;
  constructor(
    public readonly document: TextDocument,
    public readonly definition: PropDefASTNode,
    public readonly token: Token,
    public args: ASTNode[] = new Array(),
  ) {
    super(document, token);
  }

  public toString(): string {
    var str = 'prop ' + this.definition.type.token.text + ' ' + this.token.text;
    if (this.definition.args.length > 0) {
      var argStr = this.args
        .map((e) => {
          return e.toStringSimp();
        })
        .join(', ');
      for (var i = this.args.length; i < this.definition.args.length; ++i) {
        if (argStr.length > 0) {
          argStr += ', ';
        }
        argStr += `${this.definition.args[i].type.token.text}?${this.definition.args[i].token.text}`;
      }
      str = str + '(' + argStr + ')';
    }
    return str;
  }
  public toStringSimp(): string {
    var str: string = this.token.text || '';
    if (this.definition.args.length > 0) {
      var argStr = this.args
        .map((e) => {
          return e.toStringSimp();
        })
        .join(' ');
      for (var i = this.args.length; i < this.definition.args.length; ++i) {
        if (argStr.length > 0) {
          argStr += ' ';
        }
        argStr += `${this.definition.args[i].type.token.text}?${this.definition.args[i].token.text}`;
      }
      str = str + ' ' + argStr;
    }
    return str;
  }

  public addArg(arg: ASTNode): void {
    this.args.push(arg);
  }
}
export class ArgASTNodeImpl extends BaseASTNodeImpl implements ArgASTNode {
  public readonly semanticType = SemanticTokenTypes.parameter;
  constructor(
    public readonly document: TextDocument,
    public readonly definition: ArgDefASTNode,
    public readonly token: Token,
  ) {
    super(document, token);
  }

  public toString(): string {
    return this.definition.toString();
  }

  public toStringSimp(): string {
    return this.token.text || '';
  }
}

export class AxiomASTNodeImpl extends BaseASTNodeImpl implements AxiomASTNode {
  public readonly semanticType = SemanticTokenTypes.method;

  constructor(
    public readonly document: TextDocument,
    public readonly definition: AxiomDefASTNode,
    public readonly token: Token,
    public args: ASTNode[] = new Array(),
    public assumptionStrList: string[] = new Array(),
    public targetStr: string = '',
    public untilNowAssumptionStrSet: Set<string> = new Set(),
    public untilNowTargetStrSet: Set<string> = new Set(),
    public prevAssumptionStrSet: Set<string> = new Set(),
    public prevTargetStrSet: Set<string> = new Set(),

    public untilNowProofState: string[] = new Array(),
    public prevProofState: string[] = new Array(),
    public isValid: boolean = false,
  ) {
    super(document, token);
  }

  private generateStr(): void {
    var argMap: Map<string, string> = new Map();
    for (var i = 0; i < this.definition.args.length; ++i) {
      const argCode: string = this.definition.args[i].token.text || '';
      const argType: string = this.definition.args[i].type.token.text || '';
      const unknownArgStr = `${argType}?${argCode}`;
      argMap.set(argCode, this.args[i]?.toStringSimp() || unknownArgStr);
    }
    for (const assumption of this.definition.assumptions) {
      const assumeStr = assumption
        .map((assumeOp) => {
          const opStr = assumeOp.token.text;
          return argMap.get(opStr || '') || opStr;
        })
        .join(' ');
      this.assumptionStrList.push(assumeStr);
    }
    const targetStr = this.definition.target
      .map((targetOp) => {
        const opStr = targetOp.token.text;
        return argMap.get(opStr || '') || opStr;
      })
      .join(' ');
    this.targetStr = targetStr;
  }

  public toString(): string {
    if (this.targetStr.length === 0) {
      this.generateStr();
    }
    var str = 'axiom ' + this.token.text + ' {';
    str += '  \n  |- ' + this.targetStr + '  \n}';
    for (const assumptionStr of this.assumptionStrList) {
      str += '  \n  -| ' + assumptionStr;
    }
    str = '```  \n' + str + '  \n```';

    var proofState = this.untilNowProofState.join('  \n');
    str += ['  \n```', 'Current proof state:', proofState, '```'].join('  \n');
    return str;
  }

  public addArg(arg: ASTNode): void {
    this.args.push(arg);
  }
}

export class TheoremASTNodeImpl extends BaseASTNodeImpl implements TheoremASTNode {
  public readonly semanticType = SemanticTokenTypes.function;

  constructor(
    public readonly document: TextDocument,
    public readonly definition: TheoremDefASTNode,
    public readonly token: Token,
    public args: ASTNode[] = new Array(),
    public assumptionStrList: string[] = new Array(),
    public targetStr: string = '',
    public untilNowAssumptionStrSet: Set<string> = new Set(),
    public untilNowTargetStrSet: Set<string> = new Set(),
    public prevAssumptionStrSet: Set<string> = new Set(),
    public prevTargetStrSet: Set<string> = new Set(),

    public untilNowProofState: string[] = new Array(),
    public prevProofState: string[] = new Array(),
    public isValid: boolean = false,
  ) {
    super(document, token);
  }

  private generateStr(): void {
    var argMap: Map<string, string> = new Map();
    for (var i = 0; i < this.definition.args.length; ++i) {
      const argCode: string = this.definition.args[i].token.text || '';
      const argType: string = this.definition.args[i].type.token.text || '';
      const unknownArgStr = `${argType}?${argCode}`;
      argMap.set(argCode, this.args[i]?.toStringSimp() || unknownArgStr);
    }
    for (const assumption of this.definition.assumptions) {
      const assumeStr = assumption
        .map((assumeOp) => {
          const opStr = assumeOp.token.text;
          return argMap.get(opStr || '') || opStr;
        })
        .join(' ');
      this.assumptionStrList.push(assumeStr);
    }
    const targetStr = this.definition.target
      .map((targetOp) => {
        const opStr = targetOp.token.text;
        return argMap.get(opStr || '') || opStr;
      })
      .join(' ');
    this.targetStr = targetStr;
  }

  public toString(): string {
    if (this.targetStr.length === 0) {
      this.generateStr();
    }
    var str = 'thm ' + this.token.text + ' {';
    str += '  \n  |- ' + this.targetStr;
    for (const assumptionStr of this.assumptionStrList) {
      str += '  \n  -| ' + assumptionStr;
    }
    str = '```  \n}  \n' + str + '  \n```';

    var proofState = this.untilNowProofState.join('  \n');
    str += ['  \n```', 'Current proof state:', proofState, '```'].join('  \n');
    return str;
  }

  public addArg(arg: ASTNode): void {
    this.args.push(arg);
  }
}

export class LineCommentBlockImpl extends BaseASTNodeImpl implements LineCommentBlock {
  public readonly semanticType = SemanticTokenTypes.comment;

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
  ) {
    super(document, token);
  }
}
export class BlockCommentBlockImpl extends BaseASTNodeImpl implements BlockCommentBlockImpl {
  public readonly semanticType = SemanticTokenTypes.comment;

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
  ) {
    super(document, token);
  }
}

export class ImportFileBlockImpl extends BaseASTNodeImpl implements ImportFileBlockImpl {
  public readonly semanticeType = SemanticTokenTypes.string;

  constructor(
    public readonly document: TextDocument,
    public readonly token: Token,
  ) {
    super(document, token);
  }
}
