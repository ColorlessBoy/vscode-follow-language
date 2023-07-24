import * as assert from 'assert';
import { FollowParser } from '../parser';
import { NodeType, Node } from '../followLanguageTypes';

suite('Follow Parser', () => {
  interface TestNode {
    type: NodeType,
    value: string,
    line: number,
    offset: number,
    length: number,
    children: Node[],
    comments?: Node[]
  }
  function toTestNode(node: Node) : TestNode {
    if(node.comments) {
      return {
        type: node.type,
        value: node.value,
        line: node.line,
        offset: node.offset,
        length: node.length,
        children: node.children.map(toTestNode),
        comments: node.comments.map(toTestNode)
      }
    }
    return {
      type: node.type,
      value: node.value,
      line: node.line,
      offset: node.offset,
      length: node.length,
      children: node.children.map(toTestNode)
    }
  }
  function assertDocument(input: string, expected: any) {
    const parser = new FollowParser();
    const document = parser.parse(input);
    const result = document.roots.map(toTestNode);
    assert.deepEqual(result, expected);
  }
  test('TypeBlock', () => {
    assertDocument(
      'type wff',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.TypeBlock, value:'type', line:0, offset:0, length:4, children:[
              {type:NodeType.Name, value:'wff', line:0, offset:5, length:3, children:[]}
            ]},
          ]
        }
      ]
    );
  });
  test('ConstBlock', () => {
    assertDocument(
      'const wff true false',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.ConstBlock, value:'const', line:0, offset:0, length:5, children:[
              {type:NodeType.Type, value:'wff', line:0, offset:6, length:3, children:[]},
              {type:NodeType.Name, value:'true', line:0, offset:10, length:4, children:[]},
              {type:NodeType.Name, value:'false', line:0, offset:15, length:5, children:[]},
            ]},
          ]
        }
      ]
    );
  });
  test('VarBlock', () => {
    assertDocument(
      'var wff w0 w1 w2',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.VarBlock, value:'var', line:0, offset:0, length:3, children:[
              {type:NodeType.Type, value:'wff', line:0, offset:4, length:3, children:[]},
              {type:NodeType.Name, value:'w0', line:0, offset:8, length:2, children:[]},
              {type:NodeType.Name, value:'w1', line:0, offset:11, length:2, children:[]},
              {type:NodeType.Name, value:'w2', line:0, offset:14, length:2, children:[]},
            ]},
          ]
        }
      ]
    );
  });
  test('PropBlock', () => {
    assertDocument(
      'prop wff imp and or iif: w0 w1',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.PropBlock, value:'prop', line:0, offset:0, length:4, children:[
              {type:NodeType.Type, value:'wff', line:0, offset:5, length:3, children:[]},
              {type:NodeType.Name, value:'imp', line:0, offset:9, length:3, children:[]},
              {type:NodeType.Name, value:'and', line:0, offset:13, length:3, children:[]},
              {type:NodeType.Name, value:'or', line:0, offset:17, length:2, children:[]},
              {type:NodeType.Name, value:'iif', line:0, offset:20, length:3, children:[]},
              {type:NodeType.Arg, value:'w0', line:0, offset:25, length:2, children:[]},
              {type:NodeType.Arg, value:'w1', line:0, offset:28, length:2, children:[]}
            ]},
          ]
        }
      ]
    );
  });
  test('AxiomBlock', () => {
    assertDocument(
      'axiom ax-1 : w0 w1 : -| w0 |- imp w1 w0',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.AxiomBlock, value:'axiom', line:0, offset:0, length:5, children:[
              {type:NodeType.Name, value:'ax-1', line:0, offset:6, length:4, children:[]},
              {type:NodeType.Arg, value:'w0', line:0, offset:13, length:2, children:[]},
              {type:NodeType.Arg, value:'w1', line:0, offset:16, length:2, children:[]},
              {type:NodeType.ProofInput, value:'-|', line:0, offset:21, length:2, children:[
                {type:NodeType.ProofOp, value:'w0', line:0, offset:24, length:2, children:[]}
              ]},
              {type:NodeType.ProofOutput, value:'|-', line:0, offset:27, length:2, children:[
                {type:NodeType.ProofOp, value:'imp', line:0, offset:30, length:3, children:[]},
                {type:NodeType.ProofOp, value:'w1', line:0, offset:34, length:2, children:[]},
                {type:NodeType.ProofOp, value:'w0', line:0, offset:37, length:2, children:[]}
              ]}
            ]},
          ]
        }
      ]
    );
  });
  test('TheoremBlock', () => {
    assertDocument(
      'thm thm-1  : w0 w1 : -| w0 |- imp w1 w0 : ax-1',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.TheoremBlock, value:'thm', line:0, offset:0, length:3, children:[
              {type:NodeType.Name, value:'thm-1', line:0, offset:4, length:5, children:[]},
              {type:NodeType.Arg, value:'w0', line:0, offset:13, length:2, children:[]},
              {type:NodeType.Arg, value:'w1', line:0, offset:16, length:2, children:[]},
              {type:NodeType.ProofInput, value:'-|', line:0, offset:21, length:2, children:[
                {type:NodeType.ProofOp, value:'w0', line:0, offset:24, length:2, children:[]}
              ]},
              {type:NodeType.ProofOutput, value:'|-', line:0, offset:27, length:2, children:[
                {type:NodeType.ProofOp, value:'imp', line:0, offset:30, length:3, children:[]},
                {type:NodeType.ProofOp, value:'w1', line:0, offset:34, length:2, children:[]},
                {type:NodeType.ProofOp, value:'w0', line:0, offset:37, length:2, children:[]}
              ]},
              {type:NodeType.ProofProcess, value:'', line:0, offset:42, length:0, children:[
                {type:NodeType.ProofOp, value:'ax-1', line:0, offset:42, length:4, children:[]}
              ]}
            ]},
          ]
        }
      ]
    );
  });
  test('CommentBlock', () => {
    assertDocument(
      '//This is a root comment.\nthm thm-1  : w0 w1 : -| w0 |- imp w1 w0 : ax-1\n//This is a proof process comment.',
      [
        {
          type:NodeType.Root, value:'', line:0, offset:0, length:0,
          children: [
            {type:NodeType.TheoremBlock, value:'thm', line:1, offset:26, length:3, children:[
              {type:NodeType.Name, value:'thm-1', line:1, offset:30, length:5, children:[]},
              {type:NodeType.Arg, value:'w0', line:1, offset:39, length:2, children:[]},
              {type:NodeType.Arg, value:'w1', line:1, offset:42, length:2, children:[]},
              {type:NodeType.ProofInput, value:'-|', line:1, offset:47, length:2, children:[
                {type:NodeType.ProofOp, value:'w0', line:1, offset:50, length:2, children:[]}
              ]},
              {type:NodeType.ProofOutput, value:'|-', line:1, offset:53, length:2, children:[
                {type:NodeType.ProofOp, value:'imp', line:1, offset:56, length:3, children:[]},
                {type:NodeType.ProofOp, value:'w1', line:1, offset:60, length:2, children:[]},
                {type:NodeType.ProofOp, value:'w0', line:1, offset:63, length:2, children:[]}
              ]},
              {type:NodeType.ProofProcess, value:'', line:1, offset:68, length:0, children:[
                {type:NodeType.ProofOp, value:'ax-1', line:1, offset:68, length:4, children:[]}
              ],comments:[
                {type:NodeType.LineComment, value:'//This is a proof process comment.', line:2, offset:73, length:34, children:[]}
              ]}
            ]},
          ],
          comments: [
            {type:NodeType.LineComment, value:'//This is a root comment.', line:0, offset:0, length:25, children:[]}
          ],
        }
      ]
    );
  });
});
