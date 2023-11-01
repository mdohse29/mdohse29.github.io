let masterList = [];
const baseUrl = './data/';

let loading = document.createElement('p');
loading.setAttribute('id', 'placeH');
loading.innerText = 'Loading ....';
document.querySelector('.movies').appendChild(loading);
const formatter = function (text){
    let format = text.replace(/(\(\d\d\d\d\)).*/g, '$1');
    format = format.replace(/\[(\d\d\d\d)\].*/g, '($1)');
    format = format.replaceAll('.', ' ');
    format = format.replace(/([\w\d])(\()/g, '$1 $2');
    return format.toLowerCase();
}
function collectList(movies, tag){
    for (let movie in movies){
        let formatted = formatter(movies[movie]);
        if (formatted){
            let p = document.createElement('p');

            p.classList.add('title');
            p.setAttribute('tag', tag);
            p.innerText = formatted;

            masterList.push(p);
            masterList = masterList.sort();
        }else{
            // console.log("Removing -> " + movies[movie] + "EMPTY");
            movies.splice(movie,1);
        }
    }
}

axios.get(baseUrl + "archive.txt")
.then(archive => {
    let archList = archive.data.split('\n');
    collectList(archList, 'arch');
}).then(() => {
    axios.get(baseUrl + "active.txt")
    .then(active => {
        let activeList = active.data.split('\n');
        collectList(activeList, 'mov');
    }).then(() => {
        axios.get(baseUrl + "tvshows.txt")
        .then(tv => {
            let tvList = tv.data.split('\n');
            collectList(tvList, 'tv');

            if (masterList.length > 0){
                document.querySelector('#placeH').remove();
                // $('p[id="placeH"]').remove();
            }

            let movieList = document.querySelector('.movies');
            for (let i in masterList){
                movieList.appendChild(masterList[i]);
            }
            let p = document.createElement('p');
            let strong = document.createElement('strong');
            let sub = document.createElement('sub');
            
            p.setAttribute('id', 'total');
            p.setAttribute('tag', 'all');
            p.classList.add('sticky-bottom');
            sub.innerText = 'Total: ' + masterList.length;

            strong.appendChild(sub);
            p.appendChild(strong);
            movieList.appendChild(p);
        });
    });
}).catch(error => {
    document.querySelector('#placeH').remove();
    loading.innerHTML = 'OOPS! Something Went Wrong!<br><br>Nothing to see here';
    document.querySelector('.movies').appendChild(loading);
});

