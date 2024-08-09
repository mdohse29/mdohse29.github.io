function dupeCheck(item){
    let currentList = document.querySelectorAll('#list > p');
    if (currentList){
        for (let element of currentList){
                // console.log(element.innerText);
            if (element.innerText == item){
                return false;
            }
        }
    }
    return true;
}

function createItem(item){
    let p = document.createElement('p');
    let check = document.createElement('i');
    check.classList.add('dnone');
    check.classList.add('fa-solid');
    check.classList.add('fa-check');
    check.classList.add('fa-beat');
    p.innerHTML = item;
    p.appendChild(check);
    p.classList.add(['mb-2']);
    p.title = "Click to remove item.";
    
    p.addEventListener('mouseenter', function(){
        this.classList.add('has-background-link-light');
    });

    p.addEventListener('mouseleave', function(){
        this.classList.remove('has-background-link-light');
    })

    p.addEventListener('click', function(){
        this.classList.add('has-background-success');
        this.querySelector('.fa-check').classList.remove('dnone');
        setTimeout(() => {
            this.remove();
        }, 1000);
    });

    return p;
}

document.querySelector('#submit').addEventListener('click', function(){
    let input = document.querySelector('#item');
    let item = input.value;
    if ((item) && (dupeCheck(item))){
        if (item.includes(',')){
            let items = item.split(',');
            for (let i of items){
                document.querySelector('#list').appendChild(createItem(i.trim()));
                console.log(i.trim());
            }
        }else{
            document.querySelector('#list').appendChild(createItem(item));
            console.log(item.trim());
        }

    }else{
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
            alert(itemText.substring(0, itemText.length - 1))
        }
    }
    
})
