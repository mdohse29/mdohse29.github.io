import {nestElem, mkDiv, mkElem, mkBtn, mkP, mkSpan} from "../../scripts/crtElm-mod-min.js";
let curList = 'default';
const frameCheck = window.top === window.self;
let errorTimeoutID = NaN;

function popMsg(message = 'Empty items or duplicate items are not accepted.<br>Check your entry and try again.', type = 'danger', timeOut = 5000) {
    let currentMsg = document.querySelector('article.message');
    rmvTimeout();
    if (currentMsg) {
        currentMsg.remove();
    }
    currentMsg = null;
    document.querySelector('.card-header.main-bg').prepend(nestElem([
        mkElem({ elemType: 'article', class: `message is-small is-${type}`, listeners: [{ type: 'mouseenter', execute: manRmvMsg }] }),
        [
            nestElem([
                mkDiv({ class: 'message-header is-justify-content-end' }),
                mkBtn({ class: 'delete', listeners: [{ type: 'click', execute: removeMsg }] })
            ]),
            nestElem([
                mkDiv({ class: 'message-body is-flex is-justify-content-center', style: 'text-align: center;' }),
                mkP({ inner: message })
            ])
        ]
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
    currentMsg = null;
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
    ln = ln.replaceAll(' ', '-');
    let list = document.getElementById('list').querySelectorAll('#listItem');
    let collection = getListDB();
    let ListItems = [];
    for(let itm of list){
        let id = itm.attributes.pid.value;
        let item = itm.children[0];
        
        ListItems.push({id:id, text:item.innerText.trim(), subList:(item.nextElementSibling && item.nextElementSibling.children.length)?[...item.nextElementSibling.children].map(itm=>{return itm.innerText}):null});

        id = null;
        item = null;
    }
    
    collection[ln] = ListItems;

    saveDB(collection);
    list = null;
    collection = null;
    ListItems = null;
}

function getListDB(ln = null){
    const listDB = window.localStorage.lists;

    if (ln){
        ln = ln.replaceAll(' ', '-');
        curList = ln;
    }
    
    if (listDB){
        return (ln)?JSON.parse(listDB)[ln]:JSON.parse(listDB);
    }
    return {};

}

function clearListDB(ln = null){
    if (ln){
        ln = ln.replaceAll(' ', '-');
        let collection = getListDB();
        if (collection[ln])
            delete collection[ln];
        if (collection)
            saveDB(collection);
        collection = null;
    }
}

function getItemText(elem) {
    return ((elem.id === 'listItem')?elem.children[0].innerText.trim():elem.innerText.trim());
}

function doneContainer() {

    return nestElem([
        mkDiv({ class: 'card-content py-3', id: 'done' }),
        [
            mkElem({ elemType: 'h4', class: 'h4', inner: '<i class="bi bi-check-circle-fill has-text-success"></i>Done!' }),
            mkElem({ elemType: 'ul', id: 'doneSubs' })
        ]
    ]);

}

function getContainer(elem){
    let container = elem.parentElement;
    while ((container != null && container.id != 'list' && container.id != 'done')){
        container = container.parentElement;
    }
    return container;
}

// function itemKeyActions(ev){
//     /*
//     window.localStorage.setItem('selected', JSON.stringify(
//         {
//             id: (this.subItem)?this.id:this.parentElement.id,
//             pid:`${(this.subItem)?this.attributes.pid.value:this.parentElement.attributes.pid.value}`,
//             ident: this.attributes.ident.value
//         }
//     ));
//     */
// //    let test = this.getBoundingClientRect();
// }

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
            inner: itemText.trim(),
            icon: mkElem({ elemType: 'i', class: 'bi ' + ((opt.sub) ? 'bi-caret-right' : 'bi-caret-right-fill') }),
            ident: `${(!opt.sub)?0:(sublist)?sublist.children.length + 1:1}`,
            tabindex: '0',
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

export function addItem(ev){
    ev.stopPropagation();
    let itemText = this.parentElement.previousElementSibling.value.trim();
    let list = document.getElementById('list');
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
    itemText = null;
    list = null;
}

export function addSubItem(ev){
    ev.stopPropagation();
    let data = getSelectedItemData();
    let itemText = this.parentElement.previousElementSibling.value.trim();
    let parent = document.querySelector(`#list #listItem[pid="${data.pid}"]`);
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
        data = null;
        itemText = null;
        parent = null;
}

function setAllCaret(elem) {

    let icons = ((elem.subItem)?elem:elem.parentElement).querySelectorAll('i');

    icons.forEach(icon => {

        icon.classList.replace('bi-check-circle-fill', ((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'));
        icon.classList.remove('has-text-success');

    });
    icons = null;
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
    icons = null;
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
                container.insertAdjacentElement('afterend', doneContainer());
            container = container.nextElementSibling; // now done container
            switch (this.id){
                case 'listItem':
                    /*
                     * * if child is in doneSubs reattach to parent
                     * * otherwise append
                    */
                    let doneSubs = container.children[1].querySelectorAll(`[pid="${this.attributes.pid.value}"]`);
                    if (doneSubs.length){
                        [...doneSubs].forEach(i=>{
                            delete i.dataset.origIdent;
                            this.children[1].append(i);
                        })
                    }
                    setAllCheck(this.children[0], true);
                    container.append(this);
                    doneSubs = null;
                    break;
                case 'listSubItem':
                    // do something
                    setAllCheck(this, true);
                    this.dataset.origIdent = this.attributes.ident.value;
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
                    let ident = parseInt(this.dataset.origIdent);
                    if (parent){
                        if (ident === 1 || parent.children[1].children.length === 0){
                            parent.children[1].prepend(this);
                        }else{
                            let current = parent.children[1].children[ident - 1];
                            if (current){
                                current.insertAdjacentElement('beforebegin', this);
                            }else{
                                parent.children[1].append(this);
                            }
                            current = null;
                        }
                        delete this.dataset.origIdent;
                        // parent.children[1].append(this);
                    }else{
                        this.remove();
                        container.prepend(buildListItem(this.innerText));
                    }
                    parent = null;
                    ident = null;
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
    container = null;
}

function complete(){
    let itmData = getSelectedItemData();
    let selected = document.querySelector(`#list #listItem[pid="${itmData.pid}"] li[ident="${itmData.ident}"]`);
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
    itmData = null;
    selected = null;
}

function clkUndoItem(){
    let itmData = getSelectedItemData();
    let doneSubs = document.querySelector(`#done #doneSubs [pid="${itmData.pid}"][ident="${itmData.ident}"]`);
    let selected = (doneSubs)?doneSubs:document.querySelector(`#done #listItem[pid="${itmData.pid}"] li[ident="${itmData.ident}"]`);
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
    itmData = null;
    selected = null;
}

export function editItem(){
    let itmData = getSelectedItemData();
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

    itmData = null;
    selected = null;
    update = null;
}

function clkOpenURL(){
    let itm = getSelectedItemData();
    if (itm)
        window.open(itm.text, '_blank');
    closeOptions();
    resetSelectedItem();
    resetListBtn();
    itm = null;
}

function clkLoadList(){
    let itm = getSelectedItemData();
    closeOptions();
    resetSelectedItem();
    resetListBtn();
    loadList(itm.text.replace(':load:', ''));
    itm = null;
}

function clkCopyItem() {
    let itm = getSelectedItemData();
    navigator.clipboard.writeText(itm.text);
    closeOptions();
    resetSelectedItem();
    itm = null;
}

function toggleLstBtn() {
    let data = getSelectedItemData();
    let targetElement = document.querySelector(`#list #listItem[pid="${data.pid}"] li[ident="${data.ident}"]`);

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

    data = null;
    targetElement = null;

}

export function loadList(ln = null){
    if (!ln)
        ln = curList;
    ln = ln.replaceAll(' ', '-');
    let tag = document.querySelector('.tag');
    if (ln === 'default'){
        if(tag)
            document.querySelector('.tag').remove();
    }else{
        if (tag){
            let icon = tag.children[0]
            tag.innerText = ln;
            tag.append(icon);
            icon = null;
        }else{
            document.querySelector('.card-header').prepend(
                nestElem([
                    mkSpan({class:'tag is-danger', inner:ln, prop:{ariaHidden: true}, listeners:[{type:'click', execute:function(){navigator.clipboard.writeText(this.innerText);popMsg('List name copied!', 'success')}}]}),
                    mkElem({elemType:'i', class:'bi bi-x-lg ml-2', title:'Close', prop:{ariaHidden:true}, listeners:[{type:'click', execute: (e)=>{e.stopPropagation();loadList('default')}}]})
                ])
            )
        }
    }

    [...document.getElementById('list').children].forEach(i=>{i.remove()})
    let list = getListDB(ln);
    if (list instanceof Array){
        list.forEach(i=>{
            if (i.subList){
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
    }
    resetListBtn();
    resetSelectedItem();
    fixIdent();
    ln = null;
    list = null;
    document.getElementById('item').focus();
}

function fixIdent(){
    [...document.querySelectorAll('.sub-list, #doneSubs')].forEach((i)=>{
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

export function resetSelectedItem(){
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
    options = null;
}

function optMo() {
    let text = this.attributes['aria-description'].value;
    this.parentElement.appendChild(mkElem({ elemType: 'span', class: 'btn-popover', inner: text }));
    text = null;
}

function optMl() {
    this.parentElement.querySelector('span').remove();
}

function optsMl(){
    resetSelectedItem();
    closeOptions();
}

function openOptions(ev) {
    window.localStorage.setItem('selected', JSON.stringify(
        {
            id: (this.subItem)?this.id:this.parentElement.id,
            pid:`${(this.subItem)?this.attributes.pid.value:this.parentElement.attributes.pid.value}`,
            ident: this.attributes.ident.value,
            text:this.innerText.trim()
        }
    ));
    removeMsg();
    resetListBtn();
    if (document.querySelector('.options')) {
        closeOptions();
    }

    let opts = {
        b1: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-success is-outlined', 'aria-description': 'Mark Item Complete', id: 'tadone', inner: '<i class="bi bi-check-circle"></i>', listeners: [{ type: 'click', execute: complete }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b2: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-link is-outlined', 'aria-description': 'Create Sub-List Item', id: 'crtSub', inner: '<i class="bi bi-plus-lg"></i>', listeners: [{ type: 'click', execute: toggleLstBtn }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b3: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', 'aria-description': 'Edit List Item', id: 'edit', inner: '<i class="bi bi-pencil"></i>', listeners: [{ type: 'click', execute: toggleLstBtn }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b4: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-info is-outlined', 'aria-description': 'Copy Item', id: 'copy', inner: '<i class="bi bi-copy"></i>', listeners: [{ type: 'click', execute: clkCopyItem }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b5: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', 'aria-description': 'Restore List Item', id: 'undo', inner: '<i class="bi bi-arrow-counterclockwise"></i>', listeners: [{ type: 'click', execute: clkUndoItem }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b6: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-danger is-outlined', 'aria-description': 'Close Options', id: 'cancel', inner: '<i class="bi bi-x-circle"></i>', listeners: [{ type: 'click', execute: ()=>{closeOptions();resetSelectedItem();} }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b7: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-success is-outlined', 'aria-description': 'Load List', id: 'load', inner: '<i class="bi bi-box-arrow-in-up-right"></i>', listeners: [{ type: 'click', execute: clkLoadList}, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b8: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-info is-outlined', 'aria-description': 'Open URL', id: 'link', inner: '<i class="bi bi-box-arrow-up-right"></i>', listeners:[{type:'mouseenter', execute:optMo}, {type:'mouseleave', execute:optMl}, {type:'click', execute:clkOpenURL}]})
    }

    nestElem([
        document.querySelector('.card'),
        mkDiv({ class: 'options fade-in', style: 'top: ' + (ev.y - 30) + 'px; left: ' + (ev.x - 27) + 'px;', listeners: [{ type: 'mouseleave', execute: optsMl}] }),
        mkDiv({ class: 'card' }),
        mkDiv({ class: 'card-content p-0' }),
        (getContainer(this).id === 'done') ?
            [opts.b5, opts.b6]
            :
            (this.id === 'listSubItem') ?
                [opts.b1, opts.b3, (this.innerText.trim().includes(':load:')?opts.b7:(this.innerText.trim().includes('http'))?opts.b8:opts.b4), opts.b6]
                :
                [opts.b1, opts.b2, opts.b3, (this.innerText.trim().includes(':load:')?opts.b7:(this.innerText.trim().includes('http'))?opts.b8:opts.b4), opts.b6]
    ]);

    opts = null;

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

export function inputActions() {

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
        text = null;
    } else if (this.value === ':list') {
        let savedLists = Object.keys(getListDB());

        document.body.prepend(nestElem([
            mkElem({ elemType: 'article', id: 'list-display', class: 'message is-info' }),
            [
                nestElem([
                    mkDiv({ class: 'message-header' }),
                    [
                        mkP({ inner: "Saved Lists", class:'is-size-4'}),
                        mkBtn({ class: 'delete', listeners: [{ type: 'click', execute: ()=>{removeMsg();resetListBtn();} }] })
                    ]
                ]),
                nestElem([
                    mkDiv({ class: 'message-body is-flex is-flex-direction-column is-align-content-center', id: 'info', style: 'text-align: center;' }),
                    nestElem([
                        mkDiv({class:'saved-lists'}),
                        (savedLists.length)?
                            savedLists.map((e)=>{
                                return nestElem([
                                    mkDiv({class:'saved-list'}),
                                    [
                                        nestElem([
                                            mkDiv({class:'list-name'}),
                                            mkP({inner:e, class:(e===curList)?'current':''})
                                        ]),
                                        nestElem([
                                            mkDiv({class:'list-action'}),
                                            mkDiv({class:'buttons are-small'}),
                                            [
                                                mkBtn({id:'load', title:(e===curList)?'Current List':`Load List: ${e}`, class:'button is-success is-rounded is-outlined', 'data-list':e, icon:mkElem({elemType:'i', class:'bi bi-box-arrow-in-up-right'}), prop:{disabled:(e===curList)}, listeners:[{type:'click', execute:function(){removeMsg();resetListBtn();loadList(this.dataset.list);}}]}),
                                                mkBtn({id:'remove', title:`Delete List: ${e}`, class:'button is-danger is-rounded is-outlined', 'data-list':e, icon:mkElem({elemType:'i', class:'bi bi-trash'}), listeners:[{type:'click', execute:function(){removeMsg();resetListBtn();clearListDB(this.dataset.list);loadList('default');popMsg(`"${this.dataset.list}" has been removed.`, 'success', 3000)}}]})
                                            ]
                                        ])
                                    ]
                                ])
                            })
                        :
                            mkP({ class: 'has-text-danger is-size-5', inner: 'No saved lists were found' })
                    ])
                    
                ])
            ]
        ]));

        if (!savedLists.length) {
            console.log("No saved lists found");
            rmvTimeout();
            errorTimeoutID = setTimeout(removeMsg, 3000);
        }
        if (savedLists.length > 1) {
            this.value = ':load:';
        } else {
            this.value = '';
        }
        this.focus();
        savedLists = null;
    }else if (this.value === ':convert:'){
        this.value = '';
        convertCookies();
        popMsg('Conversion Complete!\nRefresh the page and any saved data should be restored.', 'success', 10000)
    }

}

export function inputKeyActions(event) {
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
            sn = null;
        } else {
            let buttons = document.querySelectorAll('.listBtn button');
            buttons.forEach(btn => {
                if (!btn.classList.contains('dnone')) {
                    btn.click();
                    return;
                }
            });
            buttons = null;
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
                ln = null;
                lists = null;
            }
            // console.log(cookieCollection);
            saveDB(cookieCollection);
        }
        cookieCollection = null;
        cookies = null;
            
    }else{
        console.log('No cookies, it\'s all good')
    }
}

window.API = {
    manLoadDB:(collection)=>{
        if (collection instanceof Object && Object.keys(collection).length){
            saveDB(collection);
        }else{
            popMsg("DB upload failed!", 'danger', 3500);
        }
    }
}