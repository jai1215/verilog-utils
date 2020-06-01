// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as tu from './textUtils';
import { Module } from './Module';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed




export function activate(context: vscode.ExtensionContext) {
	/*module dport_axi
	(
		// Inputs
		 input           clk_i
		,input           rst_i
		,input  [ 31:0]  mem_addr_i
		,input  [ 31:0]  mem_data_wr_i
		,input           mem_rd_i
		,input  [  3:0]  mem_wr_i
		,input           mem_cacheable_i
		,input  [ 10:0]  mem_req_tag_i
		,input           mem_invalidate_i
		,input           axi_rvalid_i
		,input  [ 31:0]  axi_rdata_i
		,input  [  1:0]  axi_rresp_i
		,input  [  3:0]  axi_rid_i
		,input           axi_rlast_i
	
		// Outputs
		,output [ 31:0]  mem_data_rd_o
		,output          mem_accept_o
		,output          mem_ack_o
		,output          mem_error_o
		,output          axi_wlast_o
		,output          axi_bready_o
		,output          axi_arvalid_o
		,output [ 31:0]  axi_araddr_o
		,output [  3:0]  axi_arid_o
		,output [  7:0]  axi_arlen_o
		,output [  1:0]  axi_arburst_o
		,output          axi_rready_o
	);*/


	let inst = vscode.commands.registerTextEditorCommand('verilog-utils.instation', async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) => {
		console.log('test_log');
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
		vscode.window.showInformationMessage('Hello World from verilog-utils!');
	});

	context.subscriptions.push(inst);
}

// this method is called when your extension is deactivated
export function deactivate() {}
