export abstract class Decoding {
    private name: string;
    private score: number;
    abstract readonly type: string;

    public constructor(name: string, score: number) {
        this.name=name;
        this.score=score;
    }

    abstract render(): HTMLElement;

    serialize(): string {
        return JSON.stringify(this);
    }

    static deserialize(input: string): Decoding {
        const {type} = JSON.parse(input);
        switch (type) {
            case 'TextDecoding':
                return TextDecoding.deserialize(input);
            case 'HTMLDecoding':
                return HTMLDecoding.deserialize(input);
            }
    }

    getName(): string {
        return this.name;
    }

    getScore(): number {
        return this.score;
    }
}

export class TextDecoding extends Decoding {
    readonly type = 'TextDecoding';
    private text: string;

    constructor(name: string, score: number, text: string) {
        super(name, score);
        this.text = text;
    }

    static deserialize(input: string): TextDecoding {
        const {name, score, text} = JSON.parse(input);
        return new TextDecoding(name, score, text);
    }

    render(): HTMLElement {
        const el = document.createElement('p');
        el.innerText = this.text;
        return el;
    }
}

export class HTMLDecoding extends Decoding {
    readonly type = 'HTMLDecoding';
    private html: string;

    constructor(name: string, score: number, html: string) {
        super(name, score);
        this.html = html;
    }

    static deserialize(input: string): HTMLDecoding {
        const {name, score, html} = JSON.parse(input);
        return new HTMLDecoding(name, score, html);
    }

    render(): HTMLElement {
        const el = document.createElement('div');
        el.innerHTML = this.html;
        return el;
    }
}

export type TextDecoder = (inputText: string) => Promise<Decoding[]>;

