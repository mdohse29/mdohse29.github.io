let curList = 'default';
// const frameCheck = window.top === window.self;


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
        
        ListItems.push({id:id, text:item.innerText.trim(), subList:(item.nextElementSibling)?[...item.nextElementSibling.children].map(itm=>{return itm.innerText}):null});
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

function doneContainer() {

    return nestElem([
        mkDiv({ class: 'card-content pt-0', id: 'done' }),
        {
            1: mkElem({ elemType: 'h4', class: 'h4', inner: '<i class="bi bi-check-circle-fill has-text-success"></i>Done!' }),
            2: mkElem({ elemType: 'ul', id: 'doneSubs' })
        }
    ]);

}

function buildListItem(itemText, opt = {sub:false, pid:null}) {
    // returns ul.item-container > li#listItem if regular && li#listSubItem if sub item

    let elem = mkElem(
        {
            elemType: 'li',
            title: 'Click for Options',
            id: ((opt.sub) ? 'listSubItem' : ''),
            pid: ((opt.sub && opt.pid) ? opt.pid : ''), // LIVE
            inner: (itemText.toLowerCase().includes('http')) ? itemText : itemText.substring(0, 1).toUpperCase() + itemText.substring(1),
            icon: mkElem({ elemType: 'i', class: 'bi ' + ((opt.sub) ? 'bi-caret-right' : 'bi-caret-right-fill') }),
            prop: {
                subItem: (opt.sub)?opt.sub:false
            },
            listeners: [
                {
                    type:'click',
                    execute:openOptions
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
            list.prepend(buildListItem(itm.trim()));
        });
        saveList();
    }
    input.value = '';
}

function loadList(ln = null){
    if (!ln)
        ln = curList;
    [...document.getElementById('list').children].forEach(i=>{i.remove()})
    const list = getListDB(ln);
    if (list)
        list.forEach(i=>{
            if (i.subList){
                nestElem([
                    document.getElementById('list'),
                    nestElem([
                        buildListItem(i.text, {pid:i.id}),
                        mkElem({elemType:'ul', class:'sub-list'}),
                        i.subList.map(j=>{
                            return buildListItem(j, {sub:true, pid:i.id});
                        })
                    ])
                ])
            }else{
                nestElem([
                    document.getElementById('list'),
                    buildListItem(i.text, {pid:i.id})
                ])
            }
        })
}

function resetListBtn() {
    document.querySelector('#item').classList.remove('is-danger');
    removeMsg();
    document.querySelectorAll('.listBtn button').forEach(btn => {
        if (btn.id === 'addItem') {
            btn.classList.remove('dnone');
        } else {
            btn.classList.add('dnone');
        }
    });
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
    targetElement = this;
    console.log(this)
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
        b7: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-success is-outlined', 'aria-description': 'Load List', id: 'cancel', inner: '<i class="bi bi-arrow-up"></i>', listeners: [{ type: 'click', execute: clkLoadList}, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] })
    }

    nestElem([
        document.querySelector('.card'),
        mkDiv({ class: 'options fade-in', style: 'top: ' + (ev.y - 30) + 'px; left: ' + (ev.x - 27) + 'px;', listeners: [{ type: 'mouseleave', execute: closeOptions}] }),
        mkDiv({ class: 'card' }),
        mkDiv({ class: 'card-content p-0' }),
        (this.parentElement.id === 'done' || this.parentElement.parentElement.id === 'done') ?
            [opts.b5, opts.b6]
            :
            (this.id === 'listSubItem') ?
                [opts.b1, opts.b3, (getItemText(this).includes(':load:')?opts.b7:opts.b4), opts.b6]
                :
                [opts.b1, opts.b2, opts.b3, (getItemText(this).includes(':load:')?opts.b7:opts.b4), opts.b6]
    ]);

    // document.querySelector('.options').classList.add('fade-in')

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
                    clearList(); // clear the current list after creating new one
                    clearListDB(curList); // clear list data
                    resetListBtn();
                    // saveList(); // reset current cookie
                    break;
                case 'load':
                    // Load specific cookie
                    // clearList();
                    resetListBtn();
                    loadList(sn[1]);
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

        // document.querySelector('#item').value = '';
        // document.querySelector('#item').classList.remove('is-danger');
        // removeMsg();

        // resetListBtn();
    }

}

window.onload = function () {

    loadList(curList);
    if (frameCheck)
        document.querySelector('#item').focus();

}