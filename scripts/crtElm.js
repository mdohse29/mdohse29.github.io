function mkDiv(attr = {}){
    attr.elemType = 'div';
    return mkElem(attr);
}

function mkSpan(attr = {}){
    attr.elemType = 'span';
    return mkElem(attr);
}

function mkP(attr = {}){
    attr.elemType = 'p';
    return mkElem(attr);
}

function mkLnk(attr = {}){
    attr.elemType = 'a';
    return mkElem(attr);
}

function mkLabel(attr = {}){
    attr.elemType = 'label';
    return mkElem(attr);
}

function mkbtn(attr = {}){
    attr.elemType = 'button'
    return mkElem(attr);
}

function mkOpt(attr = {value:''}){
    let option = document.createElement('option');
    if (!attr.value){
        throw Error('A value key must be set\nmkOpt({value:\'some value\'})\n\nCurrent Keys: {' + Object.keys(attr) + '}');
    }
    if (Object.keys(attr).length > 1){
        for (let a in attr){
            if (a.includes('inner')){
                option.innerText = attr[a];
            }else{
                if (attr[a]){
                    option.setAttribute(a, attr[a]);
                }
            }
        }
    }else{
        option.value = attr.value;
        option.innerText = attr.value[0].toUpperCase() + attr.value.substring(1);
        option.classList.add(attr.value);
    }

    return option;
}

function mkinp(attr = {type:'', id:''}){
    let elements = {};
    if (!attr.type){
        throw Error("A type type must be defined.\n\nCurrent Keys: {" + Object.keys(attr) + "}");
    }
    switch(attr.type){
        case 'select':
            elements.input = document.createElement(attr.type);
            for (let at in attr){
                if (!at.includes('option')){
                    if (attr[at]){
                        elements.input.setAttribute(at, attr[at]);
                    }
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
                if (attr[a]){
                    elements.input.setAttribute(a, attr[a]);
                }
            }

            if (attr.label){
                elements.label = mkLabel({for:attr.id, inner:attr.label});
                if (attr.labelOpt){
                    for (let b in attr.labelOpt){
                        if (attr.labelOpt[b]){
                            elements.label.setAttribute(b, attr.labelOpt[b]);
                        }
                    }
                }
            }
            
            break;
    }

    return elements;
}

function mkHead(attr = {hType:'', inner:''}){
    if (!(attr.inner && attr.hType)){
        throw new Error("The inner and hType keys are required\nmkHead({hType:'h1', inner:'Text to be displayed'})");
    }

    let header = document.createElement(attr.hType);

    for (let a in attr){
        if (a.includes('inner')){
            header.innerHTML = attr[a];
        }else{
            if (!a.includes('hType')){
                if (attr[a]){
                    header.setAttribute(a, attr[a]);
                }
            }
        }
    }

    return header;
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
    // MUST be using Bootstrap css
    let spinner = mkDiv({class:'spinner-background'});
    let inDiv = mkDiv({class:'spinner-border', role:'status'});
    let span = mkSpan({class:'visually-hidden', inner:'Loading...'});
    inDiv.appendChild(span);
    spinner.appendChild(inDiv);

    return spinner;
}

function nestElem(elemArry = []){
    for (let a = elemArry.length-2; a >= 0; a--){
        if (Object.keys(elemArry[a+1]).length > 0){
            for (let b in elemArry[a+1]){
                elemArry[a].appendChild(elemArry[a+1][b]);
            }
        }else{
            elemArry[a].appendChild(elemArry[a+1]);
        }
    }

    return elemArry[0];
}

function mkElem(attr = {elemType:''}){
    if (!attr.elemType){
        throw new Error('You must specify what type of element to create\nmkElem({elemType:\'\'})');
    }
    let element = document.createElement(attr.elemType);

    for (let a in attr){
        if (a.includes('inner')){
            element.innerHTML = attr[a];
        }else{
            if (attr[a] && !a.includes('elemType')){
                element.setAttribute(a, attr[a]);
            }
        }
    }

    return element;
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