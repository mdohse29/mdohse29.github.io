let masterList=[];const baseUrl="https://mdohse29.github.io/misc/movieList/data/",infoUrl="https://www.omdbapi.com/?apikey=c8757c03";let loading=mkP({id:"placeH",inner:"Loading..."});document.querySelector(".movies").appendChild(loading);const formatter=function(e){let t=e.replaceAll("."," ");return t=t.replace(/(\(\d\d\d\d\)).*/g,"$1"),t=t.replace(/ \[(\d\d\d\d)\].*/g," ($1)"),t=t.replace(/\[(\d\d\d\d)\].*/g," ($1)"),t.match(/\(\d\d\d\d\)/)||(t=t.replace(/ (\b\d\d\d\d\b).*/," ($1)")),t};function collectList(e,t){let l=[];for(let a in e){let o=formatter(e[a]);if(o){let e=o.match(/\(\d\d\d\d\)/),a=e?o.replace(/ \(\d\d\d\d\)/,""):o,i=e?o.replace(/.*\((\d\d\d\d)\)/,"$1"):"";l.push({element:nestElem([mkDiv(),mkP({class:"title","data-year":i||"","data-title":a,tag:t,inner:o})]),tag:t})}else e.splice(a,1)}return l}function sorter(e){e.sort(((e,t)=>e.element.innerText>t.element.innerText?1:-1))}async function getMovieInfo(e,t){return e="&t="+(e=(e=e.toLowerCase().replaceAll(" ","+")).replaceAll("&","%26")),(await axios.get(infoUrl+e+(t?"&y="+t:""),{headers:{Accept:"application/json","Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":null}})).data}async function createMovieList(){let e,t,l;try{const a={headers:{Accept:"plain/text","Content-Type":"text/html","Access-Control-Allow-Origin":null}};e=await axios.get(baseUrl+"archive.txt",a),t=await axios.get(baseUrl+"active.txt",a),l=await axios.get(baseUrl+"tvshows.txt",a),masterList=masterList.concat(collectList(e.data.split("\n"),"arch"),collectList(t.data.split("\n"),"mov"),collectList(l.data.split("\n"),"tv")),sorter(masterList),masterList.length>0&&document.querySelector("#placeH").remove();let o=document.querySelector(".movies");for(let e in masterList)o.appendChild(masterList[e].element);document.querySelector("#totalTitles").appendChild(nestElem([mkP({id:"total",tag:"count",class:"sticky-bottom"}),mkElem({elemType:"strong"}),mkElem({elemType:"sub",inner:"Total: "+masterList.length})]))}catch(e){document.querySelector("#placeH").remove(),loading.innerHTML="OOPS! Something Went Wrong!<br><br>Nothing to see here",document.querySelector(".movies").appendChild(loading),document.querySelector("#search-box").setAttribute("disabled","disabled"),document.querySelector(".rando > button").setAttribute("disabled","disabled")}}