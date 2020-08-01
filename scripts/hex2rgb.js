const { Action } = require("../dist/types");

const hexToRgb = (hex) =>
    new RegExp("([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})")
        .exec(hex)
        .map((x) => parseInt(x, 16))
        .filter((v) => v <= 255 && v >= 0);

const rgbToHex = (rgb) =>
    rgb
        .replace(" ", "")
        .replace("(", "")
        .replace(")", "")
        .match(/\d+/g)
        .map((x) => (+x).toString(16).padStart(2, "0"))
        .join("");

/**
 * @type {Action[]}
 */
module.exports = [
    {
        id: "h2r",
        name: "hextorgb",
        description: "Convert color in hexadecimal to RGB.",
        author: "Theo Paris",
        icon: "table",
        tags: ["flip", "color"],
        main: async (state) => {
            try {
                state.text = hexToRgb(state.text).join(",");
            } catch {
                state.text = "Invalid hex string.";
            }
        },
    },
    {
        id: "r2h",
        name: "rgbtohex",
        description: "Convert color in RGB to hexidecimal.",
        author: "Theo Paris",
        icon: "table",
        tags: ["flip", "color"],
        main: async (state) => {
            try {
                state.text = "#" + rgbToHex(state.text);
            } catch {
                state.text = "Invalid RGB string.";
            }
        },
    },
];
