$.get('./data/archive.txt', function(data, status){
    let movies = data.split('\n');
    if (movies.length > 0){
      $('p[id="placeH"]').remove();
    }
    for (a = 0; a < movies.length; a++){
      let formatted = formatter(movies[a]);
      // if (movies[a].match(/\[\d\d\d\d\]/g) || movies[a].match(/\(\d\d\d\d\)/g)){

        // console.log(formatted.replace(/\[(\d\d\d\d)\].*/g, '($1)'));
      $('.movies').append('<p class="title" style="background-color: none;font-weight: bold;font-size: 1em;">' + formatted + '</p>');
      
      // }
    }
  }, 'text');

  const formatter = function (text){
    let format = text.replace(/(\(\d\d\d\d\)).*/g, '$1');
    format = format.replace(/\[(\d\d\d\d)\].*/g, '($1)');
    format = format.replaceAll('.', ' ');
    format = format.replace(/([\w\d])(\()/g, '$1 $2');
    return format;
  }