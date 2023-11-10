function generateInput(id, text, title, ph){
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

    if (ph){
        input.placeholder = ph;
    }

    div.appendChild(label);
    div.appendChild(input);

    return div;
}

function resetEverything(){
    let linkBuild = document.querySelector('#linkbuild');
    let textArea = document.querySelector('#textarea');
    let preview = document.querySelector('#preview');

    if (!preview.getAttribute('class').includes('dnone')){
        preview.querySelector('iframe').src = '';
        preview.classList.add('dnone');
    }
    linkBuild.innerHTML = '';
    linkBuild.classList.add('dnone');
    if (!textArea.getAttribute('class').includes('dnone')){
        textArea.querySelector('p').remove();
        textArea.classList.add('dnone');
    }

    document.querySelector('#selectMenu').classList.remove('dnone');
    document.querySelector('#pffCheck').checked = false;
    document.querySelector('#text').checked = false;
    document.querySelector('#mediaType').value = 'DOC';
    toggleExtras();
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

function animationLink(url){
    let base = document.querySelector('#base').value;
    let sourcePath = document.querySelector('#sourcePath').value;
    let basePath = '';
    let pff = '';
    let topText = '';
    let bottomText = '';

    url.innerText = 'https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=' + base + '&file=' + sourcePath;

    if (document.querySelector('#pffCheck').checked){
        pff = document.querySelector('#pffFile').value;
        if (!pff.includes('.pff')){
            pff += '.pff';
        }
        basePath = document.querySelector('#dataBasePath').value;
        if (!basePath && (base.length > 15 && base.includes('-'))){
            basePath = base;
        }
        url.innerText += '&dataBasePath=' + basePath + '&pff=' + pff;
    }

    if (document.querySelector('#text').checked){
        topText = document.querySelector('#topText').value;
        bottomText = document.querySelector('#bottomText').value;
        if (topText){
            url.innerText += '&topText=' + topText;
        }
        if (bottomText){
            url.innerText += '&bottomText=' + bottomText;
        }
    }
}

function mediaLink(url){
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

resetEverything();

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

    reset.addEventListener('click', resetEverything);

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
            mediaLink(url);
        }else if (mediaType == 'DLA'){
            let source = document.querySelector('#source').value;
            let dbp = document.querySelector('#dataBasePath').value;
            let dlaFilename = document.querySelector('#dlaFilename').value;

            if (!dlaFilename.includes('.dla')){
                dlaFilename += '.dla';
            }


            if (document.querySelector('#pffCheck').checked){

            }else{
                // https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=' + base + '&file=' + file + '&dataBasePath=' + dataBasePath + '&dlaFile=' + dlaFile + '.dla
                url.innerHTML = 'https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=global&file=' + source + '&dataBasePath=' + dbp + '&dlaFile=' + dlaFilename;
            }
        }else if (mediaType == 'Animation'){
            animationLink(url);
        }

        if (url.innerHTML){
            url.classList.add('has-background-success-light');
            textArea.appendChild(url);
        }
    });

    if (type == "DOC"){
        build.appendChild(generateInput('dataBasePath','Unit UUID','The UUID for the unit can be found in Cayman.'));

        build.appendChild(generateInput('fileName', 'File Name (incl file ext)', 'The file name for the file being linked to. Include the file extension (.jpg, .gif, .docx, etc.)'));
    }else if (type == "DLA"){
        build.appendChild(generateInput('source', 'Source Path', 'JS path for the DLA. Example: dla_example/js/dla_example.js'));

        build.appendChild(generateInput('dataBasePath','Unit UUID','The UUID for the unit can be found in Cayman.'));

        build.appendChild(generateInput('dlaFilename', 'DLA File Name', 'The file name for the dla file on AWS. (incl. extension)'));
    }else if (type == "Animation"){
        
        build.appendChild(generateInput('base', 'Base', 'If the animation is in the unit folder use the unit UUID. Otherwise use the base of the course code, for g_alg01_2016 you would enter alg01.'));

        build.appendChild(generateInput('sourcePath', 'Source Path', 'The same as the source in CAT media reference.'));

    }

    let pff = document.querySelector('#pffCheck').checked;
    let exText = document.querySelector('#text').checked;
    if (pff){
        if (type == "Animation"){
            document.querySelector('#base').addEventListener('input', (e) => {
                if (document.querySelector('#pffCheck').checked){
                    let dbp = document.querySelector('#dataBasePath');

                    if (e.target.value.length >= 15 && e.target.value.includes('-')){
                        dbp.value = e.target.value;
                        // dbp.setAttribute('disabled','disabled');
                    }
                }
            });
    
            build.appendChild(generateInput('dataBasePath','Database Path (Unit UUID)','The UUID for the unit can be found in Cayman.', 'If different from Base'));
        }

        build.appendChild(generateInput('pffFile', '.pff File Name', 'The file name fore the pff file, including the extension.', 'example.pff'));
    }

    if (exText){
        build.appendChild(generateInput('topText', 'Top Text', 'Text to display above the media.'));

        build.appendChild(generateInput('bottomText', 'Bottom Text', 'Text to be displayed at the bottom of the media.'));
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
});

document.querySelector('#mediaType').addEventListener('change', toggleExtras);
