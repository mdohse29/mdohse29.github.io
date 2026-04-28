export function mkDiv(attr = {}) {
    attr.elemType = 'div';
    return mkElem(attr);
}

export function mkSpan(attr = {}) {
    attr.elemType = 'span';
    return mkElem(attr);
}

export function mkP(attr = {}) {
    attr.elemType = 'p';
    return mkElem(attr);
}

export function mkHeader(attr = { size: 1 }, w_sym_tag = false, sym_tag_attr = {}) {
    if (attr.size === undefined)
        attr.size = 1;
    attr.size = parseInt(attr.size);
    if (attr.size > 0 && attr.size <= 6) {
        attr.elemType = `h${attr.size}`;
    } else {
        attr.elemType = 'h1';
    }
    delete attr.size;
    if (w_sym_tag)
        sym_tag_attr.elemType = 'header';
    return (w_sym_tag) ? nestElem([mkElem(sym_tag_attr), mkElem(attr)]) : mkElem(attr);
}

export function mkLnk(attr = {}) {
    attr.elemType = 'a';
    if (!attr.target)
        attr.target = '_blank';
    return mkElem(attr);
}

export function mkLabel(attr = {}) {
    attr.elemType = 'label';
    return mkElem(attr);
}

export function mkBtn(attr = {}) {
    attr.elemType = 'button';
    return mkElem(attr);
}

export function mkImg(attr = {}) {
    attr.elemType = 'img';
    if (!attr.alt || attr.alt.length < 1)
        attr.alt = 'null';
    return mkElem(attr);
}

export function mkToggle(attr = { id: '', label: '', lockable: false }) {
    const settings = {};
    if (attr.lockable != undefined) {
        settings.lockable = attr.lockable;
        delete attr.lockable;
    }
    if (attr.name == undefined) {
        attr.name = attr.id;
    }
    if (attr.label) {
        settings.label = attr.label;
        if (attr.labelOpt){
            if (attr.labelOpt.listeners != undefined && attr.labelOpt.listeners.length){
                attr.labelOpt.listeners.push({type:'click', execute:md_toggle_label});
            }else{
                attr.labelOpt.listeners = [{ type: 'click', execute: md_toggle_label }]
            }
            settings.labelOpt = attr.labelOpt;
        }else{
            settings.labelOpt = { listeners: [{ type: 'click', execute: md_toggle_label }]}
        }
        delete attr.labelOpt;
        delete attr.label;
    }
    if (attr.class) {
        settings.class = attr.class;
        delete attr.class;
    }
    if (attr.listeners) {
        settings.listeners = attr.listeners;
        delete attr.listeners;
    }
    function md_toggle_switch(ev) {
        if (ev.ctrlKey && ev.target.dataset.locked != undefined) {
            ev.target.dataset.locked = ev.target.dataset.locked != 'true';
            if (!ev.target.checked) {
                ev.preventDefault();
            }
            return;
        }
        if (ev.target.dataset.locked === 'true') {
            ev.preventDefault();
            return;
        }
    }
    function md_toggle_label(ev){
        ev.preventDefault();
        const new_ev = new Event('click', { bubbles: false });
        new_ev.ctrlKey = ev.ctrlKey;
        if (!ev.target.nextElementSibling.hasAttribute('data-locked') || (ev.target.nextElementSibling.dataset.locked === 'false')){
            if (!ev.ctrlKey || !ev.target.nextElementSibling.checked){
                ev.target.nextElementSibling.checked = !ev.target.nextElementSibling.checked;
                ev.target.nextElementSibling.dispatchEvent(new Event('change'));
            }
        }
        ev.target.nextElementSibling.dispatchEvent(new_ev);
    }

    const checkbox = mkElem({
        elemType: 'input',
        type: 'checkbox',
        class: `md-tog`,
        dataset: (settings.lockable) ? { locked: false } : {},
        listeners: [{ type: 'click', execute: md_toggle_switch }, ...(settings.listeners) ? settings.listeners : []],
        ...attr
    })
    const toggle = nestElem([
        mkDiv({ class: `md-tg-container${(settings.class) ? ` ${settings.class}` : ''}` }),
        (settings.label) ?
            [
                mkLabel({ for: attr.id, inner: settings.label, ...settings.labelOpt }),
                checkbox
            ]
            :
            checkbox
    ])
    return toggle;
}

export function mkTable(tData = {}, attr = {}) {
    if (!attr instanceof Object || !tData instanceof Object)
        throw new Error('Arguments must be set as an object\n\nattr = {}\ntData = {}');
    if (!Object.keys(tData).length)
        throw new Error('The tData argument is Empty!\n\ntData = {thead:[], tbody:[]}\ntData = {rows:[]}');
    let table = mkElem({ elemType: 'table', ...attr });
    if (tData.rows && tData.rows instanceof Array && tData.rows.length) {
        tData.rows.forEach(r => { r.forEach(c => { if (!c.attr) c.attr = {}; }) });
        nestElem([
            table,
            tData.rows.map(r => {
                return nestElem([
                    mkElem({ elemType: 'tr' }),
                    r.map(c => {
                        return mkElem({ elemType: c.type, ...c.attr });
                    })
                ])
            })
        ])
    } else if (((tData.thead && tData.tbody) || tData.tbody)) {
        if (tData.thead && tData.thead.length) {
            nestElem([
                table,
                mkElem({ elemType: 'thead' }),
                tData.thead.map(r => {
                    return nestElem([
                        mkElem({ elemType: 'tr' }),
                        r.map(c => {
                            return mkElem({ elemType: c.type, ...c.attr });
                        })
                    ])
                })
            ])
        }
        nestElem([
            table,
            mkElem({ elemType: 'tbody' }),
            tData.tbody.map(r => {
                return nestElem([
                    mkElem({ elemType: 'tr' }),
                    r.map(c => {
                        return mkElem({ elemType: c.type, ...c.attr });
                    })
                ])
            })
        ])
    }
    return table;
}

export function mkOpt(attr = { value: '' }) {
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

export function mkInp(attr = { type: '', id: '' }) {
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
                if (!at.match(/options|listeners|label|labelOpt|type/) && attr[at]) {
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
                } else if (!a.match(/options|listeners|label|labelOpt/) && attr[a]) {
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

export function shuffleArray(array) {
    /** Intakes an Array and returns a fresh array that is randomly shuffled */
    if (!(array instanceof Array))
        throw new TypeError('Argument must be type Array')
    const fresh = [...array]; // I added so it doesn't mutate the original array
    // AI generated Fisher-Yates shuffle implementation :-(
    for (let i = fresh.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fresh[i], fresh[j]] = [fresh[j], fresh[i]];  // Using deconstructing assignment to swap elements
        // This method avoids the need for a temporary variable
    }
    return fresh;
}

export function tgPillListen(e) {
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

export function tgLblListen(e) {

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

export function createToggle(attr = { id: '', title: '', label: '', isLocked: null }) {
    // css location mdohse29.github.io/templates/toggleSwitch/toggleSwitch.css
    return nestElem([
        mkDiv({ id: attr.id, class: ((attr.class) ? 'switch-container ' + attr.class : 'switch-container'), title: attr.title, isLocked: (attr.isLocked != undefined) ? attr.isLocked : null }),
        (attr.label && attr.label.length > 1) ?
            [
                mkLabel({ inner: attr.label, listeners: [{ type: 'click', execute: tgLblListen }] }),
                nestElem([
                    mkDiv({ class: 'switch' }),
                    mkDiv({ class: 'toggle-cont', listeners: [{ type: 'click', execute: tgPillListen }] }),
                    mkDiv({ class: 'toggle-pill', title: (attr.isLocked != undefined) ? 'Hold "Ctrl" while clicking to lock/unlock' : null })
                ])
            ]
            :
            nestElem([
                mkDiv({ class: 'switch' }),
                mkDiv({ class: 'toggle-cont', listeners: [{ type: 'click', execute: tgPillListen }] }),
                mkDiv({ class: 'toggle-pill', title: (attr.isLocked != undefined) ? 'Hold "Ctrl" while clicking to lock/unlock' : null })
            ])
    ]);
}

export function crtSpin() {
    // MUST be using Bootstrap css

    return nestElem([
        mkDiv({ class: 'spinner-background' }),
        mkDiv({ class: 'spinner-border', role: 'status' }),
        mkSpan({ class: 'visually-hidden', inner: 'Loading...' })
    ]);

}

export function nestElem(elemArry = []) {
    for (let a = elemArry.length - 2; a >= 0; a--) {
        if (Object.keys(elemArry[a + 1]).length > 0 && elemArry[a + 1].tagName !== 'SELECT' && !(elemArry[a + 1] instanceof Element)) {
            for (let b in elemArry[a + 1]) {
                // console.log(elemArry[a + 1][b])
                elemArry[a].appendChild(elemArry[a + 1][b]);
            }
        } else {
            elemArry[a].appendChild(elemArry[a + 1]);
        }
    }

    return elemArry[0];
}

export function mkElem(attr = { elemType: '' }) {
    if (!attr.elemType) {
        throw new Error('You must specify what type of element to create\nmkElem({elemType:\'\'})');
    } else if (attr.pptIcon) {
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
        } else if (a.includes('prop')) {
            if (attr.prop instanceof Object)
                for (let p in attr.prop) {
                    element[p] = attr.prop[p];
                }
        } else if (a.includes('dataset')) {
            if (attr.dataset instanceof Object) {
                for (let ds in attr.dataset) {
                    element.dataset[ds] = attr.dataset[ds];
                }
            } else {
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
/**
 * Generates a date string for the current date
 * @param {function} cb - Callback Function
 * @returns {string} - Current date in string format, mm/dd/yyyy
 */
export function date_string(cb) {

    const date = new Date(),
        year = date.getFullYear(),
        month = String(date.getMonth() + 1).padStart(2, '0'),
        day_int = String(date.getDate()).padStart(2, '0'),
        date_string = `${month}-${day_int}-${year}`;

    if (cb) {
        return cb(date_string);
    }
    return date_string;
}

export function mrd(rtn = false) {
    const attr = { inner: 'Created By: MR D', style: 'font-size: 8px;color: transparent;' };
    if (rtn) {
        return mkSpan(attr);
    }
    document.body.append(mkSpan(attr));
}