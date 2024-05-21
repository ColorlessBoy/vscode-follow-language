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
} from 'vscode-languageserver/node';
import * as fs from 'fs';
import * as path from 'path';

import { Position, TextDocument } from 'vscode-languageserver-textdocument';
import {
  Scanner,
  Parser,
  Error,
  ErrorTypes,
  CNode,
  CNodeTypes,
  TypeCNode,
  TermCNode,
  Token,
  AxiomCNode,
  TermOpCNode,
  ThmCNode,
  ProofOpCNode,
  AxiomASTNode,
  ThmASTNode,
  CONTENT_FILE,
  CompilerWithImport,
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
async function initContentJsonFile(uri: string) {
  const folder = uri.slice(7); // remove 'file://'
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
  const { parser, compiler } = await processTextDocument(textDocument);
  const diagnostics = [...getDiagnostics(parser.errors), ...getDiagnostics(compiler.errors)];
  const uri = textDocument.uri;
  connection.sendDiagnostics({ uri, diagnostics });
}

async function processTextDocument(textDocument: TextDocument) {
  // const uri = Uri.parse(textDocument.uri);
  const uri = textDocument.uri.slice(7); // remove 'file://'
  const filePath: string = path.resolve(uri);
  const folderPath: string = path.dirname(filePath);
  let compiler = compilerMap.get(folderPath);
  if (compiler === undefined) {
    await initContentJsonFile('file://' + folderPath);
    compiler = compilerMap.get(folderPath);
  }
  if (compiler === undefined) {
    compiler = new CompilerWithImport();
    compilerMap.set(folderPath, compiler);
  }
  const scanner = new Scanner();
  const parser = new Parser();

  const tokens = scanner.scan(textDocument.getText());
  const astNodes = parser.parse(tokens);
  compiler.compile(filePath, astNodes);
  return { scanner, parser, compiler };
}

function getDiagnostics(errors: Error[]): Diagnostic[] {
  return errors.map((e) => {
    const diagnostic: Diagnostic = {
      severity: DiagnosticSeverity.Error,
      range: e.token.range,
      message: getErrorMsg(e.type),
      source: 'follow',
    };
    return diagnostic;
  });
}
function getErrorMsg(errorType: ErrorTypes): string {
  switch (errorType) {
    case ErrorTypes.TypeMissing:
      return 'TypeMissing';
    case ErrorTypes.NameMissing:
      return 'NameMissing';
    case ErrorTypes.LeftParenMissing:
      return 'LeftParenMissing';
    case ErrorTypes.RightParenMissing:
      return 'RightParenMissing';
    case ErrorTypes.ParamTypeMissing:
      return 'ParamTypeMissing';
    case ErrorTypes.ParamNameMissing:
      return 'ParamNameMissing';
    case ErrorTypes.ParamCommaMissing:
      return 'ParamCommaMissing';
    case ErrorTypes.LeftBraceMissing:
      return 'LeftBraceMissing';
    case ErrorTypes.RightBraceMissing:
      return 'RightBraceMissing';
    case ErrorTypes.BodyKeywordMissing:
      return 'BodyKeywordMissing';
    case ErrorTypes.OpAstRootMissing:
      return 'OpAstRootMissing';
    case ErrorTypes.EmptyBodyStmt:
      return 'EmptyBodyStmt';
    case ErrorTypes.DupDiff:
      return 'DupDiff';
    case ErrorTypes.DiffNotWord:
      return 'DiffNotWord';
    case ErrorTypes.TargetMissing:
      return 'TargetMissing';
    case ErrorTypes.ProofEqMissing:
      return 'ProofEqMissing';
    case ErrorTypes.DupDefType:
      return 'DupDefType';
    case ErrorTypes.TypeDefMissing:
      return 'TypeDefMissing';
    case ErrorTypes.NotType:
      return 'NotType';
    case ErrorTypes.DupName:
      return 'DupName';
    case ErrorTypes.DupArgName:
      return 'DupArgName';
    case ErrorTypes.DiffIsKeyword:
      return 'DiffIsKeyword';
    case ErrorTypes.DiffIsNotArg:
      return 'DiffIsNotArg';
    case ErrorTypes.TermDefMissing:
      return 'TermDefMissing';
    case ErrorTypes.TooManyArg:
      return 'TooManyArg';
    case ErrorTypes.TooLessArg:
      return 'TooLessArg';
    case ErrorTypes.ArgTypeError:
      return 'ArgTypeError';
    case ErrorTypes.AxiomThmDefMissing:
      return 'AxiomThmDefMissing';
    case ErrorTypes.ProofDiffError:
      return 'ProofDiffError';
    case ErrorTypes.ProofOpUseless:
      return 'ProofOpUseless';
    case ErrorTypes.ThmWithoutValidProof:
      return 'ThmWithoutValidProof';
  }
  return '';
}

connection.onHover((event) => {
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
      const content = findOpCNodePosition(cNode as AxiomCNode | ThmCNode, position);
      const hover: Hover = {
        contents: content,
      };
      return hover;
    }
  }
  return null;
});
function findOpCNodePosition(cNode: AxiomCNode | ThmCNode, position: Position): string {
  if (positionInRange(cNode.astNode.name.range, position)) {
    const assumeStr = cNode.assumptions.map((a) => '-| ' + a.termContent).join('\n\n');
    const targetStr = cNode.targets.map((t) => '|- ' + t.termContent).join('\n\n');
    return [assumeStr, targetStr].join('\n\n  ');
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
function findProofByPosition(proof: ProofOpCNode, state: TermOpCNode[], position: Position): string {
  if (positionInRange(proof.root.range, position)) {
    const assumeStr = proof.assumptions.map((a) => '-| ' + a.termContent).join('\n\n');
    const targetStr = proof.targets.map((t) => '|- ' + t.termContent).join('\n\n');
    const stateStr = state.map((e) => '|* ' + e.termContent).join('\n\n');
    return [assumeStr, targetStr, '---', stateStr].join('\n\n  ');
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

connection.onDefinition((event) => {
  return null;
});

connection.onReferences((event) => {
  return null;
});

connection.onRenameRequest((event) => {
  return null;
});

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
  let cNodeList = compiler?.cNodeListMap.get(filePath);

  if (cNodeList === undefined) {
    const { compiler } = await processTextDocument(textDocument);
    cNodeList = compiler.cNodeListMap.get(filePath) || [];
  }

  const semanticTokens = buildSemanticToken(cNodeList);
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
  let cNodeList = compiler?.cNodeListMap.get(filePath);

  if (cNodeList === undefined) {
    const { compiler } = await processTextDocument(textDocument);
    cNodeList = compiler.cNodeListMap.get(filePath) || [];
  }

  const semanticTokens = buildSemanticTokenDelta(cNodeList, event.previousResultId);
  return semanticTokens;
});

function buildSemanticToken(cNodeList: CNode[]) {
  const builder = new SemanticTokensBuilder();
  for (const cNode of cNodeList) {
    switch (cNode.cnodetype) {
      case CNodeTypes.TYPE:
        buildSemanticTokenOfTypeBlock(builder, cNode as TypeCNode);
        break;
      case CNodeTypes.TERM:
        buildSemanticTokenOfTerm(builder, cNode as TermCNode);
        break;
      case CNodeTypes.AXIOM:
        buildSemanticTokenOfAxiom(builder, cNode as AxiomCNode);
        break;
      case CNodeTypes.THM:
        buildSemanticTokenOfThm(builder, cNode as ThmCNode);
        break;
    }
  }
  return builder.build();
}

function buildSemanticTokenDelta(cNodeList: CNode[], previousResultId: string) {
  const builder = new SemanticTokensBuilder();
  builder.previousResult(previousResultId);
  for (const cNode of cNodeList) {
    switch (cNode.cnodetype) {
      case CNodeTypes.TYPE:
        buildSemanticTokenOfTypeBlock(builder, cNode as TypeCNode);
        break;
      case CNodeTypes.TERM:
        buildSemanticTokenOfTerm(builder, cNode as TermCNode);
        break;
      case CNodeTypes.AXIOM:
        buildSemanticTokenOfAxiom(builder, cNode as AxiomCNode);
        break;
      case CNodeTypes.THM:
        buildSemanticTokenOfThm(builder, cNode as ThmCNode);
        break;
    }
  }
  return builder.buildEdits();
}
function buildSemanticTokenOfKeyword(builder: SemanticTokensBuilder, keyword: Token) {
  const keywordType = semanticTokensMap.get(SemanticTokenTypes.keyword) || 0;
  builder.push(keyword.range.start.line, keyword.range.start.character, keyword.content.length, keywordType, 0);
}
function buildSemanticTokenOfType(builder: SemanticTokensBuilder, type: Token) {
  const typeType = semanticTokensMap.get(SemanticTokenTypes.type) || 0;
  builder.push(type.range.start.line, type.range.start.character, type.content.length, typeType, 0);
}
function buildSemanticTokenOfArgName(builder: SemanticTokensBuilder, name: Token) {
  const nameType = semanticTokensMap.get(SemanticTokenTypes.parameter) || 0;
  builder.push(name.range.start.line, name.range.start.character, name.content.length, nameType, 0);
}
function buildSemanticTokenOfTypeBlock(builder: SemanticTokensBuilder, cNode: TypeCNode) {
  buildSemanticTokenOfKeyword(builder, cNode.astNode.keyword);
  buildSemanticTokenOfType(builder, cNode.type);
}
function buildSemanticTokenOfTerm(builder: SemanticTokensBuilder, cNode: TermCNode) {
  buildSemanticTokenOfKeyword(builder, cNode.astNode.keyword);
  buildSemanticTokenOfType(builder, cNode.astNode.type);
  const name = cNode.astNode.name;
  const nameType = semanticTokensMap.get(SemanticTokenTypes.method) || 0;
  builder.push(name.range.start.line, name.range.start.character, name.content.length, nameType, 0);

  for (const pair of cNode.astNode.params) {
    buildSemanticTokenOfType(builder, pair.type);
    buildSemanticTokenOfArgName(builder, pair.name);
  }
  const paramSet: Set<string> = new Set(cNode.astNode.params.map((p) => p.name.content));
  for (const word of cNode.astNode.content) {
    if (paramSet.has(word.content)) {
      buildSemanticTokenOfArgName(builder, word);
    }
  }
}
function buildSemanticOpCNode(builder: SemanticTokensBuilder, cNode: TermOpCNode, paramSet: Set<string>) {
  if (paramSet.has(cNode.root.content)) {
    buildSemanticTokenOfArgName(builder, cNode.root);
  } else {
    const nameType = semanticTokensMap.get(SemanticTokenTypes.method) || 0;
    builder.push(cNode.root.range.start.line, cNode.root.range.start.character, cNode.root.content.length, nameType, 0);
    for (const child of cNode.children) {
      buildSemanticOpCNode(builder, child, paramSet);
    }
  }
}
function buildSemanticTokenOfAxiom(builder: SemanticTokensBuilder, cNode: AxiomCNode) {
  buildSemanticTokenOfKeyword(builder, cNode.astNode.keyword);
  const name = cNode.astNode.name;
  const nameType = semanticTokensMap.get(SemanticTokenTypes.function) || 0;
  builder.push(name.range.start.line, name.range.start.character, name.content.length, nameType, 0);

  for (const pair of cNode.astNode.params) {
    buildSemanticTokenOfType(builder, pair.type);
    buildSemanticTokenOfArgName(builder, pair.name);
  }
  const paramSet: Set<string> = new Set(cNode.astNode.params.map((p) => p.name.content));
  const bodyArray = [...cNode.assumptions, ...cNode.targets];
  bodyArray.sort((a, b) => {
    return a.range.start.line < b.range.start.line ||
      (a.range.start.line === b.range.start.line && a.range.start.character <= b.range.start.character)
      ? -1
      : 1;
  });
  for (const opCNode of bodyArray) {
    buildSemanticOpCNode(builder, opCNode, paramSet);
  }
  for (const tokens of cNode.astNode.diffs) {
    for (const token of tokens) {
      buildSemanticTokenOfArgName(builder, token);
    }
  }
}
function buildSemanticTokenOfThm(builder: SemanticTokensBuilder, cNode: ThmCNode) {
  buildSemanticTokenOfKeyword(builder, cNode.astNode.keyword);
  const name = cNode.astNode.name;
  const nameType = semanticTokensMap.get(SemanticTokenTypes.function) || 0;
  builder.push(name.range.start.line, name.range.start.character, name.content.length, nameType, 0);

  for (const pair of cNode.astNode.params) {
    buildSemanticTokenOfType(builder, pair.type);
    buildSemanticTokenOfArgName(builder, pair.name);
  }
  const paramSet: Set<string> = new Set(cNode.astNode.params.map((p) => p.name.content));
  const bodyArray = [...cNode.assumptions, ...cNode.targets];
  bodyArray.sort((a, b) => {
    return a.range.start.line < b.range.start.line ||
      (a.range.start.line === b.range.start.line && a.range.start.character <= b.range.start.character)
      ? -1
      : 1;
  });
  for (const tokens of cNode.astNode.diffs) {
    for (const token of tokens) {
      buildSemanticTokenOfArgName(builder, token);
    }
  }
  for (const opCNode of bodyArray) {
    buildSemanticOpCNode(builder, opCNode, paramSet);
  }
  for (const proof of cNode.proofs) {
    const root = proof.root;
    const rootType = semanticTokensMap.get(SemanticTokenTypes.function) || 0;
    builder.push(root.range.start.line, root.range.start.character, root.content.length, rootType, 0);
    for (const arg of proof.children) {
      buildSemanticOpCNode(builder, arg, paramSet);
    }
  }
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
    const { compiler } = await processTextDocument(textDocument);
    cNodeList = compiler.cNodeListMap.get(filePath) || [];
  }

  const position = _textDocumentPosition.position;
  const cNode = findCNodeByPostion(cNodeList, position);
  const items: CompletionItem[] = [];
  if (cNode && cNode.cnodetype === CNodeTypes.THM) {
    const proofs = (cNode as ThmCNode).proofs;
    if (proofs.length === 0) {
      return [];
    }
    const suggestions = (cNode as ThmCNode).suggestions;
    for (let i = 0; i < proofs.length; i++) {
      const proof = proofs[i];
      const suggestion = suggestions[i];
      if (suggestion.length > 0 && proof.range.start.line === position.line) {
        for (const singleSuggestion of suggestion) {
          if (singleSuggestion.size > 0) {
            const newText = proofRelacementForSuggestion(proof, singleSuggestion);
            items.push({
              label: newText,
              kind: CompletionItemKind.Function,
              textEdit: { range: proof.range, newText: newText },
            });
          }
        }
        return items;
      }
    }
  }
  return items;
});

function proofRelacementForSuggestion(proof: ProofOpCNode, suggestion: Map<string, TermOpCNode>): string {
  let rst = proof.root.content + '(';
  const astNode = proof.definition.astNode as AxiomASTNode | ThmASTNode;
  const params = astNode.params;
  const children = proof.children;
  const newChildren: string[] = [];
  let count = 1;
  for (let i = 0; i < params.length; i++) {
    const argName = params[i].name.content;
    const child = children[i];
    const suggest = suggestion.get(argName);
    if (suggest) {
      newChildren.push(suggest.funContent);
    } else if (child.virtual === true) {
      newChildren.push('');
      count += 1;
    } else {
      newChildren.push(child.funContent);
    }
  }
  rst += newChildren.join(', ') + ')';
  return rst;
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
