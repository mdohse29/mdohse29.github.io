$.get('./data/archive.txt', function(data, status){
    let movies = data.split('\n');
    if (movies.length > 0){
      $('p[id="placeH"]').remove();
    }
    for (a = 0; a < movies.length; a++){
      $('.movies').append('<p class="title" style="background-color: none;font-weight: bold;font-size: 1em;">' + movies[a].replaceAll('.', ' ') + '</p>');
    }
  }, 'text');