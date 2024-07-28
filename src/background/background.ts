chrome.contextMenus.onClicked.addListener(async function(info) {
    if (info.menuItemId === 'decode') {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
        await chrome.tabs.sendMessage(tab.id, {text: info.selectionText.toString()});
    }
});
                                          
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      title: 'decode %s', 
      contexts: ['selection'], 
      id: 'decode'});
});

