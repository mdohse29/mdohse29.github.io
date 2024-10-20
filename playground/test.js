// async function searchShows(title){
//     const searchApi = await fetch('https://api.tvmaze.com/search/shows?q=' + title);
//     const results = await searchApi.json();
//     const presentation = document.querySelector('.results');
//     for (let result of results){
//     console.log(result.show.name);
//     let p = document.createElement('p');
//     // p.innerText = result.show.name;
//     let src = result.show.image.medium;
//     if(src){
//     let img = document.createElement('img');
//     img.src = src;
//     p.appendChild(img);
//     }else{
//         p.innerText = result.show.name;
//     }
//     presentation.appendChild(p);
//     }
// }

// async function searchShows(title){
//     let options = {
//         params: {
//             q:title
//         }
//     }
//     await axios.get('https://api.tvmaze.com/search/shows', options).then(res => {
//         console.log(res.data);
//         const presentation = document.querySelector('.results');
//         for (let result of res.data){
//             console.log(result.show.name);
//             let p = document.createElement('p');
//             // p.innerText = result.show.name;
//             let src = result.show.image.medium;
//             if(src){
//                 let img = document.createElement('img');
//                 img.src = src;
//                 p.appendChild(img);
//             }else{
//                 p.innerText = result.show.name;
//             }
//             presentation.appendChild(p);
//         }
//     }).catch(err => {
//         console.log(err);
//     });
// }

// const search = document.querySelector('button');
// search.addEventListener('click', () => {
//     document.querySelector('.results').innerHTML = '';
//     let title = document.querySelector('#title').value;
//     if (title){
//         searchShows(title).then(() => {
//             console.log("ALL Done!");
//         });
//     }
// });

// let testArray = [
//     {
//         text: "Something",
//         tag: "tag"
//     },
//     {
//         text: "Anything else",
//         tag: "tag"
//     }
// ]

// function sorter(array){
    
//     console.log(array.sort((item1, item2) => {
//         if (item1.text > item2.text){
//             return 1;
//         }else{
//             return 0;
//         }
//     }));

// }

// sorter(testArray);

// console.log(fetch("https://www.idrive.com/idrive/sh/sh?k=l5d7d9n9h4"))
// let file = require('../misc/data/Aliens.Vs..Predator.Requiem.2007.720p.BluRay.x264.AAC-[YTS.MX].nfo');
// let xml = require('xml2js');
// let fs = require('fs');

// let file = fs.readFileSync('../misc/data/Aliens.Vs..Predator.Requiem.2007.720p.BluRay.x264.AAC-[YTS.MX].nfo', (error, data) => {
//     // console.log(data);
// })

// xml.parseString(file, (err, data) => {
//     console.log(data.movie.title[0]);
// })
let input = mkInp({type:'select', id: 'select', class: 'select', options:[{value: '1', inner:'Option 1'}, {value: '2', inner:'Option 2'}], label: 'Select Something'});
document.querySelector('body').append(input.label, input.input);