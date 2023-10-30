// $.get('./data/archive.txt', function(data, status){
  axios.get("./data/archive.txt")
  .then(archive => {
    let movies = archive.data.split('\n');
    if (movies.length > 0){
      $('p[id="placeH"]').remove();
    }
    for (a = 0; a < movies.length; a++){
      let formatted = formatter(movies[a]);
      // let formatted = movies[a];
      // if (movies[a].match(/\[\d\d\d\d\]/g) || movies[a].match(/\(\d\d\d\d\)/g)){

        // console.log(formatted.replace(/\[(\d\d\d\d)\].*/g, '($1)'));
        if (formatted){
          $('.movies').append('<p class="title">' + formatted + '</p>');
        }else{
          console.log("Removing -> " + movies[a] + "EMPTY");
          movies.splice(a,1);
        }
      
      // }
    }
    $('.movies').append('<p id="total"><sub>Total: ' + movies.length + '</sub></p>');
  })
  .catch(e => {
    console.log("Something is wrong\n", e);
  });
  // }, 'text');

  const formatter = function (text){
    let format = text.replace(/(\(\d\d\d\d\)).*/g, '$1');
    format = format.replace(/\[(\d\d\d\d)\].*/g, '($1)');
    format = format.replaceAll('.', ' ');
    format = format.replace(/([\w\d])(\()/g, '$1 $2');
    return format.toLowerCase();
  }