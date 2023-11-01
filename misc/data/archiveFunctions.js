$(document).ready(function () { // Not sure why but I was looking at multiple events on one element, useful?
    let previous = document.referrer;
    if (previous.includes("toolBox.html")) {
        $('#toolBox').removeClass('d-none');
    }

    $('#submit-search').click(function () {
        if (!$('#search-box').val()) {
            alert("Please enter a title to search.");
        }
    });

    $('#submit-reset').click(function () {
        reset();
    });

    $('#search-box').on('input', function () {
        let searchText = $('#search-box').val();

        if (searchText == "random select") {
            $('.spcl').removeClass('d-none');
        } else if (searchText == "goodbye") {
            $('.spcl').addClass('d-none');
        }

        let found = false;

        if ($('.notFound')) {
            $('.notFound').remove();
        }

        if (searchText == "" || searchText == null) {
            reset();
        } else {
            let elements = $('.movies > p.title');
            let titles = [];

            for (a = 0; a < elements.length; a ++) {
                titles.push({title: elements[a].innerText, tag: $(elements[a]).attr('tag')});
            }

            $('.movies').parent().addClass('d-none');
            $('.results').parent().removeClass('d-none');
            $('.results > .title').remove();

            for (a in titles) {
                if (titles[a].title.toLowerCase().includes(searchText.toLowerCase())) {
                    $('.results').append('<p class="title" tag="' + titles[a].tag + '">' + titles[a].title + '</p>');
                    found = true;
                }
            }

            if (! found) {
                $('.results').append('<p class="notFound">Sorry!<br/>Nothing was found that matched your keyword(s).<br/>Send me a request and I will see what I can do.</p>');
            }

            $('#submit-reset').removeClass('d-none');
            $('.search').addClass('button');

            // $('#submit-search').text("Reset");
            // $('#submit-search').attr('id', 'search-reset');
            // $('#search-reset').attr('onclick', 'reset();');


        }
    });

    reset = function () {
        $('#search-box').val('');
        // $('#search-reset').removeAttr('onclick');
        $('.results').parent().addClass('d-none');
        $('.movies').parent().removeClass('d-none');
        $('.results > p').remove();
        $('#submit-reset').addClass('d-none');
        $('.search').removeClass('button');
        // $('#search-reset').text("Submit");
        // $('#search-reset').attr('id', 'submit-search');

    }

    let tabHeight = $('.tabs').prop('scrollHeight');
    $('.msg').attr('style', 'margin-top: ' + tabHeight + 'px;');
    
    $(document).on('mouseenter', 'p.title', function () {
        let text = '';
        $(this).addClass('highlight');
        let tag = $(this).attr('tag');
        switch(tag){
            case 'mov':
                $(this).append('<span id="location"> - Active Movie</span>');
                break;
            case 'tv':
                $(this).append('<span id="location"> - TV</span>');
                break;
            case 'arch':
                $(this).append('<span id="location"> - Archived Movie</span>');
                break;
        }

    });
    $(document).on('mouseleave', 'p.title', function () {
        $(this).removeClass('highlight');
        $(this).find('#location').remove();
    });

    $('.tab').click(function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        let tag = $(this).attr('tag');
        let movies = $('p.title');

        for (let movie = 0; movie < movies.length; movie++){
            let movieTag = $(movies[movie]).attr('tag');

            if (tag == "all" || tag == movieTag){
                $(movies[movie]).removeClass('d-none');
            }else{
                $(movies[movie]).addClass('d-none');
            }

        }
    });

    $('#rand').click(function () {
        let elements = $('.movies > p.title');
        let num = $('#num').val();
        if (! num) {
            num = 5;
        }

        $('.movies').parent().addClass('d-none');
        $('.results').parent().removeClass('d-none');
        if ($('.notFound')) {
            $('.notFound').remove();
        }
        $('.results > .title').remove();

        for (let a = 0; a < num; a++) {
            let rand = Math.floor(Math.random() * (elements.length - 1));
            $('.results').append(elements[rand]);
        }

        $('#submit-reset').removeClass('d-none');

    });

    $('#num').keydown(function (event) {
        event.preventDefault();
    });

    $('#close').click(function (){
        $('.spcl').addClass('d-none');
    });

});
