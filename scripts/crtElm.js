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
    let option = mkElem({elemType:'option'});
    if (!attr.value){
        throw Error('A value key must be set\nmkOpt({value:\'some value\'})\n\nCurrent Keys: {' + Object.keys(attr) + '}');
    }
    if (attr.isColor){
        option.value = attr.value;
        option.innerText = attr.value[0].toUpperCase() + attr.value.substring(1);
        option.classList.add(attr.value);
    }else if (Object.keys(attr).length > 1){
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
        option.value = attr.value.toLowerCase();
        option.innerText = attr.value;
    }

    return option;
}

function mkinp(attr = {type:'', id:''}){
    let elements = {};
    if (!attr.type){
        throw Error("A type type must be defined.\n\nCurrent Keys: {" + Object.keys(attr) + "}");
    }else if (!attr.id && attr.label){
        throw Error("\n*******************\nA id attribute should be set if using a label so the label can be properly associated to the element.\n*******************\n")
    }
    switch(attr.type){
        case 'select':
            elements.input = mkElem({elemType:attr.type});
            for (let at in attr){
                if (!at.match(/options|listeners|label/) && attr[at]){
                        elements.input.setAttribute(at, attr[at]);
                }
            }

            for (let a in attr.options){
                elements.input.appendChild(mkOpt(attr.options[a]));
            }
            break;
        default:
            elements.input = mkElem({elemType:'input'});
            if (!attr.id && attr.name){
                attr.id = attr.name;
            }else if (!attr.name && attr.id){
                attr.name = attr.id;
            }else if (!attr.id && !attr.name){
                throw Error("A name or id key should be set\n{name:''} or {id:''}\n\nCurrent Keys: {" + Object.keys(attr) + "}");
            }
            for (let a in attr){
                if (!a.match(/options|listeners|label/) && attr[a]){
                    elements.input.setAttribute(a, attr[a]);
                }
            }
            
            break;
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

    if (attr.listeners){
        for (let l of attr.listeners){
            elements.input.addEventListener(l.type, l.execute);
        }
    }

    return (elements.label) ? elements : elements.input;
}

function mkHead(attr = {hType:'', inner:''}){
    if (!(attr.inner && attr.hType)){
        throw new Error("The inner and hType keys are required\nmkHead({hType:'h1', inner:'Text to be displayed'})");
    }

    attr.elemType = attr.hType;
    delete attr.hType;

    return mkElem(attr);
}

function createToggle(attr = {id:'',title:'',label:'',isLocked:false}){
    return nestElem([
        mkDiv({id:attr.id, class: ((attr.class) ? 'switch-container ' + attr.class : 'switch-container'), title:attr.title, isLocked:attr.isLocked}),
        {
            1:mkLabel({inner:(attr.label) ? attr.label : ''}),
            2:nestElem([
                mkDiv({class:'switch'}),
                mkDiv({class:'toggle-cont'}),
                mkDiv({class:'toggle-pill'})
            ])
        }
    ])
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
        }else if(a.includes('listeners')){
            if (attr[a].length){
                for (let l of attr[a]){
                    element.addEventListener(l.type, l.execute);
                }
            }
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
        ts.addEventListener('click', function(e){
            let pill = this;
            let container = pill.parentElement;
            let switchContainer = container.parentElement.parentElement;
            let marg = container.scrollWidth - (pill.scrollWidth + 4);
            let isLocked = switchContainer.getAttribute('isLocked');
            
            if (!container.classList.contains('tg-on')){

                pill.style.setProperty('margin-left', marg + 'px');
                container.classList.add('tg-on');

                if (e.ctrlKey && isLocked == 'false'){

                    switchContainer.setAttribute('isLocked', 'true');
                    container.style.backgroundColor = 'red';

                }

            }else{
                if (!switchContainer.hasAttribute('isLocked') || isLocked == 'false'){

                    if (e.ctrlKey && isLocked == 'false'){

                        switchContainer.setAttribute('isLocked', 'true');
                        container.style.backgroundColor = 'red';

                    }else{

                        pill.style.setProperty('margin-left','2px');
                        container.classList.remove('tg-on');

                    }
                }else{

                    if (e.ctrlKey){

                        container.removeAttribute('style');
                        switchContainer.setAttribute('isLocked', 'false');

                    }
                }
            }
        });
    }
    let labels = document.querySelectorAll('.switch-container > label');

    for (let label of labels){

        label.addEventListener('click', function(e){

            let switchContainer = this.parentElement;
            let isLocked = switchContainer.getAttribute('isLocked');
            
            if(e.ctrlKey && isLocked == 'false'){
                
                switchContainer.setAttribute('isLocked', 'true');
                switchContainer.querySelector('.toggle-cont').style.backgroundColor = 'red';
                this.parentElement.children[1].children[0].children[0].click();

            }else if (e.ctrlKey && isLocked == 'true'){

                switchContainer.querySelector('.toggle-cont').removeAttribute('style');
                switchContainer.setAttribute('isLocked', 'false');

            }else if(!e.ctrlKey || (e.ctrlKey && !switchContainer.hasAttribute('isLocked'))){

                this.parentElement.children[1].children[0].children[0].click();

            }
        });
    }
}