import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel('Template Generator');
    outputChannel.appendLine('Extension is activated');
    outputChannel.show();

    const createTemplateFile = vscode.commands.registerCommand(
        'extension.createTemplateFile',
        async (uri: vscode.Uri) => {
            outputChannel.appendLine('Create Template File command triggered');

            const targetUri = uri || (vscode.workspace.workspaceFolders 
                ? vscode.workspace.workspaceFolders[0].uri 
                : undefined);

            if (!targetUri) {
                vscode.window.showErrorMessage('Please select a folder in the explorer');
                return;
            }

            const folderPath = targetUri.fsPath;

            // Ask for file names (comma-separated)
            const fileNamesInput = await vscode.window.showInputBox({
                prompt: 'Enter file names (comma-separated)',
                placeHolder: 'Button, Navbar, Card'
            });

            if (!fileNamesInput) {
                return; // User cancelled
            }

            // Split and clean file names
            const fileNames = fileNamesInput
                .split(',')
                .map(name => name.trim())
                .filter(name => name.length > 0);

            if (fileNames.length === 0) {
                vscode.window.showErrorMessage('No valid file names provided');
                return;
            }

            // Template options
            const templateType = await vscode.window.showQuickPick(
                ['JavaScript', 'React Component', 'HTML'],
                {
                    placeHolder: 'Select template type for all files'
                }
            );

            if (!templateType) {
                return; // User cancelled
            }

            const extension = getFileExtension(templateType);
            let createdFiles = 0;
            const errors: string[] = [];

            // Create each file
            for (const fileName of fileNames) {
                const fullFileName = `${fileName}${extension}`;
                const filePath = path.join(folderPath, fullFileName);

                try {
                    // Check if file exists
                    if (fs.existsSync(filePath)) {
                        const overwrite = await vscode.window.showQuickPick(
                            ['Yes', 'No'],
                            {
                                placeHolder: `${fullFileName} already exists. Overwrite?`
                            }
                        );
                        if (overwrite !== 'Yes') {
                            continue;
                        }
                    }

                    // Write the file
                    fs.writeFileSync(filePath, getTemplateContent(templateType, fileName));
                    outputChannel.appendLine(`File created successfully: ${filePath}`);
                    createdFiles++;

                    // Open the file
                    const document = await vscode.workspace.openTextDocument(filePath);
                    await vscode.window.showTextDocument(document, { preview: false });
                } catch (error: any) {
                    errors.push(`${fileName}: ${error.message}`);
                    outputChannel.appendLine(`Error creating file ${fileName}: ${error.message}`);
                }
            }

            // Show summary
            if (createdFiles > 0) {
                vscode.window.showInformationMessage(
                    `Created ${createdFiles} template file(s)${errors.length > 0 ? ' with some errors' : ''}`
                );
            }
            
            if (errors.length > 0) {
                vscode.window.showErrorMessage(
                    `Errors occurred while creating files:\n${errors.join('\n')}`
                );
            }
        }
    );

    outputChannel.appendLine('Command registered');
    context.subscriptions.push(createTemplateFile);
}

function getFileExtension(templateType: string): string {
    switch (templateType) {
        case 'JavaScript':
            return '.js';
        case 'React Component':
            return '.jsx';
        case 'HTML':
            return '.html';
        default:
            return '.js';
    }
}

function getTemplateContent(templateType: string, fileName: string): string {
    switch (templateType) {
        case 'JavaScript':
            return `// ${fileName}.js
const ${fileName} = {
    init: function() {
        // Initialize your code here
    },
    
    // Add your methods here
};

export default ${fileName};
`;

        case 'React Component':
            return `import React from 'react';

const ${fileName} = () => {
    return (
        <div>
            <h1>${fileName} Component</h1>
        </div>
    );
};

export default ${fileName};
`;

        case 'HTML':
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
</head>
<body>
    <h1>${fileName}</h1>
</body>
</html>`;

        default:
            return '';
    }
}

export function deactivate() {}