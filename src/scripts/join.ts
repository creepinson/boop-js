import { State } from "../types";

/**
 * @type {Action[]}
 */
export default [
    {
        name: "join-lines-with-space",
        id: "joinlnws",
        author: "Theo Paris",
        description: "Joins all lines with a space.",
        icon: "table",
        tags: ["join", "space"],
        main: async (state: State) => {
            state.text = state.text.replace("\n", " ");
        },
    },
    {
        name: "join-lines-with-comma",
        id: "joinlnwc",
        author: "Theo Paris",
        description: "Joins all lines with a comma.",
        icon: "table",
        tags: ["join", "comma"],
        main: async (state: State) => {
            state.text = state.text.replace("\n", ",");
        },
    },
    {
        name: "join-lines",
        id: "joinln",
        author: "Theo Paris",
        description: "Joins all lines without a delimiter.",
        icon: "table",
        tags: ["join", "comma"],
        main: async (state: State) => {
            state.text = state.text.replace("\n", "");
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
