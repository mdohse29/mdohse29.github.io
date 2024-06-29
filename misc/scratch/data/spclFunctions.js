function mkDiv(attr = {}){
    let div = document.createElement('div');
    for (let a in attr){
        if (a.includes('inner')){
            div.innerHTML = attr[a];
        }else{
            div.setAttribute(a, attr[a]);
        }
    }

    return div;
}

function mkSpan(attr = {}){
    let span = document.createElement('span');
    for (let a in attr){
        if (a.includes('inner')){
            span.innerHTML = attr[a];
        }else{
            span.setAttribute(a, attr[a]);
        }
    }

    return span;
}

function mkP(attr = {}){
    let p = document.createElement('span');
    for (let a in attr){
        if (a.includes('inner')){
            p.innerHTML = attr[a];
        }else{
            p.setAttribute(a, attr[a]);
        }
    }

    return p;
}

function mkLnk(attr = {}){
    let a = document.createElement('a');
    
    for (let at in attr){
        if (at.includes('inner')){
            a.innerHTML = attr[at];
        }else{
            a.setAttribute(at, attr[at]);
        }
    }

    return a;
}

function mkLabel(attr = {}){
    let label = document.createElement('label');

    for (let a in attr){
        if (a.includes('inner')){
            label.innerText = attr[a];
        }else{
            label.setAttribute(a, attr[a]);
        }
    }

    return label;
}

function mkOpt(attr = {}){
    let option = document.createElement('option');
    if (!attr.value){
        throw Error('A value key must be set\nmkOpt({value:\'some value\'})\n\nCurrent Keys: {' + Object.keys(attr) + '}');
    }
    if (Object.keys(attr).length > 1){
        for (let a in attr){
            if (a.includes('inner')){
                option.innerText = attr[a];
            }else{
                option.setAttribute(a, attr[a]);
            }
        }
    }else{
        option.value = attr.value;
        option.innerText = attr.value[0].toUpperCase() + attr.value.substring(1);
        option.classList.add(attr.value);
    }

    return option;
}

function mkinp(attr = {}){
    let elements = {};
    if (!attr.type){
        throw Error("A type value must be defined.\n\nCurrent Keys: {" + Object.keys(attr) + "}");
    }
    switch(attr.type){
        case 'select':
            elements.input = document.createElement(attr.type);
            for (let at in attr){
                if (!at.includes('option')){
                    elements.input.setAttribute(at, attr[at]);
                }
            }

            for (let a in attr.options){
                elements.input.appendChild(mkOpt(attr.options[a]));
            }
            break;
        default:
            elements.input = document.createElement('input');
            if (!attr.id && attr.name){
                attr.id = attr.name;
            }else if (!attr.name && attr.id){
                attr.name = attr.id;
            }else if (!attr.id && !attr.name){
                throw Error("A name or id key should be set\n{name:''} or {id:''}\n\nCurrent Keys: {" + Object.keys(attr) + "}");
            }
            for (let a in attr){
                elements.input.setAttribute(a, attr[a]);
            }

            if (attr.label){
                elements.label = mkLabel({for:attr.name, inner:attr.label});
            }
            
            break;
    }

    return elements;
}

function mkbtn(attr = {}){
    let btn = document.createElement('button');
//c, i, t, tt
    for (let a in attr){
        if (a.includes('inner')){
            btn.innerHTML = attr[a];
        }else{
            btn.setAttribute(a, attr[a]);
        }
    }

    return btn;
}

function mkrtnl(){
    let rtrnTB = document.createElement('p');
    let TB = mkLnk({href:'../../toolBox.html', innerText:'Return to ToolBox'});
    rtrnTB.id = 'toolBox';
    rtrnTB.classList.add('me-3');
    rtrnTB.appendChild(TB);

    return rtrnTB;
}

function crtad(){
    let disbchk = document.querySelectorAll('button');
    let btnenbl = false;

    let div1 = mkDiv({class:'spclFtr m-2'});
    let div2 = mkDiv({class:'dnone search-replace'});
    let div2a = mkDiv({class:'search'});
    let div2b = mkDiv({class:'search-options d-block'});

    let indiv2a1 = mkinp({type:'text', name:'search', placeholder:'Search', class:'form-control'});
    let indiv2a2 = mkinp({type:'text', name:'replace', placeholder:'Replace', class:'form-control'});
    let indiv2b1 = mkinp({type:'checkbox', name:'word', label:'Strict Search'});
    let indiv2b2 = mkinp({type:'checkbox', name:'regex', label:'Regex'});

    let btndiv2a = mkbtn({class:'btn btn-outline-success', id:'rep', inner:'Replace'});
    let btndiv2acls = mkbtn({class:'btn btn-close btn-dark btn-lg mx-2', id:'search-close'});

    div2a.appendChild(indiv2a1.input);
    div2a.appendChild(indiv2a2.input);
    div2a.appendChild(btndiv2a);
    div2a.appendChild(btndiv2acls);
    div2b.appendChild(indiv2b1.input);
    div2b.appendChild(indiv2b1.label);
    div2b.appendChild(indiv2b2.input);
    div2b.appendChild(indiv2b2.label);
    div2.appendChild(div2a);
    div2.appendChild(div2b);
    div1.appendChild(div2);
    div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'sandr', inner:'S&R'}));

    for (let btn of disbchk){
        if (btn.disabled){
            btnenbl = btn.disabled;
            break;
        }
    }

    if (btnenbl){
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm dnone', id:'stop', inner:'Disable Text Processing'}));
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'start', inner:'Enable Text Processing'}));
    }else{
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'stop', inner:'Disable Text Processing'}));
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm dnone', id:'start', inner:'Enable Text Processing'}));
    }

    div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'ff', inner:'Format Filename'}));
    div1.appendChild(mkbtn({class:'btn btn-close btn-dark', id:'ad-close'}));

    return div1;
}

function createToggle(attr = {}){
    let container = mkDiv({id:attr.id, class: ((attr.class) ? 'switch-container ' + attr.class : 'switch-container'), title:attr.title});
    let label = mkLabel({inner:(attr.label) ? attr.label : ''});
    let togCont = mkDiv({class:'toggle-cont'});
    let pill = mkDiv({class:'toggle-pill'});

    togCont.appendChild(pill);
    container.appendChild(label);
    container.appendChild(togCont);

    return container;
}

function crtSpin(){
    let spinner = mkDiv({class:'spinner-background'});
    let inDiv = mkDiv({class:'spinner-border', role:'status'});
    let span = mkSpan({class:'visually-hidden', inner:'Loading...'});
    inDiv.appendChild(span);
    spinner.appendChild(inDiv);

    return spinner;
}

function setToggleListeners(){
    let toggles = document.querySelectorAll('.toggle-pill');

    for(let ts of toggles){
        ts.addEventListener('click', function(){
            let pill = this;
            let container = pill.parentElement;
            let pillStyle = window.getComputedStyle(pill);
            let marg = container.scrollWidth - (pill.scrollWidth + 4);
            let currentMarg = pillStyle.marginLeft.replace('px','');
            
            if (currentMarg < marg){
                pill.style.setProperty('margin-left', marg + 'px');
                container.classList.add('tg-on');
            }else{
                pill.style.setProperty('margin-left','2px');
                container.classList.remove('tg-on');
            }
            document.querySelector('textarea').focus();
        });
    }
    let labels = document.querySelectorAll('.switch-container > label');

    for (let label of labels){
        label.addEventListener('click', function(){
            // document.querySelector('.toggle-pill').click();
            this.parentElement.children[1].children[0].click();
        });
    }
}