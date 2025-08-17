function createItem(item, data = { isSub: false, pid: NaN }) {

    let elem = mkElem(
        {
            elemType: ((data.isSub) ? 'span' : 'p'),
            class: ((data.isSub) ? '' : 'mb-2'),
            title: 'Click for Options',
            id: ((data.isSub) ? 'listSubItem' : 'listItem'),
            // pid:((data.isSub) ? data.pid : (Math.floor(Math.random() * 10) + 1)), // testing
            pid: ((data.isSub) ? data.pid : crypto.randomUUID()),
            inner: (item.toLowerCase().includes('http')) ? item.toLowerCase() : item.substring(0, 1).toUpperCase() + item.substring(1),
            listeners: ((data.isSub) ? [
                {
                    type: 'mouseleave',
                    execute: mlSubItem
                }
            ] : [
                {
                    type: 'mouseover',
                    execute: moListItem
                },
                {
                    type: 'mouseleave',
                    execute: mlLitsItem
                },
                {
                    type: 'click',
                    execute: clkListItem
                }
            ])
        }
    );

    elem.prepend(mkElem({ elemType: 'i', class: 'bi ' + ((data.isSub) ? 'bi-caret-right' : 'bi-caret-right-fill') }));

    return elem;

}