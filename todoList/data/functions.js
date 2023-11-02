document.querySelector('#submit').addEventListener('click', function(){
    let input = document.querySelector('#item');
    let item = input.value;
    if (item){
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

        input.value = '';
    }else{
        console.log("Empty Item. Nothing to see here.");
    }
    document.querySelector('#item').focus();
});

document.querySelector('#item').addEventListener('keydown', function(event){
    if (event.keyCode === 13){
        document.querySelector('#submit').click();
    }
});

function createItem(item){
    let p = document.createElement('p');
    p.innerHTML = item;
    p.classList.add(['mb-2']);
    p.title = "Click to remove item.";
    
    p.addEventListener('mouseenter', function(){
        this.classList.add('has-background-link-light');
    });

    p.addEventListener('mouseleave', function(){
        this.classList.remove('has-background-link-light');
    })

    p.addEventListener('click', function(){
        this.remove();
    });

    return p;
}


