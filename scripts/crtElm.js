function mkDiv(attr = {}) {
    attr.elemType = 'div';
    return mkElem(attr);
}

function mkSpan(attr = {}) {
    attr.elemType = 'span';
    return mkElem(attr);
}

function mkP(attr = {}) {
    attr.elemType = 'p';
    return mkElem(attr);
}

function mkLnk(attr = {}) {
    attr.elemType = 'a';
    return mkElem(attr);
}

function mkLabel(attr = {}) {
    attr.elemType = 'label';
    return mkElem(attr);
}

function mkBtn(attr = {}) {
    attr.elemType = 'button';
    return mkElem(attr);
}

function mkImg(attr = {}){
    attr.elemType = 'img';
    if (!attr.alt || attr.alt.length < 1)
        attr.alt = 'null';
    return mkElem(attr);
}

function mkTable(tData={}, attr={}){
    if (!attr instanceof Object || !tData instanceof Object)
        throw new Error('Arguments must be set as an object\n\nattr = {}\ntData = {}');
    if (!Object.keys(tData).length)
        throw new Error('The tData argument is Empty!\n\ntData = {thead:[], tbody:[]}\ntData = {rows:[]}');
    let table = mkElem({elemType:'table', ...attr});
    if (tData.rows && tData.rows instanceof Array && tData.rows.length){
        tData.rows.forEach(r=>{r.forEach(c=>{if (!c.attr)c.attr={};})});
        nestElem([
            table,
            tData.rows.map(r=>{
                return nestElem([
                    mkElem({elemType:'tr'}),
                    r.map(c=>{
                        return mkElem({elemType:c.type, ...c.attr});
                    })
                ])
            })
        ])
    }else if (((tData.thead && tData.tbody) || tData.tbody)){
        if (tData.thead && tData.thead.length){
            nestElem([
                table,
                mkElem({elemType:'thead'}),
                tData.thead.map(r=>{
                    return nestElem([
                        mkElem({elemType:'tr'}),
                        r.map(c=>{
                            return mkElem({elemType:c.type, ...c.attr});
                        })
                    ])
                })
            ])
        }
        nestElem([
            table,
            mkElem({elemType:'tbody'}),
            tData.tbody.map(r=>{
                return nestElem([
                    mkElem({elemType:'tr'}),
                    r.map(c=>{
                        return mkElem({elemType:c.type, ...c.attr});
                    })
                ])
            })
        ])
    }
    return table;
}

function mkOpt(attr = { value: '' }) {
    let option = mkElem({ elemType: 'option' });
    if (!attr.value) {
        throw Error('A value key must be set\nmkOpt({value:\'some value\'})\n\nCurrent Keys: {' + Object.keys(attr) + '}');
    }
    if (attr.isColor) {
        option.value = attr.value;
        option.innerHTML = attr.value[0].toUpperCase() + attr.value.substring(1);
        option.classList.add(attr.value);
    } else if (Object.keys(attr).length > 1) {
        for (let a in attr) {
            if (a.includes('inner')) {
                option.innerHTML = attr[a];
            } else {
                if (attr[a]) {
                    option.setAttribute(a, attr[a]);
                }
            }
        }
    } else {
        option.value = attr.value.toLowerCase();
        option.innerHTML = attr.value;
    }

    return option;
}

function mkInp(attr = { type: '', id: '' }) {
    let elements = {};
    if (!attr.type) {
        throw Error("A input type must be defined.\n\nExample: {type: 'text'}\n\nCurrent Keys: {" + Object.keys(attr) + "}");
    } else if (!attr.id && attr.label) {
        throw Error("\n*******************\nThe id attribute should be set if using a label so the label can be properly associated to the element.\n*******************\n")
    }
    switch (attr.type) {
        case 'select':
            elements.input = mkElem({ elemType: attr.type });
            for (let at in attr) {
                if (!at.match(/options|listeners|label|type/) && attr[at]) {
                    elements.input.setAttribute(at, attr[at]);
                }
            }

            if (attr.options)
                for (let opt of attr.options) {
                    elements.input.appendChild(mkOpt(opt));
                }
            break;
        default:
            elements.input = mkElem({ elemType: 'input' });

            for (let a in attr) {
                if (a.includes('inner')) {
                    elements.input.innerHTML = attr[a];
                } else if (!a.match(/options|listeners|label/) && attr[a]) {
                    elements.input.setAttribute(a, attr[a]);
                }
            }

            break;
    }

    if (attr.label) {

        if (attr.labelOpt) {

            elements.label = mkLabel({ for: attr.id, inner: attr.label, ...attr.labelOpt });

        } else {

            elements.label = mkLabel({ for: attr.id, inner: attr.label });

        }

    }

    if (attr.listeners) {
        for (let l of attr.listeners) {
            elements.input.addEventListener(l.type, l.execute);
        }
    }

    return (elements.label) ? elements : elements.input;
}

function tgPillListen(e) {
    let pill = this.querySelector('.toggle-pill');
    let container = this;
    let switchContainer = container.parentElement.parentElement;
    let marg = container.scrollWidth - (pill.scrollWidth + 4);
    let isLocked = switchContainer.getAttribute('isLocked');

    if (!container.classList.contains('tg-on')) {

        pill.style.setProperty('margin-left', marg + 'px');
        container.classList.add('tg-on');

        if (e.ctrlKey && isLocked == 'false') {

            switchContainer.setAttribute('isLocked', 'true');
            container.style.backgroundColor = 'red';

        }

    } else {
        if (!switchContainer.hasAttribute('isLocked') || isLocked == 'false') {

            if (e.ctrlKey && isLocked == 'false') {

                switchContainer.setAttribute('isLocked', 'true');
                container.style.backgroundColor = 'red';

            } else {

                pill.style.setProperty('margin-left', '2px');
                container.classList.remove('tg-on');

            }
        } else {

            if (e.ctrlKey) {

                container.removeAttribute('style');
                switchContainer.setAttribute('isLocked', 'false');

            }
        }
    }
}

function tgLblListen(e) {

    let switchContainer = this.parentElement;
    let isLocked = switchContainer.getAttribute('isLocked');

    if (e.ctrlKey && isLocked == 'false') {

        switchContainer.setAttribute('isLocked', 'true');
        switchContainer.querySelector('.toggle-cont').style.backgroundColor = 'red';
        this.parentElement.children[1].children[0].children[0].click();

    } else if (e.ctrlKey && isLocked == 'true') {

        switchContainer.querySelector('.toggle-cont').removeAttribute('style');
        switchContainer.setAttribute('isLocked', 'false');

    } else if (!e.ctrlKey || (e.ctrlKey && !switchContainer.hasAttribute('isLocked'))) {

        this.parentElement.children[1].children[0].children[0].click();

    }
}

function createToggle(attr = { id: '', title: '', label: '', isLocked: null}) {
    // css location mdohse29.github.io/templates/toggleSwitch/toggleSwitch.css
    return nestElem([
        mkDiv({ id: attr.id, class: ((attr.class) ? 'switch-container ' + attr.class : 'switch-container'), title: attr.title, isLocked: (attr.isLocked != undefined)?attr.isLocked:null }),
        (attr.label && attr.label.length > 1) ?
            [
                mkLabel({ inner: attr.label, listeners: [{ type: 'click', execute: tgLblListen }] }),
                nestElem([
                    mkDiv({ class: 'switch' }),
                    mkDiv({ class: 'toggle-cont', listeners: [{ type: 'click', execute: tgPillListen }] }),
                    mkDiv({ class: 'toggle-pill', title:(attr.isLocked != undefined)?'Hold "Ctrl" while clicking to lock/unlock':null})
                ])
            ]
            :
            nestElem([
                mkDiv({ class: 'switch' }),
                mkDiv({ class: 'toggle-cont', listeners: [{ type: 'click', execute: tgPillListen }] }),
                mkDiv({ class: 'toggle-pill', title:(attr.isLocked != undefined)?'Hold "Ctrl" while clicking to lock/unlock':null})
            ])
    ]);
}

function crtSpin() {
    // MUST be using Bootstrap css

    return nestElem([
        mkDiv({ class: 'spinner-background' }),
        mkDiv({ class: 'spinner-border', role: 'status' }),
        mkSpan({ class: 'visually-hidden', inner: 'Loading...' })
    ]);

}

function nestElem(elemArry = []) {
    for (let a = elemArry.length - 2; a >= 0; a--) {
        if (Object.keys(elemArry[a + 1]).length > 0 && elemArry[a + 1].tagName !== 'SELECT' && !(elemArry[a+1] instanceof Element)) {
            for (let b in elemArry[a + 1]) {
                console.log(elemArry[a + 1][b])
                elemArry[a].appendChild(elemArry[a + 1][b]);
            }
        } else {
            elemArry[a].appendChild(elemArry[a + 1]);
        }
    }

    return elemArry[0];
}

function mkElem(attr = { elemType: '' }) {
    if (!attr.elemType) {
        throw new Error('You must specify what type of element to create\nmkElem({elemType:\'\'})');
    }else if (attr.pptIcon){
        attr.icon = attr.pptIcon;
        delete attr.pptIcon;
    }
    let element = document.createElement(attr.elemType);

    for (let a in attr) {
        if (a.includes('inner')) {
            element.innerHTML = element.innerHTML + attr[a];
        } else if (a.includes('icon')) {
            element.prepend(attr[a]);
        } else if (a.includes('listeners')) {
            if (attr[a].length) {
                for (let l of attr[a]) {
                    element.addEventListener(l.type, l.execute);
                }
            }
        } else if (a.includes('prop')){
            for (let p in attr.prop){
                // console.log(p, attr.props)
                element[p] = attr.prop[p];
            }
        } else if (a.includes('dataset')){
            if (attr.dataset instanceof Object){
                for (let ds in attr.dataset){
                    element.dataset[ds] = attr.dataset[ds];
                }
            }else{
                console.warn('The dataset attribute should be typeof Object\ndataset:{}');
                
            }
        } else {
            if (attr[a] && !a.includes('elemType')) {
                element.setAttribute(a, attr[a]);
            }
        }
    }

    return element;
}

function mrd(rtn = false) {
    const attr = { inner: 'Created By: MR D', style: 'font-size: 8px;color: transparent;' };
    if (rtn) {
        return mkSpan(attr);
    }
    document.body.append(mkSpan(attr));
}