let curList = 'default';

function save(collection){
    window.localStorage.setItem('lists', JSON.stringify(collection));
}

function saveList(ln = null){// REDO!!!!
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

    save(collection);
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
            icon: mkElem({ elemType: 'i', class: 'bi ' + ((opt.sub) ? 'bi-caret-right' : 'bi-caret-right-fill') })
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