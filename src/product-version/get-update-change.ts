import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { createSourceFile, Node, ScriptTarget, SyntaxKind } from "typescript";
import { findNode, getSourceNodes } from "../utils/ast-utils";
import { ReplaceChange } from "../utils/change";
import { ISchema } from "./schema";

export function getUpdateChange(host: Tree, options: ISchema, fileName: string): ReplaceChange {
    const text = (host.read(fileName) || {} as Buffer).toString("utf-8");
    const sourceFile = createSourceFile(fileName, text, ScriptTarget.Latest, true);
    const nodes = getSourceNodes(sourceFile);
    const assignmentNode = nodes
        .find(n => n.kind === SyntaxKind.PropertyAssignment
            && findNode(n, SyntaxKind.Identifier, options.propertyName || "version") !== null);

    if (!assignmentNode)
        throw new SchematicsException(`expected property ${options.propertyName || "version"} in ${fileName} not found`);

    const node = (assignmentNode.getChildren().find(value => value.kind === SyntaxKind.StringLiteral)) || {} as Node;
    return new ReplaceChange(fileName, node.getStart(), node.getText(), options.productVersion);
}
