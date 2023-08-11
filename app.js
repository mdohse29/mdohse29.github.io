// location.replace("./construction.html");
$(document).ready(function(){
    if ($('.flk').length <= 0){
        $('#magic').hide();
    }
    $('#magic').click(function(){
        $('.flk').each(function(){
            if ( $(this).css('display') == 'none'){
                if ($(this).attr('class').includes('msg')){
                    $(this).css('display','grid');
                }else{
                    $(this).css('display', 'flex');
                }
            }else{
                $(this).css('display', 'none');
            }
        });
    });

    $('.expand').click(function(){
        if (!$(this).parent().find('div.drawer').hasClass('selected')){
            //closes the other drawers if a different drawer is clicked
            $('div.selected').removeClass('selected').slideToggle();
        }
        $(this).parent().find('div.drawer').toggleClass('selected').slideToggle();
    });
    
    $('#magic').mouseenter(function(){
        $(this).css('border', '1px solid red');
    });
    $('#magic').mouseleave(function(){
        $(this).css('border', 'none');
    });

    $('.tile').mousedown(function(){
        $(this).css('box-shadow', '0px 0px 5px 0px darkgrey');
    });

    $('.tile').on('contextmenu', function(){
        return false;
    });

    $('.tile').mouseup(function(event){
        $(this).css('box-shadow', '0px 0px 5px 3px darkgrey');
        let link = $(this).attr('url');

        /* Returns which mouse button is being used.
        1 - Left Mouse Button
        2 - Middle Mouse Button
        3 - Right Mouse Button
        */
        if (link != null && link != ""){
            switch(event.which){
                case 1:
                    if (link.includes('http')){
                        window.open(link, '_blank');
                    }else{
                        window.location.href = link;
                    }
                    break;
                case 2:
                    window.open(link, '_blank');
                    break;
            }
        }
    });
    
});