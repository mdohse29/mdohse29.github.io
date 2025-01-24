function addItem(){
    let input = document.querySelector('#item');
    let item = input.value;
    let list = document.querySelector('#list');
    const exclude = /[;]/g

    if ((item) && !(item.match(exclude))){
        if (this.id === 'addSub' && targetElement){
            // sub list items
            item.split(',').forEach(i => {
                if (!dupeCheck(i.trim())){
                    targetElement.append(createItem(i.trim(), {isSub:true, pid:targetElement.getAttribute('pid')}));
                }
            });
        }else{
            // regular item
            item.split(',').reverse().forEach(i => {
                if (!dupeCheck(i.trim())){
                    list.prepend(createItem(i.trim()));
                }
            });
        }
    }else{
        if (item.match(exclude)){
            errorMsg('ERROR: Semi colons ";" are not allowed.');
        }else{
            errorMsg('No value was entered, so no item was created.', 'info');
        }
    }

    input.value = '';
    input.focus();
    if (!input.classList.contains('is-danger')){
        resetListBtn();
        targetElement = null;
    }
}
