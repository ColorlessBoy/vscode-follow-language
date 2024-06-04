import * as path from 'path';
import { workspace, ExtensionContext, window, Hover, DecorationOptions, Range } from 'vscode';

import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

type HoverV2Content = { line: number; value: string };
type HoverV2 = {
  contents: HoverV2Content[];
};

export function activate(context: ExtensionContext) {
  // The server is implemented in node

  let config = workspace.getConfiguration('follow');
  let serverModule: string = context.asAbsolutePath(path.join('server', 'build', 'server.js'));

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

  const decorationType = window.createTextEditorDecorationType({
    after: {
      margin: '0 0 0 0',
      color: 'grey',
    },
  });
  window.onDidChangeTextEditorSelection(async (event) => {
    const editor = event.textEditor;
    const position = editor.selection.active;
    const response = await client.sendRequest<HoverV2>('textDocument/hoverV2', {
      textDocument: { uri: editor.document.uri.toString() },
      position: position,
    });
    if (response === undefined || response.contents.length === 0) {
      editor.setDecorations(decorationType, []);
    }
    const contents = response.contents;
    if (contents === undefined || contents.length === 0) {
      editor.setDecorations(decorationType, []);
    }
    const decorationOptions: DecorationOptions[] = contents.map((content) => {
      return {
        range: new Range(position.with(content.line, 0), position.with(content.line, 0)),
        renderOptions: {
          after: {
            contentText: content.value,
          },
        },
      };
    });
    editor.setDecorations(decorationType, decorationOptions);
  });

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector: [
      { scheme: 'file', language: 'follow' },
      { scheme: 'file', pattern: '**/content.follow.json' },
    ],
  };

  // Create the language client and start the client.
  client = new LanguageClient('follow', 'Follow', serverOptions, clientOptions);

  // Start the client. This will also launch the server
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
