$(document).ready(function () { // Not sure why but I was looking at multiple events on one element, useful?
    function reset() {

        $('#search-box').val('');
        $('.movies > p').remove();
        $('#submit-reset').addClass('d-none');
        $('.search').removeClass('reset-btn');

        for (let movie of masterList){
            $('.movies').append(filter(movie).element);
        }

        $('.movies').append('<p id="total" tag="count" class="sticky-bottom"><sub>Total: ' + masterList.length + '</sub></p>');

    }

    function updateTotal(){
        let total = $('#total').find('sub');
        let tag = $('.tab.active').attr('tag');
        let movies = '';
        if (tag == 'all'){
            movies = masterList;
        }else{
            movies = $('p[tag="' + tag + '"]');
        }

        $(total).text('Total: ' + movies.length);

    }

    function filter(movieObject){
        /*
        Movie object example
        {element: '<p>', tag: 'tag'}
        */
        let currentTab = $('.active').attr('tag');
        if (currentTab != 'all' && currentTab != movieObject.tag){
            $(movieObject.element).addClass('d-none');
        }else{
            $(movieObject.element).removeClass('d-none');
        }
        return movieObject;
    }

    function search(searchText){
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
            let movies = masterList;

            $('.movies > p').remove();

            for (let movie of movies) {
                if (movie.element.innerText.toLowerCase().includes(searchText.toLowerCase())) {
                    $('.movies').append(filter(movie).element);
                    found = true;
                }
            }

            if (! found) {
                $('.movies').append('<p class="notFound">Sorry!<br/>Nothing was found that matched your keyword(s).<br/>Send me a request and I will see what I can do.</p>');
            }

            $('#submit-reset').removeClass('d-none');
            $('.search').addClass('reset-btn');

        }
    }

    let previous = document.referrer;

    $('#search-box').val('');
    
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

    // --------------------------------------------------------------------------
    $('#search-box').on('input', function () {
        let searchText = $('#search-box').val();

        search(searchText);
    });
    // -----------------------------------------------------


    // let tabHeight = $('.tabs').prop('scrollHeight');

    // $('.msg').attr('style', 'margin-top: ' + tabHeight + 'px;');
    // $('.tabs-container').attr('style', 'margin-top: ' + tabHeight + 'px;');
    
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

        let movies = $('p.title');

        for (let movie = 0; movie < movies.length; movie++){
            let movieTag = $(movies[movie]).attr('tag');

            filter({element: movies[movie], tag: movieTag});

        }
        updateTotal();
    });

    $('#rand').click(function () {
        let elements = masterList;
        let num = $('#num').val();

        if (! num) {
            num = 5;
        }

        if ($('.notFound')) {
            $('.notFound').remove();
        }

        $('.movies > p').remove();

        for (let a = 0; a < num; a++) {
            let rand = Math.floor(Math.random() * (elements.length - 1));
            $('.movies').append(filter(elements[rand]).element);
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
