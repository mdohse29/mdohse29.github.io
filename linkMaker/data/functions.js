// PFF is not rendering in preview, might not be able to include
// TODO: Find out if pff files actually work with DLAs in the harness
// TODO: Find an animation to test the animationLink builder
// TODO: add option to manually enter source path for DLA
function space(text){
    for(a = 0; a < text.length; a++){
    if (text[a] == " "){
        text = text.replace(' ', '%20');
    }
    }
    return text;
}

function generateInput(id, text, title, ph){
    let inputAndLabel = mkinp({type:'text', class:'control input', autocomplete:'off', id:((id) ? id:''), placeholder:((ph) ? ph:''), label:((text) ? text + ':&nbsp;':''), labelOpt:{class:'label is-inline-block'}});
    let div = nestElem([
        mkDiv({class:'field', title:((title) ? title : '')}),
        {
            1:inputAndLabel.label,
            2:inputAndLabel.input
        }
    ])

    return div;
}

function generateDropDown(id, labelText, title){
    
    return nestElem([
        mkDiv({class:'field', title:((title) ? title:'')}),
        mkDiv({class:'select'}),
        {
            1:mkLabel({for:id, class:'label is-inline-block', inner:labelText + ':&nbsp;'}),
            2:mkinp({
                type:'select', 
                id:id,
                name:id,
                options:[
                    {value:"dla_tiletrial/js/tiletrial.js"},
                    {value:"dla_dragdrop/js/dragdrop.js"},
                    {value:"dla_tictactoe/js/tictactoe.js"},
                    {value:"dla_textboxl/js/textboxl.js"},
                    {value:"dla_sbx/js/sbx.js"},
                    {value:"dla_speeddrill/js/speeddrill.js"},
                    {value:"dla_sorter/js/sorter.js"},
                    {value:"dla_slideshow/js/dla_slideshow.js"},
                    {value:"dla_puzzlematch/js/puzzlematch.js"},
                    {value:"dla_powerpopquiz/js/powerpopquiz.js"},
                    {value:"dla_popquiz/js/popquiz.js"},
                    {value:"dla_metalsquares/js/dla_metalsquares.js"},
                    {value:"dla_holeymoley/js/holeymoley.js"},
                    {value:"dla_farmerfrank/js/farmerfrank.js"},
                    {value:"dla_concentration/js/dla_concentration.js"},
                    {value:"dla_allright/js/allright.js"},
                    {value:"dla_feedback/js/feedback.js"},
                    {value:"dla_conjugatorchart/js/conjugatorchart.js"},
                    {value:"dla_flashcards/js/flashcards.js"},
                    {value:"dla_equationbuilder/js/equation_builder.js"},
                    {value:"dla_whatcha_makin/js/watchmakin.js"},
                    {value:"dla_carnivalgame/js/carnivalgame.js"},
                    {value:"periodic_table/js/periodictable.js"}
                ]
            }).input
        }
    ]);

}

function resetEverything(){
    let linkData = document.querySelector('#linkData');
    let linkBuild = document.querySelector('#linkBuild');
    let preview = document.querySelector('#preview');

    // if (!preview.getAttribute('class').includes('dnone')){
    //     preview.querySelector('iframe').src = '';
    //     preview.classList.add('dnone');
    // }
    if (preview){
        closePreview();
    }

    linkData.innerHTML = '';
    linkData.classList.add('dnone');
    if (!linkBuild.getAttribute('class').includes('dnone')){
        linkBuild.querySelector('p').remove();
        linkBuild.classList.add('dnone');
    }

    document.querySelector('#selectMenu').classList.remove('dnone');
    document.querySelector('#pffCheck').checked = false;
    document.querySelector('#text').checked = false;
    document.querySelector('#mediaType').value = 'DOC';
    document.querySelector('#showPreview').removeAttribute('disabled');
    
    toggleExtras();
}

function submitData(){
    let linkBuild = document.querySelector('#linkBuild');
    let mediaType = document.querySelector('#mediaType').value;
    let url = document.createElement('p');

    url.classList.add('has-text-centered');

    if (linkBuild.querySelector('p')){
        linkBuild.querySelector('p').remove();
    }

    linkBuild.classList.remove('dnone');

    if (mediaType == 'DOC'){
        mediaLink(url);
    }else if (mediaType == 'DLA'){
        dlaLink(url);
    }else if (mediaType == 'Animation'){
        animationLink(url);
    }

    if (url.innerHTML){
        url.classList.add('has-background-success-light');
        linkBuild.appendChild(url);
    }
}

function toggleExtras(){
    let value = document.querySelector('#mediaType').value;
    if (value == "DOC"){
        document.querySelector('#pffCheck').parentElement.classList.add('dnone');

        document.querySelector('#text').parentElement.classList.add('dnone');

    }else if (value == "DLA"){
        document.querySelector('#pffCheck').parentElement.classList.add('dnone');

        document.querySelector('#text').parentElement.classList.remove('dnone');

    }else{
        document.querySelector('#pffCheck').parentElement.classList.remove('dnone');

        document.querySelector('#text').parentElement.classList.remove('dnone');
    }
}

function showPreview(){
    if (document.querySelector('#preview')){
        closePreview();
    }
    let url = document.querySelector('#linkBuild > p').innerText;
    let preview = nestElem([
        mkDiv({class:'column', id:'preview'}),
        mkDiv({class:'box'}),
        {
            1: mkbtn({class:'button close', title:'Close Preview', inner:'X'}),
            2: mkElem({elemType:'iframe', src:url})
        }
    ]);

    document.querySelector('.container > .columns:last-child').appendChild(preview);
    document.querySelector('.close').addEventListener('click', closePreview);

}

function closePreview(){
    document.querySelector('#preview').remove();
}

function mediaSelect(){
    document.querySelector('#selectMenu').classList.add('dnone');
    let type = document.querySelector('#mediaType').value;
    let build = document.querySelector('#linkData');
    let submit = mkbtn({class:'button mt-4 is-rounded is-info', id:'submit', inner:'Submit'});
    let reset = mkbtn({class:'button mt-4 is-rounded is-danger ml-3', id:'reset', inner:'Reset'});

    build.classList.remove('dnone');

    reset.addEventListener('click', resetEverything);

    submit.addEventListener('click', submitData);

    if (type == "DOC"){
        build.appendChild(generateInput('dataBasePath','Unit UUID','The UUID for the unit can be found in Cayman.'));

        build.appendChild(generateInput('fileName', 'File Name (incl file ext)', 'The file name for the file being linked to. Include the file extension (.jpg, .gif, .docx, etc.)'));
    }else if (type == "DLA"){
        // build.appendChild(generateInput('source', 'Source Path', 'JS path for the DLA. Example: dla_example/js/dla_example.js'));
        // Add other option to manually enter path, then switch inputs

        build.appendChild(generateDropDown('source', 'Source Path'));

        build.appendChild(generateInput('dataBasePath','Unit UUID','The UUID for the unit can be found in Cayman.'));

        build.appendChild(generateInput('dlaFilename', 'DLA File Name', 'The file name for the dla file on AWS. (incl. extension)', 'some_filename.dla'));
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
            url.innerText += '&topText=' + space(topText);
        }
        if (bottomText){
            url.innerText += '&bottomText=' + space(bottomText);
        }
    }
}

function mediaLink(url){
    let fileType = '';
    let docType = '';
    let dataBasePath = ((document.querySelector('#dataBasePath').value) ? document.querySelector('#dataBasePath').value : 'null');
    let fileName = ((document.querySelector('#fileName').value) ? document.querySelector('#fileName').value : 'null');
    let preview = document.querySelector('#showPreview');

    if (fileName == 'null' || dataBasePath == 'null'){
        url.classList.add('has-background-danger');
        preview.setAttribute('disabled', 'disabled');
    }else{
        fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
        preview.removeAttribute('disabled');
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

function dlaLink(url){
    let source = document.querySelector('#source').value;
    let dbp = document.querySelector('#dataBasePath').value;
    let dlaFilename = document.querySelector('#dlaFilename').value;

    if (dlaFilename && !dlaFilename.includes('.dla')){
        dlaFilename += '.dla';
    }

    url.innerHTML = 'https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=global&file=' + source + ((dbp) ? '&dataBasePath=' + dbp:'') + ((dlaFilename) ? '&dlaFile=' + dlaFilename : '');

    if (document.querySelector('#pffCheck').checked){
        let pff = document.querySelector('#pffFile').value;
        if (pff){
            if (!pff.includes('.pff')){
                pff += '.pff';
            }
            url.innerHTML += '&pff=' + pff;
        }
    }

    if (document.querySelector('#text').checked){
        let topText = document.querySelector('#topText').value;
        let bottomText = document.querySelector('#bottomText').value;
        if (topText){
            url.innerHTML += '&topText=' + space(topText);
        }
        if (bottomText){
            url.innerHTML += '&bottomText=' + space(bottomText);
        }
    }
}


resetEverything();

document.querySelector('#mediaselect').addEventListener('click', mediaSelect);

document.querySelector('#showPreview').addEventListener('click', showPreview);

document.querySelector('#mediaType').addEventListener('change', toggleExtras);
