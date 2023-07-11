import { createScanner } from './scanner';
import {
  TokenType,
  ScanError,
  FollowScanner,
  NodeType,
  Node,
  FollowDocument,
  ParseErrorCode,
} from './followLanguageTypes';

class NodeImpl implements Node {
  constructor(
    public type: NodeType,
    public value: any,
    public offset: number,
    public length: number,
    public children: NodeImpl[],
    public parent?: NodeImpl,
  ) {}
}

export class FollowParser {
  public parse(text: string): FollowDocument | undefined {
    const scanner = createScanner(text);
    const followDocument = new NodeImpl(NodeType.Root, 0, 0, 0, [], void 0);
    let curr = followDocument;
    let token = scanner.scan();
    while (token !== TokenType.EOF) {
      switch (token) {
        case TokenType.OpenBrace:
          const child = new NodeImpl(
            NodeType.OpenBrace,
            scanner.getTokenValue(),
            scanner.getTokenOffset(),
            scanner.getTokenLength(),
            [],
            curr,
          );
          curr.children.push(child);
          curr = child;
          break;
      }
      token = scanner.scan();
    }
    return;
  }
}
