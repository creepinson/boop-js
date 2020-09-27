#!/usr/bin/env node
import * as fs from "fs/promises";
import { State } from "./types";
import { getActions, getBuiltInActions } from "./parser";
import { homedir } from "os";
import * as readline from "readline";
import { Command } from "commander";

async function main() {
    const scriptsPath = `${homedir()}/.config/boop/scripts`;
    try {
        await fs.access(scriptsPath);
    } catch {
        await fs.mkdir(scriptsPath, { recursive: true });
    }

    const program = new Command();
    program.version(process.env.BOOP_VERSION || "0.0.1");
    program.name("boopjs");
    program.option("-d, --debug", "output extra debugging", false);
    program.option(
        "-s,--simple",
        "simple output mode - useful for parsing output in other programs",
        false,
    );
    let data = "";

    const state: State = {
        text: data,
        selection: data,
        args: [],
        debug: program.debug,
    };

    program
        .command("run <action> [args...]")
        .action((action: string, args?: string[]) => {
            if (args) state.args = args;
            getActions(scriptsPath, state.debug).then((actions) => {
                actions.forEach(async (a) => {
                    if (action === a.name || action === a.id) {
                        if (state.debug)
                            console.log(`Running script: ${a.name}`);
                        await a.main(state);
                        if (state.error) console.error(state.error);
                        else console.log(state.text);
                    }
                });

                getBuiltInActions(state.debug).then((builtIn) => {
                    if (
                        !builtIn.some(
                            (v) => v.id === action || v.name === action,
                        ) &&
                        !actions.some(
                            (v) => v.id === action || v.name === action,
                        )
                    )
                        return console.error(
                            `Invalid action ${action}. Type "boopjs -l" for a list of valid actions.`,
                        );

                    builtIn.forEach(async (b) => {
                        if (
                            !actions.some(
                                (v) => v.id === b.id || v.name === b.name,
                            ) &&
                            (action === b.name || action === b.id)
                        ) {
                            if (state.debug)
                                console.log(`Running script: ${b.name}`);
                            await b.main(state);
                            if (state.error) console.error(state.error);
                            else console.log(state.text);
                        }
                    });
                });
            });
        });

    program
        .command("list")
        .description("list all commands seperated by commas")
        .action(() => {
            console.log(`List of possible actions: `);
            const act = [];
            getActions(scriptsPath, state.debug).then((actions) => {
                actions.forEach(async (a) => act.push(a.id));

                getBuiltInActions(state.debug).then((builtIn) => {
                    builtIn.forEach(async (b) => {
                        if (!act.includes(b.id)) act.push(b.id);
                    });
                    if (program.simple) return console.log(act.join(","));
                    else console.log(act.join(", "));
                });
            });
        });
    program.parse(process.argv);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });

    if (!rl.line || rl.line.trim() === "") return rl.close();

    rl.on("line", (line: string) => {
        // Read from stdin (echo "joe" | boopjs)
        if (line) data += line + "\n";
        else rl.close();
    });

    rl.on("close", () => process.exit(0));
}

main();
