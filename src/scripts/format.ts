import { State } from "../types";
import prettier from "prettier";

/**
 * @type {Action[]}
 */
export default [
    {
        name: "format",
        id: "fmt",
        author: "Theo Paris",
        description: "Formats the input code.",
        icon: "broom",
        tags: ["prettify", "clean", "indent"],
        main: async (state: State) => {
            try {
                state.text = prettier.format(state.text, {
                    endOfLine: "auto",
                    semi: true,
                    tabWidth: 4,
                    trailingComma: "all",
                    filepath: "./test." + state.args[0],
                });
            } catch (e) {
                state.error = e.message;
            }
        },
    },
];
