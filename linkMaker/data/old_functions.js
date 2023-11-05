/*
*EXAMPLE FOR DOCUMENTS - https://cdn.lti.glynlyon.com/media/UNIT-UUID/misc/FILE_NAME
*/
$(document).ready(function(){
let previous = document.referrer;
    if (previous == "https://mdohse29.github.io/toolBox.html"){
        $('#toolBox').show();
    }
var space = function(text){
    for(a = 0; a < text.length; a++){
    if (text[a] == " "){
        text = text.replace(' ', '%20');
    }
    }
    return text;
};
var base = "";//global or Unit UUID or course base (ex. alg01)
var file = "";//same as source in CAT or whats between the multimedia tags in the XML
var dataBasePath = "";//Unit UUID
var dlaFile = "";//the actual DLA file that is in the unit folder including the .dla extention
var pff = "";//pff file name that is in the unit folder
var topText = "";//additional text above the asset
var bottomText = "";//additional text below the asset
//----------------Selecting the media and data set needed--------------------------
$('#mediaselect').click(function(){
    var media = $('#mediaType').val();

    if (media == "DLA"){
        $('#paths').css('display', 'inherit');
    }else{
        $('#paths').css('display', 'none');
    }

    $('#linkbuild').empty();
    $('#linkbuild').css('visibility', 'visible');
    $('#submit').css('visibility', 'visible');

    if (media == 'Animation'){
        $('#linkbuild').append('<p title="Either course base (alg01) if in curric media or unit UUID if in unit folder">Base: <input type="text" id="base" class="mediadata" value="' + base + '"/></p>');
        $('#linkbuild').append('<p title="The same data that is in the SOURCE in CAT media references.">File: <input type="text" id="file" class="mediadata" value="' + file + '"/></p>');
        if ($('#pffCheck').is(':checked')){
            $('#linkbuild').append('<p>Data Base Path (Unit UUID): <input type="text" id="dataBasePath" class="mediadata" value="' + dataBasePath + '"/></p>');
        }
    }else if (media == 'DLA'){
        // $('#dlas').css('visibility', 'visible');
        $('#linkbuild').append('<p title="The same data that is in the SOURCE in CAT media references.">File: <input type="text" id="file" class="mediadata" value="' + file + '"/></p>');
        $('#linkbuild').append('<p>Data Base Path (Unit UUID): <input type="text" id="dataBasePath" class="mediadata" value="' + dataBasePath + '"/></p>');
        $('#linkbuild').append('<p title="Name of the DLA file that is in the unit folder">DLA File Name: <input type="text" id="dlaFile" class="mediadata" value="' + dlaFile + '"/></p>');
    }else if (media == "DOC") {
        $('#linkbuild').append('<p title="UUID for the unit the file is in. You can get this form Cayman or the sosx.">Data Base Path (Unit UUID): <input type="text" id="dataBasePath" class="mediadata" value="' + dataBasePath + '"/></p>');
        $('#linkbuild').append('<p title="File name, including the file exention. (.pdf, .docx, .jpg, .mp3, ect.)">File: <input type="text" id="file" class="mediadata" value="' + file + '"/></p>');
    }

    if ($('#pffCheck').is(':checked') && media != "DOC"){
        $('#linkbuild').append('<p title="Transcript text file using .pff extension.">PFF File Name: <input type="text" id="pff" class="mediadata" value="' + pff + '"/></p>');
    }

    if ($('#text').is(':checked') && media != "DOC"){
        $('#linkbuild').append('<p title="Text will appear centered and above the media.">Top Text (optional): <input type="text" id="topText" class="mediadata" value="' + topText + '"/></p>');
        $('#linkbuild').append('<p title="Text will appear centered and below the media.">Bottom Text (optional): <input type="text" id="bottomText" class="mediadata" value="' + bottomText + '"/></p>');
    }
    
    //$('#mediaselect').css('visibility', 'hidden');
});
//---------------------------------------------------------------------------------
//Submit course data to build link and produces results----------------------------
$('#submit_course').click(function(){
    var media = $('#mediaType').val();
    $('#textarea').css('visibility', 'visible');
    $('#textarea').empty();
    if (media == 'Animation'){
    if ($('#pffCheck').is(':checked')){
        $('#textarea').append('<p id="link">https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=' + base + '&file=' + file + '&dataBasePath=' + dataBasePath + '&pff=' + pff + '</p>');
    }else if (base.length > 10 && !$('#pffCheck').is(':checked')){
        $('#textarea').append('<p id="link">https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=' + base + '&file=' + file + '&dataBasePath=' + base + '</p>');
    }else{
        $('#textarea').append('<p id="link">https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=' + base + '&file=' + file + '</p>');
    }
    }else if (media == 'DLA'){
    base = 'global';
    $('#textarea').append('<p id="link">https://cdn.lti.glynlyon.com/interactives/chm/cdn_harness/cdn_harness.html?base=' + base + '&file=' + file + '&dataBasePath=' + dataBasePath + '&dlaFile=' + dlaFile + '.dla</p>');
    }else if (media == 'DOC') {
    var docType = "";
    switch(file.substring(file.indexOf(".")+1, file.length).toLowerCase()){
        case "png":case "jpg":case "gif":
        docType = "img";
        break;
        case "mp3":
        docType = "audio";
        break;
        case "mp4":
        docType = "video"
        break;
        default:
        docType = "misc";
        break;
    }
    $('#textarea').append('<p id="link">https://cdn.lti.glynlyon.com/media/' + dataBasePath + '/' + docType + '/' + file + '</p>');
    }
    if ($('#text').is(':checked') && $('#mediaType').val() != "DOC"){
    topText = space(topText);
    bottomText = space(bottomText);
    $('#link').append('&topText=' + topText + '&bottomText=' + bottomText);
    }
    /*
    Uncomment this to add link tag and customer facing text
    */

    // if (media != "DOC") {
    //   $('#link').prepend('&#60;p&#62;Use this &#60;a href="');
    //   $('#link').append('" target="_blank"&#62;media&#60;/a&#62; to help you complete the question.&#60;/p&#62;');
    // }
});
/*
    *When the mouse leaves the #linkbuild div whatevere data is in the input boxes gets saved to the variables
*/
$('input').mousemove(function(){
    base = $('#base').val();
    if (base === undefined) {
    base = "";
    }
    file = $('#file').val();
    if (file === undefined) {
    file = "";
    }
    dataBasePath = $('#dataBasePath').val();
    if (dataBasePath === undefined){
    dataBasePath = "";
    }
    dlaFile = $('#dlaFile').val();
    if (dlaFile === undefined){
    dlaFile = "";
    }else if (dlaFile.search('.dla') != -1) {
    dlaFile = dlaFile.replace('.dla', '');
    }
    pff = $('#pff').val();
    if (pff === undefined){
    pff = "";   //this will work to stop undefined from populating
    }
    topText = $('#topText').val();
    if (topText === undefined){
    topText = "";
    }
    bottomText = $('#bottomText').val();
    if (bottomText === undefined){
    bottomText = "";
    }
});
//---------------------------------------------------------------------------------
$('#clear').click(function(){
    $('#pffCheck').prop("checked", false);
    $('#text').prop("checked", false);
    $('#mediaType').prop("value", "Animation");
    location.reload();
});
});