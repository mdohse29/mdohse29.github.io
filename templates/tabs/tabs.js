$(document).ready(function(){
    $('.tab').click(function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        
    });
})