import { Decoding, TextDecoding } from "../common/types";

export const urlDecoder = async (inputText: string): Promise<Decoding[]> => {
    const decoded = decodeURIComponent(inputText);

    return [
        new TextDecoding('URL Encoded text', decoded == inputText ? 0 : 1000, decoded)
    ]
}

