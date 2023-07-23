import { createScanner } from './scanner';
import {
  TokenType,
  FollowScanner,
  NodeType,
  Node,
  FollowDocument,
  ParseErrorCode,
} from './followLanguageTypes';
import { Cipher } from 'crypto';

class NodeImpl implements Node {
  constructor(
    public type: NodeType,
    public value: string,
    public line: number,
    public offset: number,
    public length: number,
    public children: NodeImpl[],
    public parent?: NodeImpl,
    public error?: ParseErrorCode,
    public argsStart?: number,
    public proofInputStart?: number,
    public proofOutputStart?: number,
  ) {}
}

export class FollowParser {
  public parse(text: string): FollowDocument | undefined {
    const scanner = createScanner(text);
    const followDocument = new NodeImpl(NodeType.Root, '', 0, 0, 0, [], void 0);
    let curr = followDocument;
    let token = scanner.scan();
    while (token !== TokenType.EOF) {
      switch (token) {
        case TokenType.Type:
          this.parseTypeBlock(scanner, curr);
          break;
        case TokenType.Const:
          this.parseConstBlock(scanner, curr);
          break;
        case TokenType.Var:
          this.parseVarBlock(scanner, curr);
          break;
        case TokenType.Prop:
          this.parsePropBlock(scanner, curr);
          break;
        case TokenType.Axiom:
          this.parseAxiomBlock(scanner, curr);
          break;
        case TokenType.Theorem:
          this.parseTheoremBlock(scanner, curr);
          break;
      }
      token = scanner.getToken();
    }
    return;
  }

  private createNode(scanner: FollowScanner, curr: NodeImpl, nodeType: NodeType) {
    const child = new NodeImpl(
      nodeType,
      scanner.getTokenValue(),
      scanner.getTokenStartLine(),
      scanner.getTokenOffset(),
      scanner.getTokenLength(),
      [],
      curr,
    );
    curr.children.push(child);
    return child;
  }

  private scanOperator(scanner: FollowScanner, curr: NodeImpl, nodeType: NodeType): boolean {
    let token = scanner.getToken();
    if (token != TokenType.Operator) {
      return false;
    }
    this.createNode(scanner, curr, nodeType);
    scanner.scan();
    return true;
  }

  private scanOperatorSequence(scanner: FollowScanner, curr: NodeImpl, nodeType: NodeType): boolean {
    let token = scanner.getToken();
    let cnt = 0;
    while (token === TokenType.Operator) {
      this.createNode(scanner, curr, nodeType);
      token = scanner.scan();
      cnt++;
    }
    return cnt > 0;
  }

  private scanBlock(scanner: FollowScanner, curr: NodeImpl, startTokenType: TokenType, nodeType: NodeType): boolean {
    let token = scanner.getToken();
    if (token !== startTokenType) {
      return false;
    }
    scanner.scan();
    return this.scanOperatorSequence(scanner, curr, nodeType);
  }

  private parseTypeBlock(scanner: FollowScanner, curr: NodeImpl) {
    // type [NAME]+
    scanner.scan();
    const child = this.createNode(scanner, curr, NodeType.TypeBlock);
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseErrorCode.TypeBlockNameMissing;
    }
  }

  private parseConstBlock(scanner: FollowScanner, curr: NodeImpl) {
    // const TYPE [NAME]+
    scanner.scan();
    const child = this.createNode(scanner, curr, NodeType.ConstBlock);
    if (!this.scanOperator(scanner, child, NodeType.Type)) {
      child.error = ParseErrorCode.ConstBlockTypeMissing;
      return;
    }
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseErrorCode.ConstBlockNameMissing;
    }
  }

  private parseVarBlock(scanner: FollowScanner, curr: NodeImpl) {
    // var TYPE [NAME]+
    scanner.scan();
    const child = this.createNode(scanner, curr, NodeType.VarBlock);
    if (!this.scanOperator(scanner, child, NodeType.Type)) {
      child.error = ParseErrorCode.VarBlockTypeMissing;
      return;
    }
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseErrorCode.VarBlockNameMissing;
    }
  }

  private parsePropBlock(scanner: FollowScanner, curr: NodeImpl) {
    // prop TYPE [NAME]+ : [ARG]+
    scanner.scan();
    const child = this.createNode(scanner, curr, NodeType.PropBlock);
    if (!this.scanOperator(scanner, child, NodeType.Type)) {
      child.error = ParseErrorCode.PropBlockTypeMissing;
      return;
    }
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseErrorCode.PropBlockNameMissing;
      return;
    }
    child.argsStart = child.children.length;
    if (!this.scanBlock(scanner, child, TokenType.Colon, NodeType.Arg)) {
      child.error = ParseErrorCode.PropBlockArgMissing;
    }
  }

  private parseAxiomBlock(scanner: FollowScanner, curr: NodeImpl) {
    // axiom NAME : [ARG]+ : [INPUT]* OUTPUT
    scanner.scan();
    const child = this.createNode(scanner, curr, NodeType.AxiomBlock);
    if (!this.scanOperator(scanner, child, NodeType.Name)) {
      child.error = ParseErrorCode.AxiomBlockNameMissing;
      return;
    }
    child.argsStart = child.children.length;
    if (!this.scanBlock(scanner, child, TokenType.Colon, NodeType.Arg)) {
      child.error = ParseErrorCode.AxiomBlockArgMissing;
      return;
    }
    child.proofInputStart = child.children.length;
    this.scanBlock(scanner, child, TokenType.ProofInput, NodeType.ProofInput);
    child.proofOutputStart = child.children.length;
    if (!this.scanBlock(scanner, child, TokenType.ProofOutput, NodeType.ProofOutput)) {
      child.error = ParseErrorCode.AxiomBlockProofOutputMissing;
      return;
    }
  }

  private parseTheoremBlock(scanner: FollowScanner, curr: NodeImpl) {
    // thm NAME : [ARG]+ : [INPUT]* OUTPUT : [OP]+
    scanner.scan();
    const child = this.createNode(scanner, curr, NodeType.TheoremBlock);
    if (!this.scanOperator(scanner, child, NodeType.Name)) {
      child.error = ParseErrorCode.TheoremBlockNameMissing;
      return;
    }
    child.argsStart = child.children.length;
    if (!this.scanBlock(scanner, child, TokenType.Colon, NodeType.Arg)) {
      child.error = ParseErrorCode.TheoremBlockArgMissing;
      return;
    }
    child.proofInputStart = child.children.length;
    this.scanBlock(scanner, child, TokenType.ProofInput, NodeType.ProofInput);
    child.proofOutputStart = child.children.length;
    if (!this.scanBlock(scanner, child, TokenType.ProofOutput, NodeType.ProofOutput)) {
      child.error = ParseErrorCode.TheoremBlockProofOutputMissing;
      return;
    }
    if (!this.scanBlock(scanner, child, TokenType.Operator, NodeType.ProofOp)) {
      child.error = ParseErrorCode.TheoremProofOpMissing;
      return;
    }
  }
}
