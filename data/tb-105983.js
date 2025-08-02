let drawers = null;
async function getData(){
    const data = await fetch('./data/tbData.json');
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
        document.getElementById(`${elem.id}-drawer`).remove();
    }else{
        const active = elem.parentElement.querySelector('.active');
        if (active){
            active.selected = false;
            active.ariaSelected = 'false'
            active.classList.remove('active');
            document.getElementById(`${active.id}-drawer`).remove();
        }
        elem.selected = true;
        elem.classList.add('active');
        elem.ariaSelected = 'true';
        document.body.children[1].appendChild(buildDrawer(elem.id));
    }
}

function toggleHidden(){
    [...document.querySelectorAll('.hbb')].forEach(btn=>{
        btn.classList.toggle('dnone');
    })
}

function buildDrawer(id){
    const drawerData = drawers.filter(d=>{
        return d.id == id;
    })[0];

    if (drawerData){
        //something here
        return nestElem([
            mkDiv({class:'container-fluid drawer-wrapper', id:`${drawerData.id}-drawer`}),
            [
                nestElem([
                    mkDiv({class:'drawer-header'}),
                    mkElem({elemType:'h2', class:'title', 'aria-label':drawerData.title, inner:drawerData.title})
                ]),
                nestElem([
                    mkDiv({class:'drawer'}),
                    drawerData.buttons.map(btn=>{
                        return (btn.text.sub)?
                        nestElem([
                            mkLnk({class:`btn btn-lg btn-secondary${(btn.hidden)?' hbb dnone':''}`, inner:btn.text.main, href:btn.url, target:(btn.url.includes('http'))?'_blank':'_self'}),
                            mkElem({elemType:'span', class:`sub-text${(btn.text.warn)?' alert-text': ''}`, inner:`${btn.text.sub}`})
                        ])
                        :
                        mkLnk({class:`btn btn-lg btn-secondary${(btn.hidden)?' hbb dnone':''}`, inner:btn.text.main, href:btn.url, target:(btn.url.includes('http'))?'_blank':'_self'})
                    })
                ])
            ]
        ])
    }
}

async function createNavBtns() {
    drawers = await getData();
    if (drawers)
        for (d of drawers){
            document.querySelector('nav .btn-group').appendChild(
                mkBtn({
                    class: `btn btn-primary p-3${(d.hidden)?' hbb dnone':''}`,
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
    mkElem({elemType:'nav', class:'navbar'}),
    mkDiv({class:'container-fluid'}),
    mkDiv({class:'btn-group', 'aria-label':'Categories'})
]);

document.body.children[0].appendChild(nav_bar);
document.body.appendChild(mkDiv({class:'hb', listeners:[{type:'click', execute:toggleHidden}]}))
createNavBtns();
