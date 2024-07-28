import { TextDecoding } from "../common/types";

// if it is base64, try to decode it
export const base64Decoder = async (inputText: string) => {
    const match = inputText.match(/[A-Za-z0-9+\/]+={0,2}/);
    if (match) {
        const decoded = atob(match[0]);
        return [new TextDecoding('base64', 900, decoded)];
    }
};
