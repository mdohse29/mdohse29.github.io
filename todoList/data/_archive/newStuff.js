function clkUndoItem(){
    const elem = targetElement;
    try{
        switch(elem.id){
            case 'listSubItem':
                // something here
                switch(elem.parentElement.id){
                    case 'doneSubs':
                        // something here
                        const parent = document.querySelector(`#list > p[pid="${elem.attributes.pid.value}"]`);
                        if (dupeCheck(elem.innerText.trim())){
                            throw Error();
                        }else{
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
                        if (dupeCheck(elem.innerText.trim())){
                            throw Error();
                        }else{
                            elem.remove();
                            document.getElementById('list').prepend(createItem(elem.innerText.trim()));
                            setCookie();
                        }
                        break;
                }
                break;
            case 'listItem':
                // something here
                if (elem.children.length > 1){
                    // has sub list items
                    let children = [...elem.children];
                    children.shift();
                    targetElement = null;
                    if (dupeCheck(getItemText(elem))){
                        throw Error();
                    }else{
                        for (let ch of children){
                            targetElement = ch;
                            if (dupeCheck(getItemText(ch))){
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
                    }
                }else{
                    // no sub list items
                    targetElement = null;
                    if (dupeCheck(elem.innerText.trim())){
                        throw Error();
                    }else{
                        elem.remove();
                        document.getElementById('list').prepend(createItem(elem.innerText.trim()));
                        setCookie();
                    }
                }
                break;
        }
    }catch(err){
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

