$(document).ready((function(){function e(){$("#search-box").val(""),$("#search-box").focus(),$(".movies > p").remove(),$("#submit-reset").addClass("d-none"),$(".search").removeClass("reset-btn");for(let e of masterList)nestElem([$(".movies")[0],s(e).element]);t()}function t(){let e=$("#total").find("sub"),t=$(".tab.active").attr("tag"),n="",o=0;n="all"==t?$("p.title"):$('p[tag="'+t+'"]');for(let e of n)$(e).hasClass("d-none")||o++;$(e).text("Total: "+o)}function n(){$("html").animate({scrollTop:0},"fast"),$(".md-modal").removeClass("dnone"),$("html").attr("style","overflow: hidden;")}function o(){$(".md-modal").addClass("dnone"),$("html").removeAttr("style")}function s(e){let t=$(".active").attr("tag");return"all"!=t&&t!=e.tag?$(e.element).addClass("dnone"):$(e.element).removeAttr("class"),e}createMovieList();let l=document.referrer;$("#search-box").val(""),l.includes("toolBox.html")&&$("#toolBox").removeClass("d-none"),$("#submit-search").click((function(){$("#search-box").val()||alert("Please enter a title to search.")})),$("#submit-reset").click((function(){e()})),$("#search-box").on("input",(function(){!function(l){"random select"==l?n():"goodbye"==l&&o();let a=!1;if($(".notFound")&&$(".notFound").remove(),""==l||null==l)e();else{let e=masterList;$(".movies > div").remove();for(let t of e)t.element.querySelector("p.title").innerText.toLowerCase().includes(l.toLowerCase())&&(nestElem([$(".movies")[0],s(t).element]),a=!0);a||nestElem([$(".movies")[0],mkP({class:"notFound",inner:"Sorry!<br/>Nothing was found that matched your keyword(s).<br/>Send me a request and I will see what I can do."})]),$("#submit-reset").removeClass("d-none"),$(".search").addClass("reset-btn"),t()}}($("#search-box").val())})),$(document).on("mouseenter",".movies > div",(function(){$(this).addClass("highlight");let e=$(".tab.active").attr("tag"),t=nestElem([mkDiv({id:"moreInfo"}),mkLnk({class:"button is-ghost is-responsive",id:"getInfo",inner:"More Information"})]),n=$(this).find("p.title").attr("tag");switch(($("#moreInfo")||$("#location"))&&($("#moreInfo").remove(),$("#location").remove()),n){case"mov":"all"==e&&nestElem([$(this).find("p.title")[0],mkSpan({id:"location",inner:" - Active Movie"})]),nestElem([$(this)[0],t]);break;case"tv":"all"==e&&nestElem([$(this).find("p.title")[0],mkSpan({id:"location",inner:" - TV Show"})]);break;case"arch":"all"==e&&nestElem([$(this).find("p.title")[0],mkSpan({id:"location",inner:" - Archived Movie"})]),nestElem([$(this)[0],t]);break}$("#getInfo").click((function(){let e=$($(this).parents()[1]).find("p.title"),t=$(e).attr("data-title"),n=$(e).attr("data-year"),o=$(e).attr("tag");nestElem([$("body")[0],mkDiv({class:"md-modal",id:"info"}),mkDiv({class:"md-modal-content md-modal-large"}),{1:mkBtn({class:"button close-btn sticky-top",title:"Close"}),2:nestElem([mkDiv({class:"card"}),{1:nestElem([mkDiv({class:"card-header"}),mkDiv({class:"card-header-title",inner:t+(n?" - ("+n+")":"")+("arch"===o?'<span style="margin-left: auto;color: red"><sub>Archived</sub></span>':"")})]),2:nestElem([mkDiv({class:"card-content"}),mkDiv({class:"content"}),mkP({inner:"Loading...",id:"load"})])}])}]),getMovieInfo(t,n).then((e=>{$($("#load").parents()[1]).remove(),e.Plot&&"N/A"!=e.Plot?(nestElem([$("#info .card")[0],{1:nestElem([mkDiv({class:"card-content"}),{1:nestElem([mkDiv({class:"card-image",style:"float:left"}),mkElem({elemType:"figure",class:"media-left"}),mkElem({elemType:"img",src:e.Poster,alt:'Movie poster for "'+e.Title+'" was not found',class:"has-ratio"})]),2:nestElem([mkDiv({class:"content"}),{1:nestElem([mkP(),mkElem({elemType:"sub",inner:`Staring: ${e.Actors}`})]),2:mkP({inner:e.Plot})}])}]),2:nestElem([mkDiv({class:"card-footer"}),mkP({id:"ratings"})])}]),e.Ratings.length&&e.Ratings.forEach((e=>{nestElem([$("#ratings")[0],mkElem({elemType:"span",inner:`${"Internet Movie Database"===e.Source?"IMDb":e.Source} - ${e.Value}`})])}))):nestElem([$("#info .card")[0],mkDiv({class:"card-content"}),mkDiv({class:"content"}),mkP({inner:"Sorry, no content was found at this time."})])})).catch((e=>{})),$("#info > div > .close-btn").click((function(){$("#info").remove()}))}))})),$(document).on("mouseleave","div.highlight",(function(){$(this).removeAttr("class"),$(this).find("#location").remove(),$(this).find("#moreInfo").remove()})),$(".tab").click((function(){$("#empty").remove(),$(this).parent().find(".active").removeClass("active"),$(this).addClass("active");let e=$(".movies > div");for(let t=0;t<e.length;t++){let n=$(e[t]).find("p.title").attr("tag");s({element:e[t],tag:n})}!function(){let e=$(".movies > div"),t=!0;for(let n of e)if(!$(n).hasClass("dnone")){t=!1;break}t&&0===$(".notFound").length&&nestElem([$(".movies")[0],mkP({id:"empty",inner:"No Filtered Results",style:"text-align: center;"})])}(),t()})),$("#rand").click((function(){let e=masterList,n=$(".tab.active").attr("tag"),l=[],a=$("#num").val();a||(a=5),($(".notFound")||$("#empty"))&&($(".notFound").remove(),$("#empty").remove()),$(".movies > div").remove();for(let t=0;t<a;t++){let o=Math.floor(Math.random()*(e.length-1));if("all"==n)nestElem([$(".movies")[0],s(e[o]).element]);else if(e[o].tag==n){if(l.includes(e[o].element)){t--;continue}nestElem([$(".movies")[0],s(e[o]).element]),l.push(e[o].element)}else t--}$("#submit-reset").removeClass("d-none"),o(),t()})),$("#num").on("change",(function(){$("#selected").text($("#num").val())})),$("#num").keydown((function(e){e.preventDefault()})),$("html").keydown((function(t){"27"==t.which&&e()})),$(".md-modal-background").click((function(){o()})),$(".rando > button").click((function(){n()}))}));