let drawers = null;
async function getData(){
    const data = await fetch('./data/tbData.json');
    if (data.ok){
        return data.json();
    }
    return null;
}

function toggleActiveBtn(){
    if (this.selected){
        this.classList.remove('active');
        this.selected = false;
        this.ariaSelected = 'false';
        document.getElementById(`${this.id}-drawer`).remove();
    }else{
        const active = this.parentElement.querySelector('.active');
        if (active){
            active.selected = false;
            active.ariaSelected = 'false'
            active.classList.remove('active');
            document.getElementById(`${active.id}-drawer`).remove();
        }
        this.selected = true;
        this.classList.add('active');
        this.ariaSelected = 'true';
        document.body.children[1].appendChild(buildDrawer(this.id));
    }
}

function toggleHidden(){
    this.active = (!this.active);
    [...document.querySelectorAll('.hbb')].forEach(btn=>{
        btn.ariaHidden = (!this.active);
        btn.classList.toggle('dnone');
    })
}

function buildDrawer(id){
    const showHidden = document.body.lastElementChild.active;
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
                            mkLnk({class:`btn btn-lg btn-primary${(btn.hidden)?` hbb${(showHidden)?'':' dnone'}`:''}`, inner:btn.text.main, href:btn.url, target:(btn.url.includes('http'))?'_blank':'_self', 'aria-hidden':`${(btn.hidden)?`${(!showHidden)}`:'false'}`}),
                            mkElem({elemType:'span', class:`sub-text`, inner:`${btn.text.sub}`})
                        ])
                        :
                        mkLnk({class:`btn btn-lg btn-primary${(btn.hidden)?` hbb${(showHidden)?'':' dnone'}`:''}`, inner:btn.text.main, href:btn.url, target:(btn.url.includes('http'))?'_blank':'_self', 'aria-hidden':`${(btn.hidden)?`${(!showHidden)}`:'false'}`})
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
                            execute: toggleActiveBtn
                        }
                    ]
                })
            );
        }
}

const nav_bar = nestElem([ // Add a logo logoIL.webp
    mkElem({elemType:'nav', class:'navbar'}),
    mkDiv({class:'container-fluid'}),
    mkDiv({class:'btn-group', 'aria-label':'Categories'})
]);

document.body.children[0].appendChild(nav_bar);
document.body.appendChild(mkDiv({class:'hb', 'aria-hidden':'true', listeners:[{type:'click', execute:toggleHidden}]}))
document.body.lastElementChild.active = false;
createNavBtns();
