chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const dialog = document.createElement('dialog');
    dialog.className = 'decoder-base';
    document.body.appendChild(dialog);
    
    const header = document.createElement('div');
    header.className = 'decoder-head';
    dialog.appendChild(header);

    const body = document.createElement('div');
    body.className = 'decoder-content';
    dialog.appendChild(body);

    const close = document.createElement('button');
    close.onclick = (e) => {e.preventDefault(); dialog.close();}
    close.innerText = '[X]';
    header.appendChild(close);

    const maxLength=64;
    const elipsis = request.text.length > maxLength;
    const p = document.createElement('p');
    p.innerText = 'You selected ' + request.text.substring(0,maxLength) + (elipsis?'...':'');
    header.appendChild(p);

    const newChildren=[];
    for (const decoding of request.decodings) {
        const sub = document.createElement('p');
        newChildren.push(sub);
        sub.innerText = `${decoding.name}: ${decoding.text}`;
    }
    body.replaceChildren(...newChildren);
    dialog.show();
});
