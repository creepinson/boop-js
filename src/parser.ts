import * as fs from "fs/promises";
import { Action } from "./types";
import { NodeVM } from "vm2";
import { homedir } from "os";

export async function getActions(scriptsDir: string, debug: boolean) {
	const actions: Action[] = [];

	try {
		if (!fs.access(scriptsDir))
			throw new Error(`Could not access folder: ${scriptsDir}`);
		const files = await fs.readdir(scriptsDir);

		for (let file of files) {
			if (file.includes(".js")) {
				const path = `${scriptsDir}/${file}`;
				// if (debug) console.log(`Loading script ${file}`);]

				// Parse js file
				const a: Action[] = new NodeVM({
					require: {
						external: true,
						builtin: ["*"],
						root: "./",
						mock: {},
						context: "host",
					},
				}).runFile(path);

				for (let action of a) {
					actions.push(action);
				}
			}
		}
	} catch (e) {
		if (debug) console.error(e.toString());
		return [];
	}

	return actions;
}

export async function getBuiltInActions(debug: boolean) {
	const actions: Action[] = [];
	const scriptsDir = `${__dirname}/scripts`;

	try {
		if (!fs.access(scriptsDir))
			throw new Error(`Could not access folder: ${scriptsDir}`);
		const files = await fs.readdir(scriptsDir);
		for (let file of files) {
			if (file.includes(".js")) {
				const path = `${scriptsDir}/${file}`;
				// if (debug) console.log(`Loading script ${file}`);]

				// Parse js file
				const a: Action[] = new NodeVM({
					require: {
						external: true,
						builtin: ["*"],
						root: "./",
						mock: {},
						context: "host",
					},
				}).runFile(path).default;

				for (let action of a) {
					actions.push(action);
				}
			}
		}
	} catch (e) {
		if (debug) console.error(e.toString());
		return [];
	}

	return actions;
}
