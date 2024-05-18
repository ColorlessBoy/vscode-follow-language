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
  URI,
  SemanticTokensBuilder,
  Range,
  Hover,
} from 'vscode-languageserver/node';

import { Position, TextDocument } from 'vscode-languageserver-textdocument';
import {
  Scanner,
  Parser,
  Compiler,
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

let compilerMap: Map<URI, { scanner: Scanner; parser: Parser; compiler: Compiler }> = new Map();

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
        resolveProvider: true,
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

connection.onInitialized(() => {
  if (hasConfigurationCapability) {
    // Register for all configuration changes.
    connection.client.register(DidChangeConfigurationNotification.type, undefined);
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log('Workspace folder change event received.');
    });
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
  const { parser, compiler } = processTextDocument(textDocument);
  const diagnostics = [...getDiagnostics(parser.errors), ...getDiagnostics(compiler.errors)];
  const uri = textDocument.uri;
  connection.sendDiagnostics({ uri, diagnostics });
}

function processTextDocument(textDocument: TextDocument) {
  const uri = textDocument.uri;
  let tool = compilerMap.get(uri);
  if (tool === undefined) {
    tool = {
      scanner: new Scanner(),
      parser: new Parser(),
      compiler: new Compiler(),
    };
    compilerMap.set(uri, tool);
  }
  const { scanner, parser, compiler } = tool;

  const tokens = scanner.scan(textDocument.getText());
  const astNodes = parser.parse(tokens);
  const compileNodes = compiler.compile(astNodes);
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
  const uri = event.textDocument.uri;
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    return null;
  }
  let tool = compilerMap.get(uri);
  if (tool === undefined) {
    tool = processTextDocument(textDocument);
  }
  const position = event.position;
  const cNode = findCNodeByPostion(tool.compiler, position);
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
function findCNodeByPostion(compiler: Compiler, position: Position): CNode | undefined {
  const cNodeList = compiler.cNodeList;
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

connection.languages.semanticTokens.on((event) => {
  const uri = event.textDocument.uri;
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    const builder = new SemanticTokensBuilder();
    return builder.build();
  }
  let tool = compilerMap.get(uri);
  if (tool === undefined) {
    tool = processTextDocument(textDocument);
  }

  const semanticTokens = buildSemanticToken(tool.compiler.cNodeList);
  return semanticTokens;
});

connection.languages.semanticTokens.onDelta((event) => {
  const uri = event.textDocument.uri;
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument === undefined) {
    const builder = new SemanticTokensBuilder();
    return builder.buildEdits();
  }
  let tool = compilerMap.get(uri);
  if (tool === undefined) {
    tool = processTextDocument(textDocument);
  }
  const semanticTokens = buildSemanticTokenDelta(tool.compiler.cNodeList, event.previousResultId);
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
  for (const target of cNode.targets) {
    buildSemanticOpCNode(builder, target, paramSet);
  }
  for (const assumption of cNode.assumptions) {
    buildSemanticOpCNode(builder, assumption, paramSet);
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
  for (const target of cNode.targets) {
    buildSemanticOpCNode(builder, target, paramSet);
  }
  for (const assumption of cNode.assumptions) {
    buildSemanticOpCNode(builder, assumption, paramSet);
  }
  for (const tokens of cNode.astNode.diffs) {
    for (const token of tokens) {
      buildSemanticTokenOfArgName(builder, token);
    }
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
connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
  // The pass parameter contains the position of the text document in
  // which code complete got requested. For the example we ignore this
  // info and always provide the same completion items.
  return [
    {
      label: 'TypeScript',
      kind: CompletionItemKind.Text,
      data: 1,
    },
    {
      label: 'JavaScript',
      kind: CompletionItemKind.Text,
      data: 2,
    },
  ];
});

// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  if (item.data === 1) {
    item.detail = 'TypeScript details';
    item.documentation = 'TypeScript documentation';
  } else if (item.data === 2) {
    item.detail = 'JavaScript details';
    item.documentation = 'JavaScript documentation';
  }
  return item;
});

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
