import { createScanner } from './scanner';
import {
  TokenType,
  FollowScanner,
  NodeType,
  Node,
  FollowDocument,
  ParseError,
  ScanError,
} from './followLanguageTypes';

class NodeImpl implements Node {
  constructor(
    public type: NodeType,
    public value: string,
    public line: number,
    public offset: number,
    public length: number,
    public children: NodeImpl[],
    public parent?: NodeImpl,
    public error?: ParseError,
    public argsStart?: number,
    public proofInputStart?: number,
    public proofOutputStart?: number,
    public proofProcessStart?: number,
    public comments?: NodeImpl[], 
    public errorToken?: NodeImpl[]
  ) {}
}

export class FollowParser {
  public parse(text: string): FollowDocument {
    const scanner = createScanner(text);
    const root = new NodeImpl(NodeType.Root, '', 0, 0, 0, []);
    let curr = root;

    let token = this.scanUntilValid(scanner, root);
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
        default:
          this.scanUntilValid(scanner, curr);
      }
      token = scanner.getToken();
    }
    return {
      roots: [root]
    };
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

  private scanLineComment(scanner: FollowScanner, curr: NodeImpl): boolean {
    const child = new NodeImpl(
      NodeType.LineComment,
      scanner.getTokenValue(),
      scanner.getTokenStartLine(),
      scanner.getTokenOffset(),
      scanner.getTokenLength(),
      [],
      curr,
    );
    if (curr.comments) {
      curr.comments.push(child);
    } else {
      curr.comments = [child];
    }
    return true;
  }

  private scanBlockComment(scanner: FollowScanner, curr: NodeImpl): boolean {
    const child = new NodeImpl(
      NodeType.BlockComment,
      scanner.getTokenValue(),
      scanner.getTokenStartLine(),
      scanner.getTokenOffset(),
      scanner.getTokenLength(),
      [],
      curr,
    );
    if (curr.comments) {
      curr.comments.push(child);
    } else {
      curr.comments = [child];
    }
    return true;
  }

  private scanErrorToken(scanner: FollowScanner, curr: NodeImpl, parseError: ParseError): boolean {
    const child = new NodeImpl(
      NodeType.TokenError,
      scanner.getTokenValue(),
      scanner.getTokenStartLine(),
      scanner.getTokenOffset(),
      scanner.getTokenLength(),
      [],
      curr,
    );
    child.error = parseError;
    if (curr.errorToken) {
      curr.errorToken.push(child);
    } else {
      curr.comments = [child];
    }
    return true
  }

  private scanUntilValid(scanner: FollowScanner, curr: NodeImpl): TokenType {
    const ignoreTokenList = [
      TokenType.OpenBrace,
      TokenType.CloseBrace,
      TokenType.OpenBracket,
      TokenType.CloseBracket,
      TokenType.OpenParen,
      TokenType.CloseParen,
      TokenType.LineBreak
    ]
    let token = scanner.scan();
    let tokenError = scanner.getTokenError();
    while (tokenError !== ScanError.None
          || token === TokenType.LineComment 
          || token === TokenType.BlockComment
          || ignoreTokenList.includes(token)) {
      if (tokenError !== ScanError.None) {
        if (tokenError === ScanError.UnknownCharacter) {
          this.scanErrorToken(scanner, curr, ParseError.UnknownCharacter);
        } else if (tokenError === ScanError.UnexpectedEndOfComment) {
          this.scanErrorToken(scanner, curr, ParseError.UnexpectedEndOfComment);
        } else {
          this.scanErrorToken(scanner, curr, ParseError.UnknownTokenError);
        }
      } else if (token === TokenType.LineComment) {
        this.scanLineComment(scanner, curr);
      } else if (token === TokenType.BlockComment) {
        this.scanBlockComment(scanner, curr);
      }
      token = scanner.scan();
      tokenError = scanner.getTokenError();
    }
    return token;
  }


  private scanOperator(scanner: FollowScanner, curr: NodeImpl, nodeType: NodeType): boolean {
    // Op
    let token = scanner.getToken();
    if (token != TokenType.Operator) {
      return false;
    }
    this.createNode(scanner, curr, nodeType);
    this.scanUntilValid(scanner, curr);
    return true;
  }

  private scanOperatorSequence(scanner: FollowScanner, curr: NodeImpl, nodeType: NodeType): boolean {
    // NAME+
    let token = scanner.getToken();
    let cnt = 0;
    while (token === TokenType.Operator) {
      this.createNode(scanner, curr, nodeType);
      token = this.scanUntilValid(scanner, curr);
      cnt++;
    }
    return cnt > 0;
  }

  private scanSingleToken(scanner: FollowScanner, curr: NodeImpl, targetTokenType: TokenType): boolean {
    let token = scanner.getToken();
    if (token !== targetTokenType) {
      return false;
    }
    this.scanUntilValid(scanner, curr);
    return true;
  }

  private scanProofInput(scanner: FollowScanner, curr: NodeImpl): boolean {
    // [-| OP+]*
    let token = scanner.getToken();
    while(token === TokenType.ProofInput) {
      const child = this.createNode(scanner, curr, NodeType.ProofInput);
      this.scanUntilValid(scanner, curr);
      if(!this.scanOperatorSequence(scanner, child, NodeType.ProofOp)) {
        child.error = ParseError.ProofInputOpMissing;
        return false;
      }
      token = scanner.getToken();
    }
    return true;
  }

  private scanProofOutput(scanner: FollowScanner, curr: NodeImpl): boolean {
    // |- OP+
    let token = scanner.getToken();
    const child = this.createNode(scanner, curr, NodeType.ProofOutput);
    this.scanUntilValid(scanner, curr);
    if(token !== TokenType.ProofOutput) {
      child.error = ParseError.ProofOutputMissing;
      return false;
    }
    if(!this.scanOperatorSequence(scanner, child, NodeType.ProofOp)){
      child.error = ParseError.ProofOutputOpMissing;
      return false;
    }
    return true;
  }

  private scanProofProcess(scanner: FollowScanner, curr: NodeImpl): boolean {
    // OP+
    const child = new NodeImpl(
      NodeType.ProofProcess,
      '',
      scanner.getTokenStartLine(),
      scanner.getTokenOffset(),
      0,
      [],
      curr,
    );
    curr.children.push(child);
    if(!this.scanOperatorSequence(scanner, child, NodeType.ProofOp)){
      child.error = ParseError.ProofProcessOpMissing;
      return false;
    }
    return true;
  }

  private parseTypeBlock(scanner: FollowScanner, curr: NodeImpl) {
    // type NAME+
    const child = this.createNode(scanner, curr, NodeType.TypeBlock);
    this.scanUntilValid(scanner, curr);
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseError.TypeBlockNameMissing;
    }
  }

  private parseConstBlock(scanner: FollowScanner, curr: NodeImpl) {
    // const TYPE NAME+
    const child = this.createNode(scanner, curr, NodeType.ConstBlock);
    this.scanUntilValid(scanner, curr);
    if (!this.scanOperator(scanner, child, NodeType.Type)) {
      child.error = ParseError.ConstBlockTypeMissing;
      return;
    }
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseError.ConstBlockNameMissing;
    }
  }

  private parseVarBlock(scanner: FollowScanner, curr: NodeImpl) {
    // var TYPE NAME+
    const child = this.createNode(scanner, curr, NodeType.VarBlock);
    this.scanUntilValid(scanner, curr);
    if (!this.scanOperator(scanner, child, NodeType.Type)) {
      child.error = ParseError.VarBlockTypeMissing;
      return;
    }
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseError.VarBlockNameMissing;
    }
  }

  private parsePropBlock(scanner: FollowScanner, curr: NodeImpl) {
    // prop TYPE NAME+ : ARG+
    const child = this.createNode(scanner, curr, NodeType.PropBlock);
    this.scanUntilValid(scanner, curr);
    if (!this.scanOperator(scanner, child, NodeType.Type)) {
      child.error = ParseError.PropBlockTypeMissing;
      return;
    }
    if (!this.scanOperatorSequence(scanner, child, NodeType.Name)) {
      child.error = ParseError.PropBlockNameMissing;
      return;
    }
    if (!this.scanSingleToken(scanner, curr, TokenType.Colon)) {
      child.error = ParseError.PropBlockArgColonMissing;
      return
    }
    child.argsStart = child.children.length;
    if (!this.scanOperatorSequence(scanner, child, NodeType.Arg)) {
      child.error = ParseError.PropBlockArgMissing;
    }
  }

  private parseAxiomBlock(scanner: FollowScanner, curr: NodeImpl) {
    // axiom NAME : ARG* : INPUT* OUTPUT
    const child = this.createNode(scanner, curr, NodeType.AxiomBlock);
    this.scanUntilValid(scanner, curr);
    if (!this.scanOperator(scanner, child, NodeType.Name)) {
      child.error = ParseError.AxiomBlockNameMissing;
      return;
    }
    if (!this.scanSingleToken(scanner, child, TokenType.Colon)) {
      child.error = ParseError.AxiomBlockArgColonMissing;
      return;
    }
    child.argsStart = child.children.length;
    this.scanOperatorSequence(scanner, child, NodeType.Arg);
    if (!this.scanSingleToken(scanner, child, TokenType.Colon)) {
      child.error = ParseError.AxiomBlockProofColonMissing;
      return;
    }
    child.proofInputStart = child.children.length;
    if(!this.scanProofInput(scanner, child)) {
      child.error = ParseError.AxiomBlockProofInputOpMissing;
      return;
    }
    child.proofOutputStart = child.children.length;
    if (!this.scanProofOutput(scanner, child)) {
      child.error = ParseError.AxiomBlockProofOutputMissing;
      return;
    }
    return;
  }

  private parseTheoremBlock(scanner: FollowScanner, curr: NodeImpl) {
    // thm NAME : ARG* : INPUT* OUTPUT : OP+
    const child = this.createNode(scanner, curr, NodeType.TheoremBlock);
    this.scanUntilValid(scanner, curr);
    if (!this.scanOperator(scanner, child, NodeType.Name)) {
      child.error = ParseError.TheoremBlockNameMissing;
      return;
    }
    if (!this.scanSingleToken(scanner, child, TokenType.Colon)) {
      child.error = ParseError.TheoremBlockArgColonMissing;
      return;
    }
    child.argsStart = child.children.length;
    this.scanOperatorSequence(scanner, child, NodeType.Arg)
    if (!this.scanSingleToken(scanner, child, TokenType.Colon)) {
      child.error = ParseError.TheoremBlockProofColonMissing;
      return;
    }
    child.proofInputStart = child.children.length;
    if (!this.scanProofInput(scanner, child)) {
      child.error = ParseError.TheoremBlockProofInputOpMissing;
      return;
    }
    child.proofOutputStart = child.children.length;
    if (!this.scanProofOutput(scanner, child)) {
      child.error = ParseError.TheoremBlockProofOutputMissing;
      return;
    }
    if (!this.scanSingleToken(scanner, child, TokenType.Colon)) {
      child.error = ParseError.TheoremBlockProofProcessColonMissing;
      return;
    }
    child.proofProcessStart = child.children.length;
    if (!this.scanProofProcess(scanner, child)) {
      child.error = ParseError.TheoremBlockProofProcessOpMissing;
      return
    }
  }
}
