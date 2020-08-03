import { State } from "../types";

function queryToJson(urlParams: string) {
    return urlParams
        .replace(/\[\d?\]=/gi, "=")
        .split("&")
        .reduce((result, param) => {
            var [key, value] = param.split("=");
            value = decodeURIComponent(value || "");

            if (!result.hasOwnProperty(key)) {
                result[key] = value;

                return result;
            }

            result[key] = [...[].concat(result[key]), value];

            return result;
        }, {});
}

export default [
    {
        name: "downcase",
        id: "downcase",
        author: "Theo Paris",
        description: "Converts text to lowercase.",
        icon: "type",
        tags: ["lowercase"],
        main: async (state: State) => {
            state.text = state.text.toLowerCase();
        },
    },
    {
        name: "upcase",
        id: "upcase",
        author: "Theo Paris",
        description: "Converts text to uppercase.",
        icon: "type",
        tags: ["uppercase", "capitalize"],
        main: async (state: State) => {
            state.text = state.text.toUpperCase();
        },
    },
    {
        name: "count-lines",
        id: "cntln",
        author: "Theo Paris",
        description: "Outputs the amount of lines.",
        icon: "counter",
        tags: ["count", "length", "size", "line"],
        main: async (state: State) => {
            state.text = `${state.text.split("\n").length}`;
        },
    },
    {
        name: "count-lines",
        id: "cntln",
        author: "Theo Paris",
        description: "Outputs the amount of characters.",
        icon: "counter",
        tags: ["count", "length", "size", "line"],
        main: async (state: State) => {
            state.text = `${state.text.length}`;
        },
    },
    {
        name: "collapse-lines",
        id: "clpse",
        author: "Theo Paris",
        description: "Removes all line breaks from your text",
        icon: "collapse",
        tags: ["strip", "remove", "collapse", "join"],
        main: async (state: State) => {
            let split = state.text.split(/\r\n|\r|\n/);
            state.text = split.join();
        },
    },
    {
        name: "natural-sort",
        id: "natsrt",
        author: "Theo Paris",
        description: "",
        icon: "table",
        tags: ["sort"],
        main: async (state: State) => {
            let sorted = state.text
                .replace(/\n$/, "")
                .split("\n")
                .sort((a, b) =>
                    a.localeCompare(b, undefined, {
                        numeric: true,
                        sensitivity: "base",
                    }),
                )
                .join("\n");

            if (sorted === state.text)
                sorted = sorted.split("\n").reverse().join("\n");

            state.text = sorted;
        },
    },
    {
        name: "query-to-json",
        id: "qry2json",
        author: "Theo Paris",
        description: "",
        icon: "table",
        tags: ["sort"],
        main: async (state: State) => {
            try {
                state.text = JSON.stringify(queryToJson(state.text));
            } catch (error) {
                state.error = "Unable to parse given string";
            }
        },
    },
    {
        name: "remove-duplicates",
        id: "rmduplns",
        author: "Theo Paris",
        description: "Ensures each line of your text is unique",
        icon: "table",
        tags: ["remove", "duplicate"],
        main: async (state: State) => {
            let lines = state.text.split("\n");
            let out = [...new Set(lines)];

            state.text = out.join("\n");

            if (state.debug)
                state.text += `${lines.length - out.length} lines removed`;
        },
    },
    {
        name: "remove-slashes",
        description: "Unescapes your text",
        author: "Theo Paris",
        icon: "quote",
        tags: ["strip", "slashes", "remove", "unescape"],
        main: (state: State) => {
            state.text = (state.text + "").replace(/\\(.?)/g, (_, n1) => {
                switch (n1) {
                    case "\\":
                        return "\\";
                    case "0":
                        return "\u0000";
                    case "":
                        return "";
                    default:
                        return n1;
                }
            });
        },
    },
    {
        name: "reverse-lines",
        id: "rvs-lines",
        description: "Flips every line of your text",
        author: "Theo Paris",
        icon: "flip",
        tags: ["reverse", "order", "invert", "mirror", "flip"],
        main: (state: State) => {
            state.text = state.text.split("\n").reverse().join("\n");
        },
    },
    {
        name: "trim",
        id: "trim",
        description: "Trims trailing whitespace",
        author: "Theo Paris",
        icon: "trim",
        tags: ["trim", "whitespace", "empty", "space"],
        main: (state: State) => {
            state.text = state.text.trim();
        },
    },
];
