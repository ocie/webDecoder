web decoder
===

This is a chrome extension that decodes the text selected by the user.  Each decoding is given a score to try and put the most helpful decodings at the top.

To use the extension, simply right click on any text on a page and choose the "decode" option from the context menu.

building
---

npm ci
npm run build

Todo
---
- [ ] support unicode (try decoding 4p2k77iP)
- [ ] appears in multiple locations?  Look at "justpaste.it"
- [X] prevent restyling button
- [X] extension not working on initial install
- [ ] i18n
- [X] about info listing libraries, GitHub link
- [XX] not working on Chrome developer site (iframe issue?) 
- [XX] exclude chrome:// URLs or extensions gallery - doesn't look possible.  The contextMenu API only provides an allow list for which URLs the menu will appear in.  I want it for all URLs except for chrome:// and extensions gallery.
- [X] automaticlaly sync version number in manifest with package.json/npm version command
- [X] basic instructions in popup
- [X] evaluate matches in content-script
- [X] close dialog when decoding a new item
- [X] scroll bars for results
- [ ] types for text decoder/binary decoder
- [X] build from typescript sources
- [X] display text to be decoded in the context menu as well as popup
- [ ] place popup so it doesn't cover the cursor
- [ ] allow user to select placement of popup
- [ ] allow user to write their own decoders
- [ ] import react and improve UI
- [ ] decode images
- [X] publish to chrome extension store
- [ ] better icon
- [ ] allow user to select decoders
- [ ] unit testing
- [ ] allow user to copy to clipboard
- [ ] binary viewer
- [ ] add relative time to timestamp decoders
- [X] add decoder for css colors
- [X] uri decoder
- [X] dialog form closure
- [X] dialog remove zindex
