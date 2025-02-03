let masterList = [];
// const baseUrl = './data/';
const baseUrl = 'https://mdohse29.github.io/misc/movieList/data/'
const infoUrl = 'https://www.omdbapi.com/?apikey=c8757c03'

let loading = mkP({id:'placeH', inner:'Loading...'});

nestElem([
    document.querySelector('.movies'),
    loading
])

const formatter = function (text){
    let format = text.replaceAll('.', ' ');
    format = format.replace(/(\(\d\d\d\d\)).*/g, '$1');
    format = format.replace(/ \[(\d\d\d\d)\].*/g, ' ($1)');
    format = format.replace(/\[(\d\d\d\d)\].*/g, ' ($1)');
    if (!format.match(/\(\d\d\d\d\)/)){
        format = format.replace(/ (\b\d\d\d\d\b).*/, ' ($1)');
    }
    
    return format;
}

function collectList(movies, tag){
    let collection = [];
    for (let movie in movies){
        let formatted = formatter(movies[movie]);
        if (formatted){
            let hasYear = formatted.match(/\(\d\d\d\d\)/);
            let title = ((hasYear) ? formatted.replace(/ \(\d\d\d\d\)/, '') : formatted);
            let year = ((hasYear) ? formatted.replace(/.*\((\d\d\d\d)\)/, '$1') : '');

            collection.push(
                {
                    element: nestElem([
                            mkDiv(),
                            mkP({class:'title', 'data-year':((year) ? year : ''), 'data-title':title, tag:tag, inner:formatted})
                        ]),
                    tag: tag
                }
            );
            
        }else{

            movies.splice(movie,1);

        }
    }

    return collection;
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
}

async function getMovieInfo(title, year){
    const config = {headers: { Accept: 'application/json', 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': null }}

    title = title.toLowerCase().replaceAll(' ', '+');
    title = title.replaceAll('&', '%26');
    title = '&t=' + title;
    let info = await axios.get(infoUrl + title + ((year) ? '&y=' + year:''), config);
    return info.data;
}

async function createMovieList(){
    // Executes from archiveFunctions.js
    let arch, active, tv, tvArch;
    
    try{
        // Using AXIOS
        const config = {headers: { Accept: 'plain/text', 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': null }}
        arch = await axios.get(baseUrl + "archive.txt", config);
        active = await axios.get(baseUrl + "active.txt", config);
        tv = await axios.get(baseUrl + "tvshows.txt", config);
        tvArch = await axios.get(baseUrl + "tvarchshows.txt", config);
    
        masterList = masterList.concat(
            collectList(arch.data.split('\n'), 'arch'),
            collectList(active.data.split('\n'), 'mov'),
            collectList(tv.data.split('\n'), 'tv'),
            collectList(tvArch.data.split('\n'), 'tvarch')
        );

        sorter(masterList);

        if (masterList.length > 0){
            document.querySelector('#placeH').remove();
        }

        let movieList = document.querySelector('.movies');
        for (let i in masterList){
            nestElem([movieList, masterList[i].element]);
        }

                
        nestElem([document.querySelector('#totalTitles'),mkP({id:'total', tag:'count', class:'sticky-bottom'}), mkElem({elemType:'strong'}), mkElem({elemType:'sub', inner:'Total: ' + masterList.length})]);

    }catch(e){
        console.log(e.code, e.message, e.config);
        document.querySelector('#placeH').remove();
        loading.innerHTML = 'OOPS! Something Went Wrong!<br><br>Nothing to see here';
        nestElem([document.querySelector('.movies'),loading]);
        document.querySelector('#search-box').setAttribute('disabled','disabled');
        document.querySelector('.rando > button').setAttribute('disabled', 'disabled');
    }
}

