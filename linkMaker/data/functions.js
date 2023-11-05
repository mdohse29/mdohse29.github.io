function generateInput(id, text, title){
    let div = document.createElement('div');
    let label = document.createElement('label');
    let input = document.createElement('input');

    div.classList.add("field");
    label.classList.add('label','is-inline');
    input.classList.add('control');
    input.type = 'text';

    if (title){
        div.title = title;
    }

    if (id){
        label.setAttribute('for', id);
        input.id = id;
    }

    if (text){
        label.innerText = text + ": ";
    }

    div.appendChild(label);
    div.appendChild(input);

    return div;
}


document.querySelector('#mediaselect').addEventListener('click', () => {
    document.querySelector('#selectMenu').classList.add('dnone');
    let build = document.querySelector('#linkbuild');
    build.classList.remove('dnone');
    build.appendChild(generateInput('base','Base','Either course base (alg01) if in curric media or unit UUID if in unit folder'));
});

document.querySelector('#mediaType').addEventListener('change', () => {
    let value = document.querySelector('#mediaType').value;
    if (value == "DOC"){
        document.querySelector('#pffCheck').parentElement.classList.add('dnone');
        document.querySelector('#text').parentElement.classList.add('dnone');
    }else{
        document.querySelector('#pffCheck').parentElement.classList.remove('dnone');
        document.querySelector('#text').parentElement.classList.remove('dnone');
    }
})
