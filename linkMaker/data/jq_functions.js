$(document).ready(function(){


    $('#mediaselect').click(() => {
        $('#linkbuild').append(generateInput('dataBasePath','Data Base Path (Unit UUID)','Either course base (alg01) if in curric media or unit UUID if in unit folder'));
    })

});