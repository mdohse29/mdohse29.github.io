let parentItem = null;

function dupeCheck(item){

    let currentList = document.querySelectorAll('#list > p');

    if (currentList){

        for (let element of currentList){

            if(element.children.length > 1){
                let items = element.innerText.split('\n');

                for (let i of items){
                    if (i.toLowerCase() === item.toLowerCase()){
                        return true;
                    }
                }
            }else{
                if (element.innerText.toLowerCase() === item.toLowerCase()){
                    return true;
                }
            }

        }

    }
    return false;
}

function createItem(item, isSub = false){
    // Pass the hasSub boolean to determine what element to create
    let elem = document.createElement(((isSub) ? 'span' : 'p'));
    let marker = document.createElement('i');

    marker.classList.add('bi', 'bi-caret-right-fill');
    // marker.setAttribute('aria-hidden', 'false');
    elem.innerHTML = item.substring(0, 1).toUpperCase() + item.substring(1);
    elem.prepend(marker);

    
    elem.title = ((isSub) ? "Click to remove item." : "Click For Options");
    elem.id = ((isSub) ? 'listSubItem' : 'listItem');

    if (!isSub){
        elem.classList.add(['mb-2']);

        elem.addEventListener('mouseover', function(){
            let bgCheck = document.querySelectorAll('i.has-background-item');
            if (bgCheck)
                bgCheck.forEach(bg => {
                    bg.classList.remove('has-background-item')
                })
            this.querySelector('i').classList.add('has-background-item');
        });

        elem.addEventListener('mouseleave', function(){
            this.querySelector('i').classList.remove('has-background-item');
        })

        elem.addEventListener('click', function(event){
            
            if (event.target.tagName === 'P' || (event.target.tagName === 'I' && event.target.parentElement.tagName === 'P')){

                parentItem = ((event.target.tagName === 'P') ? event.target : event.target.parentElement);
                openOptions(event);

            }else{

                removeItem(event.target);

            }
            
        });
    }else{
        elem.addEventListener('mouseover', function(){
            let bgCheck = document.querySelectorAll('span.has-background-item');
            if (bgCheck)
                bgCheck.forEach(bg => {
                    bg.classList.remove('has-background-item')
                })
            this.classList.add('has-background-item');
        });

        elem.addEventListener('mouseleave', function(){
            this.classList.remove('has-background-item');
        })
    }

    return elem;
}

function removeItem(elem){
    let icon;

    if (elem.tagName == 'I'){
        icon = elem.parentElement.querySelector('i');
    }else{
        icon = elem.querySelector('i');
    }

    // this.classList.add('has-background-success');
    icon.classList.remove('bi-caret-right-fill')
    icon.classList.add('bi-check-circle-fill', 'has-text-success');
    setTimeout(() => {
        icon.parentElement.remove();
        setCookie();
    }, 1000);
}

function getCookie(){
    // TODO: this needs to be altered for sub-lists

    let data = document.cookie;

    data = data.split(';');

    for (let cookie in data){

        let cookieData = data[cookie].split('=');

        if (cookieData[0] === 'list'){
            return cookieData[1];
        }

    }

}

function setCookie(){

    let items = document.querySelector('#list').querySelectorAll('#listItem'); // ptag ref
    let itemText = '';

    items.forEach(item => {
        itemText += item.innerText.replaceAll('\n', '|') + ',';
    });

    if (itemText){

        document.cookie = 'list=' + itemText.substring(0, itemText.length - 1) + ';max-age=31536000;samesite=none;secure';

    }else{

        document.cookie = 'list=;max-age=0;samesite=none;secure';

    }
}

function closeOptions(){
    let options = document.querySelector('.options');
    options.classList.add('dnone');
    options.removeAttribute('style');
}

function openOptions(clickEvent){
    let options = document.querySelector('.options');
    options.classList.remove('dnone');
    options.setAttribute('style', 'top: ' + (clickEvent.y) + 'px; left: ' + (clickEvent.x) + 'px;');
}

let buttons = document.querySelectorAll('#addItem, #addSub');

buttons.forEach(button => {
    
    if (button.id === 'addItem'){
        button.addEventListener('click', function(){
            let input = document.querySelector('#item');
            let item = input.value;

            if ((item) && (!dupeCheck(item))){
                // input.classList.remove('is-danger');

                if (item.includes(',')){

                    let items = item.split(',');

                    for (let i of items){

                        if (!dupeCheck(i.trim())){

                            document.querySelector('#list').appendChild(createItem(i.trim()));
                            setCookie();

                        }

                    }

                }else{

                    document.querySelector('#list').appendChild(createItem(item.trim()));
                    setCookie();

                }

            }else{

                input.classList.add('is-danger')
                console.log("Empty or duplicate Item. Nothing Added.");

            }

            input.value = '';
            document.querySelector('#item').focus();

        })
    }else{
        button.addEventListener('click', function(){
            let input = document.querySelector('#item');
            let item = input.value;

            if ((item) && (!dupeCheck(item))){
                // input.classList.remove('is-danger');

                if (item.includes(',')){

                    let items = item.split(',');

                    for (let i of items){

                        if (!dupeCheck(i.trim())){

                            parentItem.appendChild(createItem(i.trim(), true));
                            setCookie();

                        }

                    }

                }else{

                    parentItem.appendChild(createItem(item.trim(), true));
                    setCookie();

                }

            }else{

                input.classList.add('is-danger');
                console.log("Empty or duplicate Item. Nothing Added.");

            }

            input.value = '';
            document.querySelector('#item').focus();
            if (!input.classList.contains('is-danger')){
                document.querySelector('#addItem').classList.remove('dnone');
                document.querySelector('#addSub').classList.add('dnone');
            }
        });
    }
    

});

// Make listener for #addSub. Should create sub-list items, example commented out in index

document.querySelector('#item').addEventListener('keydown', function(event){

    if (event.keyCode === 13){
        let buttons = document.querySelectorAll('#addItem, #addSub');
        if (buttons[0].classList.contains('dnone')){
            buttons[1].click();
        }else{
            buttons[0].click();
        }
    }

});

document.querySelector('#item').addEventListener('input', function(){
    document.querySelector('#item').classList.remove('is-danger');
    
    if (this.value === 'export'){

        let items = document.querySelector('#list').querySelectorAll('p');
        let itemText = '';

        items.forEach(item => {
            itemText += item.innerText.replaceAll('\n', '|') + ',';
        });

        if (itemText){

            // alert(itemText.substring(0, itemText.length - 1))
            navigator.clipboard.writeText(itemText.substring(0, itemText.length - 1));
            // document.cookie = 'list=' + itemText.substring(0, itemText.length - 1) + ';max-age=31536000;'
            // console.log(getCookie());

            let submit = document.querySelector('#addItem');

            submit.setAttribute('disabled', 'disabled');
            this.classList.add('is-success');
            this.value = 'Export Complete!';
            setTimeout(() => {
                this.value = '';
                this.classList.remove('is-success');
                submit.removeAttribute('disabled');
            }, 1000);

        }else{

            document.cookie = 'list=';
            console.log(getCookie());

        }

    }
    
});

document.querySelector('#cancel').addEventListener('click', closeOptions);

document.querySelector('#rmv').addEventListener('click', function(){
    closeOptions();
    removeItem(parentItem);
});

document.querySelector('#crtSub').addEventListener('click', function(){
    closeOptions();
    document.querySelector('#addItem').classList.add('dnone');
    document.querySelector('#addSub').classList.remove('dnone');
    document.querySelector('#item').focus();
})

window.onload = function(){

    let cookie = getCookie();

    if (cookie){
        cookie = cookie.split(',');

        cookie.forEach(item => {
            if (item.includes('|')){
                let subItems = item.slice(item.indexOf('|')+1).split('|');
                let p = createItem(item.substring(0, item.indexOf('|')));
                subItems.forEach(sub => {
                    p.appendChild(createItem(sub, true));
                });

                document.querySelector('#list').appendChild(p);
            }else{
                document.querySelector('#list').appendChild(createItem(item));
            }
        })
    }
}

