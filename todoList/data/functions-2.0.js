let curList = 'default';
const frameCheck = window.top === window.self;
let errorTimeoutID = NaN;

function popMsg(message = 'Empty items or duplicate items are not accepted.<br>Check your entry and try again.', type = 'danger', timeOut = 5000) {
    let currentMsg = document.querySelector('article.message');
    rmvTimeout();
    if (currentMsg) {
        currentMsg.remove();
    }
    document.querySelector('.card-header.main-bg').prepend(nestElem([
        mkElem({ elemType: 'article', class: `message is-small is-${type}`, listeners: [{ type: 'mouseenter', execute: manRmvMsg }] }),
        {
            1: nestElem([
                mkDiv({ class: 'message-header is-justify-content-end' }),
                mkBtn({ class: 'delete', listeners: [{ type: 'click', execute: removeMsg }] })
            ]),
            2: nestElem([
                mkDiv({ class: 'message-body is-flex is-justify-content-center', style: 'text-align: center;' }),
                mkP({ inner: message })
            ])
        }
    ]));
    document.querySelector('#item').focus();
    if (type==='danger')
        document.querySelector('#item').classList.add('is-danger');
    errorTimeoutID = setTimeout(removeMsg, timeOut);
}

function rmvTimeout() {
    if (errorTimeoutID) {
        clearTimeout(errorTimeoutID);
        errorTimeoutID = NaN;
    }
}

function removeMsg() {
    let currentMsg = document.querySelector('article.message');
    if (currentMsg) {
        rmvTimeout();
        currentMsg.remove();
    }
}

function manRmvMsg() {
    rmvTimeout();
    this.addEventListener('mouseleave', removeMsg);
}

function saveDB(collection){
    window.localStorage.setItem('lists', JSON.stringify(collection));
}

function saveList(ln = null){
    if (!ln)
        ln = curList;
    const list = document.getElementById('list').querySelectorAll('#listItem');
    const collection = getListDB();
    const ListItems = [];
    for(let itm of list){
        const id = itm.getAttribute('pid');
        const item = itm.children[0];
        
        ListItems.push({id:id, text:item.innerText.trim(), subList:(item.nextElementSibling && item.nextElementSibling.children.length)?[...item.nextElementSibling.children].map(itm=>{return itm.innerText}):null});
    }
    
    collection[ln] = ListItems;

    saveDB(collection);
}

function getListDB(ln = null){
    const listDB = window.localStorage.lists;

    if (ln)
        curList = ln;    
    
    if (listDB){
        return (ln)?JSON.parse(listDB)[ln]:JSON.parse(listDB);
    }
    return {};

}

function clearListDB(ln = null){
    if (ln){
        const collection = getListDB();
        if (collection[ln])
            delete collection[ln];
        if (collection)
            saveDB(collection);
    }
}

function itemExists(item){
    const ListItems = getListDB(curList);
    if (ListItems){
        const e = ListItems.filter(li=>{return (li.id === item.id);});
        return (e[0])?ListItems.indexOf(e[0]):null;
    }
    return null;
}

function getItemText(elem) {
    return ((elem.id === 'listItem' && elem.innerText.includes('\n')) ? elem.innerText.substring(0, elem.innerText.indexOf('\n')) : elem.innerText);
}

function doneContainer() {

    return nestElem([
        mkDiv({ class: 'card-content py-3', id: 'done' }),
        {
            1: mkElem({ elemType: 'h4', class: 'h4', inner: '<i class="bi bi-check-circle-fill has-text-success"></i>Done!' }),
            2: mkElem({ elemType: 'ul', id: 'doneSubs' })
        }
    ]);

}

function getContainer(elem){
    let container = elem.parentElement;
    while ((container != null && container.id != 'list' && container.id != 'done')){
        container = container.parentElement;
    }
    return container;
}

function buildListItem(itemText, opt = {sub:false, pid:null}) {
    // returns ul.item-container > li#listItem if regular && li#listSubItem if sub item
    const sublist = document.querySelector(`#listItem[pid="${opt.pid}"] > .sub-list`);

    let elem = mkElem(
        {
            elemType: 'li',
            class: 'fade-in-slow',
            title: 'Click for Options',
            id: ((opt.sub) ? 'listSubItem' : ''),
            pid: ((opt.sub && opt.pid) ? opt.pid : ''),
            inner: (itemText.toLowerCase().includes('http')) ? itemText : itemText.substring(0, 1).toUpperCase() + itemText.substring(1),
            icon: mkElem({ elemType: 'i', class: 'bi ' + ((opt.sub) ? 'bi-caret-right' : 'bi-caret-right-fill') }),
            ident: `${(!opt.sub)?0:(sublist)?sublist.children.length + 1:1}`,
            prop: {
                subItem: (opt.sub)?opt.sub:false
            },
            listeners: [
                {
                    type:'click',
                    execute:openOptions
                },
                {
                    type:'animationend',
                    execute:itemFadeInComplete
                }
            ]
        }
    );

    return (!opt.sub)?(elem = nestElem([mkElem({elemType:'ul', id:'listItem', class:'item-container', pid:(opt.pid)?opt.pid:crypto.randomUUID()}), elem])):elem;

}

function addItem(ev){
    ev.stopPropagation();
    const input = this.parentElement.previousElementSibling;
    const itemText = input.value.trim();
    const list = document.getElementById('list');
    if (itemText){
        itemText.split(',').reverse().forEach(itm=>{
            itm = itm.trim();
            if (itm.length)
                list.prepend(buildListItem(itm));
        });
        saveList();
    }else{
        popMsg('Empty items will be ignored.', 'link', 3000);
    }
    resetSelectedItem();
    resetListBtn();
}

function addSubItem(ev){
    ev.stopPropagation();
    const data = getSelectedItemData();
    const input = this.parentElement.previousElementSibling;
    const itemText = input.value.trim();
    const parent = document.querySelector(`#list #listItem[pid="${data.pid}"]`);
    if (parent.children.length === 1 && itemText){
        parent.append(mkElem({elemType:'ul', class:'sub-list'}));
    }

    if (itemText){
        itemText.split(',').forEach(i=>{
            i = i.trim();
            if (i.length)
                parent.children[1].append(buildListItem(i, {sub:true, pid:data.pid}))
        });
        saveList();
    }else{
        popMsg('Empty items will be ignored.', 'link', 3000);
    }

    resetSelectedItem();
        resetListBtn();
}

function setAllCaret(elem) {

    let icons = ((elem.subItem)?elem:elem.parentElement).querySelectorAll('i');

    icons.forEach(icon => {

        icon.classList.replace('bi-check-circle-fill', ((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'));
        icon.classList.remove('has-text-success');

    });

}

function setAllCheck(elem, isDone = false) {
    let icons = ((elem.subItem)?elem:elem.parentElement).querySelectorAll('i');
    icons.forEach(icon => {
        icon.classList.replace(((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'), 'bi-check-circle-fill');
        if (isDone) {
            icon.classList.remove('has-text-success');
        } else {
            icon.classList.add('has-text-success');
        }
    });
}

function itemFadeInComplete(ev){
    ev.stopPropagation();
    this.removeAttribute('class');
    this.removeEventListener('animationend', itemFadeInComplete);
}

function itemFadeOutMoveComplete(){
    let container = getContainer(this);
    this.classList.add('dnone');
    this.removeEventListener('animationend', itemFadeOutMoveComplete);
    this.addEventListener('animationend', itemFadeInComplete);
    switch (container.id){
        case 'list':
            if (!container.nextElementSibling)
                container.insertAdjacentElement('afterend', doneContainer())
            container = container.nextElementSibling; // now done container
            switch (this.id){
                case 'listItem':
                    /*
                     * * if child is in doneSubs reattach to parent
                     * * otherwise append
                    */
                    const doneSubs = container.children[1].querySelectorAll(`[pid="${this.attributes.pid.value}"]`);
                    if (doneSubs.length){
                        [...doneSubs].forEach(i=>{
                            this.children[1].append(i);
                        })
                    }
                    setAllCheck(this.children[0], true);
                    container.append(this);
                    break;
                case 'listSubItem':
                    // do something
                    setAllCheck(this, true);
                    container.querySelector('#doneSubs').append(this);
                    break;
                default:
                    throw new Error('Something is wrong!!!\n\nCheck item ids, something isn\'t matching');
            }

            break;
        case 'done':
            container = container.previousElementSibling;
            switch (this.id){
                case 'listItem':
                    // do something
                    setAllCaret(this.children[0]);
                    container.prepend(this);
                    break;
                case 'listSubItem':
                    // do something
                    setAllCaret(this);
                    let parent = container.querySelector(`#listItem[pid="${this.attributes.pid.value}"]`);
                    if (parent){
                        parent.children[1].append(this);
                    }else{
                        this.remove();
                        container.prepend(buildListItem(this.innerText));
                    }
                    break;
                default:
                    throw new Error('Something is wrong!!!\n\nCheck item ids, something isn\'t matching');
            }
            if (container.nextElementSibling.querySelectorAll('li').length === 0)
                container.nextElementSibling.remove();
            break;
        default:
            popMsg('SOMETHING IS WRONG!!!!');
            throw new Error('Something is wrong!!!!\n\nCheck the list containers');
    }
    fixIdent();
    this.classList.replace('fade-out-complete', 'fade-in-slow');
    this.classList.remove('dnone');
    if (container.id === 'done')
        container = container.previousElementSibling;
    if (container.children.length === 0){
        clearListDB(curList);
    }else{
        saveList();
    }
}

function complete(){
    const itmData = getSelectedItemData();
    const selected = document.querySelector(`#list #listItem[pid="${itmData.pid}"] li[ident="${itmData.ident}"]`);
    setAllCheck(selected);
    changeTitle(selected);
    if (selected.subItem){
        selected.addEventListener('animationend', itemFadeOutMoveComplete);
        selected.classList.add('fade-out-complete');
    }else{
        selected.parentElement.addEventListener('animationend', itemFadeOutMoveComplete);
        selected.parentElement.classList.add('fade-out-complete');
    }
    resetSelectedItem();
    closeOptions();
}

function clkUndoItem(){
    const itmData = getSelectedItemData();
    let doneSubs = document.querySelector(`#done #doneSubs [pid="${itmData.pid}"][ident="${itmData.ident}"]`);
    let selected = (doneSubs)?doneSubs:document.querySelector(`#done #listItem[pid="${itmData.pid}"] li[ident="${itmData.ident}"]`);
    // setAllCheck(selected);
    changeTitle(selected);
    if (selected.subItem){
        selected.addEventListener('animationend', itemFadeOutMoveComplete);
        selected.classList.add('fade-out-complete');
    }else{
        selected.parentElement.addEventListener('animationend', itemFadeOutMoveComplete);
        selected.parentElement.classList.add('fade-out-complete');
    }
    resetSelectedItem();
    closeOptions();
}

function editItem(){
    const itmData = getSelectedItemData();
    let selected = document.querySelector(`#listItem[pid="${itmData.pid}"] li[ident="${itmData.ident}"]`);
    let update = this.parentElement.previousElementSibling.value.trim();
    if (update.length){
        if (selected){
            let icon = selected.children[0];
            selected.innerHTML = update;
            selected.prepend(icon);
        }
    }else{
        popMsg('Empty items will be ignored.', 'info', 3000);
    }

    resetSelectedItem();
    resetListBtn();
    saveList();
}

function clkLoadList(){
    const itm = getSelectedItemData();
    const targetElement = document.querySelector(`#list #listItem[pid="${itm.pid}"] li[ident="${itm.ident}"]`);
    let list = getItemText(targetElement);
    list = list.substring(list.lastIndexOf(':')+1);
    closeOptions();
    resetSelectedItem();
    resetListBtn();
    loadList(list);
}

function clkCopyItem() {
    const itm = getSelectedItemData();
    const targetElement = document.querySelector(`#list #listItem[pid="${itm.pid}"] li[ident="${itm.ident}"]`);
    navigator.clipboard.writeText(getItemText(targetElement));
    closeOptions();
    resetSelectedItem();
}

function toggleLstBtn() {
    const data = getSelectedItemData();
    const targetElement = document.querySelector(`#list #listItem[pid="${data.pid}"] li[ident="${data.ident}"]`);

    closeOptions();

    if (this.id === 'edit') {

        document.querySelector('#item').value = getItemText(targetElement);
        document.querySelector('#editItem').classList.remove('dnone');
        document.querySelector('#addSub').classList.add('dnone');

    } else if (this.id === 'crtSub') {

        document.querySelector('#addSub').classList.remove('dnone');
        document.querySelector('#editItem').classList.add('dnone');

    }

    document.querySelector('#addItem').classList.add('dnone');
    document.querySelector('#item').focus();

}

function loadList(ln = null){
    if (!ln)
        ln = curList;
    [...document.getElementById('list').children].forEach(i=>{i.remove()})
    const list = getListDB(ln);
    if (list instanceof Array)
        list.forEach(i=>{
            if (i.subList){// Need to REDO this section to fix ident numbering on load
                nestElem([
                    document.getElementById('list'),
                    nestElem([
                        buildListItem(i.text.trim(), {pid:i.id}),
                        mkElem({elemType:'ul', class:'sub-list'}),
                        i.subList.map(j=>{
                            return buildListItem(j.trim(), {sub:true, pid:i.id});
                        })
                    ])
                ]);
            }else{
                nestElem([
                    document.getElementById('list'),
                    buildListItem(i.text.trim(), {pid:i.id})
                ]);
            }
        });
    fixIdent();
}

function fixIdent(){
    [...document.querySelectorAll('.sub-list')].forEach((i)=>{
        [...i.children].forEach((j, n)=>{j.setAttribute('ident', `${n+1}`)})
    })
}

function resetListBtn() {
    document.querySelector('#item').classList.remove('is-danger');
    document.querySelector('#item').value = '';
    // removeMsg();
    document.querySelectorAll('.listBtn button').forEach(btn => {
        if (btn.id === 'addItem') {
            btn.classList.remove('dnone');
        } else {
            btn.classList.add('dnone');
        }
    });
}

function resetSelectedItem(){
    window.localStorage.removeItem('selected');
}

function getSelectedItemData(){
    return JSON.parse(window.localStorage.selected);
}

function closeOptions() {
    let options = document.querySelector('.options');
    if (options) {
        options.addEventListener('animationend', function () {
            this.remove();
        });
        options.querySelectorAll('button').forEach(btn => {
            btn.setAttribute('disabled', 'disabled');
        });
        options.classList.replace('fade-in', 'fade-out');
    }
}

function optMo() {
    let text = this.attributes['aria-description'].value;
    this.parentElement.appendChild(mkElem({ elemType: 'span', class: 'btn-popover', inner: text }));
}

function optMl() {
    this.parentElement.querySelector('span').remove();
}

function openOptions(ev) {
    window.localStorage.setItem('selected', JSON.stringify(
        {
            id: (this.subItem)?this.id:this.parentElement.id,
            pid:`${(this.subItem)?this.attributes.pid.value:this.parentElement.attributes.pid.value}`,
            ident: this.attributes.ident.value
        }
    ));
    resetListBtn();
    if (document.querySelector('.options')) {
        closeOptions();
    }

    const opts = {
        b1: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-success is-outlined', 'aria-description': 'Mark Item Complete', id: 'tadone', inner: '<i class="bi bi-check-circle"></i>', listeners: [{ type: 'click', execute: complete }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b2: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-link is-outlined', 'aria-description': 'Create Sub-List Item', id: 'crtSub', inner: '<i class="bi bi-plus-circle-dotted"></i>', listeners: [{ type: 'click', execute: toggleLstBtn }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b3: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', 'aria-description': 'Edit List Item', id: 'edit', inner: '<i class="bi bi-pencil"></i>', listeners: [{ type: 'click', execute: toggleLstBtn }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b4: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-info is-outlined', 'aria-description': 'Copy Item', id: 'copy', inner: '<i class="bi bi-copy"></i>', listeners: [{ type: 'click', execute: clkCopyItem }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b5: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', 'aria-description': 'Restore List Item', id: 'undo', inner: '<i class="bi bi-arrow-counterclockwise"></i>', listeners: [{ type: 'click', execute: clkUndoItem }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b6: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-danger is-outlined', 'aria-description': 'Close Options', id: 'cancel', inner: '<i class="bi bi-x-circle"></i>', listeners: [{ type: 'click', execute: closeOptions }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b7: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-success is-outlined', 'aria-description': 'Load List', id: 'load', inner: '<i class="bi bi-arrow-up"></i>', listeners: [{ type: 'click', execute: clkLoadList}, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] })
    }

    nestElem([
        document.querySelector('.card'),
        mkDiv({ class: 'options fade-in', style: 'top: ' + (ev.y - 30) + 'px; left: ' + (ev.x - 27) + 'px;', listeners: [{ type: 'mouseleave', execute: closeOptions}] }),
        mkDiv({ class: 'card' }),
        mkDiv({ class: 'card-content p-0' }),
        (getContainer(this).id === 'done') ?
            [opts.b5, opts.b6]
            :
            (this.id === 'listSubItem') ?
                [opts.b1, opts.b3, (getItemText(this).includes(':load:')?opts.b7:opts.b4), opts.b6]
                :
                [opts.b1, opts.b2, opts.b3, (getItemText(this).includes(':load:')?opts.b7:opts.b4), opts.b6]
    ]);

}

function changeTitle(elem) {
    if (elem.subItem){
        elem.title = (elem.title === 'Click to Undo')?'Click for Options':'Click to Undo';
    }else{
        [...elem.parentElement.querySelectorAll('li')].forEach(i=>{
            i.title = (i.title === 'Click to Undo')?'Click for Options':'Click to Undo';
        })
    }
}

function inputActions() {

    removeMsg();
    this.classList.remove('is-danger');

    if (this.value === ':export') {
        let text = '';
        if (confirm('Click "OK" for ALL lists\nClick "Cancel" for current list text')){
            text = window.localStorage.lists;
        }else{
            let items = getListDB(curList);
            if (items)
                for (let i of items){
                    text += `\n${i.text}`;
                    if (i.subList){
                        for (let s of i.subList){
                            text += `\n\t${s}`;
                        }
                    }
                }
        }
        navigator.clipboard.writeText(text.trim()).then(()=>{ 
            popMsg('Export Completed!', 'success', 3000);
        }).catch((err)=>{
            popMsg(err, 'danger', 5000);
        });
        this.value = '';
    } else if (this.value === ':list') {
        const collection = getListDB();
        let nosave = true;
        let alert = nestElem([
            mkElem({ elemType: 'article', id: 'cookieList', class: 'message is-small is-info' }),
            {
                1: nestElem([
                    mkDiv({ class: 'message-header is-justify-content-end' }),
                    mkBtn({ class: 'delete', listeners: [{ type: 'click', execute: removeMsg }] })
                ]),
                2: nestElem([
                    mkDiv({ class: 'message-body is-flex is-flex-direction-column is-align-content-center', id: 'info', style: 'text-align: center;' }),
                    mkP({ inner: "Current Saved Lists", style: "font-weight: bold;text-decoration: underline;" })
                ])
            }
        ]);
        document.body.prepend(alert);
        for (let key in collection){
            if (key) {
                document.querySelector('#info').append(mkP({ inner: (curList === key) ? `<span style="color:red;">*</span> ${key} <span style="color:red;">*</span>` : key }));
                nosave = false;
            }
        };
        if (nosave) {
            console.log("No saved lists found");
            document.querySelector('.message-body').append(mkP({ class: 'has-text-danger', inner: 'No saved lists were found' }));
            rmvTimeout();
            errorTimeoutID = setTimeout(removeMsg, 2000);
        }
        if (Object.keys(collection).length > 1) {
            this.value = ':load:';
        } else {
            this.value = '';
        }
        this.focus();
    }else if (this.value === ':convert:'){
        this.value = '';
        convertCookies();
        popMsg('Conversion Complete!\nRefresh the page and any saved data should be restored.', 'success', 10000)
    }

}

function inputKeyActions(event) {
    if (event.keyCode === 13) { // Enter
        if (this.value.match(/^:[a-z]*:.*/)) {
            let sn = this.value.split(':');
            sn.shift();
            switch (sn[0]) {
                case 'save':
                    // Save list to specified cookie name :*:cookie_name
                    saveList(sn[1]); // Save Current list to new cookie
                    clearListDB(curList); // clear list data
                    resetListBtn();
                    loadList(curList);
                    break;
                case 'load':
                    // Load specific cookie
                    resetListBtn();
                    loadList(sn[1]);
                    break;
                case 'delete':
                    clearListDB(sn[1]);
                    popMsg(`The list labeled "${sn[1]}" has been removed!`, 'success', 4000);
                    resetListBtn();
                    break;
            }
            this.value = '';
        } else {
            let buttons = document.querySelectorAll('.listBtn button');
            buttons.forEach(btn => {
                if (!btn.classList.contains('dnone')) {
                    btn.click();
                    return;
                }
            });
        }
    } else if (event.keyCode === 27) { // ESC
        document.querySelector('#item').classList.remove('is-danger');
        resetSelectedItem();
        removeMsg();
        resetListBtn();
    }
}

// function setCookie(cn) {
//     if (frameCheck) {
//         // let items = document.querySelector('#list').querySelectorAll('#listItem'); // ptag ref
//         let items = [...document.getElementById('list').children].filter(f => { if (f.id === 'listItem') return f });
//         let itemText = '';
//         items.forEach(item => {
//             itemText += item.innerText.replaceAll('\n', '|') + ',';
//         });
//         if (itemText) {
//             document.cookie = `${(cn) ? cn : listVar}=${itemText.substring(0, itemText.length - 1)}; max-age=31536000; samesite=strict; secure`
//             if (itemText.length > 3000) {
//                 errorMsg('Please start completing items on the list.<br><br>There is < 1000 bytes of storage left.');
//             }
//         } else {
//             document.cookie = listVar + '=; max-age=0; samesite=strict; secure';
//         }
//     }
// }

function convertCookies(){
    if (document.cookie.length){
        let cookieCollection = {};
        // let collection = [];
        let cookies = `${document.cookie}`.split('; ');
        if (cookies.length){
            for (let cookie of cookies){
                let ln = cookie.split('=')[0];
                let lists = cookie.split('=')[1].split(',');

                cookieCollection[ln] = [];

                for (let item of lists){
                    if (item.includes('|')){
                        let items = item.split('|');
                        cookieCollection[ln].push({id:crypto.randomUUID(), text:items.shift(), subList:[...items]})
                    }else{
                        cookieCollection[ln].push({id:crypto.randomUUID(), text:item, subList:null});
                    }

                }
                document.cookie = `${ln}=; max-age=0;`;
            }
            // console.log(cookieCollection);
            saveDB(cookieCollection);
        }
            
    }else{
        console.log('No cookies, it\'s all good')
    }
}
