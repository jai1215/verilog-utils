// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as tu from './textUtils';
import { Module } from './Module';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed




export function activate(context: vscode.ExtensionContext) {
	let inst = vscode.commands.registerTextEditorCommand('verilog-utils.instation', async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) => {
		let selection: vscode.Selection = textEditor.selection;
		if (!selection.isEmpty) {
			let textDocument = textEditor.document;
			let endLine = selection.end.line;
			let endPosition = selection.end;
			if(endPosition.character === 0) {
				endLine--;
			}
			let startPos = new vscode.Position(selection.start.line, 0);
			let endPos = new vscode.Position(endLine, textDocument.lineAt(endLine).range.end.character);
			let range = new vscode.Range(startPos, endPos);
			let text = textDocument.getText(range);

			text = tu.removeNewline(text);
			let module = new Module(text);
			module.buildStructure();
			let inst:string = module.dumpInst();

			await textEditor.edit(e => {
				e.replace(range, inst);
			});

		}
	});

	context.subscriptions.push(inst);
}

// this method is called when your extension is deactivated
export function deactivate() {}
