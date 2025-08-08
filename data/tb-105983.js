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
    }else{
        const active = this.parentElement.querySelector('.active');
        if (active){
            active.selected = false;
            active.ariaSelected = 'false'
            active.classList.remove('active');
        }
        this.selected = true;
        this.classList.add('active');
        this.ariaSelected = 'true';
    }
    toggleDrawer(this.id);
}

function toggleHb(){
    this.active = (!this.active);
    [...document.querySelectorAll('.hbb')].forEach(btn=>{
        btn.ariaHidden = (!this.active);
        if(this.active){
            btn.classList.remove('dnone');
        }else{
            btn.classList.add('dnone');
            if (btn.id && document.getElementById(`${btn.id}-drawer`)){
                removeDrawer(btn.id);
                btn.classList.remove('active');
                btn.selected = false;
                btn.ariaSelected = 'false';
            }
        }
    })
}

function openFinish(){
    this.classList.remove('animate');
    this.removeEventListener('animationend', openFinish);
}

function openStart(){
    this.classList.remove('visibly-hidden');
    this.removeEventListener('animationstart', openStart);
}

function toggleDrawer(id){
    const drawer = document.querySelector('.drawer-wrapper')
    if (!drawer){
        document.body.children[1].appendChild(buildDrawer(id));
    }else{
        drawer.addEventListener('animationend', function(){
            this.remove();
            if (document.querySelector('.active'))
                document.body.children[1].appendChild(buildDrawer(id));
        });
        drawer.classList.add('fade-out');
    }
}

function removeDrawer(id){
    document.getElementById(`${id}-drawer`).remove();
}


function buildDrawer(id){
    const showHidden = document.body.lastElementChild.active;
    const drawerData = drawers.filter(d=>{
        return d.id == id;
    })[0];

    if (drawerData){
        return nestElem([
            mkDiv({class:'container-fluid drawer-wrapper visibly-hidden animate', id:`${drawerData.id}-drawer`, listeners:[{type:'animationend', execute:openFinish}, {type:'animationstart', execute:openStart}]}),
            [
                nestElem([
                    mkDiv({class:'drawer-header'}),
                    mkElem({elemType:'h2', class:'title', 'aria-label':drawerData.title, inner:drawerData.title})
                ]),
                nestElem([
                    mkDiv({class:'drawer'}),
                    drawerData.buttons.map(btn=>{
                        const newbtn = mkLnk({class:`btn btn-lg btn-primary${(btn.hidden)?` hbb${(showHidden)?'':' dnone'}`:''}`, inner:btn.text.main, href:btn.url, target:(btn.url.includes('http'))?'_blank':'_self', 'aria-hidden':`${(btn.hidden)?`${(!showHidden)}`:'false'}`});
                        return (btn.text.sub)?nestElem([newbtn, mkSpan({class:`sub-text`, inner:`${btn.text.sub}`})]):newbtn;
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

const nav_bar = nestElem([
    mkElem({elemType:'nav', class:'navbar'}),
    mkDiv({class:'container-fluid'}),
    [
        mkDiv({class:'btn-group', 'aria-label':'Categories'}),
        nestElem([
            mkElem({elemType:'figure', class:'logo'}),
            mkImg({src:'./data/logoIL.webp', alt:'Imagine Learning'})
        ])
    ]
]);

window.onload = function(){
    document.body.children[0].appendChild(nav_bar);
    document.body.appendChild(mkDiv({class:'hb', 'aria-hidden':'true', listeners:[{type:'click', execute:toggleHb}]}))
    document.body.lastElementChild.active = false;
    createNavBtns();
}
