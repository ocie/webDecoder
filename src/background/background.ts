chrome.contextMenus.onClicked.addListener(async function(info) {
    if (info.menuItemId === 'decode') {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const decodings = await getDecodings(info.selectionText);
        const response = await chrome.tabs.sendMessage(tab.id, {text: info.selectionText.toString(), decodings});
    }
});
                                          
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      title: 'decode', 
      contexts: ['selection'], 
      id: 'decode'});
});

type Decoding = {
    name: string,
    text: string,
    score: number
}

type Decoder = (inputText: string) => Decoding[];

const decoders: Decoder[] = [];

async function getDecodings(inputText:string): Promise<Decoding[]> {
    let rv:Decoding[] = [];
    for (const decoder of decoders) {
        try {
          const result = decoder(inputText);
          if (result) {
              rv=rv.concat(result);
          }
        } catch (e) {
            // nop, just skip this decoding
        }
    }
    console.log(rv);
        
    return rv.sort((x,y)=>Math.min(1000,y.score)-Math.min(1000,x.score));
}

// if it is a number, try to use it as seconds or milliseconds since the epoch
decoders.push((inputText:string|number) => {
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
});

// if it is base64, try to decode it
decoders.push((inputText) => {
    const match = inputText.match(/[A-Za-z0-9+\/]+={0,2}/);
    if (match) {
        const decoded = atob(match[0]);
        return [{name: 'base64', text: decoded, score:900}];
    }
});

