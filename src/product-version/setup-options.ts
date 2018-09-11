import { Tree } from "@angular-devkit/schematics";
import { normalize } from "path";
import { getWorkspace } from "../utils/config";
import { ISchema } from "./schema";

export function setupOptions(options: ISchema, host: Tree): void {
    const workspace = getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];

    if (options.path === undefined) {
        options.path = `/${project.root}/src/environments/`;
    }

    options.path = normalize(options.path);
}