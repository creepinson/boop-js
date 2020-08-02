import { State } from "../types";

/**
 * @type {Action[]}
 */
export default [
    {
        name: "join-lines-with-space",
        id: "joinlws",
        author: "Theo Paris",
        description: "Joins all lines with a space.",
        icon: "table",
        tags: ["join", "space"],
        main: async (state: State) => {
            const script = state.text.replace(/\n\n\/\/ Result:[\s\S]*$/, "");

            let output = "";
            try {
                output = eval(script);
                if (typeof output !== "string")
                    output = JSON.stringify(output, null, 2);
            } catch (e) {
                state.error = e.toString();
            }

            state.text = script + "\n\n// Result:\n\n" + output;
        },
    },
];
