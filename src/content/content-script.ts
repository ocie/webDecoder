import { Decoding } from '../common/types';
import { textDecoders } from '../decoders';

const getDecodings = async (inputText:string):Promise<Decoding[]> =>  {
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
    return rv.sort((x,y)=>Math.min(1000,y.getScore())-Math.min(1000,x.getScore()));
}


chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {

    const oldDialogs = document.querySelectorAll('.decoder-base');
    oldDialogs.forEach(d => d.remove());
    const dialog = document.createElement('dialog');

    const dialogContents = document.createElement('div');
    dialogContents.attachShadow({mode: 'open'});
    if (dialogContents?.shadowRoot) {
        dialogContents.shadowRoot.innerHTML = '<style>:host {all: initial;}</style>'
    }
    dialog.className = 'decoder-base';
    dialog.appendChild(dialogContents);
    document.body.appendChild(dialog);

    const {text} = request;
    const decodings = await getDecodings(text);

    const header = document.createElement('div');
    header.className = 'decoder-head';
    dialogContents?.shadowRoot.appendChild(header);

    const body = document.createElement('div');
    body.className = 'decoder-content';
    dialogContents?.shadowRoot.appendChild(body);

    const closeForm = document.createElement('form');
    closeForm.method='dialog';
    const closeButton = document.createElement('button');
    closeButton.innerText = '[X]';
    closeForm.appendChild(closeButton);
    header.appendChild(closeForm);

    const maxLength=64;
    const elipsis = request.text.length > maxLength;
    const p = document.createElement('p');
    p.innerText = 'You selected ' + request.text.substring(0,maxLength) + (elipsis?'...':'');
    header.appendChild(p);

    const newChildren=[];
    for (const decoding of decodings) {
        const item = document.createElement('div');
        item.className = 'decoder-item';
        const name = document.createElement('p')
        name.innerText = decoding.getName();
        item.appendChild(name);

        item.appendChild(decoding.render());
        newChildren.push(item);
    }
    body.replaceChildren(...newChildren);
    dialog.showModal();
});
