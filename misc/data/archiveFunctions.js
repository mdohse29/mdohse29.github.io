$(document).ready(function(){
    //Not sure why but I was looking at multiple events on one element, useful?
    let previous = document.referrer;
    if (previous.includes("toolBox.html")){
        $('#toolBox').removeClass('d-none');
    }

    $('#submit-search').click(function(){
      if (!$('#search-box').val()){
        alert("Please enter a title to search.");
      }
    })

    $('#search-box').on('input',function(){
      var searchText = $('#search-box').val();
      var found = false;
      if ($('.notFound')){
        $('.notFound').remove();
      }
      if (searchText == "" || searchText == null){
        reset();
      }else{
        var elements = $('.movies > p.title');
        var titles = [];
        
        for (a = 0; a < elements.length; a++){
          titles.push(elements[a].innerText);
        }

        $('.movies').addClass('d-none');
        $('.results').removeClass('d-none');
        $('.results > .title').remove();

        for (a in titles){
          if (titles[a].toLowerCase().includes(searchText.toLowerCase())){
            $('.results').append('<p class="title" style="background-color: none;font-weight: bold;font-size: 1em;">' + titles[a] + '</p>');
            found = true;
          }
        }
        if (!found){
          $('.results').append('<p class="notFound">Sorry! Nothing was found that matched your keyword(s). Check Emby to see if it is already active. If not, make a request for what movie you would like to see, and I will try to download it.</p>');
        }

        $('#submit-search').text("Reset");
        $('#submit-search').attr('id', 'search-reset');
        $('#search-reset').attr('onclick', 'reset();');


      }
    });

    reset = function(){
      $('#search-box').val('');
      $('#search-reset').removeAttr('onclick');
      $('.results').addClass('d-none');
      $('.movies').removeClass('d-none');
      $('.results > p').remove();
      $('#search-reset').text("Submit");
      $('#search-reset').attr('id', 'submit-search');

    }

      $(document).on('mouseenter', 'p.title', function(){
        $(this).css('background-color', 'black');
        $(this).css('color', 'white');
        $(this).css('font-size', '1.25em');
        $(this).css('font-weight', 'normal');
      });
      $(document).on('mouseleave', 'p.title', function(){
        $(this).css('background-color', 'inherit');
        $(this).css('color', 'black');
        $(this).css('font-size', '1em');
        $(this).css('font-weight', 'bold');
      });
  });