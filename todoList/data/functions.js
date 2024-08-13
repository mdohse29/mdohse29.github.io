function dupeCheck(item){

    let currentList = document.querySelectorAll('#list > p');

    if (currentList){

        for (let element of currentList){

            if (element.innerText == item){
                return false;
            }

        }

    }
    return true;
}

function createItem(item){

    let p = document.createElement('p');
    let marker = document.createElement('i');

    marker.classList.add('fa-solid', 'fa-caret-right');
    marker.setAttribute('aria-hidden', 'false');
    p.innerHTML = item;
    p.prepend(marker);
    p.classList.add(['mb-2']);
    p.title = "Click to remove item.";
    p.id = 'listItem';

    
    p.addEventListener('mouseenter', function(){
        this.classList.add('has-background-link-light');
    });

    p.addEventListener('mouseleave', function(){
        this.classList.remove('has-background-link-light');
    })

    p.addEventListener('click', function(){
        let icon = this.querySelector('.fa-caret-right');

        // this.classList.add('has-background-success');
        icon.classList.remove('fa-caret-right')
        icon.classList.add('fa-check', 'fa-beat');
        setTimeout(() => {
            this.remove();
            setCookie();
        }, 1000);
    });

    return p;
}

function getCookie(){

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
        itemText += item.innerText + ',';
    });

    if (itemText){

        document.cookie = 'list=' + itemText.substring(0, itemText.length - 1) + ';max-age=31536000';

    }else{

        document.cookie = 'list=;max-age=0;samesite=none;secure';

    }
}

document.querySelector('#submit').addEventListener('click', function(){

    let input = document.querySelector('#item');
    let item = input.value;

    if ((item) && (dupeCheck(item))){
        input.classList.remove('is-danger');

        if (item.includes(',')){

            let items = item.split(',');

            for (let i of items){

                document.querySelector('#list').appendChild(createItem(i.trim()));
                // console.log(i.trim());

            }

        }else{

            document.querySelector('#list').appendChild(createItem(item));
            // console.log(item.trim());

        }

        setCookie();
    }else{

        input.classList.add('is-danger')
        console.log("Empty or duplicate Item. Nothing Added.");

    }

    input.value = '';
    document.querySelector('#item').focus();
});

document.querySelector('#item').addEventListener('keydown', function(event){

    if (event.keyCode === 13){
        document.querySelector('#submit').click();
    }

});

document.querySelector('#item').addEventListener('input', function(){
    
    if (this.value === 'export'){

        let items = document.querySelector('#list').querySelectorAll('p');
        let itemText = '';

        items.forEach(item => {
            itemText += item.innerText + ',';
        });

        if (itemText){

            // alert(itemText.substring(0, itemText.length - 1))
            navigator.clipboard.writeText(itemText.substring(0, itemText.length - 1));
            // document.cookie = 'list=' + itemText.substring(0, itemText.length - 1) + ';max-age=31536000;'
            // console.log(getCookie());

            let submit = document.querySelector('#submit');

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
        document.querySelector('#item').value = cookie;
        document.querySelector('#submit').click();
    }
}

