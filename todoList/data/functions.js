let parent

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

    if (!isSub)

    elem.title = "Click to remove item.";
    elem.id = ((isSub) ? 'listSubItem' : 'listItem');

    if (!isSub){
        elem.classList.add(['mb-2']);

        elem.addEventListener('mouseenter', function(){
            this.classList.add('has-background-link-light');
        });

        elem.addEventListener('mouseleave', function(){
            this.classList.remove('has-background-link-light');
        })

        elem.addEventListener('click', function(event){
            
            let icon;

            if (event.target.tagName == 'I'){
                icon = event.target.parentElement.querySelector('i');
            }else{
                icon = event.target.querySelector('i');
            }

            // this.classList.add('has-background-success');
            icon.classList.remove('bi-caret-right-fill')
            icon.classList.add('bi-check-circle-fill', 'has-text-success');
            setTimeout(() => {
                icon.parentElement.remove();
                setCookie();
            }, 1000);
        });
    }

    return elem;
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

document.querySelector('#addItem').addEventListener('click', function(){

    let input = document.querySelector('#item'); // Pass the element instead of text to make this more universal 2x button 1 listener
    let item = input.value;

    if ((item) && (!dupeCheck(item))){
        input.classList.remove('is-danger');

        if (item.includes(',')){

            let items = item.split(',');

            for (let i of items){

                if (!dupeCheck(i.trim())){
                    document.querySelector('#list').appendChild(createItem(i.trim()));
                    // console.log(i.trim());
                    setCookie();
                }

            }

        }else{

            document.querySelector('#list').appendChild(createItem(item.trim()));
            setCookie();
            // console.log(item.trim());

        }

    }else{

        input.classList.add('is-danger')
        console.log("Empty or duplicate Item. Nothing Added.");

    }

    input.value = '';
    document.querySelector('#item').focus();
});

// Make listener for #addSub. Should create sub-list items, example commented out in index

document.querySelector('#item').addEventListener('keydown', function(event){

    if (event.keyCode === 13){
        document.querySelector('#addItem').click();
    }

});

document.querySelector('#item').addEventListener('input', function(){
    
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

