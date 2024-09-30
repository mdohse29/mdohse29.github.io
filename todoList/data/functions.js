let targetElement = null;
let errorTimeoutID = NaN;

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

                    if ((targetElement && (element !== targetElement))){
                        
                        break;
                        
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

function rmvTimeout(){

    if (errorTimeoutID){

        clearTimeout(errorTimeoutID);
        errorTimeoutID = NaN;

    }

}

function errorMsg(message = 'Empty items or duplicate items are not accepted. Check your entry and try again.'){
    let currentMsg = document.querySelector('article.is-danger');

    rmvTimeout();

    if (currentMsg){

        currentMsg.remove();

    }

    document.querySelector('body').prepend(nestElem([

        mkElem({elemType:'article', class:'message is-small is-danger', listeners:[{type:'mouseenter', execute:manRmvMsg}]}),
        {

            1:nestElem([
                mkDiv({class:'message-header is-justify-content-end'}),
                mkBtn({class:'delete', listeners:[{type:'click', execute:removeMsg}]})
            ]),
            2:mkDiv({class:'message-body', inner:message})

        }

    ]));

    let newMessage = document.querySelector('article.message');

    newMessage.setAttribute('style', 'left: calc(100% - ' + (newMessage.scrollWidth + 25) + 'px);');
    document.querySelector('#item').classList.add('is-danger');

    errorTimeoutID = setTimeout(removeMsg, 5000);

}

function manRmvMsg(){

    rmvTimeout();

    this.addEventListener('mouseleave', removeMsg);

}

function removeMsg(){

    let currentMsg = document.querySelector('article.is-danger');

    if (currentMsg){

        rmvTimeout();
        currentMsg.remove();
        
        document.querySelector('#item').focus();

    }


}

function resetListBtn(){

    document.querySelector('#item').classList.remove('is-danger');

    removeMsg();

    document.querySelectorAll('.listBtn button').forEach(btn => {

        if (btn.id === 'addItem'){

            btn.classList.remove('dnone');

        }else{

            btn.classList.add('dnone');

        }

    });

}

function moListItem(){

    let bgCheck = document.querySelectorAll('i.has-background-item');

    if (bgCheck)
        bgCheck.forEach(bg => {
            bg.classList.remove('has-background-item');
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
    resetListBtn();

    document.querySelector('#item').value = '';
            
    targetElement = ((event.target.tagName === 'I') ? event.target.parentElement : event.target);

    openOptions(event);
    
}

function clkEdit(){

    let input = document.querySelector('#item');
    let icon = targetElement.querySelector('i');
    let subItems = targetElement.querySelectorAll('#listSubItem');
    let text = getItemText(targetElement);
    let newText = input.value.trim();

    if (newText && !dupeCheck(newText)){

        text = text.replace(text, newText);
        text = text.replace(text.substring(0, 1), text.substring(0, 1).toUpperCase());
        targetElement.innerText = text;
        targetElement.prepend(icon);

        subItems.forEach(item => {
            targetElement.appendChild(item);
        });

        document.querySelector('#editItem').classList.add('dnone');
        document.querySelector('#addItem').classList.remove('dnone');
        input.value = '';

        setCookie();

        targetElement = null;

    }else{

        errorMsg();
        input.value = text;
        input.focus();

    }

}

function clkUndoItem(){

    let elem = targetElement;
    let isSub = (elem.id === 'listSubItem');

    if (isSub){

        let parent = document.querySelector('#list p[pid="' + elem.getAttribute('pid') + '"]');

        setAllCaret(elem);

        elem.classList.remove('has-background-item');
        elem.removeEventListener('click', clkListItem);

            changeTitle(elem);

        if (parent){

            parent.appendChild(elem);
            setCookie();

        }else{

            elem.remove();

            document.querySelector('#list').appendChild(createItem(elem.innerText));

            setCookie();

        }

    }else{

        let icons = elem.querySelectorAll('i');
        let children = elem.querySelectorAll('#listSubItem');

        children.forEach(child => {
            changeTitle(child);
        });

        icons.forEach(icon => {

            icon.classList.remove('has-background-item');
            icon.parentElement.classList.remove('has-background-item');

        });

        setAllCaret(elem);

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
        checkDone.remove();

    targetElement = null;

}

function toggleLstBtn(event){

    let target = event.target;

    if (target.tagName === 'I'){
        target = target.parentElement;
    }

    closeOptions();

    if (target.id === 'edit'){

        document.querySelector('#item').value = getItemText(targetElement);
        document.querySelector('#editItem').classList.remove('dnone');
        document.querySelector('#addSub').classList.add('dnone');

    }else if (target.id === 'crtSub'){

        document.querySelector('#addSub').classList.remove('dnone');
        document.querySelector('#editItem').classList.add('dnone');

    }
    
    document.querySelector('#addItem').classList.add('dnone');
    document.querySelector('#item').focus();

}

function changeTitle(elem){

    if (!elem.title.includes('Click to Undo')){

        elem.title = 'Click to Undo';

    }else{

        elem.title = 'Click for Options'

    }

}

function getItemText(elem){

    return ((elem.id === 'listItem' && elem.innerText.includes('\n')) ? elem.innerText.substring(0, elem.innerText.indexOf('\n')) : elem.innerText);

}

function setAllCaret(elem){

    let icons = elem.querySelectorAll('i');

    icons.forEach(icon => {

        icon.classList.replace('bi-check-circle-fill', ((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'));
        icon.classList.remove('has-text-success');

    });

}

function setAllCheck(elem, isDone = false){

    let icons = elem.querySelectorAll('i');

    icons.forEach(icon => {

        icon.classList.replace(((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'), 'bi-check-circle-fill');

        if (isDone){

            icon.classList.remove('has-text-success');

        }else{

            icon.classList.add('has-text-success');

        }

    });

}

function createItem(item, data = {isSub:false, pid:NaN}){

    let elem = mkElem(
        {
            elemType:((data.isSub) ? 'span' : 'p'),
            class:((data.isSub) ? '' : 'mb-2'),
            title:'Click for Options', 
            id:((data.isSub) ? 'listSubItem' : 'listItem'),
            pid:((data.isSub) ? data.pid : crypto.randomUUID()),
            inner:item.substring(0, 1).toUpperCase() + item.substring(1),
            listeners:((data.isSub) ? [
                {
                    type:'mouseover',
                    execute:moSubItem
                },
                {
                    type:'mouseleave',
                    execute:mlSubItem
                }
            ]:[
                {
                    type:'mouseover',
                    execute:moListItem
                },
                {
                    type:'mouseleave',
                    execute:mlLitsItem
                },
                {
                    type:'click',
                    execute:clkListItem
                }
            ])
        }
    );

    elem.prepend(mkElem({elemType:'i', class:'bi ' + ((data.isSub) ? 'bi-caret-right' : 'bi-caret-right-fill')}));

    return elem;

}

function doneContainer(){

    return nestElem([
        mkDiv({class:'card-content pt-0', id:'done'}),
        {
            1:mkElem({elemType:'h4', class:'h4', inner:'<i class="bi bi-check-circle-fill has-text-success"></i>Done!'}),
            2:mkP({id:'doneSubs'})
        }
    ]);

}

function moveElement(elem){
    if (elem.id === 'listItem'){

        let doneChildren = document.querySelectorAll('#doneSubs #listSubItem');
        let children = elem.querySelectorAll('#listSubItem');

        if (children.length){

            children.forEach(child => {
                
                changeTitle(child);
                setAllCheck(child, true);

            });

        }

        elem.querySelector('i').classList.remove('has-background-item', 'has-text-success');

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
    
    if (elem.tagName === 'I'){
        elem = elem.parentElement;
    }

    setAllCheck(elem);

    setTimeout(() => {

        if (!document.querySelector('#done')){
            document.querySelector('#list-container').appendChild(doneContainer());
        }

        elem.remove();
        moveElement(elem);
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

function setCookie(cookieName = 'list'){

    let items = document.querySelector('#list').querySelectorAll('#listItem'); // ptag ref
    let itemText = '';

    items.forEach(item => {

        itemText += item.innerText.replaceAll('\n', '|') + ',';

    });

    if (itemText){

        document.cookie = cookieName + '=' + itemText.substring(0, itemText.length - 1) + ';max-age=31536000;samesite=none;secure';

        if (document.cookie.length > 3000){

            errorMsg('Please start completing items on the list.<br><br>There is < 1000 bytes of storage left.');

        }

    }else{

        document.cookie = cookieName + '=;max-age=0;samesite=none;secure';

    }

}

function closeOptions(){

    let options = document.querySelector('.options');

    options.remove();

}

function openOptions(clickEvent){

    let container = document.querySelector('.container');

    if (container.querySelector('.options')){
        closeOptions();
    }
    
    if ((targetElement.id === 'listItem' && targetElement.parentElement.id === 'done') ||
    (targetElement.id === 'listSubItem' && targetElement.parentElement.parentElement.id === 'done')){

        container.appendChild(nestElem([

            mkDiv({class:'options', style:'top: ' + (clickEvent.y - 30) + 'px; left: ' + (clickEvent.x - 27) + 'px;'}),
            mkDiv({class:'card'}),
            mkDiv({class:'card-content p-0'}),
            {
                1:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', title:'Add list item back', id:'undo', inner:'<i class="bi bi-arrow-counterclockwise"></i>&nbsp;Undo', listeners:[{type:'click', execute:clkUndoItem}]}),
                2:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-danger is-outlined', id:'cancel', inner:'<i class="bi bi-x-circle"></i>&nbsp;Cancel', listeners:[{type:'click', execute:closeOptions}]})
            }

        ]));

    }else if (targetElement.id === 'listSubItem'){

        container.appendChild(nestElem([

            mkDiv({class:'options', style:'top: ' + (clickEvent.y - 30) + 'px; left: ' + (clickEvent.x - 27) + 'px;'}),
            mkDiv({class:'card'}),
            mkDiv({class:'card-content p-0'}),
            {
                1:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-success is-outlined', title:'Mark to-do item done', id:'tadone', inner:'<i class="bi bi-check-circle"></i>&nbsp;Complete', listeners:[{type:'click', execute:complete}]}),
                2:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', title:'Edit list item', id:'edit', inner:'<i class="bi bi-pencil"></i>&nbsp;Edit', listeners:[{type:'click', execute:toggleLstBtn}]}),
                3:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-danger is-outlined', id:'cancel', inner:'<i class="bi bi-x-circle"></i>&nbsp;Cancel', listeners:[{type:'click', execute:closeOptions}]})
            }

        ]));

    }else{

        container.appendChild(nestElem([

            mkDiv({class:'options', style:'top: ' + (clickEvent.y - 30) + 'px; left: ' + (clickEvent.x - 27) + 'px;'}),
            mkDiv({class:'card'}),
            mkDiv({class:'card-content p-0'}),
            {
                1:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-success is-outlined', title:'Mark to-do item done', id:'tadone', inner:'<i class="bi bi-check-circle"></i>&nbsp;Complete', listeners:[{type:'click', execute:complete}]}),
                2:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-link is-outlined', title:'Create a sub list item', id:'crtSub', inner:'<i class="bi bi-plus-circle-dotted"></i>&nbsp;Sub Item', listeners:[{type:'click', execute:toggleLstBtn}]}),
                3:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', title:'Edit list item', id:'edit', inner:'<i class="bi bi-pencil"></i>&nbsp;Edit', listeners:[{type:'click', execute:toggleLstBtn}]}),
                4:mkBtn({class:'button is-small ml-2 mr-2 is-rounded is-danger is-outlined', id:'cancel', inner:'<i class="bi bi-x-circle"></i>&nbsp;Cancel', listeners:[{type:'click', execute:closeOptions}]})
            }

        ]));

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

        errorMsg();
        console.log("Empty or duplicate Item. Nothing Added.");

    }

    input.value = '';
    document.querySelector('#item').focus();
    if (!input.classList.contains('is-danger')){

        document.querySelector('#addItem').classList.remove('dnone');
        document.querySelector('#addSub').classList.add('dnone');

        targetElement = null;

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

        errorMsg();
        console.log("Empty or duplicate Item. Nothing Added.");

    }

    input.value = '';
    document.querySelector('#item').focus();

}

function exportListStr(){

    removeMsg();
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
            if (submit.classList.contains('dnone'))
                submit = document.querySelector('#addSub');

            submit.setAttribute('disabled', 'disabled');
            this.classList.add('is-success');
            this.value = 'Exported to Clipboard!';

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

function inputKeyActions(event){

    if (event.keyCode === 13){

        let buttons = document.querySelectorAll('.listBtn button');

        buttons.forEach(btn => {

;            if (!btn.classList.contains('dnone')){

                btn.click();
                return;

            }

        });

    }else if (event.keyCode === 27){

        document.querySelector('#item').value = '';
        document.querySelector('#item').classList.remove('is-danger');
        removeMsg();

        resetListBtn();
    }

}

function complete(){

    closeOptions();
    removeItem(targetElement);

    targetElement = null;

}

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