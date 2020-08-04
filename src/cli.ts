#!/usr/bin/env node
import * as fs from "fs/promises";
import { State } from "./types";
import { getActions, getBuiltInActions } from "./parser";
import { homedir } from "os";
import * as readline from "readline";

async function main() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false,
	});

	let data = "";
	for await (const line of rl) {
		// Read from stdin (echo "joe" | boopjs)
		data += line;
	}

	const scriptsPath = `${homedir()}/.config/boop/scripts`;
	try {
		await fs.access(scriptsPath);
	} catch {
		await fs.mkdir(scriptsPath, { recursive: true });
	}

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

	if (args[0] === "--list" || args[0] === "-l") {
		console.log(`List of possible actions: `);
		const act = [];
		getActions(scriptsPath, state.debug).then((actions) => {
			actions.forEach(async (a) => act.push(a.id));

			getBuiltInActions(state.debug).then((builtIn) => {
				builtIn.forEach(async (b) => {
					if (!act.includes(b.id)) act.push(b.id);
				});
				console.log(act.join(", "));
			});
		});
	} else {
		getActions(scriptsPath, state.debug).then((actions) => {
			actions.forEach(async (a) => {
				if (arg === a.name || arg === a.id) {
					if (state.debug) console.log(`Running script: ${a.name}`);
					await a.main(state);
					if (state.error) console.error(state.error);
					else console.log(state.text);
				} else {
					console.error(`Invalid action ${arg}`);
				}
			});

			getBuiltInActions(state.debug).then((builtIn) => {
				if (
					!builtIn.some((v) => v.id === arg || v.name === arg) ||
					!actions.some((v) => v.id === arg || v.name === arg)
				)
					return console.error(`Invalid action ${arg}. Type "boopjs -l" for a list of valid actions.`);

				builtIn.forEach(async (b) => {
					if (
						!actions.some((v) => v.id === b.id || v.name === b.name) &&
						(arg === b.name || arg === b.id)
					) {
						if (state.debug) console.log(`Running script: ${b.name}`);
						await b.main(state);
						if (state.error) console.error(state.error);
						else console.log(state.text);
					}
				});
			});
		});
	}
}

main();
