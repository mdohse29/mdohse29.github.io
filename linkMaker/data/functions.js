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

function toggleExtras(){
    let value = document.querySelector('#mediaType').value;
    if (value == "DOC"){
        document.querySelector('#pffCheck').parentElement.classList.add('dnone');
        document.querySelector('#text').parentElement.classList.add('dnone');
    }else{
        document.querySelector('#pffCheck').parentElement.classList.remove('dnone');
        document.querySelector('#text').parentElement.classList.remove('dnone');
    }
}

document.querySelector('#mediaType').value = 'DOC';
toggleExtras();

document.querySelector('#mediaselect').addEventListener('click', () => {
    document.querySelector('#selectMenu').classList.add('dnone');
    let type = document.querySelector('#mediaType').value;
    let build = document.querySelector('#linkbuild');
    let submit = document.createElement('button');
    let reset = document.createElement('button');

    submit.classList.add('button', 'mt-4', 'is-rounded', 'is-info');
    submit.id = 'submit';
    submit.innerText = 'Submit';
    reset.classList.add('button', 'mt-4', 'is-rounded', 'is-danger', 'ml-3');
    reset.id = 'reset';
    reset.innerText = 'Reset';
    build.classList.remove('dnone');

    reset.addEventListener('click', () => {
        let linkBuild = document.querySelector('#linkbuild');
        let textArea = document.querySelector('#textarea');
        let preview = document.querySelector('#preview');

        preview.querySelector('iframe').src = '';
        preview.classList.add('dnone');
        linkBuild.innerHTML = '';
        linkBuild.classList.add('dnone');
        textArea.querySelector('p').remove();
        textArea.classList.add('dnone');

        document.querySelector('#selectMenu').classList.remove('dnone');
        document.querySelector('#pffCheck').checked = false;
        document.querySelector('#text').checked = false;
    });

    submit.addEventListener('click', () => {
        let textArea = document.querySelector('#textarea');
        let mediaType = document.querySelector('#mediaType').value;
        let url = document.createElement('p');

        url.classList.add('has-text-centered');
        if (textArea.querySelector('p')){
            textArea.querySelector('p').remove();
        }

        textArea.classList.remove('dnone');

        if (mediaType == 'DOC'){
            let fileType = '';
            let docType = '';
            let dataBasePath = document.querySelector('#dataBasePath').value;
            let fileName = document.querySelector('#fileName').value;

            if (!dataBasePath){
                dataBasePath = 'null';
                url.classList.add('has-background-danger');
            }
            if (!fileName){
                fileName = 'null';
                url.classList.add('has-background-danger');
            }else{
                fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
            }

            if (fileType == 'mp4' || fileType == 'webm' || fileType == 'flv'){
                docType = 'video';
            }else if (fileType == 'mp3'){
                docType = 'audio';
            }else if (fileType == 'jpg' || fileType == 'gif' || fileType == 'png'){
                docType = 'img';
            }else{
                docType = 'misc';
            }

            url.innerHTML = 'https://cdn.lti.glynlyon.com/media/' + dataBasePath + '/' + docType + '/' + fileName;

        }

        if (url.innerHTML){
            url.classList.add('has-background-success-light');
            textArea.appendChild(url);
        }
    });

    if (type == "DOC"){
        build.appendChild(generateInput('dataBasePath','Data Base Path (Unit UUID)','The UUID for the unit can be found in Cayman.'));

        build.appendChild(generateInput('fileName', 'File', 'The file name for the file being linked to. Include the file extension (.jpg, .gif, .docx, etc.)'));
    }


    build.appendChild(submit);
    build.appendChild(reset);
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('#preview').querySelector('iframe').src = '';
    document.querySelector('#preview').classList.add('dnone');
});

document.querySelector('#showPreview').addEventListener('click', () => {
    let preview = document.querySelector('#preview');
    let url = document.querySelector('#textarea > p').innerText;
    preview.classList.remove('dnone');
    preview.querySelector('iframe').src = url;
})

document.querySelector('#mediaType').addEventListener('change', toggleExtras);
