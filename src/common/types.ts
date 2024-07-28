export abstract class Decoding {
    private name: string;
    private score: number;

    public constructor(name: string, score: number) {
        this.name=name;
        this.score=score;
    }

    abstract render(): HTMLElement;

    getName(): string {
        return this.name;
    }

    getScore(): number {
        return this.score;
    }
}

export class TextDecoding extends Decoding {
    private text: string;

    constructor(name: string, score: number, text: string) {
        super(name, score);
        this.text = text;
    }

    render(): HTMLElement {
        const el = document.createElement('p');
        el.innerText = this.text;
        return el;
    }
}

export class HTMLDecoding extends Decoding {
    private html: string;

    constructor(name: string, score: number, html: string) {
        super(name, score);
        this.html = html;
    }

    render(): HTMLElement {
        const el = document.createElement('div');
        el.innerHTML = this.html;
        return el;
    }
}

export type TextDecoder = (inputText: string) => Promise<Decoding[]>;

