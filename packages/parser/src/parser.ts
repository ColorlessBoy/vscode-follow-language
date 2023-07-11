import { createScanner } from './scanner';
import { SyntaxKind, ScanError, NodeType, Node, FollowScanner, ParseErrorCode } from './followLanguageTypes';

interface NodeImpl extends Node {
  type: NodeType;
  value?: any;
  offset: number;
  length: number;
  parent?: NodeImpl;
  children?: NodeImpl[];
}
