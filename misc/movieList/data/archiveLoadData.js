let masterList = [];
// const baseUrl = './data/';
const baseUrl = 'https://mdohse29.github.io/misc/movieList/data/'

let loading = document.createElement('p');
loading.setAttribute('id', 'placeH');
loading.innerText = 'Loading ....';
document.querySelector('.movies').appendChild(loading);

const formatter = function (text){
    let format = text.replaceAll('.', ' ');
    format = format.replace(/(\(\d\d\d\d\)).*/g, '$1');
    format = format.replace(/ \[(\d\d\d\d)\].*/g, ' ($1)');
    format = format.replace(/\[(\d\d\d\d)\].*/g, ' ($1)');
    format = format.replace(/ (\b\d\d\d\d\b).*/, ' ($1)');
    // format = format.replace(/([\w\d])(\()/g, '$1 $2');
    
    return format;
}

function collectList(movies, tag){
    for (let movie in movies){
        let formatted = formatter(movies[movie]);
        if (formatted){
            let p = document.createElement('p');

            p.classList.add('title');
            p.setAttribute('tag', tag);
            p.innerText = formatted;

            masterList.push({element: p, tag: tag});
            
            // masterList = sorter(masterList);
        }else{
            // console.log("Removing -> " + movies[movie] + "EMPTY");
            movies.splice(movie,1);
        }
    }
}

function sorter(array){
    // The docs show to use 1, 0, or -1 but chrome does not recognize 0 as valid. Has to be 1 or -1.
    array.sort((item1, item2) => {
        if (item1.element.innerText > item2.element.innerText){
            return 1;
        }else{
            return -1;
        }
    });
    // console.log(array);
}

// function testPromise(fileName){
//     return new Promise(async function (resolve, reject) {
//         let data = await fetch(baseUrl + fileName);
//         if (data.ok){
//             resolve((await data.text()).toString());
//         }else{
//             reject(data.status);
//         }
//     })
// }

// testPromise("archive.txt").then(resp => {
//     console.log(resp);
// });

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
            sorter(masterList);

            if (masterList.length > 0){
                document.querySelector('#placeH').remove();
            }

            let movieList = document.querySelector('.movies');
            for (let i in masterList){
                movieList.appendChild(masterList[i].element);
            }

            // Total Count
            let totCon = document.querySelector('#totalTitles')
            let p = document.createElement('p');
            let strong = document.createElement('strong');
            let sub = document.createElement('sub');
            
            p.setAttribute('id', 'total');
            p.setAttribute('tag', 'count');
            p.classList.add('sticky-bottom');
            sub.innerText = 'Total: ' + masterList.length;

            strong.appendChild(sub);
            p.appendChild(strong);
            totCon.appendChild(p);
            //-------------------------------------------------
        });
    });
}).catch(error => {
    document.querySelector('#placeH').remove();
    loading.innerHTML = 'OOPS! Something Went Wrong!<br><br>Nothing to see here';
    document.querySelector('.movies').appendChild(loading);
    document.querySelector('#search-box').setAttribute('disabled','disabled')
});

