let targetElement = null;

function dupeCheck(item){

    let currentList = document.querySelectorAll('#list > p');

    if (currentList){

        for (let element of currentList){

            if(element.children.length > 1){

                let items = element.innerText.split('\n');

                for (let i of items){

                    if (i.toLowerCase() === item.toLowerCase()){

                        return true;

                    }

                }

            }else{

                if (element.innerText.toLowerCase() === item.toLowerCase()){

                    return true;

                }

            }

        }

    }

    return false;
}

function moListItem(){

    let bgCheck = document.querySelectorAll('i.has-background-item');

    if (bgCheck)
        bgCheck.forEach(bg => {
            bg.classList.remove('has-background-item')
        });

    this.querySelector('i').classList.add('has-background-item');
}

function moSubItem(){

    let bgCheck = document.querySelectorAll('span.has-background-item');

    if (bgCheck)
        bgCheck.forEach(bg => {
            bg.classList.remove('has-background-item')
        });

    this.classList.add('has-background-item');
}

function mlLitsItem(){

    this.querySelector('i').classList.remove('has-background-item');

}

function mlSubItem(){

    this.classList.remove('has-background-item');

}

function clkListItem(event){
            
    targetElement = ((event.target.tagName === 'I') ? event.target.parentElement : event.target);

    openOptions(event);
    
}

function changeTitle(elem){

    if (!elem.title.includes('Click to Undo')){

        elem.title = 'Click to Undo';

    }else{

        elem.title = 'Click for Options'

    }

}

function setAllCaret(elem){
    let icons = elem.querySelectorAll('i');

    icons.forEach(icon => {
        icon.classList.replace('bi-check-circle-fill', 'bi-caret-right-fill');
    });
}

function setAllCheck(elem){
    let icons = elem.querySelectorAll('i');

    icons.forEach(icon => {
        icon.classList.replace('bi-caret-right-fill', 'bi-check-circle-fill');
    });
}

function clkUndoItem(){

    let elem = targetElement;
    let isSub = (elem.id === 'listSubItem');

    if (isSub){

        let parent = document.querySelector('#list p[pid="' + elem.getAttribute('pid') + '"]');

        elem.querySelector('i').classList.remove('has-text-success', 'bi-check-circle-fill');
        elem.querySelector('i').classList.add('bi-caret-right-fill');
        elem.classList.remove('has-background-item');
        elem.removeEventListener('click', clkListItem);

            changeTitle(elem);

        if (parent){

            parent.appendChild(elem);
            setCookie();

        }else{
            // To undo a single item without the parent remove the following
            // elem = elem.parentElement; // remove

            // setAllCaret(elem); // remove
            // changeTitle(elem); // remove

            // elem.querySelectorAll('#listSubItem').forEach(child => { //remove
            //     changeTitle(child);
            // });

            elem.remove();

            document.querySelector('#list').appendChild(createItem(elem.innerText)); // uncomment
            // document.querySelector('#list').appendChild(elem); // remove
            setCookie();

        }

    }else{

        let icons = elem.querySelectorAll('i');
        let children = elem.querySelectorAll('#listSubItem');

        children.forEach(child => {
            changeTitle(child);
        });

        icons.forEach(icon => {

            icon.classList.remove('has-text-success', 'bi-check-circle-fill', 'has-background-item');
            icon.classList.add('bi-caret-right-fill');
            icon.parentElement.classList.remove('has-background-item');

        });

        elem.remove();
        elem.removeEventListener('click', clkUndoItem);
        elem.addEventListener('click', clkListItem);

        changeTitle(elem);

        document.querySelector('#list').appendChild(elem);
        setCookie();

    }

    closeOptions();

    let checkDone = document.querySelector('#done');

    if (checkDone && checkDone.querySelectorAll('#listItem, #listSubItem').length === 0)
        document.querySelector('#done').remove();

}

function createItem(item, data = {isSub:false, pid:NaN}){

    let elem = document.createElement(((data.isSub) ? 'span' : 'p'));
    let marker = document.createElement('i');

    marker.classList.add('bi', 'bi-caret-right-fill');
    elem.innerHTML = item.substring(0, 1).toUpperCase() + item.substring(1);
    elem.title = 'Click for Options';
    elem.id = ((data.isSub) ? 'listSubItem' : 'listItem');

    elem.prepend(marker);

    if (!data.isSub){

        elem.setAttribute('pid', crypto.randomUUID());
        elem.classList.add(['mb-2']);
        elem.addEventListener('mouseover', moListItem);
        elem.addEventListener('mouseleave', mlLitsItem)
        elem.addEventListener('click', clkListItem);

    }else{

        elem.setAttribute('pid', data.pid);
        elem.addEventListener('mouseover', moSubItem);
        elem.addEventListener('mouseleave', mlSubItem);
    }

    return elem;

}

function doneContainer(){

    let container = document.createElement('div');
    let head = document.createElement('h4');
    let phForSubs = document.createElement('p');
    let icon = document.createElement('i');

    container.classList.add('card-content', 'pt-0');
    container.id = 'done';
    head.classList.add('h4');
    head.innerText = "Done!";
    icon.classList.add('bi','bi-check-circle-fill','has-text-success');
    phForSubs.id = 'doneSubs';

    head.prepend(icon);
    container.appendChild(head);
    container.appendChild(phForSubs);

    return container;

}

function moveElement(elem){
    if (elem.id === 'listItem'){

        let doneChildren = document.querySelectorAll('#doneSubs #listSubItem');
        let children = elem.querySelectorAll('#listSubItem');

        if (children.length){

            children.forEach(child => {
                
                changeTitle(child);

                child.querySelector('i').classList.remove('bi-caret-right-fill');
                child.querySelector('i').classList.add('bi-check-circle-fill');

            });

        }

        elem.querySelector('i').classList.remove('has-background-item', 'has-text-success');

        // elem.removeEventListener('click', clkListItem);
        // elem.addEventListener('click', clkUndoItem);

        if (doneChildren.length){

            doneChildren.forEach(child => {

                if (child.getAttribute('pid') === elem.getAttribute('pid')){

                    child.removeEventListener('click', clkListItem);
                    child.remove();
                    elem.appendChild(child);
                }

            });

        }

        changeTitle(elem);

        document.querySelector('#done').appendChild(elem);

    }else{

        changeTitle(elem);

        elem.querySelector('i').classList.remove('has-text-success');

        elem.addEventListener('click', clkListItem);
        document.querySelector('#doneSubs').appendChild(elem);

    }
}

function removeItem(elem){
    let icon = elem;

    if (icon.tagName != 'I'){

        icon = elem.querySelector('i');

    }

    icon.classList.remove('bi-caret-right-fill')
    icon.classList.add('bi-check-circle-fill', 'has-text-success');

    setTimeout(() => {
        let parent = icon.parentElement;

        if (!document.querySelector('#done')){
            let sib = document.querySelector('.card > .card-footer');
            sib.insertAdjacentElement('beforebegin', doneContainer());
        }

        parent.remove();
        moveElement(parent);
        setCookie();
    }, 1000);

}

function getCookie(){

    let data = document.cookie;

    data = data.split(';');

    for (let cookie in data){

        let cookieData = data[cookie].split('=');

        if (cookieData[0] === 'list'){
            return cookieData[1];
        }

    }

}

function setCookie(){

    let items = document.querySelector('#list').querySelectorAll('#listItem'); // ptag ref
    let itemText = '';

    items.forEach(item => {

        itemText += item.innerText.replaceAll('\n', '|') + ',';

    });

    if (itemText){

        document.cookie = 'list=' + itemText.substring(0, itemText.length - 1) + ';max-age=31536000;samesite=none;secure';

    }else{

        document.cookie = 'list=;max-age=0;samesite=none;secure';

    }

}

function closeOptions(){

    let options = document.querySelector('.options');

    options.classList.add('dnone');
    options.removeAttribute('style');

    options.querySelector('#undo').classList.add('dnone');
    options.querySelector('#rmv').classList.remove('dnone');
    options.querySelector('#crtSub').classList.remove('dnone');

}

function openOptions(clickEvent){

    let options = document.querySelector('.options');
    let target = clickEvent.target;

    options.classList.remove('dnone');
    options.setAttribute('style', 'top: ' + (clickEvent.y - 30) + 'px; left: ' + (clickEvent.x - 27) + 'px;');

    if (target.tagName === 'I'){

        target = target.parentElement;

    }

    if (target.id === 'listItem'){

        if (target.parentElement.id === 'done'){

            options.querySelector('#undo').classList.remove('dnone');
            options.querySelector('#rmv').classList.add('dnone');
            options.querySelector('#crtSub').classList.add('dnone');

        }

    }else if (target.id === 'listSubItem'){

        console.log(target.parentElement.parentElement);
        if (target.parentElement.parentElement.id === 'done'){

            options.querySelector('#undo').classList.remove('dnone');
            options.querySelector('#rmv').classList.add('dnone');
            options.querySelector('#crtSub').classList.add('dnone');

        }else if (target.parentElement.parentElement.id === 'list'){

            options.querySelector('#crtSub').classList.add('dnone');

        }

    }

}

function addSub(){
            
    let input = document.querySelector('#item');
    let item = input.value;

    if ((item) && (!dupeCheck(item))){

        if (item.includes(',')){

            let items = item.split(',');

            for (let i of items){

                if (!dupeCheck(i.trim())){

                    targetElement.appendChild(createItem(i.trim(), {isSub:true, pid:targetElement.getAttribute('pid')}));
                    setCookie();

                }

            }

        }else{

            targetElement.appendChild(createItem(item.trim(), {isSub:true, pid:targetElement.getAttribute('pid')}));
            setCookie();

        }

    }else{

        input.classList.add('is-danger');
        console.log("Empty or duplicate Item. Nothing Added.");

    }

    input.value = '';
    document.querySelector('#item').focus();
    if (!input.classList.contains('is-danger')){

        document.querySelector('#addItem').classList.remove('dnone');
        document.querySelector('#addSub').classList.add('dnone');

    }

}

function addItem(){

    let input = document.querySelector('#item');
    let item = input.value;

    if ((item) && (!dupeCheck(item))){

        if (item.includes(',')){

            let items = item.split(',');

            for (let i of items){

                if (!dupeCheck(i.trim())){

                    document.querySelector('#list').appendChild(createItem(i.trim()));
                    setCookie();

                }

            }

        }else{

            document.querySelector('#list').appendChild(createItem(item.trim()));
            setCookie();

        }

    }else{

        input.classList.add('is-danger')
        console.log("Empty or duplicate Item. Nothing Added.");

    }

    input.value = '';
    document.querySelector('#item').focus();

}

function exportListStr(){

    document.querySelector('#item').classList.remove('is-danger');
    
    if (this.value === 'export'){

        let items = document.querySelector('#list').querySelectorAll('p');
        let itemText = '';

        items.forEach(item => {

            itemText += item.innerText.replaceAll('\n', '|') + ',';

        });

        if (itemText){

            // alert(itemText.substring(0, itemText.length - 1))
            navigator.clipboard.writeText(itemText.substring(0, itemText.length - 1));
            // console.log(getCookie());

            let submit = document.querySelector('#addItem');

            submit.setAttribute('disabled', 'disabled');
            this.classList.add('is-success');
            this.value = 'Export Complete!';

            setTimeout(() => {
                this.value = '';
                this.classList.remove('is-success');
                submit.removeAttribute('disabled');
            }, 1000);

        }else{

            document.cookie = 'list=';
            console.log(getCookie());

        }

    }
    
}

function complete(){

    closeOptions();
    removeItem(targetElement);

}

function toggleSubButton(){

    closeOptions();
    document.querySelector('#addItem').classList.add('dnone');
    document.querySelector('#addSub').classList.remove('dnone');
    document.querySelector('#item').focus();

}

let buttons = document.querySelectorAll('#addItem, #addSub');

buttons.forEach(button => {
    
    if (button.id === 'addItem'){

        button.addEventListener('click', addItem);

    }else{

        button.addEventListener('click', addSub);

    }
    

});

document.querySelector('#item').addEventListener('keydown', function(event){

    if (event.keyCode === 13){

        let buttons = document.querySelectorAll('#addItem, #addSub');

        if (buttons[0].classList.contains('dnone')){

            buttons[1].click();

        }else{

            buttons[0].click();

        }

    }

});

document.querySelector('#item').addEventListener('input', exportListStr);

document.querySelector('#cancel').addEventListener('click', closeOptions);

document.querySelector('#rmv').addEventListener('click', complete);

document.querySelector('#crtSub').addEventListener('click', toggleSubButton);

document.querySelector('#undo').addEventListener('click', clkUndoItem);

window.onload = function(){

    let cookie = getCookie();

    if (cookie){
        
        cookie = cookie.split(',');

        cookie.forEach(item => {

            if (item.includes('|')){

                let subItems = item.slice(item.indexOf('|')+1).split('|');
                let p = createItem(item.substring(0, item.indexOf('|')));

                subItems.forEach(sub => {

                    p.appendChild(createItem(sub, {isSub:true, pid:p.getAttribute('pid')}));

                });

                document.querySelector('#list').appendChild(p);

            }else{

                document.querySelector('#list').appendChild(createItem(item));

            }

        });

    }

}

