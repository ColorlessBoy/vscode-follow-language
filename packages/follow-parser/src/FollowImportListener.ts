import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import { URI } from 'vscode-uri';
import { TextDocument } from 'vscode-languageserver-textdocument';
import path from 'path';
import * as fs from 'fs';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { ParserRuleContext } from 'antlr4ts';
import { ImportBlockContext, ImportBlocksContext } from './antlr4/ANTLRFollowParser';

export class FollowImportListener implements ANTLRFollowParserListener {
  private folderPath: string;
  private filePath: string;
  private parentPath: string[] = [];
  constructor(
    filePath: string,
    public readonly parentDocMap: Map<string, string[]>,
    public readonly childDocMap: Map<string, string[]>,
  ) {
    this.filePath = path.resolve(filePath);
    this.folderPath = path.dirname(this.filePath);
  }

  public exitImportBlock(ctx: ImportBlockContext): void {
    const tokenStr = ctx.STRING().toString();
    if (tokenStr.length > 0) {
      const subPath = tokenStr.slice(1, tokenStr.length - 1);
      const absPath = path.resolve(path.join(this.folderPath, subPath));
      if (!this.parentPath.includes(absPath) && fs.existsSync(absPath)) {
        this.parentPath.push(absPath);
      }
    }
  }

  public exitImportBlocks(ctx: ImportBlocksContext): void {
    for (const path of this.parentPath) {
      const node = this.childDocMap.get(path);
      if (node) {
        if (!node.includes(this.filePath)) {
          node.push(this.filePath);
        }
      } else {
        this.childDocMap.set(path, [this.filePath]);
      }
    }
    this.parentDocMap.set(this.filePath, this.parentPath);
  }

  visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
  visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
  enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
  exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}
