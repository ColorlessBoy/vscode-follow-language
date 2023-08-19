import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import { Position, Range, DiagnosticSeverity, Diagnostic, SemanticTokensBuilder } from 'vscode-languageserver/node';
import {
  ANTLRFollowParser,
  AssumeBlockContext,
  ConstBlockContext,
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
  public readonly type: number;
  public readonly token: Token;
  constructor(type: number, token: Token) {
    this.type = type;
    this.token = token;
  }
}
export class SemanticErrorListener implements ANTLRFollowParserListener {
  public semanticTokensBuilder = new SemanticTokensBuilder();
  private symbolTable: Map<string, SemanticNode> = new Map();
  private argSymbolTable: Map<string, SemanticNode> = new Map();
  public semanticDiagnosticList: Diagnostic[] = [];

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
        tokenType = this.argSymbolTable.get(token.text)?.type || 0;
      } else if (this.symbolTable.has(token.text)) {
        tokenType = this.symbolTable.get(token.text)?.type || 0;
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
  }
  private hasBeenUsedCheck(ctx: ParserRuleContext): void {
    const token = ctx.start;
    if (token.text === undefined || this.argSymbolTable.has(token.text) || this.symbolTable.has(token.text)) {
      this.addSemanticDiagnostic(token, `${token.text} has been used.`);
    } else {
      const semanticNode = new SemanticNode(ctx.ruleIndex, token);
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
  public enterTypeBlock(ctx: TypeBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public enterConstBlock(ctx: ConstBlockContext): void {
    this.addSemanticTokens(ctx);
  }
  public enterVarBlock(ctx: VarBlockContext): void {
    this.addSemanticTokens(ctx);
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
    this.addSemanticTokens(ctx);
  }
  public enterTargetBlock(ctx: TargetBlockContext): void {
    this.addSemanticTokens(ctx);
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

  public exitPropBlock(ctx: PropBlockContext): void {
    this.argSymbolTable.clear();
  }
  public exitAxiomBlock(ctx: AxiomBlockContext): void {
    this.argSymbolTable.clear();
  }
  public exitTheoremBlock(ctx: TheoremBlockContext): void {
    this.argSymbolTable.clear();
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
