import {nestElem, mkElem, mkDiv, mkLnk, mkBtn, mkImg, mkSpan} from '../scripts/crtElm-mod-min.js';
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
    this.classList.remove('fade-in');
    this.removeEventListener('animationend', openFinish);
    // If bouncing on open make sure to remove the listener placed on the button in buildDrawer()
    // [...this.querySelectorAll('a.btn')].forEach(btn=>{ // unused if not bouncing on open
    //     btn.classList.add('bouncing');
    //     btn.addEventListener('animationend', openComplete)
    // });
}

function moFocusin(){
    this.blur();
    this.classList.replace('hover-bounce', 'hover-bounce'); // What?
    this.removeEventListener('mouseover', moFocusin);
}

function openStart(){
    this.classList.remove('visibly-hidden');
    this.removeEventListener('animationstart', openStart);
}

function openComplete(ev){ // unused if not bouncing on open
    ev.stopPropagation();
    this.classList.remove('bouncing');
    this.removeEventListener('animationend', openComplete);
    this.classList.add('hover-bounce');
    this.addEventListener('focusin', function(){
        this.addEventListener('mouseover', moFocusin)
    })
}

function toggleDrawer(id){
    const drawer = document.querySelector('.drawer-wrapper')
    if (!drawer){
        document.body.children[1].appendChild(buildDrawer(id));
    }else{
        drawer.addEventListener('animationend', function(ev){
            ev.stopPropagation();
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
    const DD = drawers.filter(d=>{
        return d.id == id;
    })[0];

    if (DD){
        return nestElem([
            mkDiv({class:'container-fluid drawer-wrapper visibly-hidden fade-in', id:`${DD.id}-drawer`, listeners:[{type:'animationend', execute:openFinish}, {type:'animationstart', execute:openStart}]}),
            [
                nestElem([
                    mkDiv({class:'drawer-header'}),
                    mkElem({elemType:'h2', class:'title', 'aria-label':DD.title, inner:DD.title})
                ]),
                nestElem([
                    mkDiv({class:'drawer'}),
                    DD.buttons.map(btn=>{
                        const newbtn = mkLnk({class:`btn btn-lg btn-primary hover-bounce${(btn.hidden)?` hbb${(showHidden)?'':' dnone'}`:''}`, inner:btn.text.main, href:btn.url, target:(btn.url.includes('http'))?'_blank':'_self', 'aria-hidden':`${(btn.hidden)?`${(!showHidden)}`:'false'}`, listeners:[{type:'mouseover', execute:function(){
        this.addEventListener('mouseover', moFocusin)
    }}]});
                        return (btn.text.sub)?nestElem([newbtn, mkSpan({class:`sub-text`, inner:`${btn.text.sub}`})]):newbtn;
                    })
                ])
            ]
        ]);
    }
}

async function createNavBtns() {
    drawers = await getData();
    if (drawers)
        for (let d of drawers){
            document.querySelector('nav .btn-group').appendChild(
                mkBtn({
                    class: `btn btn-primary p-3${(d.hidden)?' hbb dnone':''}`,
                    id: d.id,
                    type: 'button',
                    inner: d.title,
                    prop: {
                        ariaLabel: d.title,
                        ariaSelected: false,
                        ariaHidden: d.hidden
                    },
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
            mkElem({elemType:'figure', class:'logo', 'aria-label':'Imagine Learning Logo'}),
            mkImg({src:'./data/logoIL.webp', alt:'Imagine Learning Logo'})
        ])
    ]
]);

window.onload = function(){
    document.body.children[0].appendChild(nav_bar);
    document.body.appendChild(mkDiv({class:'hb', prop:{ariaHidden:true, active:false}, listeners:[{type:'click', execute:toggleHb}]}))
    createNavBtns();
}
