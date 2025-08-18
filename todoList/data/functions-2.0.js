let curList = null;
const lists = [];

function saveList(ln){
    
}

function getList(ln){

}

function buildListItem(itemText, pid = null) {
    // returns ul.item-container > li#listItem if regular && li#listSubItem is sub item

    let elem = mkElem(
        {
            elemType: 'li',
            class: ((pid) ? '' : 'mb-2'),
            title: 'Click for Options',
            id: ((pid) ? 'listSubItem' : ''),
            // pid:((pid) ? pid : (Math.floor(Math.random() * 10) + 1)), // testing
            pid: ((pid) ? pid : ''), // LIVE
            inner: (itemText.toLowerCase().includes('http')) ? itemText : itemText.substring(0, 1).toUpperCase() + itemText.substring(1),
            icon: mkElem({ elemType: 'i', class: 'bi ' + ((pid) ? 'bi-caret-right' : 'bi-caret-right-fill') })
        }
    );

    return (!pid)?(elem = nestElem([mkElem({elemType:'ul', id:'listItem', class:'item-container', pid:crypto.randomUUID()}), elem])):elem;

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