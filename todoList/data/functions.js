const UA = navigator.userAgent;
let targetElement = null;
let errorTimeoutID = NaN;
let toID = NaN;
let listVar = 'default';
const frameCheck = window.top === window.self;

function dupeCheck(item) {

    let currentList = document.querySelectorAll('#list > p');

    if (currentList) {

        let pid = null;

        if (targetElement) {

            pid = targetElement.attributes.pid.value;

        }

        if (pid && (targetElement.id === 'listSubItem' || getActiveBtn().id === 'addSub')) {

            for (let element of currentList) {

                if (getItemText(element).toLowerCase() === item.toLowerCase()) {

                    return true;

                } else if (element.attributes.pid.value === pid && element.children.length > 1) {

                    let children = [...element.children].filter((f) => { if (f.id === 'listSubItem') { return f; } });

                    for (let i of children) {

                        if (getItemText(i).toLowerCase() === item.toLowerCase()) {

                            return true;

                        }

                    }

                }

            }

        } else {

            for (let element of currentList) {

                if (getItemText(element).toLowerCase() === item.toLowerCase()) {

                    return true;

                }

                if (element.children.length > 1) {

                    let children = [...element.children].filter((f) => { if (f.id === 'listSubItem') { return f; } });

                    for (let i of children) {

                        if (getItemText(i).toLowerCase() === item.toLowerCase()) {

                            return true;

                        }

                    }

                }

            }

        }

    }

    return false;
}

function rmvTimeout() {

    if (errorTimeoutID) {

        clearTimeout(errorTimeoutID);
        errorTimeoutID = NaN;

    }

}

function errorMsg(message = 'Empty items or duplicate items are not accepted.<br>Check your entry and try again.', type = 'danger', to = 5000) {

    let currentMsg = document.querySelector('article.message');

    rmvTimeout();

    if (currentMsg) {

        currentMsg.remove();

    }

    document.querySelector('.card-header.main-bg').prepend(nestElem([

        mkElem({ elemType: 'article', class: `message is-small is-${type}`, listeners: [{ type: 'mouseenter', execute: manRmvMsg }] }),
        {

            1: nestElem([
                mkDiv({ class: 'message-header is-justify-content-end' }),
                mkBtn({ class: 'delete', listeners: [{ type: 'click', execute: removeMsg }] })
            ]),
            2: nestElem([
                mkDiv({ class: 'message-body is-flex is-justify-content-center', style: 'text-align: center;' }),
                mkP({ inner: message })
            ])

        }

    ]));

    document.querySelector('#item').classList.add('is-danger');

    errorTimeoutID = setTimeout(removeMsg, to);

}

function manRmvMsg() {

    rmvTimeout();

    this.addEventListener('mouseleave', removeMsg);

}

function removeMsg() {

    let currentMsg = document.querySelector('article.message');

    if (currentMsg) {

        rmvTimeout();
        currentMsg.remove();

    }


}

function getActiveBtn() {

    let buttons = document.querySelector('.listBtn').querySelectorAll('button');

    for (let btn of buttons) {
        if (!btn.classList.contains('dnone')) {
            return btn;
        }
    }

}

function resetListBtn() {

    document.querySelector('#item').classList.remove('is-danger');

    removeMsg();

    document.querySelectorAll('.listBtn button').forEach(btn => {

        if (btn.id === 'addItem') {

            btn.classList.remove('dnone');

        } else {

            btn.classList.add('dnone');

        }

    });

}

function moListItem(e) {
    let element = e.target;
    if (element.tagName === 'I') {
        element = element.parentElement;
    }
    if (element.id === 'listItem') {
        //reset all main item icons
        document.querySelectorAll('i.has-background-item').forEach(elm => {
            elm.classList.remove('has-background-item');
        });

        element.children[0].classList.add('has-background-item');
    } else if (element.id === 'listSubItem') {
        //reset all subitems | makes sure they don't stick
        document.querySelectorAll('span.has-background-item').forEach(elm => {
            elm.classList.remove('has-background-item');
        });

        element.classList.add('has-background-item');
    }
}

function mlLitsItem() {

    this.children[0].classList.remove('has-background-item');

}

function mlSubItem() {

    this.classList.remove('has-background-item');

}

function clkListItem(event) {
    resetListBtn();

    document.querySelector('#item').value = '';

    targetElement = ((event.target.tagName === 'I') ? event.target.parentElement : event.target);

    openOptions(event);

}

function clkEdit() {

    let input = document.querySelector('#item');
    let icon = targetElement.children[0];
    let subItems = [...targetElement.children].filter(f => { if (f.id === 'listSubItem') return f });
    let text = getItemText(targetElement);
    let newText = input.value.trim();

    if (newText && !dupeCheck(newText) && !(newText.includes(';'))) {

        text = text.replace(text, newText);
        text = text.replace(text.substring(0, 1), text.substring(0, 1).toUpperCase());
        targetElement.innerText = text;
        targetElement.prepend(icon);

        subItems.forEach(item => {
            targetElement.appendChild(item);
        });

        document.querySelector('#editItem').classList.add('dnone');
        document.querySelector('#addItem').classList.remove('dnone');
        input.value = '';

        setCookie();

        targetElement = null;

    } else {

        if (!newText) {
            errorMsg('Empty items are not accepted.<br>If you want to remove the item,<br>just click complete in the options.');
        } else if (dupeCheck(newText)) {
            errorMsg('No Change Was Made!<br>Press ESC to clear,<br>or select another list item and select cancel.');
        } else if (newText.includes(';')) {
            errorMsg('ERROR: Semi colons ";" are not allowed.');
        }
        input.value = text;
        input.focus();

    }

}

function clkUndoItem() {
    const elem = targetElement;
    try {
        switch (elem.id) {
            case 'listSubItem':
                // something here
                switch (elem.parentElement.id) {
                    case 'doneSubs':
                        // something here
                        const parent = document.querySelector(`#list > p[pid="${elem.attributes.pid.value}"]`);
                        if (dupeCheck(elem.innerText.trim())) {
                            throw Error();
                        } else {
                            setAllCaret(elem);

                            elem.classList.remove('has-background-item');
                            elem.removeEventListener('click', clkListItem);

                            changeTitle(elem);

                            parent.appendChild(elem);
                            setCookie();
                        }
                        break;
                    default:
                        //something here
                        targetElement = null;
                        if (dupeCheck(elem.innerText.trim())) {
                            throw Error();
                        } else {
                            elem.remove();
                            document.getElementById('list').prepend(createItem(elem.innerText.trim()));
                            setCookie();
                        }
                        break;
                }
                break;
            case 'listItem':
                // something here
                if (elem.children.length > 1) {
                    // has sub list items
                    let children = [...elem.children].filter((m) => { if (m.id === 'listSubItem') { return m }; });
                    targetElement = null;
                    if (dupeCheck(getItemText(elem))) {
                        throw Error();
                    } else {
                        for (let ch of children) {
                            targetElement = ch;
                            if (dupeCheck(getItemText(ch))) {
                                throw Error();
                            }
                            changeTitle(ch);
                        }
                        elem.remove();
                        setAllCaret(elem);
                        elem.removeEventListener('click', clkUndoItem);
                        elem.addEventListener('click', clkListItem);

                        changeTitle(elem);
                        document.getElementById('list').prepend(elem);

                        setCookie();
                    }
                } else {
                    // no sub list items
                    targetElement = null;
                    if (dupeCheck(elem.innerText.trim())) {
                        throw Error();
                    } else {
                        elem.remove();
                        document.getElementById('list').prepend(createItem(elem.innerText.trim()));
                        setCookie();
                    }
                }
                break;
        }
    } catch (err) {
        errorMsg("A duplicate item is detected in the current list.<br>Undo was not successful!");
        elem.style.border = '2px solid red';
        setTimeout(() => {
            elem.removeAttribute('style');
        }, 1500);
    }

    closeOptions();

    let checkDone = document.querySelector('#done');

    if (checkDone && checkDone.querySelectorAll('#listItem, #listSubItem').length === 0)
        checkDone.remove();

    targetElement = null;
}

function clkCopyItem() {
    navigator.clipboard.writeText(getItemText(targetElement));
    closeOptions();
    targetElement = null;
}

function toggleLstBtn(event) {

    let target = event.target;

    if (target.tagName === 'I') {
        target = target.parentElement;
    }

    closeOptions();

    if (target.id === 'edit') {

        document.querySelector('#item').value = getItemText(targetElement);
        document.querySelector('#editItem').classList.remove('dnone');
        document.querySelector('#addSub').classList.add('dnone');

    } else if (target.id === 'crtSub') {

        document.querySelector('#addSub').classList.remove('dnone');
        document.querySelector('#editItem').classList.add('dnone');

    }

    document.querySelector('#addItem').classList.add('dnone');
    document.querySelector('#item').focus();

}

function changeTitle(elem) {

    if (!elem.title.includes('Click to Undo')) {

        elem.title = 'Click to Undo';

    } else {

        elem.title = 'Click for Options'

    }

}

function getItemText(elem) {

    return ((elem.id === 'listItem' && elem.innerText.includes('\n')) ? elem.innerText.substring(0, elem.innerText.indexOf('\n')) : elem.innerText);

}

function setAllCaret(elem) {

    let icons = elem.querySelectorAll('i');

    icons.forEach(icon => {

        icon.classList.replace('bi-check-circle-fill', ((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'));
        icon.classList.remove('has-text-success');

    });

}

function setAllCheck(elem, isDone = false) {

    let icons = elem.querySelectorAll('i');

    icons.forEach(icon => {

        icon.classList.replace(((icon.parentElement.id === 'listSubItem') ? 'bi-caret-right' : 'bi-caret-right-fill'), 'bi-check-circle-fill');

        if (isDone) {

            icon.classList.remove('has-text-success');

        } else {

            icon.classList.add('has-text-success');

        }

    });

}

function createItem(item, data = { isSub: false, pid: NaN }) {

    let elem = mkElem(
        {
            elemType: ((data.isSub) ? 'span' : 'p'),
            class: ((data.isSub) ? '' : 'mb-2'),
            title: 'Click for Options',
            id: ((data.isSub) ? 'listSubItem' : 'listItem'),
            // pid:((data.isSub) ? data.pid : (Math.floor(Math.random() * 10) + 1)), // testing
            pid: ((data.isSub) ? data.pid : crypto.randomUUID()),
            inner: (item.toLowerCase().includes('http')) ? item.toLowerCase() : item.substring(0, 1).toUpperCase() + item.substring(1),
            listeners: ((data.isSub) ? [
                {
                    type: 'mouseleave',
                    execute: mlSubItem
                }
            ] : [
                {
                    type: 'mouseover',
                    execute: moListItem
                },
                {
                    type: 'mouseleave',
                    execute: mlLitsItem
                },
                {
                    type: 'click',
                    execute: clkListItem
                }
            ])
        }
    );

    elem.prepend(mkElem({ elemType: 'i', class: 'bi ' + ((data.isSub) ? 'bi-caret-right' : 'bi-caret-right-fill') }));

    return elem;

}

function doneContainer() {

    return nestElem([
        mkDiv({ class: 'card-content pt-0', id: 'done' }),
        {
            1: mkElem({ elemType: 'h4', class: 'h4', inner: '<i class="bi bi-check-circle-fill has-text-success"></i>Done!' }),
            2: mkP({ id: 'doneSubs' })
        }
    ]);

}

function moveElement(elem) {
    if (elem.id === 'listItem') {

        let doneChildren = document.querySelectorAll('#doneSubs #listSubItem');
        let children = [...elem.children].filter(f => { if (f.id === 'listSubItem') return f });

        if (children.length) {

            children.forEach(child => {

                changeTitle(child);
                setAllCheck(child, true);

            });

        }

        elem.children[0].classList.remove('has-background-item', 'has-text-success');

        if (doneChildren.length) {

            doneChildren.forEach(child => {

                if (child.attributes.pid.value === elem.attributes.pid.value) {

                    child.removeEventListener('click', clkListItem);
                    child.remove();
                    elem.appendChild(child);
                }

            });

        }

        changeTitle(elem);

        document.querySelector('#done').appendChild(elem);

    } else {

        changeTitle(elem);

        elem.children[0].classList.remove('has-text-success');
        elem.classList.remove('has-background-item')

        elem.addEventListener('click', clkListItem);
        document.querySelector('#doneSubs').appendChild(elem);

    }
}

function removeItem(elem) {

    if (elem.tagName === 'I') {
        elem = elem.parentElement;
    }

    setAllCheck(elem);

    setTimeout(() => {

        if (!document.querySelector('#done')) {
            document.querySelector('#list-container').appendChild(doneContainer());
        }

        elem.remove();
        moveElement(elem);
        setCookie();
    }, 1000);

}

function getCookie(cn) {
    if (cn) {
        listVar = cn;
    }
    if (frameCheck) {
        let data = document.cookie;

        data = data.split('; ');

        for (let cookie in data) {

            let cookieData = data[cookie].split('=');

            if (cookieData[0] === listVar) {
                return cookieData[1];
            }

        }
    }

}

function setCookie(cn) {

    if (frameCheck) {
        // let items = document.querySelector('#list').querySelectorAll('#listItem'); // ptag ref
        let items = [...document.getElementById('list').children].filter(f => { if (f.id === 'listItem') return f });
        let itemText = '';

        items.forEach(item => {

            itemText += item.innerText.replaceAll('\n', '|') + ',';

        });

        if (itemText) {

            document.cookie = `${(cn) ? cn : listVar}=${itemText.substring(0, itemText.length - 1)}; max-age=31536000; samesite=strict; secure`

            if (itemText.length > 3000) {

                errorMsg('Please start completing items on the list.<br><br>There is < 1000 bytes of storage left.');

            }

        } else {

            document.cookie = listVar + '=; max-age=0; samesite=strict; secure';

        }
    }

}

function optMo(event) {
    let text = event.target.attributes['aria-description'].value;
    event.target.parentElement.appendChild(mkElem({ elemType: 'span', class: 'btn-popover', inner: text }));
}

function optMl(event) {
    event.target.parentElement.querySelector('span').remove();
}

function closeOptions() {

    let options = document.querySelector('.options');

    if (options) {
        options.addEventListener('animationend', function () {
            this.remove();
        });
        options.querySelectorAll('button').forEach(btn => {
            btn.setAttribute('disabled', 'disabled');
        });
        options.classList.replace('fade-in', 'fade-out');
    }

}

function openOptions(event) {
    if (document.querySelector('.options')) {
        closeOptions();
    }

    const opts = {
        b1: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-success is-outlined', 'aria-description': 'Mark Item Complete', id: 'tadone', inner: '<i class="bi bi-check-circle"></i>', listeners: [{ type: 'click', execute: complete }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b2: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-link is-outlined', 'aria-description': 'Create Sub-List Item', id: 'crtSub', inner: '<i class="bi bi-plus-circle-dotted"></i>', listeners: [{ type: 'click', execute: toggleLstBtn }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b3: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', 'aria-description': 'Edit List Item', id: 'edit', inner: '<i class="bi bi-pencil"></i>', listeners: [{ type: 'click', execute: toggleLstBtn }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b4: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-info is-outlined', 'aria-description': 'Copy Item', id: 'copy', inner: '<i class="bi bi-copy"></i>', listeners: [{ type: 'click', execute: clkCopyItem }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b5: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-warning is-outlined', 'aria-description': 'Restore List Item', id: 'undo', inner: '<i class="bi bi-arrow-counterclockwise"></i>', listeners: [{ type: 'click', execute: clkUndoItem }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] }),
        b6: mkBtn({ class: 'button is-small ml-2 mr-2 is-rounded is-danger is-outlined', 'aria-description': 'Close Options', id: 'cancel', inner: '<i class="bi bi-x-circle"></i>', listeners: [{ type: 'click', execute: () => { closeOptions(); targetElement = null; } }, { type: 'mouseenter', execute: optMo }, { type: 'mouseleave', execute: optMl }] })
    }

    nestElem([
        document.querySelector('.card'),
        mkDiv({ class: 'options fade-in', style: 'top: ' + (event.y - 30) + 'px; left: ' + (event.x - 27) + 'px;', listeners: [{ type: 'mouseleave', execute: () => { closeOptions(); targetElement = null; } }] }),
        mkDiv({ class: 'card' }),
        mkDiv({ class: 'card-content p-0' }),
        (targetElement.parentElement.id === 'done' || targetElement.parentElement.parentElement.id === 'done') ?
            [opts.b5, opts.b6]
            :
            (targetElement.id === 'listSubItem') ?
                [opts.b1, opts.b3, opts.b4, opts.b6]
                :
                [opts.b1, opts.b2, opts.b3, opts.b4, opts.b6]
    ]);

    // document.querySelector('.options').classList.add('fade-in')

}

function addItem() {
    let input = document.querySelector('#item');
    let item = input.value.trim();
    let list = document.querySelector('#list');
    const exclude = /[;]/g
    if ((item) && !(item.match(exclude))) {
        if (this.id === 'addSub' && targetElement) {
            // sub list items
            item.split(',').forEach(i => {
                if (!dupeCheck(i.trim())) {
                    targetElement.append(createItem(i.trim(), { isSub: true, pid: targetElement.attributes.pid.value }));
                    setCookie();
                } else {
                    errorMsg(`"${i}" is already present<br>Duplicate items are not accepted`)
                }
            });
        } else {
            // regular item
            item.split(',').reverse().forEach(i => {
                if (!dupeCheck(i.trim())) {
                    list.prepend(createItem(i.trim()));
                    setCookie();
                } else {
                    errorMsg(`"${i}" is already present<br>Duplicate items are not accepted`)
                }
            });
        }
    } else {
        if (item.match(exclude)) {
            errorMsg('ERROR: Semi colons ";" are not allowed.');
        } else {
            errorMsg('No value was entered, so no item was created.', 'info');
        }
    }

    input.value = '';
    input.focus();
    if (!input.classList.contains('is-danger')) {
        resetListBtn();
        targetElement = null;
    }
}

function listToString() {
    let items = document.querySelector('#list').querySelectorAll('p');
    let text = '';

    items.forEach(item => {

        text += item.innerText.replaceAll('\n', '|') + ',';

    });

    return text;
}

function inputActions() {

    removeMsg();
    this.classList.remove('is-danger');

    if (this.value === ':export') {

        let itemText = listToString();

        if (itemText) {

            navigator.clipboard.writeText(itemText.substring(0, itemText.length - 1));

            let submit = getActiveBtn();

            submit.setAttribute('disabled', 'disabled');
            this.classList.add('is-success');
            this.value = 'Exported to Clipboard!';

            setTimeout(() => {
                this.value = '';
                this.classList.remove('is-success');
                submit.removeAttribute('disabled');
            }, 1000);

        } else {

            errorMsg('Nothing to Export!', 'info', 2000);
            this.value = '';

        }

    } else if (this.value === ':list') {
        let allCookies = document.cookie.split('; ');
        let nosave = true;


        let alert = nestElem([

            mkElem({ elemType: 'article', id: 'cookieList', class: 'message is-small is-info' }),
            {

                1: nestElem([
                    mkDiv({ class: 'message-header is-justify-content-end' }),
                    mkBtn({ class: 'delete', listeners: [{ type: 'click', execute: removeMsg }] })
                ]),
                2: nestElem([
                    mkDiv({ class: 'message-body is-flex is-flex-direction-column is-align-content-center', id: 'info', style: 'text-align: center;' }),
                    mkP({ inner: "Current Saved Lists", style: "font-weight: bold;text-decoration: underline;" })
                ])

            }

        ])
        document.body.prepend(alert);

        allCookies.forEach(ck => {
            let key = ck.split('=')[0];
            if (key) {
                console.log(key);
                document.querySelector('#info').append(mkP({ inner: (listVar === key) ? `<span style="color:red;">*</span> ${key} <span style="color:red;">*</span>` : key }));
                nosave = false;
            }
        });
        if (nosave) {
            console.log("No saved lists found");
            document.querySelector('.message-body').append(mkP({ class: 'has-text-danger', inner: 'No saved lists were found' }));
            rmvTimeout();
            errorTimeoutID = setTimeout(removeMsg, 2000);
        }
        if (allCookies.length > 1) {
            this.value = ':load:';
        } else {
            this.value = '';
        }
        this.focus();
    }

}

function inputKeyActions(event) {

    if (event.keyCode === 13) { // Enter

        if (this.value.match(/^:[a-z]*:.*/)) {
            let sn = this.value.split(':');
            sn.shift();
            switch (sn[0]) {
                case 'save':
                    // Save list to specified cookie name :*:cookie_name
                    setCookie(sn[1]); // Save Current list to new cookie
                    clearList(); // clear the current list after creating new one
                    resetListBtn();
                    setCookie(); // reset current cookie
                    break;
                case 'load':
                    // Load specific cookie
                    clearList();
                    resetListBtn();
                    loadList(getCookie(sn[1]));
                    break;
            }
            this.value = '';
        } else {
            let buttons = document.querySelectorAll('.listBtn button');

            buttons.forEach(btn => {

                if (!btn.classList.contains('dnone')) {

                    btn.click();
                    return;

                }

            });
        }

    } else if (event.keyCode === 27) { // ESC

        document.querySelector('#item').value = '';
        document.querySelector('#item').classList.remove('is-danger');
        removeMsg();

        resetListBtn();
    }

}

function complete() {

    closeOptions();
    removeItem(targetElement);

    targetElement = null;

}

function clearList() {
    document.querySelectorAll('#listItem').forEach(it => {
        it.remove();
    });
    if (document.getElementById('done'))
        document.getElementById('done').remove();
}

function loadList(cookie) {
    if (cookie) {

        cookie = cookie.split(',');

        cookie.forEach(item => {

            if (item.includes('|')) {

                let subItems = item.slice(item.indexOf('|') + 1).split('|');
                let p = createItem(item.substring(0, item.indexOf('|')));

                subItems.forEach(sub => {

                    p.appendChild(createItem(sub, { isSub: true, pid: p.attributes.pid.value }));

                });

                document.querySelector('#list').appendChild(p);

            } else {

                document.querySelector('#list').appendChild(createItem(item));

            }

        });

    }
}

function openSettings() {
    this.classList.add('has-background-info', 'has-text-white')
    function me() {
        this.addEventListener('mouseleave', function () {
            this.addEventListener('animationend', function () {
                this.remove();
            });
            this.classList.replace('fade-in-slow', 'fade-out-slow');
        })
    }

    if (this.parentElement.children.length === 1) {
        this.parentElement.append(
            nestElem([
                mkDiv({ class: 'menu-container p-4 fade-in-slow' }),
                [
                    nestElem([
                        mkElem({ elemType: 'fieldset' }),
                        [
                            mkElem({ elemType: 'legend', inner: 'Select Icon', class: 'is-size-7' }),
                            nestElem([
                                mkDiv({ class: 'control' }),
                                [
                                    mkInp({ type: 'radio', id: 'arrow', name: 'icon', value: 'arrow', checked: 'true' }),
                                    mkLabel({ for: 'arrow', inner: '<i class="bi bi-caret-right-fill"></i>' })
                                ]
                            ]),
                            nestElem([
                                mkDiv({ class: 'control' }),
                                [
                                    mkInp({ type: 'radio', id: 'dot', name: 'icon', value: 'dot' }),
                                    mkLabel({ for: 'dot', inner: '<i class="bi bi-dot"></i>' })
                                ]
                            ])
                        ]
                    ]),
                    nestElem([
                        mkElem({ elemType: 'fieldset' }),
                        [
                            mkElem({ elemType: 'legend', inner: 'Background Color', class: 'is-size-7' }),
                            nestElem([
                                mkDiv({ class: 'control' }),
                                mkInp({ type: 'color', id: 'color', listeners: [{ type: 'change', execute: function (e) { document.children[0].setAttribute('style', `background-color: ${e.target.value} !important;`) } }] })
                            ])
                        ]
                    ])
                ]
            ])
        );
    } else {
        let menu = this.nextElementSibling;
        menu.addEventListener('animationend', function () {
            this.remove();
        });
        menu.classList.replace('fade-in-slow', 'fade-out-slow');
        this.classList.remove('has-background-info', 'has-text-white');
    }
}

window.TESTING = {
    setTest: function () {
        document.getElementById('item').value = 'test1|test2|test3,test4|test2|test3';
        document.getElementById('addItem').click();

        setTimeout(() => { location.reload(); }, 500);
    }
}

window.onload = function () {

    loadList(getCookie());
    if (frameCheck)
        document.querySelector('#item').focus();

}