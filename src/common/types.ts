export type Decoding = {
    name: string;
    text: string;
    score: number;
};

export type TextDecoder = (inputText: string) => Promise<Decoding[]>;

