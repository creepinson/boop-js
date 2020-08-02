import { State } from "../types";

/**
 * @type {Action[]}
 */
export default [
    {
        name: "eval-js",
        id: "eval",
        author: "Theo Paris",
        description: "Runs javascript code.",
        icon: "code",
        tags: ["code", "run", "evaluate"],
        main: async (state: State) => {
            let output = "";
            try {
                output = eval(state.text);
                if (typeof output !== "string")
                    output = JSON.stringify(output, null, 2);
            } catch (e) {
                state.error = e.toString();
            }

            state.text = output;
        },
    },
];
