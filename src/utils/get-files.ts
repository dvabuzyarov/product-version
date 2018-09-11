import { Tree } from "@angular-devkit/schematics";
import { join } from "path";

export function getFiles(host: Tree, path: string): string[] {
    const regExp = /environment(\..*)?.ts/;
    const dir = host.getDir(path);
    return dir.subfiles.filter(value => regExp.test(value)).map(fileName => join(path, fileName));
}
