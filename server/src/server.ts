import {
  createConnection,
  TextDocuments,
  Diagnostic,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  SemanticTokensRegistrationOptions,
  SemanticTokensRegistrationType,
  SemanticTokensLegend,
  SemanticTokenTypes,
  SemanticTokenModifiers,
  DiagnosticSeverity,
  SemanticTokensBuilder,
  Range,
  Hover,
  TextEdit,
  TextDocumentEdit,
  WorkspaceEdit,
  Location,
} from 'vscode-languageserver/node';
import * as fs from 'fs';
import * as path from 'path';

import { Position, TextDocument } from 'vscode-languageserver-textdocument';
import {
  Error,
  CNode,
  CNodeTypes,
  TypeCNode,
  Token,
  AxiomCNode,
  TermOpCNode,
  ThmCNode,
  ProofOpCNode,
  AxiomASTNode,
  ThmASTNode,
  CONTENT_FILE,
  CompilerWithImport,
  TokenTypes,
  TermASTNode,
  getFollowErrorMsg,
  cNodeToString,
} from './parser';

const semanticTokensLegend: SemanticTokensLegend = {
  tokenTypes: [
    SemanticTokenTypes.keyword,
    SemanticTokenTypes.type,
    SemanticTokenTypes.number,
    SemanticTokenTypes.variable,
    SemanticTokenTypes.parameter,
    SemanticTokenTypes.operator,
    SemanticTokenTypes.method,
    SemanticTokenTypes.function,
    SemanticTokenTypes.comment,
    SemanticTokenTypes.string,
  ],
  tokenModifiers: [SemanticTokenModifiers.declaration],
};
const semanticTokensMap: Map<string, number> = new Map([
  [SemanticTokenTypes.keyword, 0],
  [SemanticTokenTypes.type, 1],
  [SemanticTokenTypes.number, 2],
  [SemanticTokenTypes.variable, 3],
  [SemanticTokenTypes.parameter, 4],
  [SemanticTokenTypes.operator, 5],
  [SemanticTokenTypes.method, 6],
  [SemanticTokenTypes.function, 7],
  [SemanticTokenTypes.comment, 8],
  [SemanticTokenTypes.string, 9],
]);

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;

let compilerMap: Map<string, CompilerWithImport> = new Map(); // folder - compiler

connection.onInitialize((params: InitializeParams) => {
  let capabilities = params.capabilities;

  // Does the client support the `workspace/configuration` request?
  // If not, we fall back using global settings.
  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
  hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  );

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      // Tell the client that this server supports code completion.
      completionProvider: {
        resolveProvider: false,
      },
      hoverProvider: true,
      definitionProvider: true,
      referencesProvider: { workDoneProgress: true },
      renameProvider: true,
      semanticTokensProvider: {
        documentSelector: [{ language: 'follow' }],
        legend: semanticTokensLegend,
        range: false,
        full: {
          delta: true,
        },
      },
    },
  };
  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    };
  }
  return result;
});

connection.onInitialized(async () => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  if (hasWorkspaceFolderCapability) {
  }
  const registrationOptions: SemanticTokensRegistrationOptions = {
    documentSelector: [{ language: 'follow' }],
    legend: semanticTokensLegend,
    range: false,
    full: {
      delta: true,
    },
  };
  void connection.client.register(SemanticTokensRegistrationType.type, registrationOptions);
});

async function readContentJsonFile(dir: string): Promise<string[]> {
  try {
    const file = path.join(dir, CONTENT_FILE);
    const data = fs.readFileSync(file, 'utf8');
    const jsonData = JSON.parse(data);
    // 验证 jsonData 是否包含 "content" 键，并且其值是字符串列表
    if (jsonData.hasOwnProperty('content') && Array.isArray(jsonData.content)) {
      const content: string[] = [];
      for (const item of jsonData.content) {
        if ((item as string).includes('\\') || (item as string).includes('/')) {
          // 只支持一级目录
          continue;
        }
        const absPath = path.resolve(path.join(dir, item));
        if (typeof item === 'string' && fs.existsSync(absPath)) {
          content.push(absPath);
        }
      }
      return content;
    }
  } catch (err) {}
  return [];
}
async function initContentJsonFile(folder: string) {
  const compiler = new CompilerWithImport();
  compilerMap.set(folder, compiler);
  const depFileList = await readContentJsonFile(folder);
  compiler.setImportList(depFileList);
  for (const file of depFileList) {
    try {
      const code = fs.readFileSync(file, 'utf8');
      compiler.compileCode(file, code);
    } catch (err) {}
  }
}

// The example settings
interface ExampleSettings {
  maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
let documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration((change) => {
  if (hasConfigurationCapability) {
    // Reset all cached document settings
    documentSettings.clear();
  } else {
    globalSettings = <ExampleSettings>(change.settings.languageServerExample || defaultSettings);
  }

  // Revalidate all open text documents
  documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
  if (!hasConfigurationCapability) {
    return Promise.resolve(globalSettings);
  }
  let result = documentSettings.get(resource);
  if (!result) {
    result = connection.workspace.getConfiguration({
      scopeUri: resource,
      section: 'follow',
    });
    documentSettings.set(resource, result);
  }
  return result;
}

// Only keep settings for open documents
documents.onDidClose((e) => {
  documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  const name = textDocument.uri;
  if (name.endsWith(CONTENT_FILE)) {
    reloadContentJsonFile(textDocument);
  } else {
    const { errors } = await processTextDocument(textDocument);
    const diagnostics = getDiagnostics(errors);
    const uri = textDocument.uri;
    connection.sendDiagnostics({ uri, diagnostics });
  }
}

async function reloadContentJsonFile(textDocument: TextDocument) {
  const uri = textDocument.uri.slice(7); // remove 'file://'
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);
  await initContentJsonFile(folderPath);
}

async function processTextDocument(textDocument: TextDocument) {
  // const uri = Uri.parse(textDocument.uri);
  const uri = textDocument.uri.slice(7); // remove 'file://'
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);
  let compiler = compilerMap.get(folderPath);
  if (compiler === undefined) {
    await initContentJsonFile(folderPath);
    compiler = compilerMap.get(folderPath);
  }
  if (compiler === undefined) {
    compiler = new CompilerWithImport();
    compilerMap.set(folderPath, compiler);
  }
  return compiler.compileCode(filePath, textDocument.getText());
}

function getDiagnostics(errors: Error[]): Diagnostic[] {
  return errors.map((e) => {
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Error,
      range: e.token.range,
      message: getFollowErrorMsg(e.type),
      source: 'follow',
    };
    return diagnostic;
  });
}

type HoverV2Content = { line: number; value: string };
type HoverV2 = {
  contents: HoverV2Content[];
};
// onHoverV2
connection.onRequest('textDocument/hoverV2', (event: TextDocumentPositionParams) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    return null;
  }
  // const uri = Uri.parse(textDocument.uri);
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);

  const position = event.position;
  const cNodeList = compilerMap.get(folderPath)?.cNodeListMap.get(filePath) || [];
  const cNode = findCNodeByPostion(cNodeList, position);
  if (cNode) {
    if (cNode.cnodetype === CNodeTypes.AXIOM || cNode.cnodetype === CNodeTypes.THM) {
      const contents = findOpCNodePositionV2(cNode as AxiomCNode | ThmCNode, position);
      if (contents.length === 0) {
        return null;
      }
      const hover: HoverV2 = {
        contents: contents,
      };
      return hover;
    }
  }
  return null;
});

// follow block list
connection.onRequest('follow/followBlockList', () => {
  const result2 = [];
  for (const [folderPath, compiler] of compilerMap.entries()) {
    const result = [];
    const deps = compiler.depFileList;

    for (const file of deps) {
      const cNodeList = compiler.cNodeListMap.get(file) || [];
      const blocks = cNodeList
        .filter((cNode) => cNode.cnodetype === CNodeTypes.AXIOM || cNode.cnodetype === CNodeTypes.THM)
        .map((cNode) => {
          const cNode2 = cNode as AxiomCNode | ThmCNode;
          return {
            type: cNode2.astNode.keyword.content,
            name: cNode2.astNode.name.content,
            isValid: cNode.cnodetype === CNodeTypes.AXIOM ? true : (cNode as ThmCNode).isValid,
            content: cNodeToString(cNode),
          };
        });
      result.push({
        file: path.basename(file),
        blocks,
      });
    }
    result2.push({
      folder: folderPath.split(path.sep).at(-1),
      result,
    });
  }
  console.log('follow/followBlockList', result2);
  return result2;
});

connection.onHover((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    return null;
  }
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);

  const position = event.position;
  const cNodeList = compilerMap.get(folderPath)?.cNodeListMap.get(filePath) || [];
  const cNode = findCNodeByPostion(cNodeList, position);
  if (cNode) {
    if (cNode.cnodetype === CNodeTypes.AXIOM || cNode.cnodetype === CNodeTypes.THM) {
      const content = findOpCNodePosition(cNode as AxiomCNode | ThmCNode, position);
      const hover: Hover = {
        contents: {
          kind: 'markdown',
          value: content,
        },
      };
      return hover;
    }
  }
  return null;
});
function findOpCNodePosition(cNode: AxiomCNode | ThmCNode, position: Position): string {
  if (positionInRange(cNode.astNode.name.range, position)) {
    const assumeStr = cNode.assumptions.map((a) => '-| ' + a.termContent).join('\n');
    const targetStr = cNode.targets.map((t) => '|- ' + t.termContent).join('\n');
    return [targetStr, assumeStr].join('\n');
  }
  for (const target of cNode.targets) {
    if (positionInRange(target.range, position)) {
      return findTermOpCNodeByPosition(target, position);
    }
  }
  for (const assumption of cNode.assumptions) {
    if (positionInRange(assumption.range, position)) {
      return findTermOpCNodeByPosition(assumption, position);
    }
  }
  if ('proofs' in cNode) {
    const proofs = (cNode as ThmCNode).proofs;
    const process = (cNode as ThmCNode).proofProcess;
    for (let i = 0; i < proofs.length; i++) {
      const proof = proofs[i];
      if (positionInRange(proof.range, position)) {
        return findProofByPosition(proof, process[i], position);
      }
    }
  }
  return '';
}
function findOpCNodePositionV2(cNode: AxiomCNode | ThmCNode, position: Position): HoverV2Content[] {
  const rst = [
    ...cNode.targets.map((t) => {
      return {
        line: t.range.start.line,
        value: t.termContent,
      };
    }),
    ...cNode.assumptions.map((t) => {
      return {
        line: t.range.start.line,
        value: t.termContent,
      };
    }),
  ];
  // 寻找前一个proof操作，用于hoverV2
  if (cNode.cnodetype === CNodeTypes.THM) {
    const proofs = (cNode as ThmCNode).proofs;
    const processes = (cNode as ThmCNode).proofProcess;
    if (proofs.length > 0) {
      let i = 0;
      if (proofs[0].range.start.line <= position.line) {
        for (; i < proofs.length; i++) {
          if (proofs[i].range.start.line >= position.line) {
            break;
          }
        }
      }
      rst.push(
        ...processes.slice(0, i).map((process, index) => {
          return {
            line: proofs[index].range.start.line,
            value: process.map((t) => t.termContent).join(';') || 'Success!',
          };
        }),
      );
    }
  }
  return rst;
}

function findProofByPosition(proof: ProofOpCNode, state: TermOpCNode[], position: Position): string {
  if (positionInRange(proof.root.range, position)) {
    const diffStr = proof.diffError && proof.diffError.length > 0 ? 'diff ' + proof.diffError.join(' ') : undefined;
    const assumeStr = proof.assumptions.map((a) => '-| ' + a.termContent).join('\n\n');
    const targetStr = proof.targets.map((t) => '|- ' + t.termContent).join('\n\n');
    const stateStr = state.map((e) => '? ' + e.termContent).join('\n\n');
    if (diffStr) {
      return [targetStr, assumeStr, diffStr, '---', stateStr].join('\n\n  ');
    }
    return [targetStr, assumeStr, '---', stateStr].join('\n\n  ');
  }
  for (const child of proof.children) {
    if (positionInRange(child.range, position)) {
      return findTermOpCNodeByPosition(child, position);
    }
  }
  return '';
}
function findTermOpCNodeByPosition(termCNode: TermOpCNode, position: Position): string {
  if (positionInRange(termCNode.root.range, position)) {
    return termCNode.termContent;
  }
  for (const child of termCNode.children) {
    if (positionInRange(child.range, position)) {
      return findTermOpCNodeByPosition(child, position);
    }
  }
  return '';
}
function findCNodeByPostion(cNodeList: CNode[], position: Position): CNode | undefined {
  let left = 0;
  let right = cNodeList.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midCNode = cNodeList[mid];
    const range = midCNode.astNode.range;
    if (positionInRange(range, position)) {
      return midCNode;
    } else if (
      range.end.line < position.line ||
      (range.end.line === position.line && range.end.character <= position.character)
    ) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}
function positionInRange(range: Range, position: Position): Boolean {
  if (
    (range.start.line < position.line ||
      (range.start.line === position.line && range.start.character <= position.character)) &&
    (range.end.line > position.line || (range.end.line === position.line && range.end.character > position.character))
  ) {
    return true;
  }
  return false;
}

connection.onDefinition((params) => {
  const { textDocument, position } = params;
  const document = documents.get(textDocument.uri);
  if (textDocument === undefined || document === undefined) {
    return null;
  }
  // const uri = Uri.parse(textDocument.uri);
  // file://
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);

  const compiler = compilerMap.get(folderPath);
  if (compiler === undefined) {
    return null;
  }
  const tokenList = compiler.tokenListMap.get(filePath) || [];
  const targetToken = findTokenByPostiion(tokenList, position);
  if (targetToken === undefined) {
    return null;
  }

  for (const [filePath, cNodeMap] of compiler.cNodeMapMap) {
    const uri = 'file://' + filePath;
    const document = documents.get(textDocument.uri);
    if (document === undefined) {
      continue;
    }
    const cNode = cNodeMap.get(targetToken.content);
    if (cNode) {
      const locations: Location[] = [];
      switch (cNode.cnodetype) {
        case CNodeTypes.TYPE:
          locations.push(Location.create(uri, (cNode as TypeCNode).type.range));
          break;
        case CNodeTypes.TERM:
          locations.push(Location.create(uri, (cNode.astNode as TermASTNode).name.range));
          break;
        case CNodeTypes.AXIOM:
          locations.push(Location.create(uri, (cNode.astNode as AxiomASTNode).name.range));
          break;
        case CNodeTypes.THM:
          locations.push(Location.create(uri, (cNode.astNode as ThmASTNode).name.range));
          break;
      }
      return locations;
    }
  }
  return null;
});

connection.onReferences((params) => {
  const { textDocument, position } = params;
  const document = documents.get(textDocument.uri);
  if (textDocument === undefined || document === undefined) {
    return null;
  }
  // const uri = Uri.parse(textDocument.uri);
  // file://
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);

  const compiler = compilerMap.get(folderPath);
  if (compiler === undefined) {
    return null;
  }
  const tokenList = compiler.tokenListMap.get(filePath) || [];
  const targetToken = findTokenByPostiion(tokenList, position);
  if (targetToken === undefined) {
    return null;
  }
  if (targetToken.type === TokenTypes.ARGNAME) {
    // 函数内部的变量替换
    const cNodeList = compilerMap.get(folderPath)?.cNodeListMap.get(filePath) || [];
    const cNode = findCNodeByPostion(cNodeList, position);
    if (cNode) {
      const tokens = getTokensFromRange(tokenList, cNode.astNode.range);
      const locations: Location[] = [];
      tokens.forEach((token) => {
        if (token.content === targetToken.content) {
          locations.push({
            uri: uri,
            range: token.range,
          });
        }
      });
      if (locations.length === 0) {
        return null;
      }
      return locations;
    }
  }
  // 非函数内部替换
  const locations: Location[] = [];
  compiler.tokenListMap.forEach((tokens, filePath) => {
    const uri = 'file://' + filePath;
    const document = documents.get(textDocument.uri);
    if (document === undefined) {
      return;
    }
    tokens.forEach((token) => {
      if (token.content === targetToken.content) {
        locations.push({
          uri: uri,
          range: token.range,
        });
      }
    });
  });
  return locations;
});

connection.onRenameRequest((params) => {
  const { textDocument, position, newName } = params;
  const document = documents.get(textDocument.uri);
  if (textDocument === undefined || document === undefined) {
    return null;
  }
  // const uri = Uri.parse(textDocument.uri);
  // file://
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);

  const compiler = compilerMap.get(folderPath);
  if (compiler === undefined) {
    return null;
  }
  const tokenList = compiler.tokenListMap.get(filePath) || [];
  const targetToken = findTokenByPostiion(tokenList, position);
  if (targetToken === undefined) {
    return null;
  }
  if (targetToken.type === TokenTypes.ARGNAME) {
    // 函数内部的变量替换
    const cNodeList = compilerMap.get(folderPath)?.cNodeListMap.get(filePath) || [];
    const cNode = findCNodeByPostion(cNodeList, position);
    if (cNode) {
      const tokens = getTokensFromRange(tokenList, cNode.astNode.range);
      const edits: TextEdit[] = [];
      tokens.forEach((token) => {
        if (token.content === targetToken.content) {
          edits.push(TextEdit.replace(token.range, newName));
        }
      });
      if (edits.length === 0) {
        return null;
      }
      const textDocumentEdit: TextDocumentEdit = {
        textDocument: { uri: textDocument.uri, version: document.version },
        edits: edits,
      };
      const workspaceEdit: WorkspaceEdit = {
        documentChanges: [textDocumentEdit],
      };
      return workspaceEdit;
    }
  }
  // 非函数内部替换
  const workspaceEdit: WorkspaceEdit = {
    documentChanges: [],
  };
  compiler.tokenListMap.forEach((tokens, filePath) => {
    const uri = 'file://' + filePath;
    const document = documents.get(textDocument.uri);
    if (document === undefined) {
      return;
    }
    const edits: TextEdit[] = [];
    tokens.forEach((token) => {
      if (token.content === targetToken.content) {
        edits.push(TextEdit.replace(token.range, newName));
      }
    });
    if (edits.length === 0) {
      return;
    }
    const textDocumentEdit: TextDocumentEdit = {
      textDocument: { uri: uri, version: document.version },
      edits: edits,
    };
    workspaceEdit.documentChanges?.push(textDocumentEdit);
  });
  return workspaceEdit;
});

function getTokensFromRange(tokenList: Token[], range: Range): Token[] {
  const leftFirst = findLeftFirstIndex(tokenList, range.start);
  const rightLast = findRightLastIndex(tokenList, range.end);
  if (leftFirst < rightLast) {
    return tokenList.slice(leftFirst, rightLast);
  }
  return [];
}

function findLeftFirstIndex(tokenList: Token[], position: Position) {
  let left = 0;
  let right = tokenList.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midToken = tokenList[mid];
    const range = midToken.range;
    if (positionInRange(range, position)) {
      right = mid - 1;
    } else if (
      range.end.line < position.line ||
      (range.end.line === position.line && range.end.character <= position.character)
    ) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
function findRightLastIndex(tokenList: Token[], position: Position) {
  let left = 0;
  let right = tokenList.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midToken = tokenList[mid];
    const range = midToken.range;
    if (positionInRange(range, position)) {
      right = mid - 1;
    } else if (
      range.end.line < position.line ||
      (range.end.line === position.line && range.end.character <= position.character)
    ) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}

function findTokenByPostiion(tokenList: Token[], position: Position) {
  let left = 0;
  let right = tokenList.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midToken = tokenList[mid];
    const range = midToken.range;
    if (positionInRange(range, position)) {
      return midToken;
    } else if (
      range.end.line < position.line ||
      (range.end.line === position.line && range.end.character <= position.character)
    ) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}

connection.languages.semanticTokens.on(async (event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    const builder = new SemanticTokensBuilder();
    return builder.build();
  }
  // const uri = Uri.parse(textDocument.uri);
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);
  const compiler = compilerMap.get(folderPath);
  let tokenList = compiler?.tokenListMap.get(filePath);

  if (tokenList === undefined) {
    const { tokens } = await processTextDocument(textDocument);
    tokenList = tokens;
  }

  const semanticTokens = buildSemanticToken(tokenList);
  return semanticTokens;
});

connection.languages.semanticTokens.onDelta(async (event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    const builder = new SemanticTokensBuilder();
    return builder.build();
  }
  // const uri = Uri.parse(textDocument.uri);
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);
  const compiler = compilerMap.get(folderPath);
  let tokenList = compiler?.tokenListMap.get(filePath);

  if (tokenList === undefined) {
    const { tokens } = await processTextDocument(textDocument);
    tokenList = tokens;
  }

  const semanticTokens = buildSemanticTokenDelta(tokenList, event.previousResultId);
  return semanticTokens;
});

function buildSemanticToken(tokens: Token[]) {
  const builder = new SemanticTokensBuilder();
  for (const token of tokens) {
    switch (token.type) {
      case TokenTypes.KEY:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.keyword) || 0,
          0,
        );
        break;
      case TokenTypes.TYPENAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.type) || 0,
          0,
        );
        break;
      case TokenTypes.ARGNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.parameter) || 0,
          0,
        );
        break;
      case TokenTypes.TERMNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.method) || 0,
          0,
        );
        break;
      case TokenTypes.CONSTNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.number) || 0,
          0,
        );
        break;
      case TokenTypes.AXIOMNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.function) || 0,
          0,
        );
        break;
      case TokenTypes.THMNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.function) || 0,
          0,
        );
        break;
    }
  }
  return builder.build();
}

function buildSemanticTokenDelta(tokens: Token[], previousResultId: string) {
  const builder = new SemanticTokensBuilder();
  builder.previousResult(previousResultId);
  for (const token of tokens) {
    switch (token.type) {
      case TokenTypes.KEY:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.keyword) || 0,
          0,
        );
        break;
      case TokenTypes.TYPENAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.type) || 0,
          0,
        );
        break;
      case TokenTypes.ARGNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.parameter) || 0,
          0,
        );
        break;
      case TokenTypes.TERMNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.method) || 0,
          0,
        );
        break;
      case TokenTypes.CONSTNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.number) || 0,
          0,
        );
        break;
      case TokenTypes.AXIOMNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.function) || 0,
          0,
        );
        break;
      case TokenTypes.THMNAME:
        builder.push(
          token.range.start.line,
          token.range.start.character,
          token.content.length,
          semanticTokensMap.get(SemanticTokenTypes.function) || 0,
          0,
        );
        break;
    }
  }
  return builder.buildEdits();
}

connection.onDidChangeWatchedFiles((_change) => {
  // Monitored files have change in VS Code
  connection.console.log('We received a file change event');
});

// This handler provides the initial list of the completion items.
connection.onCompletion(async (_textDocumentPosition: TextDocumentPositionParams): Promise<CompletionItem[]> => {
  // The pass parameter contains the position of the text document in
  // which code complete got requested. For the example we ignore this
  // info and always provide the same completion items.
  const textDocument = documents.get(_textDocumentPosition.textDocument.uri);
  if (textDocument === undefined) {
    return [];
  }
  // const uri = Uri.parse(textDocument.uri);
  const uri = textDocument.uri.slice(7);
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);
  const compiler = compilerMap.get(folderPath);
  let cNodeList = compiler?.cNodeListMap.get(filePath);

  if (cNodeList === undefined) {
    const { cNodes } = await processTextDocument(textDocument);
    cNodeList = cNodes;
  }

  const position = _textDocumentPosition.position;
  const cNode = findCNodeByPostion(cNodeList, position);
  const items: CompletionItem[] = [];
  if (cNode && cNode.cnodetype === CNodeTypes.THM) {
    const proofs = (cNode as ThmCNode).proofs;
    if (proofs.length === 0) {
      return [];
    }
    const cNodeSuggestions = (cNode as ThmCNode).cNodeSuggestions;
    if (cNodeSuggestions && cNodeSuggestions.length > 0) {
      items.push(
        ...cNodeSuggestions.map((s) => ({
          label: s.newText,
          kind: CompletionItemKind.Function,
          documentation: s.doc,
          textEdit: { range: s.range, newText: s.newText },
        })),
      );
    }
    const suggestions = (cNode as ThmCNode).suggestionProof;
    for (let i = 0; i < proofs.length; i++) {
      const proof = proofs[i];
      const suggestion = suggestions[i];
      if (suggestion.length > 0 && proof.range.start.line === position.line) {
        for (const suggestProof of suggestion) {
          const { newText, doc } = proofRelacementForSuggestion(proof, suggestProof);
          items.push({
            label: newText,
            kind: CompletionItemKind.Function,
            documentation: doc,
            textEdit: { range: proof.range, newText: newText },
            additionalTextEdits: suggestProof.virtualEdit,
          });
        }
        return items;
      }
    }
  }
  return items;
});

function proofRelacementForSuggestion(proof: ProofOpCNode, suggestProof: ProofOpCNode) {
  let rst = proof.root.content + '(' + suggestProof.children.map((child) => child.funContent).join(', ') + ')';
  let rstDocArray = [
    proof.root.content + '(' + suggestProof.children.map((child) => child.termContent).join(', ') + ') {',
    ...suggestProof.targets.map((target) => '|- ' + target.termContent),
    ...suggestProof.assumptions.map((assume) => '-| ' + assume.termContent),
  ];

  if (suggestProof.diffError && suggestProof.diffError.length > 0) {
    rstDocArray.push('diff ' + suggestProof.diffError.map((diff) => '(' + diff + ')').join(' '));
  }
  rstDocArray.push('}');
  if (suggestProof.virtualEdit) {
    rstDocArray.push(
      ...suggestProof.virtualEdit.map((v) => {
        return `${v.oldText} : ${v.newTermText}`;
      }),
    );
  }
  return { newText: rst, doc: rstDocArray.join('\n') };
}

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  if (item.data === 0) {
    item.detail = 'TypeScript details';
    item.documentation = 'TypeScript documentation';
  }
  return item;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
