"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    console.log("Extension is activated"); // Add this line to check if activation happens
    const createTemplateFile = vscode.commands.registerCommand('extension.createTemplateFile', async (uri) => {
        console.log("Create Template File command triggered"); // Log when command is triggered
        if (!uri || !uri.fsPath) {
            vscode.window.showErrorMessage('No folder selected!');
            return;
        }
        const folderPath = uri.fsPath;
        const templateFileName = 'templateFile.js'; // Change as needed
        const templateContent = `// This is a boilerplate template`;
        const filePath = path.join(folderPath, templateFileName);
        try {
            // Write the file
            fs.writeFileSync(filePath, templateContent, { flag: 'wx' }); // Use 'wx' to avoid overwriting existing files
            vscode.window.showInformationMessage(`Template file created: ${templateFileName}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error creating file: ${error.message}`);
        }
    });
    console.log("Command registered");
    context.subscriptions.push(createTemplateFile);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map