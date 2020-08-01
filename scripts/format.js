const { Action } = require("../dist/types");
const prettier = require("prettier");

/**
 * @type {Action[]}
 */
module.exports = [
    {
        name: "format",
        id: "fmt",
        author: "Theo Paris",
        description: "Formats the input code.",
        icon: "broom",
        tags: ["prettify", "clean", "indent"],
        main: async (state) => {
            try {
                state.text = prettier.format(state.text, {
                    endOfLine: "auto",
                    semi: true,
                    tabWidth: 4,
                    trailingComma: "all",
                    filepath: "./test." + state.args[0],
                });
            } catch (e) {
                state.text = e.message;
            }
        },
    },
];

/**
	{
		"api":1,
		"name":"Format CSS",
		"description":"Cleans and format CSS stylesheets.",
		"author":"Ivan",
		"icon":"broom",
		"tags":"css,prettify,clean,indent",
        "bias": -0.1
	}
**/
