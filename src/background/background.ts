import { TextDecoder, Decoding } from '../common/types';
import { textDecoders } from '../decoders';

chrome.contextMenus.onClicked.addListener(async function(info) {
    if (info.menuItemId === 'decode') {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        const decodings = await getDecodings(info.selectionText);
        await chrome.tabs.sendMessage(tab.id, {text: info.selectionText.toString(), decodings});
    }
});
                                          
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      title: 'decode %s', 
      contexts: ['selection'], 
      id: 'decode'});
});

const getDecodings: TextDecoder = async (inputText:string) =>  {
    let rv:Decoding[] = [];
    for (const decoder of textDecoders) {
        try {
          const result = await decoder(inputText);
          if (result) {
              rv=rv.concat(result);
          }
        } catch (e) {
            // nop, just skip this decoding
        }
    }        
    return rv.sort((x,y)=>Math.min(1000,y.score)-Math.min(1000,x.score));
}

