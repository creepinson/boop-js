const { Action } = require("../dist/types");

/**
 * @type {Action[]}
 */
module.exports = [
    {
        name: "join-lines-with-space",
        id: "joinlws",
        author: "Theo Paris",
        description: "Joins all lines with a space.",
        icon: "table",
        tags: ["join", "space"],
        main: async (state) => {
            const script = satte.text.replace(/\n\n\/\/ Result:[\s\S]*$/, "");

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
