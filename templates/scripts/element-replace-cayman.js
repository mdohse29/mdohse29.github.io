()=>{ // Could be used to locate current element and replace with new based on where the caret is
    const selection = window.getSelection();
    if (selection && selection.type === 'Caret'){
        let elem = selection.baseNode;
        if (elem){
            console.log(elem);
            // Make sure the correct container and element are selected
            let container = elem.parentElement;
            while (container.getAttribute('data-tag') !== 'presentation'){
                elem = container;
                container = elem.parentElement;
            }
            // ========================================================

            if (container.attributes['data-tag']){ // Seems redundant, but leaving for now
                // create table template
                let htag = document.createElement('p');
                htag.innerHTML = 'Hello';
                container.replaceChild(htag, elem);
            }
        }
    }
}