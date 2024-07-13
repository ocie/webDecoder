const dialog = document.createElement('dialog');
dialog.id = 'decoder-base';

document.body.appendChild(dialog);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    newChildren=[];

    const close = document.createElement('button');
    close.onclick = (e) => {e.preventDefault(); dialog.close();}
    close.innerText = '[X]';
    newChildren.push(close);
    const p = document.createElement('p');
    newChildren.push(p);
    const maxLength=64;
    const selection = request.text.substring(0,64);
    const elipsis = request.text.length > maxLength;
    p.innerText = 'You selected ' + request.text.substring(0,64) + (elipsis?'...':'');
    for (decoding of request.decodings) {
        const sub = document.createElement('p');
        newChildren.push(sub);
        sub.innerText = `${decoding.name}: ${decoding.text}`;
    }
    dialog.replaceChildren(...newChildren);
    dialog.show();
});
