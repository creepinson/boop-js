#!/usr/bin/env node
import * as fs from "fs";
import { Magic } from "mmmagic";
import * as FileType from "file-type";
import { State } from "./types";
import { getActions } from "./parser";
import { homedir } from "os";

try {
    main(fs.readFileSync(process.stdin.fd, "utf-8"));
} catch (err) {
    main("");
}

async function main(data: string) {
    // const magic = new Magic();
    // Command has received input, continue to step 2
    const args = process.argv.slice(2);
    if (!args[0]) {
        console.error("Missing arguments.");
        process.exit(2);
    }

    // Strip argument prefixes and get raw action
    const arg = args[0].replace("-", "").replace("--", "");

    const state: State = {
        text: data,
        selection: data,
        args: args.slice(1),
        debug: args.includes("-d") || args.includes("--debug"),
    };

    getActions(`${homedir()}/.boop/boop-scripts`, state.debug).then(
        (actions) => {
            actions.forEach(async (a) => {
                if (arg === a.name || arg === a.id) {
                    if (state.debug) console.log(`Running script: ${a.name}`);
                    await a.main(state);
                    console.log(state.text);
                }
            });

            getActions(`${__dirname}/../scripts`, state.debug).then(
                (builtIn) => {
                    builtIn.forEach(async (b) => {
                        if (
                            !actions.some(
                                (v) => v.id === b.id || v.name === b.name,
                            ) &&
                            (arg === b.name || arg === b.id)
                        ) {
                            if (state.debug)
                                console.log(`Running script: ${b.name}`);
                            await b.main(state);
                            console.log(state.text);
                        }
                    });
                },
            );
        },
    );
}
