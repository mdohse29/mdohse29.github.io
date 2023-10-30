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
                titles.push(elements[a].innerText);
            }

            $('.movies').addClass('d-none');
            $('.results').removeClass('d-none');
            $('.results > .title').remove();

            for (a in titles) {
                if (titles[a].toLowerCase().includes(searchText.toLowerCase())) {
                    $('.results').append('<p class="title">' + titles[a] + '</p>');
                    found = true;
                }
            }

            if (! found) {
                $('.results').append('<p class="notFound">Sorry! Nothing was found that matched your keyword(s). Check Emby to see if it is already active. If not, make a request for what movie you would like to see, and I will try to download it.</p>');
            }

            $('#submit-reset').removeClass('d-none');

            // $('#submit-search').text("Reset");
            // $('#submit-search').attr('id', 'search-reset');
            // $('#search-reset').attr('onclick', 'reset();');


        }
    });

    reset = function () {
        $('#search-box').val('');
        // $('#search-reset').removeAttr('onclick');
        $('.results').addClass('d-none');
        $('.movies').removeClass('d-none');
        $('.results > p').remove();
        $('#submit-reset').addClass('d-none');
        // $('#search-reset').text("Submit");
        // $('#search-reset').attr('id', 'submit-search');

    }


    $(document).on('mouseenter', 'p.title', function () {
        $(this).addClass('highlight');
    });
    $(document).on('mouseleave', 'p.title', function () {
        $(this).removeClass('highlight');
    });

    $('#rand').click(function () {
        let elements = $('.movies > p.title');
        let num = $('#num').val();
        if (! num) {
            num = 5;
        }

        $('.movies').addClass('d-none');
        $('.results').removeClass('d-none');
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
    })
});
