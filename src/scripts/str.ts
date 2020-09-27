import { State } from "../types";

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
];
