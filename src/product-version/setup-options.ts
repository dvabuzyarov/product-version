import { Tree } from "@angular-devkit/schematics";
import { normalize } from "path";
import { ISchema } from "./schema";
import { getWorkspace } from "../utils/config";

export async function setupOptions(options: ISchema, host: Tree) {
    const workspace = await getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects.get(options.project);

    if (options.path === undefined) {
        options.path = `/${project?.root}/src/environments/`;
    }

    options.path = normalize(options.path);
}
