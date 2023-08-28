import { ANTLRFollowParserListener } from './antlr4/ANTLRFollowParserListener';
import { URI } from 'vscode-uri';
import path from 'path';
import * as fs from 'fs';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { ParserRuleContext } from 'antlr4ts';
import { ImportBlockContext, ImportBlocksContext } from './antlr4/ANTLRFollowParser';

export class FollowImportListener implements ANTLRFollowParserListener {
  private folderPath: string;
  private filePath: string;
  private parentUri: string[] = [];
  constructor(
    public readonly fileUri: string,
    public readonly parentDocMap: Map<string, string[]>,
    public readonly childDocMap: Map<string, string[]>,
  ) {
    this.filePath = URI.parse(fileUri).path;
    this.folderPath = path.dirname(this.filePath);
  }

  public exitImportBlock(ctx: ImportBlockContext): void {
    const tokenStr = ctx.STRING().toString();
    if (tokenStr.length > 0) {
      const subPath = tokenStr.slice(1, tokenStr.length - 1);
      const absPath = path.resolve(path.join(this.folderPath, subPath));
      const absUri = URI.parse(absPath).toString();
      if (!this.parentUri.includes(absUri) && fs.existsSync(absPath)) {
        this.parentUri.push(absUri);
      }
    }
  }

  public exitImportBlocks(ctx: ImportBlocksContext): void {
    const currentChild = this.childDocMap.get(this.fileUri);
    for (const path of this.parentUri) {
      const node = this.childDocMap.get(path);
      if (node) {
        if (!node.includes(this.fileUri)) {
          node.push(this.fileUri);
        }
        if (currentChild) {
          for (const uri of currentChild) {
            if (!node.includes(uri)) {
              node.push(uri); // child's child
            }
          }
        }
      } else {
        var newList = [this.fileUri];
        if (currentChild) {
          for (const uri of currentChild) {
            if (!newList.includes(uri)) {
              newList.push(uri); // child's child
            }
          }
        }
        this.childDocMap.set(path, newList);
      }
    }
    this.parentDocMap.set(this.fileUri, this.parentUri);
  }

  visitTerminal?: (/*@NotNull*/ node: TerminalNode) => void;
  visitErrorNode?: (/*@NotNull*/ node: ErrorNode) => void;
  enterEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
  exitEveryRule?: (/*@NotNull*/ ctx: ParserRuleContext) => void;
}
