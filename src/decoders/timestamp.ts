import { TextDecoding } from "../common/types";

// if it is a number, try to use it as seconds or milliseconds since the epoch
export const timestamp=async (inputText:string|number) => {
    const isNumber = inputText != null && inputText !=='' && !isNaN(Number(inputText.toString()));
    const currentMillis = Date.now();
    const currentSeconds = currentMillis/1000;
    
    if (isNumber) {
        const asNumber = Number(inputText);
        return [
            new TextDecoding('ms timestamp', 1000-500*Math.abs(asNumber-currentMillis)/3E+11, new Date(asNumber).toString()),
            new TextDecoding('sec timestamp', 1000-500*Math.abs(asNumber-currentSeconds)/3E+8, new Date(asNumber*1000).toString()),
        ];
    }
};


