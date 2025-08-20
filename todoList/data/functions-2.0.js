let curList = 'default';
const ListItems = [];

function saveList(ln = null){
    const list = document.getElementById('list').querySelectorAll('#listItem');
    if (!ln)
        ln = curList;
    list.forEach(itm=>{
        const id = itm.getAttribute('pid');
        const item = itm.children[0];
        const newItem = {id:id, text:item.innerText, subList:(item.nextElementSibling)?[...item.nextElementSibling.children].map(itm=>{return itm.innerText}):null};
        if (!itemExists(newItem)){
            ListItems.push(newItem);
        }else{
            updateList(newItem);
        }

    });
    let theList = {ln:ListItems};

    window.localStorage.setItem('lists', JSON.stringify(theList));
}

function getList(ln = null){

}

function itemExists(item){
    return (ListItems.filter(li=>{return (li.id === item.id);}).length > 0);
}

function updateList(update){
    const item = ListItems.filter(li=>{if (li.id === update.id) return li;});
    if (item.length && update)
        ListItems.splice(ListItems.indexOf(item[0]), 1, update);
}

function buildListItem(itemText, opt = {sub:false, pid:null}) {
    // returns ul.item-container > li#listItem if regular && li#listSubItem is sub item

    let elem = mkElem(
        {
            elemType: 'li',
            class: ((opt.sub) ? '' : 'mb-2'),
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
    }
}