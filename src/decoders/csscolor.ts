import { Decoding, HTMLDecoding } from "../common/types";

function colorHelper(inputText: string, regex: RegExp, fixup = (x:string):string => x) {
    const matches = inputText.match(regex);
    if (matches) {
        const score = 1000*matches[0].length/inputText.length;
        return [new HTMLDecoding('CSS color', score, `<div style="width:1em; height:1em; background-color:${fixup(matches[0])}"/>`)];
    } else {
        return [];
    }
}

// if it is a css color, make a swatch to view it.
export const cssColorDecoder = async (inputText: string): Promise<Decoding[]> => {

    const s = new Option().style;
    s.color = inputText;
    if (s.color != '') {
        return [new HTMLDecoding('CSS color', 1000, `<div style="width:1em; height:1em; background-color:${s.color}"/>`)];
    }
    // try prerpending a '#' this is usually excluded from the text selection
    s.color = `#${inputText}`
    if (s.color != '') {
        return [new HTMLDecoding('CSS color', 1000, `<div style="width:1em; height:1em; background-color:${s.color}"/>`)];
    }
};
