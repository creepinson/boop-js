import * as fs from "fs/promises";
import { Action } from "./types";
import { NodeVM } from "vm2";

export const defaultScriptsDir = `${__dirname}/scripts`;

export async function getActions(
    scriptsDir: string,
    debug: boolean,
    defaultImport?: boolean,
) {
    const actions: Action[] = [];

    try {
        const files = await fs.readdir(scriptsDir);

        for (let file of files) {
            if (file.includes(".js")) {
                const path = `${scriptsDir}/${file}`;
                // if (debug) console.log(`Loading script ${file}`);]

                // Parse js file
                let a: Action[] = new NodeVM({
                    require: {
                        external: true,
                        builtin: ["*"],
                        mock: {},
                        context: "host",
                    },
                }).runFile(path);

                if (defaultImport) a = (a as any).default;

                for (let action of a) {
                    actions.push(action);
                }
            }
        }
    } catch (e) {
        console.log("An error occurred while parsing scripts.");
        if (debug) console.error(e.toString());
        return [];
    }

    return actions;
}

export const getBuiltInActions = (debug: boolean) =>
    getActions(defaultScriptsDir, debug, true);
