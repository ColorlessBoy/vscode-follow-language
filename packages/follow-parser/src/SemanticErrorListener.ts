import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import { Position, Range, DiagnosticSeverity, Diagnostic, SemanticTokensBuilder } from 'vscode-languageserver/node';
import {
  ANTLRFollowParser,
  AssumeBlockContext,
  ConstBlockContext,
  ParamPairContext,
  ProofBlockContext,
  TargetBlockContext,
  TypeBlockContext,
  VarBlockContext,
} from './antlr4/ANTLRFollowParser';
import { PropBlockContext } from './antlr4/ANTLRFollowParser';
import { AxiomBlockContext } from './antlr4/ANTLRFollowParser';
import { TheoremBlockContext } from './antlr4/ANTLRFollowParser';
import { TypeIDContext } from './antlr4/ANTLRFollowParser';
import { ConstIDContext } from './antlr4/ANTLRFollowParser';
import { VarIDContext } from './antlr4/ANTLRFollowParser';
import { PropIDContext } from './antlr4/ANTLRFollowParser';
import { ArgIDContext } from './antlr4/ANTLRFollowParser';
import { AssumeIDContext } from './antlr4/ANTLRFollowParser';
import { TargetIDContext } from './antlr4/ANTLRFollowParser';
import { ProofIDContext } from './antlr4/ANTLRFollowParser';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ParserRuleContext, Token } from 'antlr4ts';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';

class SemanticNode {
  public readonly nodeType: number;
  public readonly token: Token;
  public codeType?: string;
  public argsMap?: Map<string, SemanticNode>;
  public argsList?: Array<SemanticNode>;
  constructor(nodeType: number, token: Token) {
    this.nodeType = nodeType;
    this.token = token;
  }
}
export class SemanticErrorListener implements ANTLRFollowParserListener {
  public semanticTokensBuilder = new SemanticTokensBuilder();
  private symbolTable: Map<string, SemanticNode> = new Map();
  private argSymbolTable: Map<string, SemanticNode> = new Map();
  private argSymbolList: Array<SemanticNode> = new Array();
  public semanticDiagnosticList: Diagnostic[] = [];
  private hasDiagnostic = false;

  private getSemanticNode(ctx: ParserRuleContext): SemanticNode | undefined {
    const token = ctx.start;
    if (token.text && this.argSymbolTable.has(token.text)) {
      return this.argSymbolTable.get(token.text);
    } else if (token.text && this.symbolTable.has(token.text)) {
      return this.symbolTable.get(token.text);
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

  private addSemanticTokens(ctx: ParserRuleContext) {
    const token: Token = ctx.start;
    let tokenType: number = ctx.ruleIndex;
    if (token.text) {
      if (this.argSymbolTable.has(token.text)) {
        tokenType = this.argSymbolTable.get(token.text)?.nodeType || 0;
      } else if (this.symbolTable.has(token.text)) {
        tokenType = this.symbolTable.get(token.text)?.nodeType || 0;
      }
    }
    // TODO: ctx.ruleIndex does not work.
    this.semanticTokensBuilder.push(token.line, token.charPositionInLine, token.text?.length || 0, ctx.ruleIndex, 0);
  }

  private addSemanticDiagnostic(token: Token, msg: string) {
    const range: Range = this.getRange(token);
    const diagnostic = {
      severity: DiagnosticSeverity.Error,
      range,
      message: msg,
      source: 'follow',
    };
    this.semanticDiagnosticList.push(diagnostic);
    this.hasDiagnostic = true; // set diagnostic flag, for compiler
  }
  private addCodeType(arg: Token | undefined, argType: Token | undefined) {
    if (arg && arg.text && argType) {
      const argSymbol = this.argSymbolTable.get(arg.text);
      if (argSymbol) {
        argSymbol.codeType = argType.text;
        this.argSymbolList.push(argSymbol);
      }
    }
  }
  private hasBeenUsedCheck(ctx: ParserRuleContext): void {
    const token = ctx.start;
    if (token.text === undefined || this.argSymbolTable.has(token.text) || this.symbolTable.has(token.text)) {
      this.addSemanticDiagnostic(token, `${token.text} has been used.`);
    } else {
      const semanticNode = new SemanticNode(ctx.ruleIndex, token);
      if (ctx.ruleIndex === ANTLRFollowParser.RULE_axiomID) {
        semanticNode.codeType = 'axiom';
      }
      if (ctx.ruleIndex === ANTLRFollowParser.RULE_theoremID) {
        semanticNode.codeType = 'theorem';
      }
      if (ctx.ruleIndex === ANTLRFollowParser.RULE_argID) {
        this.argSymbolTable.set(token.text, semanticNode);
      } else {
        this.symbolTable.set(token.text, semanticNode);
      }
    }
  }
  private defMissingCheck(ctx: ParserRuleContext): void {
    const token = ctx.start;
    if (token.text === undefined || (!this.argSymbolTable.has(token.text) && !this.symbolTable.has(token.text))) {
      this.addSemanticDiagnostic(token, `${token.text} has not been declared.`);
    }
  }
  private functionStackCheck(contextList: ParserRuleContext[]) {
    var stack: Array<string> = [];
    var isStart: boolean = true;
    for (const context of contextList) {
      const semanticNode = this.getSemanticNode(context);
      if (semanticNode) {
        if (!isStart) {
          const targetCodeType = stack.pop();
          if (semanticNode.codeType !== targetCodeType) {
            this.addSemanticDiagnostic(
              context.start,
              `${context.start.text} is a ${semanticNode.codeType}, not ${targetCodeType}. `,
            );
            break;
          }
        }
        if (semanticNode.argsList) {
          semanticNode.argsList.reverse().forEach((element) => {
            if (element.codeType) {
              stack.push(element.codeType);
            }
          });
        }
        isStart = false;
      }
    }
  }
  public enterTypeBlock(ctx: TypeBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public enterConstBlock(ctx: ConstBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public exitConstBlock(ctx: ConstBlockContext): void {
    const argType = ctx.typeID().start;
    for (const argCtx of ctx.constID()) {
      this.addCodeType(argCtx.start, argType);
    }
  }
  public enterVarBlock(ctx: VarBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public exitVarBlock(ctx: VarBlockContext): void {
    const argType = ctx.typeID().start;
    for (const argCtx of ctx.varID()) {
      this.addCodeType(argCtx.start, argType);
    }
  }
  public enterPropBlock(ctx: PropBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public enterAxiomBlock(ctx: AxiomBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public enterTheoremBlock(ctx: TheoremBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public enterAssumeBlock(ctx: AssumeBlockContext): void {
    this.hasDiagnostic = false; // clear flag of diagnostic, for compiler
    this.addSemanticTokens(ctx);
  }
  public exitAssumeBlock(ctx: AssumeBlockContext): void {
    if (this.hasDiagnostic === false) {
      // compile proposition
      const contextList = ctx.assumeID();
      this.functionStackCheck(contextList);
    }
  }
  public enterTargetBlock(ctx: TargetBlockContext): void {
    this.hasDiagnostic = false; // clear flag of diagnostic, for compiler
    this.addSemanticTokens(ctx);
  }
  public exitTargetBlock(ctx: TargetBlockContext): void {
    if (this.hasDiagnostic === false) {
      // compile proposition
      const contextList = ctx.targetID();
      this.functionStackCheck(contextList);
    }
  }
  public exitProofBlock(ctx: ProofBlockContext): void {
    if (this.hasDiagnostic === false) {
      const contextList = ctx.proofID();
      this.functionStackCheck(contextList);
    }
  }
  public enterTypeDef(ctx: TypeIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterTypeID(ctx: TypeIDContext): void {
    this.defMissingCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterConstID(ctx: ConstIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterVarID(ctx: VarIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterPropID(ctx: PropIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterAxiomID(ctx: PropIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterTheoremID(ctx: PropIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public exitParamPair(ctx: ParamPairContext): void {
    const arg = ctx.stop;
    const argType = ctx.start;
    this.addCodeType(arg, argType);
  }
  public exitPropBlock(ctx: PropBlockContext): void {
    const arg = ctx.propID().start;
    const argType = ctx.typeID().start;
    this.addCodeType(arg, argType);
    const propSymbolNode = this.getSemanticNode(ctx.propID());
    if (propSymbolNode) {
      propSymbolNode.argsList = this.argSymbolList;
      propSymbolNode.argsMap = this.argSymbolTable;
    }
    this.argSymbolTable = new Map();
    this.argSymbolList = new Array();
  }
  public exitAxiomBlock(ctx: AxiomBlockContext): void {
    const axiomSymbolNode = this.getSemanticNode(ctx.axiomID());
    if (axiomSymbolNode) {
      axiomSymbolNode.argsList = this.argSymbolList;
      axiomSymbolNode.argsMap = this.argSymbolTable;
    }
    this.argSymbolTable = new Map();
    this.argSymbolList = new Array();
  }
  public exitTheoremBlock(ctx: TheoremBlockContext): void {
    const theoremSymbolNode = this.getSemanticNode(ctx.theoremID());
    if (theoremSymbolNode) {
      theoremSymbolNode.argsList = this.argSymbolList;
      theoremSymbolNode.argsMap = this.argSymbolTable;
    }
    this.argSymbolTable = new Map();
    this.argSymbolList = new Array();
  }
  public enterArgID(ctx: ArgIDContext): void {
    this.hasBeenUsedCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterAssumeID(ctx: AssumeIDContext): void {
    this.defMissingCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterTargetID(ctx: TargetIDContext): void {
    this.defMissingCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  public enterProofID(ctx: ProofIDContext): void {
    this.defMissingCheck(ctx);
    this.addSemanticTokens(ctx);
  }
  visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
  visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
  enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
  exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}
