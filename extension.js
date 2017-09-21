// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var io = require('socket.io-client/dist/socket.io');

const SOCKET_BASE = 'http://192.168.43.44:4000';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	var socket = initSocket();
	
	socket.on('connect', () => console.log('connected'));
	socket.on('open', () => console.log('open'));
	socket.on('error', (msg) => console.log(msg));
	socket.on('close', (msg) => console.log(msg));
	socket.on('message', (msg) => console.log(msg));
	socket.on('joined', (msg) => console.log(msg));
	socket.on('left', (msg) => console.log(msg));

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	console.log('Congratulations, your extension "air" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var createRoom = vscode.commands.registerCommand('extension.createRoom', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		
		// var editor = vscode.window.activeTextEditor;
		// if (!editor) {
		//     return; // No open text editor
		// }

		// var selection = editor.selection;
		// var text = editor.document.getText(selection);

		//ask user for room
		vscode.window.showInputBox().then(_text => _text && vscode.window.showInformationMessage('Create ' + _text));
		
	});

	var joinRoom = vscode.commands.registerCommand('extension.joinRoom', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		// var editor = vscode.window.activeTextEditor;
		// if (!editor) {
		// 	return; // No open text editor
		// }

		// var selection = editor.selection;
		// var text = editor.document.getText(selection);

		vscode.window.showInputBox().then(_text => _text && vscode.window.showInformationMessage('Join' + _text));
		
		// Display a message box to the user
		//vscode.window.showInformationMessage('Selected characters: ' + text.length);
		//vscode.window.showInformationMessage('Hello World!');
	}); 

	context.subscriptions.push(createRoom);
	context.subscriptions.push(joinRoom);
}
exports.activate = activate;

function initSocket(){

	return io(SOCKET_BASE, {
		transports: ['websocket'],
	});
}

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;