//keep track of which tabs the script has been inserted to
const injectedToTab: { [key: number]: boolean} = {};

chrome.contextMenus.onClicked.addListener(async function(info) {
    if (info.menuItemId === 'decode') {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        if (!injectedToTab[tab.id]) {
            injectedToTab[tab.id]=true;
            const target = {tabId: tab.id, allFrames: true};
            console.log("injecting to ", tab);
            await chrome.scripting.insertCSS(
                {
                    target,
                    files: ['content-script.css']
                }
            );
            await chrome.scripting.executeScript(
                {
                    target, 
                    files: ['content-script.js']
                }
            );                
        }
        await chrome.tabs.sendMessage(tab.id, {text: info.selectionText.toString()});
    }
});
                                          
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      title: 'decode %s', 
      contexts: ['selection'], 
      id: 'decode'});
});

