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

// let test = mkBtn({inner:'Testing', listeners:[
//     {
//         type:'click',
//         execute: async function(){
//             let joke = await getRandomJoke();
//             console.log(joke);
//             console.log(joke.setup);
//         }
//     },
//     {
//         type:'mouseenter',
//         execute: function(){
//             this.title = 'Howdy';
//         }
//     },
//     {
//         type:'mouseleave',
//         execute: function(){
//             this.title = '';
//         }
//     },
//     {
//         type:'click',
//         execute: function(){
//             window.alert('check');
//         }
//     }
// ]});

// document.body.append(test);

// let test2 = [
//     {
//         p:'test1',
//         attr: {
//             class:'button'
//         }
//     },
//     {
//         p:'test2'
//     },
//     {
//         h1:'test3'
//     }
// ]

// // let testContainer = nestElem([
// //     mkDiv({class:'testing'}),
// //     test2.map(t => {
// //         let settings = [];
// //         if (t.attr != undefined){
// //             settings = t.attr;
// //             delete t.attr;
// //         }
// //         let key = Object.keys(t)[0];
// //         return mkElem({elemType:key, inner:t[key], ...settings});
// //     })
// // ]);
// let testContainer = nestElem([
//     nestElem([
//         mkDiv({class:'testing'}),
//         test2.map(t => {
//             let settings = [];
//             if (t.attr != undefined){
//                 settings = t.attr;
//                 delete t.attr;
//             }
//             let key = Object.keys(t)[0];
//             return mkElem({elemType:key, inner:t[key], ...settings});
//         })
//     ]),
//     mkElem({elemType:'hr'})
// ])
// console.log(Array.isArray(test2[0]))
// document.body.append(testContainer)

document.querySelector('button').addEventListener('click', function(){
    this.innerText = (this.innerText === 'Play') ? 'Pause':'Play';
    
    document.querySelectorAll('.ball').forEach(ball => {
        let style = window.getComputedStyle(document.querySelector(`#${ball.id}`));
        ball.style = `left: ${style.left}; bottom: ${style.bottom};`
        ball.classList.toggle(`${ball.id}-right`);
    });
})