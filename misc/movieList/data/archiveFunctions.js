$(document).ready(function () { // Not sure why but I was looking at multiple events on one element, useful?
    createMovieList(); // Creates the list from text files in ./data/ folder

    function reset() {

        $('#search-box').val('');
        $('#search-box').focus();
        $('.movies > p').remove();
        $('#submit-reset').addClass('d-none');
        $('.search').removeClass('reset-btn');

        for (let movie of masterList){
            $('.movies').append(filter(movie).element);
        }

        updateTotal();

    } 

    function updateTotal(){

        let total = $('#total').find('sub');
        let tag = $('.tab.active').attr('tag');
        let movies = '';
        let counter = 0;
        if (tag == 'all'){
            movies = $('p.title');
        }else{
            movies = $('p[tag="' + tag + '"]');
        }

        for (let movie of movies){
            if (!$(movie).hasClass('d-none')){
                counter++;
            }
        }

        $(total).text('Total: ' + counter);

    }

    function openModal(){
        $('html').animate({scrollTop:0}, 'fast');
        $('.md-modal').removeClass('dnone');
        $('html').attr('style', 'overflow: hidden;');
    }

    function closeModal(){
        $('.md-modal').addClass('dnone');
        $('html').removeAttr('style');
    }

    function isFilterEmpty(){
        let movies = $('.movies > div');
        let isEmpty = true;
        for (let movie of movies){
            if (!$(movie).hasClass('dnone')){
                isEmpty = false;
                break;
            }
        }

        if (isEmpty){
            if ($('.notFound').length === 0){
                $('.movies').append(mkP({id:'empty', inner:'No Filtered Results', style:'text-align: center;'}));
            }
        }
    }

    function filter(movieObject){
        /*
        Movie object example
        {element: '<p>', tag: 'tag'}
        */

        let currentTab = $('.active').attr('tag');
        if (currentTab != 'all' && currentTab != movieObject.tag){
            $(movieObject.element).addClass('dnone');
        }else{
            $(movieObject.element).removeAttr('class');
        }

        return movieObject;
    }

    function search(searchText){
        if (searchText == "random select") {
            openModal();
        } else if (searchText == "goodbye") {
            closeModal();
        }

        let found = false;

        if ($('.notFound')) {
            $('.notFound').remove();
        }

        if (searchText == "" || searchText == null) {
            reset();
        } else {
            let movies = masterList;

            $('.movies > div').remove();

            for (let movie of movies) {
                let movTitle = movie.element.querySelector('p.title').innerText;
                if (movTitle.toLowerCase().includes(searchText.toLowerCase())) {
                    $('.movies').append(filter(movie).element);
                    found = true;
                }
            }

            if (! found) {
                $('.movies').append(mkP({class:'notFound', inner:'Sorry!<br/>Nothing was found that matched your keyword(s).<br/>Send me a request and I will see what I can do.'}));
            }

            $('#submit-reset').removeClass('d-none');
            $('.search').addClass('reset-btn');

            updateTotal();
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
    
    $(document).on('mouseenter', '.movies > div', function () {
        $(this).addClass('highlight');

        let text = '';
        let currentTab = $('.tab.active').attr('tag');

        let moreInfo = nestElem([
            mkDiv({id:'moreInfo'}),
            mkLnk({class:'button is-ghost is-responsive', id:'getInfo', inner:'More Information'})
        ]);
        let tag = $(this).find('p.title').attr('tag');

        switch(tag){
            case 'mov':
                if (currentTab == 'all')
                    $(this).find('p.title').append(mkSpan({id:'location', inner:' - Active Movie'}));
                $(this).append(moreInfo);
                break;
            case 'tv':
                if (currentTab == 'all')
                    $(this).find('p.title').append(mkSpan({id:'location', inner:' - TV Show'}));
                break;
            case 'arch':
                if (currentTab == 'all')
                    $(this).find('p.title').append(mkSpan({id:'location', inner:' - Archived Movie'}));
                $(this).append(moreInfo);
                break;
        }

        $('#getInfo').click(function(){
            let p = $($(this).parents()[1]).find('p.title');
            let title = $(p).attr('data-title');
            let year = $(p).attr('data-year');
            let tag = $(p).attr('tag');
            
            $('body').append(nestElem([
                mkDiv({class:'md-modal', id:'info'}),
                mkDiv({class:'md-modal-content md-modal-large'}),
                {
                    1:mkBtn({class:'button close-btn sticky-top', title:'Close'}),
                    2:nestElem([
                        mkDiv({class:'card'}),
                        {
                            1:nestElem([
                                mkDiv({class:'card-header'}),
                                mkDiv({class:'card-header-title', inner:title + ((year) ? ' - (' + year + ')' : '') + ((tag === 'arch') ? '<span style="margin-left: auto;color: red"><sub>Archived</sub></span>' : '')})
                                // mkElem({elemType:'h1', inner:text})
                            ]),
                            2:nestElem([
                                mkDiv({class:'card-content'}),
                                mkDiv({class:'content'}),
                                mkP({inner:'Loading...', id:'load'})
                            ])
                        }
                    ])
                }
            ]))

            getMovieInfo(title, year).then((info)=>{
                $($('#load').parents()[1]).remove();
                if(info.Plot && info.Plot != 'N/A'){
                    $('#info .card').append(nestElem([
                        mkDiv({class:'card-content'}),
                        {
                            1:nestElem([
                                mkDiv({class:'card-image', style:'float:left'}),
                                mkElem({elemType:'figure', class:'media-left'}),
                                mkElem({elemType:'img', src:info.Poster, alt:'Movie poster for \"' + info.Title + '\" was not found', class:'has-ratio'})
                            ]),
                            2:nestElem([
                                mkDiv({class:'content'}),
                                {
                                    1: nestElem([
                                        mkP(),
                                        mkElem({elemType:'sub', inner:`Staring: ${info.Actors}`})
                                    ]),
                                    2: mkP({inner:info.Plot})
                                }
                            ])
                        }
                    ]), mkDiv({class:'card-footer'}));
                    // Write something to add the critic ratings to footer
                    // Must check that ratings exist
                    // Must determine which rating is which, maybe with a switch
                    // Not all requests have all 3 ratings, assuming there are only 3
                    // Known ratings: IMDB, Rotten Tomatoes, "Metacritic?"
                    // So far the order seems consistent, but not positive.
                }else{
                    $('#info .card').append(
                        nestElem([
                            mkDiv({class:'card-content'}),
                            mkDiv({class:'content'}),
                            mkP({inner:'Sorry, no content was found at this time.'})
                        ])
                    )
                }
            }).catch(error => {
                console.log(error);
            });

            $('#info > div > .close-btn').click(function(){
                $('#info').remove();
            })
        })

    });
    $(document).on('mouseleave', 'div.highlight', function () {
        $(this).removeAttr('class');
        $(this).find('#location').remove();
        $(this).find('#moreInfo').remove();
    });

    $('.tab').click(function(){
        $('#empty').remove();
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');

        let movies = $('.movies > div');

        for (let movie = 0; movie < movies.length; movie++){
            let movieTag = $(movies[movie]).find('p.title').attr('tag');

            filter({element: movies[movie], tag: movieTag});

        }
        isFilterEmpty();
        updateTotal();
    });

    $('#rand').click(function () { 
        let elements = masterList;
        let tag = $('.tab.active').attr('tag');
        let alreadyFound = [];
        let num = $('#num').val();
        
        if (! num) {
            num = 5;
        }

        if ($('.notFound') || $('#empty')) {
            $('.notFound').remove();
            $('#empty').remove();
        }

        $('.movies > div').remove();

        for (let a = 0; a < num; a++) {
            let rand = Math.floor(Math.random() * (elements.length - 1));
            if (tag == 'all'){
                $('.movies').append(filter(elements[rand]).element);
            }else{
                if (elements[rand].tag == tag){
                    if (alreadyFound.includes(elements[rand].element)){
                        a--;
                        continue;
                    }else{
                        $('.movies').append(filter(elements[rand]).element);
                        alreadyFound.push(elements[rand].element)
                    }
                }else{
                    a--;
                }
            }
        }

        $('#submit-reset').removeClass('d-none');
        closeModal();

        updateTotal();

    });

    $('#num').on('change', function(){
        $('#selected').text($('#num').val());
    })

    $('#num').keydown(function (event) {
        event.preventDefault();
    });

    $('html').keydown(function(event){
        if (event.which == '27'){
            reset();
        }
    });

    $('.md-modal-background').click(function(){
        closeModal();
    });

    $('.rando > button').click(function(){
        openModal();
    });


});
