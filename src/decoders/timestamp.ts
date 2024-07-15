// if it is a number, try to use it as seconds or milliseconds since the epoch
export const timestamp=async (inputText:string|number) => {
    const isNumber = inputText != null && inputText !=='' && !isNaN(Number(inputText.toString()));
    const currentMillis = Date.now();
    const currentSeconds = currentMillis/1000;
    
    if (isNumber) {
        const asNumber = Number(inputText);
        return [
            {name: 'ms timestamp', text: new Date(asNumber).toString(), score: 1000-500*Math.abs(asNumber-currentMillis)/3E+11},
            {name: 'sec timestamp', text: new Date(asNumber*1000).toString(), score: 1000-500*Math.abs(asNumber-currentSeconds)/3E+8},
        ];
    }
};


