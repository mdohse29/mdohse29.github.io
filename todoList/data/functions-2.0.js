let curList = 'default';

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
            }
        }
    );

    return (!opt.sub)?(elem = nestElem([mkElem({elemType:'ul', id:'listItem', class:'item-container', pid:(opt.pid)?opt.pid:crypto.randomUUID()}), elem])):elem;

}

function addItem(ev){
    ev.stopPropagation();
    const itemText = this.parentElement.previousElementSibling.value.trim();
    const list = document.getElementById('list');
    if (itemText){
        itemText.split(',').reverse().forEach(itm=>{
            list.prepend(buildListItem(itm.trim()));
        });
        saveList();
    }
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
                    clearList();
                    resetListBtn();
                    loadList(getCookie(sn[1]));
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