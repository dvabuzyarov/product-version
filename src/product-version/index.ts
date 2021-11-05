import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { getFiles } from "../utils/get-files";
import { getUpdateChange } from "./get-update-change";
import { ISchema } from "./schema";
import { setupOptions } from "./setup-options";

export function set(options: ISchema) {
    return async (host: Tree, context: SchematicContext) => {
        context.logger.info("Product Version: " + JSON.stringify(options));
        await setupOptions(options, host);
        const files = getFiles(host, options.path as string);
        for (const file of files) {
            const change = getUpdateChange(host, options, file);
            const recorder = host.beginUpdate(file);
            recorder.remove(change.pos, change.oldText.length);
            recorder.insertRight(change.pos, change.newText);
            host.commitUpdate(recorder);
        }
        return host;
    };
}
