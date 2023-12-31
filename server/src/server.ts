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
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { FollowParser } from 'follow-parser';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
let hasDiagnosticRelatedInformationCapability: boolean = false;
let parser = new FollowParser();

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
        legend: parser.semanticTokensLegend,
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
    legend: parser.semanticTokensLegend,
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
  await parser
    .getDiagnostics(textDocument)
    .then((diagnosticCollection: Map<string, Diagnostic[]>) => {
      // Send the computed diagnostics to VSCode for each document
      // eslint-disable-next-line @typescript-eslint/no-shadow
      for (const [uri, diagnostics] of diagnosticCollection.entries()) {
        connection.sendDiagnostics({ uri, diagnostics });
      }
    })
    .catch((error) => {
      connection.window.showErrorMessage(error);
    });
}

connection.onHover((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument) {
    const hover = parser.getHover(textDocument, event.position);
    return hover;
  }
});

connection.onDefinition((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument) {
    const definition = parser.getDefinition(textDocument, event.position);
    return definition;
  }
});

connection.onReferences((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument) {
    const references = parser.getReference(textDocument, event.position);
    return references;
  }
});

connection.onRenameRequest((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  if (textDocument) {
    const edit = parser.getRename(textDocument, event.position, event.newName);
    return edit;
  }
});

connection.languages.semanticTokens.on((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  const semanticTokens = parser.getSemanticToken(textDocument);
  return semanticTokens;
});

connection.languages.semanticTokens.onDelta((event) => {
  const textDocument = documents.get(event.textDocument.uri);
  const semanticTokens = parser.getSemanticTokenDelta(event.previousResultId, textDocument);
  return semanticTokens;
});

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
