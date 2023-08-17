import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import { Position, Range, DiagnosticSeverity, Diagnostic } from 'vscode-languageserver/node';
import { ANTLRFollowParser, RootContext } from './antlr4/ANTLRFollowParser';
import { TypeBlockContext } from './antlr4/ANTLRFollowParser';
import { ConstBlockContext } from './antlr4/ANTLRFollowParser';
import { VarBlockContext } from './antlr4/ANTLRFollowParser';
import { PropBlockContext } from './antlr4/ANTLRFollowParser';
import { AxiomBlockContext } from './antlr4/ANTLRFollowParser';
import { TheoremBlockContext } from './antlr4/ANTLRFollowParser';
import { ParamBlockNonEmptyContext } from './antlr4/ANTLRFollowParser';
import { ParamBlockContext } from './antlr4/ANTLRFollowParser';
import { AssumeBlockContext } from './antlr4/ANTLRFollowParser';
import { TargetBlockContext } from './antlr4/ANTLRFollowParser';
import { ContentBlockContext } from './antlr4/ANTLRFollowParser';
import { ProofBlockContext } from './antlr4/ANTLRFollowParser';
import { TypeIDContext } from './antlr4/ANTLRFollowParser';
import { ConstIDContext } from './antlr4/ANTLRFollowParser';
import { VarIDContext } from './antlr4/ANTLRFollowParser';
import { PropIDContext } from './antlr4/ANTLRFollowParser';
import { AxiomIDContext } from './antlr4/ANTLRFollowParser';
import { TheoremIDContext } from './antlr4/ANTLRFollowParser';
import { ArgIDContext } from './antlr4/ANTLRFollowParser';
import { AssumeIDContext } from './antlr4/ANTLRFollowParser';
import { TargetIDContext } from './antlr4/ANTLRFollowParser';
import { ProofIDContext } from './antlr4/ANTLRFollowParser';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ParserRuleContext, Token } from 'antlr4ts';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';

export class SemanticErrorListener implements ANTLRFollowParserListener {
  public blockList: Map<string, Token> = new Map();
  public semanticDiagnosticList: Diagnostic[] = [];
  public argsList: Map<string, Token> = new Map();

  private addSemanticDiagnostic(token: Token, msg: string) {
    const line = token.line - 1;
    const startCol = token.charPositionInLine;
    const endCol = token.text ? startCol + token.text.length : startCol;
    const startPos: Position = Position.create(line, startCol);
    const endPos: Position = Position.create(line, endCol);
    const range: Range = Range.create(startPos, endPos);
    const diagnostic = {
      severity: DiagnosticSeverity.Error,
      range,
      message: msg,
      source: 'follow',
    };
    this.semanticDiagnosticList.push(diagnostic);
  }
  private hasBeenUsedCheck(ctx: ParserRuleContext): void {
    const token = ctx.start;
    if (token.text === undefined || this.blockList.has(token.text) || this.argsList.has(token.text)) {
      this.addSemanticDiagnostic(token, `${token.text} has been used.`);
    } else {
      if (ctx.ruleIndex === ANTLRFollowParser.RULE_argID) {
        this.argsList.set(token.text, token);
      } else {
        this.blockList.set(token.text, token);
      }
    }
  }
  private defMissingCheck(ctx: ParserRuleContext): void {
    const token = ctx.start;
    if (token.text === undefined || (!this.blockList.has(token.text) && !this.argsList.has(token.text))) {
      this.addSemanticDiagnostic(token, `${token.text} has not been declared.`);
    }
  }
  public enterTypeDef(ctx: TypeIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }
  public enterTypeID(ctx: TypeIDContext): void {
    this.defMissingCheck(ctx);
  }
  public enterConstID(ctx: ConstIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }
  public enterVarID(ctx: VarIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }
  public enterPropID(ctx: PropIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }
  public enterAxiomID(ctx: PropIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }
  public enterTheoremID(ctx: PropIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }

  public exitPropBlock(ctx: PropBlockContext): void {
    this.argsList.clear();
  }
  public exitAxiomBlock(ctx: AxiomBlockContext): void {
    this.argsList.clear();
  }
  public exitTheoremBlock(ctx: TheoremBlockContext): void {
    this.argsList.clear();
  }
  public enterArgID(ctx: ArgIDContext): void {
    this.hasBeenUsedCheck(ctx);
  }
  public enterAssumeID(ctx: AssumeIDContext): void {
    this.defMissingCheck(ctx);
  }
  public enterTargetID(ctx: TargetIDContext): void {
    this.defMissingCheck(ctx);
  }
  public enterProofID(ctx: ProofIDContext): void {
    this.defMissingCheck(ctx);
  }
  visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
  visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
  enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
  exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}
