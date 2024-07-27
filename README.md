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
- [X] scroll bars for results
- [ ] types for text decoder/binary decoder
- [X] build from typescript sources
- [X] display text to be decoded in the context menu as well as popup
- [ ] place popup so it doesn't cover the cursor
- [ ] allow user to select placement of popup
- [ ] allow user to write their own decoders
- [ ] import react and improve UI
- [ ] decode images
- [ ] publish to chrome extension store
- [ ] better icon
- [ ] allow user to select decoders
- [ ] unit testing
- [ ] allow user to copy to clipboard
- [ ] binary viewer
- [ ] add relative time to timestamp decoders
- [ ] add decoder for css colors
