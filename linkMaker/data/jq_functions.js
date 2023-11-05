$(document).ready(function(){


    $('#mediaselect').click(() => {
        $('#linkbuild').append(generateInput('base','Base','Either course base (alg01) if in curric media or unit UUID if in unit folder'));
    })

});