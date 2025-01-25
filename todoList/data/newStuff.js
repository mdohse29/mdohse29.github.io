function moListItem(e){
    let element = e.target;
    if (element.tagName === 'I'){
        element = element.parentElement;
    }
    if (element.id === 'listItem'){
        //reset all main item icons
        document.querySelectorAll('i.has-background-item').forEach(elm => {
            elm.classList.remove('has-background-item');
        });

        element.children[0].classList.add('has-background-item');
    }else if (element.id === 'listSubItem'){
        //reset all subitems
        document.querySelectorAll('span.has-background-item').forEach(elm => {
            elm.classList.remove('has-background-item');
        });

        element.classList.add('has-background-item');
    }
}

