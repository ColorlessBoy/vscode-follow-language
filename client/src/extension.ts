import * as path from 'path';
import {
  workspace,
  ExtensionContext,
  window,
  DecorationOptions,
  Range,
  WebviewViewProvider,
  WebviewView,
  Uri,
  Webview,
  TextDocument,
  commands,
} from 'vscode';

import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

type HoverV2Content = { line: number; value: string };
type HoverV2 = {
  contents: HoverV2Content[];
};
interface FollowSettings {
  maxNumberOfProblems: number;
  enableWatchMarkdown: boolean;
}
enum FollowSettingProps {
  maxNumberOfProblems = 'maxNumberOfProblems',
  enableWatchMarkdown = 'enableWatchMarkdown',
}

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
    if (response === undefined || response === null || !('contents' in response)) {
      editor.setDecorations(decorationType, []);
      return;
    }
    const contents = response.contents;
    if (contents === undefined || contents === null || contents.length === 0) {
      editor.setDecorations(decorationType, []);
      return;
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

  const documentSelector = [
    { scheme: 'file', language: 'follow' },
    { scheme: 'file', pattern: '**/content.follow.json' },
  ];
  if (config.get(FollowSettingProps.enableWatchMarkdown)) {
    documentSelector.push({
      scheme: 'file',
      pattern: '**/*.md',
    });
  }

  let clientOptions: LanguageClientOptions = {
    // Register the server for plain text documents
    documentSelector,
  };

  // Create the language client and start the client.
  client = new LanguageClient('follow', 'Follow', serverOptions, clientOptions);

  // Start the client. This will also launch the server
  client.start();

  const followBlockListProvider = new FollowBlockListProvider(context.extensionUri);
  context.subscriptions.push(
    window.registerWebviewViewProvider(FollowBlockListProvider.viewType, followBlockListProvider),
  );
  // 监听文档保存事件
  context.subscriptions.push(
    workspace.onDidSaveTextDocument((document: TextDocument) => {
      if (client) {
        followBlockListProvider.updateTable();
      }
    }),
  );

  let startCommand = commands.registerCommand('follow.start', () => {
    // 启动插件的逻辑
    window.showInformationMessage('Follow Extension Started');
  });

  context.subscriptions.push(startCommand);

  let restartCommand = commands.registerCommand('follow.restart', async () => {
    await deactivate();
    activate(context);
    window.showInformationMessage('Follow Extension Restart');
  });
  context.subscriptions.push(restartCommand);

  let disableCommand = commands.registerCommand('follow.disable', async () => {
    await deactivate();
    window.showInformationMessage('Follow Extension Disabled');
  });

  context.subscriptions.push(disableCommand);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

type FollowBlockType = {
  folder: string;
  result: {
    file: string;
    blocks: {
      type: string;
      name: string;
      isValid: boolean | Boolean;
      content: string;
    }[];
  }[];
};

class FollowBlockListProvider implements WebviewViewProvider {
  public static readonly viewType = 'followBlockList';
  private _view?: WebviewView;

  constructor(private readonly _extensionUri: Uri) {}

  public async updateTable() {
    if (this._view) {
      const response = await client.sendRequest<FollowBlockType[]>('follow/followBlockList', {});
      this._view.webview.postMessage({ command: 'updateTables', data: response });
    }
  }

  resolveWebviewView(webviewView: WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      if (message.command === 'requestTable') {
        const response = await client.sendRequest<FollowBlockType[]>('follow/followBlockList', {});
        console.log('requrestTable', response);
        webviewView.webview.postMessage({ command: 'updateTables', data: response });
      }
    });
  }

  private _getHtmlForWebview(webview: Webview): string {
    // 生成包含表格的HTML内容
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Follow Block List</title>
  <style>
    .collapsible-content {
      display: none;
    }
    h2, h3 {
      cursor: pointer;
      position: relative;
      padding-left: 20px;
    }
    h2::before, h3::before {
      content: '\\25B6'; /* Right-pointing triangle */
      position: absolute;
      left: 0;
      font-size: 1em;
    }
    h2.collapsed::before, h3.collapsed::before {
      content: '\\25BC'; /* Down-pointing triangle */
    }
  </style>
</head>
<body>
  <button id="requestTableButton">request table</button>
  <div id="tablesContainer">
    <!-- 动态填充表格 -->
  </div>
  <script>
    const vscode = acquireVsCodeApi();

    const button = document.getElementById('requestTableButton');
    button.addEventListener('click', () => {
      // 请求表格数据
      console.log('send requestTable')
      vscode.postMessage({ command: 'requestTable' });
    });

    // 接收来自扩展的消息
    window.addEventListener('message', event => {
      const message = event.data;

      if (message.command === 'updateTables') {
        const tablesContainer = document.getElementById('tablesContainer');
        const node = message.data.map(tableData => {
          const tableRows = tableData.result.map((fileData, index) => {
            const blocksRows = fileData.blocks.map((block, index) => 
              \`<tr>
                <td>\${index}</td>
                <td>\${block.type}</td>
                <td>\${block.name}</td>
                <td>\${block.isValid}</td>
                <td><pre><code>\${block.content}</pre></code></td>
              </tr>\`
            ).join('');

            return \`
              <h3>\${fileData.file}-\${fileData.blocks.length}</h3>
              <div class="collapsible-content">
                <table border="1">
                  <thead>
                    <tr>
                      <th>Idx</th>
                      <th>Type</th>
                      <th>Name</th>
                      <th>Proofed</th>
                      <th>Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${blocksRows}
                  </tbody>
                </table>
              </div>
            \`;
          }).join('');

          return \`
            <div>
              <h2>\${tableData.folder}</h2>
              <div class="collapsible-content">
                \${tableRows}
              </div>
            </div>
          \`;
        }).join('');

        tablesContainer.innerHTML = node

        // 添加点击事件监听器
        document.querySelectorAll('h2').forEach(header => {
          header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
            header.classList.toggle('collapsed', !isVisible);
          });
        });

        document.querySelectorAll('h3').forEach(header => {
          header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isVisible = content.style.display === 'block';
            content.style.display = isVisible ? 'none' : 'block';
            header.classList.toggle('collapsed', !isVisible);
          });
        });
      }
    });
  </script>
</body>
</html>
`;
  }
}
