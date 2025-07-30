let drawers = null;
async function getData(){
    const data = await fetch('./tbData.json');
    if (data.ok){
        return data.json();
    }
    return null;
}

function toggleActiveBtn(elem){
    if (elem.selected){
        elem.classList.remove('active');
        elem.selected = false;
        elem.ariaSelected = 'false';
    }else{
        const active = elem.parentElement.querySelector('.active');
        if (active){
            active.selected = false;
            active.ariaSelected = 'false'
            active.classList.remove('active');
        }
        elem.selected = true;
        elem.classList.add('active');
        elem.ariaSelected = 'true';
    }
}

async function createNavBtns() {
    drawers = await getData();
    if (drawers)
        for (d of drawers){
            document.querySelector('nav .btn-group').appendChild(
                mkBtn({
                    class: `btn btn-primary p-3${(d.hidden)?' dnone':''}`,
                    id: d.id,
                    type: 'button',
                    inner: d.title,
                    "aria-label": d.title,
                    "aria-selected": "false",
                    "aria-hidden": `${d.hidden}`,
                    listeners: [
                        {
                            type: 'click',
                            execute: function (){
                                toggleActiveBtn(this);
                            }
                        }
                    ]
                })
            );
        }
}

const nav_bar = nestElem([
    mkElem({elemType:'nav', class:'navbar bg-body-tertiary'}),
    mkDiv({class:'container-fluid'}),
    mkDiv({class:'btn-group', 'aria-label':'Categories'})
]);

document.body.children[0].appendChild(nav_bar);
createNavBtns();
