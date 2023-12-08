// $.get('./data/archive.txt', function(data, status){
  axios.get("https://mdohse29.github.io/misc/data/archive.txt")
  .then(archive => {
    let movies = archive.data.split('\n');
    let list = document.querySelector('.movies');
    if (movies.length > 0){
      document.querySelector('p[id="placeH"').remove();
      // $('p[id="placeH"]').remove();
    }
    for (a = 0; a < movies.length; a++){
      let formatted = formatter(movies[a]);
      // let formatted = movies[a];
      // if (movies[a].match(/\[\d\d\d\d\]/g) || movies[a].match(/\(\d\d\d\d\)/g)){

        // console.log(formatted.replace(/\[(\d\d\d\d)\].*/g, '($1)'));
        if (formatted){
          let p = document.createElement('p');

          p.classList.add('title');
          p.setAttribute('tag', 'arch');
          p.innerText = formatted;
          list.appendChild(p);
        }else{
          console.log("Removing -> " + movies[a] + "EMPTY");
          movies.splice(a,1);
        }
      
      // }
    }
    let p = document.createElement('p');
    let strong = document.createElement('strong');
    let sub = document.createElement('sub');
    
    p.setAttribute('id', 'total');
    p.setAttribute('tag', 'all');
    p.classList.add('sticky-bottom');
    sub.innerText = 'Total: ' + movies.length;

    strong.appendChild(sub);
    p.appendChild(strong);
    list.appendChild(p);

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