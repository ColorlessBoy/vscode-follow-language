import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import {
  Position,
  Range,
  DiagnosticSeverity,
  Diagnostic,
  SemanticTokensBuilder,
  Hover,
} from 'vscode-languageserver/node';
import {
  ANTLRFollowParser,
  AssumeBlockContext,
  ConstBlockContext,
  ParamPairContext,
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
  public argsMap?: Map<string, number>;
  public argsList?: Array<SemanticNode>;
  public assumeList?: Array<string>;
  public targetList?: Array<string>;
  public proofList?: Array<SemanticNode>;
  constructor(nodeType: number, token: Token) {
    this.nodeType = nodeType;
    this.token = token;
  }
  public run(argsStringList: Array<string>): [Array<string>, Array<string>] {
    var newAssumeList: Array<string> = new Array();
    if (this.assumeList) {
      for (const assume of this.assumeList) {
        var newAssume = '-|';
        for (const op of assume.split(' ')) {
          if (op === '-|') {
            continue;
          } else if (this.argsMap && this.argsMap.has(op)) {
            const argIdx = this.argsMap.get(op) || 0;
            newAssume += ' ' + argsStringList[argIdx];
          } else {
            newAssume += ' ' + op;
          }
        }
        newAssumeList.push(newAssume);
      }
    }
    var newTargetList: Array<string> = new Array();
    if (this.targetList) {
      var newTarget = '|-';
      for (const target of this.targetList) {
        for (const op of target.split(' ')) {
          if (op === '|-') {
            continue;
          } else if (this.argsMap && this.argsMap.has(op)) {
            const argIdx = this.argsMap.get(op) || 0;
            newTarget += ' ' + argsStringList[argIdx];
          } else {
            newTarget += ' ' + op;
          }
        }
      }
      newTargetList.push(newTarget);
    }
    return [newAssumeList, newTargetList];
  }
  public toString() {
    var result: string = '';
    if (this.codeType) {
      result += this.codeType + ' ';
    }
    result += this.token.text;
    if (this.argsList) {
      var isStart = true;
      result += '(';
      for (const arg of this.argsList) {
        if (isStart) {
          isStart = false;
        } else {
          result += ', ';
        }
        result += arg.codeType + ' ' + arg.token.text;
      }
      result += ')';
    }
    if ((this.assumeList && this.assumeList.length > 0) || (this.targetList && this.targetList.length > 0)) {
      result += '{';
      if (this.assumeList) {
        for (const assume of this.assumeList) {
          result += '  \n';
          result += assume;
        }
      }
      if (this.targetList) {
        for (const target of this.targetList) {
          result += '  \n';
          result += target;
        }
      }
      result += '  \n}';
    }
    return result;
  }
}
export class SemanticErrorListener implements ANTLRFollowParserListener {
  public semanticTokensBuilder = new SemanticTokensBuilder();
  private semanticTokensList: Array<Token> = new Array();
  private symbolTable: Map<string, SemanticNode> = new Map();
  private argSymbolTable: Map<string, SemanticNode> = new Map();
  private argSymbolList: Array<SemanticNode> = new Array();
  public semanticDiagnosticList: Diagnostic[] = [];
  private hasDiagnostic = false;
  private assumeList: Array<string> = new Array();
  private targetList: Array<string> = new Array();

  public getHover(line: number, column: number): Hover | undefined {
    for (const token of this.semanticTokensList) {
      if (
        token.line === line + 1 &&
        token.charPositionInLine <= column &&
        token.charPositionInLine + (token.text?.length || 0) >= column &&
        token.text
      ) {
        const content = this.symbolTable.get(token.text)?.toString() || '';
        return {
          contents: content,
          range: this.getRange(token),
        };
      }
    }
  }

  private getSemanticNode(ctx: ParserRuleContext): SemanticNode | undefined {
    const token = ctx.start;
    if (token.text && this.argSymbolTable.has(token.text)) {
      return this.argSymbolTable.get(token.text);
    } else if (token.text && this.symbolTable.has(token.text)) {
      return this.symbolTable.get(token.text);
    }
  }

  public getRange(token: Token): Range {
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
    this.semanticTokensList.push(token);
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
    var tokenStack: Array<Token> = [];
    var parentStack: Array<SemanticNode> = [];
    var argStack: Array<SemanticNode> = [];
    var isStart: boolean = true;
    for (const context of contextList) {
      const semanticNode = this.getSemanticNode(context);
      if (semanticNode) {
        if (!isStart) {
          const targetCodeType = stack.pop();
          tokenStack.pop();
          parentStack.pop();
          argStack.pop();
          if (semanticNode.codeType !== targetCodeType) {
            this.addSemanticDiagnostic(
              context.start,
              `${context.start.text} is a ${semanticNode.codeType}, not ${targetCodeType}. `,
            );
            break;
          }
        }
        if (semanticNode.argsList) {
          semanticNode.argsList.forEach((element) => {
            if (element.codeType) {
              stack.push(element.codeType);
              tokenStack.push(context.start);
              parentStack.push(semanticNode);
              argStack.push(element);
            }
          });
        }
        isStart = false;
      }
    }
    while (tokenStack.length > 0) {
      const token = tokenStack.pop();
      const parent = parentStack.pop();
      const arg = argStack.pop();
      if (token && parent && arg) {
        this.addSemanticDiagnostic(token, `${parent.toString()}\nMissing ${arg.codeType} ${arg.token.text}`);
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
    if (this.hasDiagnostic === false) {
      var assumeContent: Array<string> = new Array();
      assumeContent.push(ctx.KW_ASSUME().toString());
      for (const assumeID of ctx.assumeID()) {
        assumeContent.push(assumeID.text);
      }
      this.assumeList.push(assumeContent.join(' '));
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
    if (this.hasDiagnostic === false) {
      var targetContent: Array<string> = new Array();
      targetContent.push(ctx.KW_TARGET().toString());
      for (const targetID of ctx.targetID()) {
        targetContent.push(targetID.text);
      }
      this.targetList.push(targetContent.join(' '));
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
    const argType = ctx.typeID().start;
    const propSymbolNode = this.getSemanticNode(ctx.propID());
    if (propSymbolNode) {
      propSymbolNode.argsList = this.argSymbolList;
      propSymbolNode.assumeList = this.assumeList;
      propSymbolNode.argsMap = new Map(
        this.argSymbolList.map((i, e) => {
          return [i.token.text || '', e];
        }),
      );
      propSymbolNode.targetList = this.targetList;
      propSymbolNode.codeType = argType.text;
    }
    this.argSymbolTable = new Map();
    this.argSymbolList = new Array();
    this.assumeList = new Array();
    this.targetList = new Array();
  }
  public exitAxiomBlock(ctx: AxiomBlockContext): void {
    const axiomSymbolNode = this.getSemanticNode(ctx.axiomID());
    if (axiomSymbolNode) {
      axiomSymbolNode.argsList = this.argSymbolList;
      axiomSymbolNode.assumeList = this.assumeList;
      axiomSymbolNode.argsMap = new Map(
        this.argSymbolList.map((i, e) => {
          return [i.token.text || '', e];
        }),
      );
      axiomSymbolNode.targetList = this.targetList;
    }
    this.argSymbolTable = new Map();
    this.argSymbolList = new Array();
    this.assumeList = new Array();
    this.targetList = new Array();
  }
  public exitTheoremBlock(ctx: TheoremBlockContext): void {
    // add properties
    const theoremSymbolNode = this.getSemanticNode(ctx.theoremID());
    if (theoremSymbolNode) {
      theoremSymbolNode.argsList = this.argSymbolList;
      theoremSymbolNode.assumeList = this.assumeList;
      theoremSymbolNode.argsMap = new Map(
        this.argSymbolList.map((i, e) => {
          return [i.token.text || '', e];
        }),
      );
      theoremSymbolNode.targetList = this.targetList;
    }
    var currentAssumeList = this.assumeList;
    var currentTargetList = this.targetList;
    this.argSymbolTable = new Map();
    this.argSymbolList = new Array();
    this.assumeList = new Array();
    this.targetList = new Array();

    // verify
    const theoremToken = ctx.theoremID().start;
    const proofIDList = ctx.proofBlock().proofID();
    var proofCommand: Array<Array<ParserRuleContext>> = new Array();
    for (const proofID of proofIDList) {
      if (proofID.text === theoremToken.text) {
        this.addSemanticDiagnostic(theoremToken, `${theoremToken.text} is using itself.`);
        break;
      }
      const proofIDCodeType = this.getSemanticNode(proofID)?.codeType;
      if (proofIDCodeType === 'axiom' || proofIDCodeType === 'theorem') {
        const newArray: Array<ParserRuleContext> = [proofID];
        proofCommand.push(newArray);
      } else {
        var lastArray = proofCommand[-1];
        lastArray.push(proofID);
      }
    }
    for (const command of proofCommand) {
      this.functionStackCheck(command);
    }
    if (this.hasDiagnostic === false) {
      for (const command of proofCommand) {
        const [newAssumeList, newTargetList] = this.runCommand(command);
        if (!currentTargetList.includes(newTargetList[0])) {
          //@ts-ignore
          const currentStr = currentAssumeList.join('  \n') + '  \n' + currentTargetList.join('  \n');
          const getStr = newAssumeList.join('  \n') + ' . \n' + currentTargetList.join('  \n');
          this.addSemanticDiagnostic(command[0].start, `No use command.  \n\n${currentStr}\n\n${getStr}`);
        } else {
          currentTargetList = currentTargetList.filter((e) => {
            e == newTargetList[0];
          });
          const assumeList1 = currentAssumeList.filter((e) => {
            !newAssumeList.includes(e);
          });
          const assumeList2 = newAssumeList.filter((e) => {
            !currentAssumeList.includes(e);
          });
          currentAssumeList = assumeList1;
          for (var assume of assumeList2) {
            currentTargetList.push('|-' + assume.slice(2));
          }
        }
      }
      if ((currentAssumeList && currentAssumeList.length > 0) || (currentTargetList && currentTargetList.length > 0)) {
        //@ts-ignore
        const currentStr = currentAssumeList.join('  \n') + '  \n' + currentTargetList.join('  \n');
        this.addSemanticDiagnostic(theoremToken, `Theorem is not proved. \n\n ${currentStr}`);
      }
    }
  }
  private runCommand(command: ParserRuleContext[]): [Array<string>, Array<string>] {
    var stack: Array<string> = new Array();
    for (const op of command.reverse()) {
      const semanticNode = this.getSemanticNode(op);
      if (semanticNode) {
        if (semanticNode.codeType === 'axiom' || semanticNode.codeType === 'theorem') {
          continue;
        } else if ((semanticNode.argsList?.length || 0) > 0) {
          var argsStringList: Array<string> = new Array();
          if (semanticNode.token.text) {
            argsStringList.push(semanticNode.token.text);
          }
          for (var i = 0; i < (semanticNode.argsList?.length || 0); i++) {
            argsStringList.push(stack.pop() || '');
          }
          stack.push(argsStringList.join(' '));
        } else {
          if (semanticNode.token.text) {
            stack.push(semanticNode.token.text);
          }
        }
      }
    }
    //@ts-ignore
    const semanticNode = this.getSemanticNode(command.shift());
    //@ts-ignore
    return semanticNode.run(stack.reverse());
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
