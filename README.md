web decoder
===

This is a chrome extension that decodes the text selected by the user.  Each decoding is given a score to try and put the most helpful decodings at the top.

To use the extension, simply right click on any text on a page and choose the "decode" option from the context menu.

The contents of the repo are currently the plugin,  You can deploy it locally by downloading the files and using the "load unpacked".

Todo
---
- [ ] scroll bars for results
- [ ] build from typescript sources
- [ ] display text to be decoded in the context menu instead of popup
- [ ] place popup so it doesn't cover the cursor
- [ ] allow user to select placement of popup
- [ ] allow user to write their own decoders
- [ ] import react and improve UI
- [ ] decode images
