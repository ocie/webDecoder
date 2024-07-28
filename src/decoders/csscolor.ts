import { Decoding, HTMLDecoding } from "../common/types";

// if it is base64, try to decode it
export const cssColorDecoder = async (inputText: string): Promise<Decoding[]> => {
    if (inputText.match(/^#[a-f0-9]+$/i)) {
        return [new HTMLDecoding('CSS color', 1000, `<div style="width:1em; height:1em; background-color:${inputText}"/>`)];
    }
};
