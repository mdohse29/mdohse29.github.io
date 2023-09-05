document.querySelector('#submit').addEventListener('click', function(){
    let item = document.querySelector('#item');
    if (item.value){
        let p = document.createElement('p');
        p.innerHTML = item.value;
        p.classList.add(['mb-2']);
        p.title = "Click to remove item.value.";
        
        p.addEventListener('mouseenter', function(){
            this.classList.add('has-background-link-light');
        });

        p.addEventListener('mouseleave', function(){
            this.classList.remove('has-background-link-light');
        })

        p.addEventListener('click', function(){
            this.remove();
        });

        console.log(item.value);
        document.querySelector('#list').appendChild(p);
        item.value = '';
    }
});

document.querySelector('#item').addEventListener('keydown', function(event){
    if (event.keyCode === 13){
        document.querySelector('#submit').click();
    }
})

