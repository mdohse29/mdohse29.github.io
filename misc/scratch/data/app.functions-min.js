$(document).ready((function(){let e=document.referrer;new Date;function t(){$("#TextArea").off("paste",d),$("#exspc").off("click"),o({timeOut:1500}),$("#stop").addClass("dnone"),$("#start").removeClass("dnone"),$("#exspc").addClass("dnone"),$("#ff").addClass("dnone"),$("#rmv-ol").addClass("dnone"),$(".switch-container#flat").addClass("dnone"),$(".switch-container#dbl").addClass("dnone")}function l(){$("#TextArea").on("paste",d),$("#exspc").click(i),o({timeOut:1500}),$("#start").addClass("dnone"),$("#stop").removeClass("dnone"),$("#exspc").removeClass("dnone"),$("#ff").removeClass("dnone"),$("#rmv-ol").removeClass("dnone"),$(".switch-container#flat").removeClass("dnone"),$(".switch-container#dbl").removeClass("dnone")}function n(){$(".md-modal").addClass("dnone").removeAttr("style"),$(".md-modal-background").removeClass("dnone"),$(".md-modal-content").hasClass("dnone")?($(".md-modal-content, .md-modal-header, .md-modal-footer").removeClass("dnone"),$(".spinner-background").remove()):($(".md-modal-content").removeAttr("style"),$(".static, .md-modal-header, .md-modal-footer").removeClass("dnone"),$("#temp").remove()),$("#TextArea").focus()}function o(e={}){let t=$("textarea").prop("scrollWidth"),a=$("textarea").prop("scrollHeight"),l=$("textarea").position();$(".md-modal").attr("style","width: "+t+"px; height: "+a+"px; top: "+l.top+"px; left: "+l.left+"px;"),$(".md-modal-background").addClass("dnone"),e.text?($(".static, .md-modal-header, .md-modal-footer").addClass("dnone"),$(".md-modal-content").attr("style","overflow: hidden;"),$("#temp")&&$("#temp").remove(),$(".md-modal-content").append(mkP({id:"temp",inner:e.text,class:e.class?e.class:""})),e.timeOut||$(".md-modal-background").removeClass("dnone")):($(".md-modal-content, .md-modal-header, .md-modal-footer").addClass("dnone"),$(".spinner-background")&&$(".spinner-background").remove(),$(".md-modal").append(crtSpin())),$(".md-modal").removeClass("dnone"),e.timeOut&&setTimeout((()=>{n()}),e.timeOut)}function s(){$("#search").val(""),$("#replace").val(""),$("#word").prop("checked",!1),$(".search-replace").addClass("dnone"),$(".search-replace").removeAttr("style"),$("textarea").focus()}function r(e){"Admin"==e&&0===$(".spclFtr").length?($("body").prepend(crtad()),$("#sandr").click((function(){$(".search-replace").removeClass("dnone");let e=$("#TextArea").position(),t=$("#TextArea").prop("scrollWidth")/2,a=$("#TextArea").prop("scrollHeight")/2,l=$(".search-replace").prop("scrollWidth")/2,n=$(".search-replace").prop("scrollHeight")/2,o=e.top+(a-n),s=e.left+(t-l);$(".search-replace").attr("style","top: "+o+"px; left: "+s+"px;"),$("#search").focus()})),$("#rep").click((function(){let e=$("#TextArea").val(),t=$("#search").val(),a=$("#replace").val();if($("#word").is(":checked")){let l=function(e){let t=new RegExp("([^A-Za-z0-9 \\w])","g");if(e.match(t)){let a=e.replace(t,"\\$1");a=a.replaceAll("_","\\_");let l=new RegExp("\\b"+a+"\\b","g"),n=new RegExp("\\b"+a+"\\B","g"),o=new RegExp("\\B"+a+"\\b","g"),s=new RegExp("\\B"+a+"\\B","g");if(e.match(l))return"\\b"+a+"\\b";if(e.match(n))return"\\b"+a+"\\B";if(e.match(o))return"\\B"+a+"\\b";if(e.match(s))return"\\B"+a+"\\B"}return"\\b"+e+"\\b"}(t);e=e.replaceAll(new RegExp(l,"gm"),a)}else e=e.replaceAll(t,a);$("#TextArea").val(e)})),$("#stop").click(t),$("#start").click(l),$("#ad-close").click((function(){r("goodbye")})),$("#search-close").click(s)):"goodbye"==e&&($(".spclFtr").remove(),$("#toolBox").remove())}function c(e){navigator.clipboard.writeText(e.trim())}function i(){let e=/^\s*[^\S]/g,t=$("#TextArea").val().split("\n");for(let a in t)t[a]=t[a].replaceAll(e,"");c(t.join("\n")),$("#TextArea").val(t.join("\n").trim()),o({text:"Done!",timeOut:750})}function d(){o(),setTimeout((function(){let e=!1,t=$("#TextArea").val();(t.includes("/>")||t.includes("</"))&&alert("HTML MARKERS HAVE BEEN DETECTED\n\nDOUBLE CHECK THE DOCUMENT FOR UNUSUAL FORMATTING");let l=/^[o]\b\s/gm;if(t.match(l)&&(t=t.replaceAll(l,""),e=!0),l=/^[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s|^\s*[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s/gm,t.match(l)&&(t=t.replaceAll(l,""),e=!0),l=/[“”]/gm,t.match(l)&&(t=t.replaceAll(l,'"'),e=!0),l=/[\‘\ߵ\’]/gm,t.match(l)&&(t=t.replaceAll(l,"'"),e=!0),l=/^\s*\n/gm,t.match(l)&&(t=t.replaceAll(l,""),e=!0),$("#flat .toggle-cont").hasClass("tg-on")){let e=t.split("\n");for(a=0;a<e.length;a++)a>0?t+=" "+e[a]:t=e[a];$(".toggle-pill").click()}if(l=/(\S)\s{2,}(\S)/gm,t.match(l)){let a=t.split("\n");for(let e=0;e<a.length;e++)a[e]=a[e].replaceAll(l,"$1 $2");t=a.join("\n"),e=!0}l=/[​]/gm,t.match(l)&&(t=t.replaceAll(l,""),e=!0),$("#dbl .toggle-cont").hasClass("tg-on")&&(t=t.replaceAll("\n","\n\n"),$("#dbl .toggle-pill").click()),"\n"==t.substring(t.length-1)&&(t=t.substring(0,t.length-1)),c(t),$("#TextArea").val(t.trim()),n()}),700)}$("body").prepend(nestElem([mkDiv({class:"presentation my-3 mx-2"}),mkDiv({id:"TextAreaContain"}),{1:nestElem([mkDiv({class:"options mb-2"}),{1:mkInp({type:"select",id:"color",name:"color",class:"form-select-sm",options:[{value:"dark",isColor:!0},{value:"green",isColor:!0},{value:"lavender",isColor:!0},{value:"blue",isColor:!0},{value:"white",isColor:!0},{value:"yellow",isColor:!0}]}),2:mkBtn({class:"btn btn-primary btn-sm ms-1 usr-btn btn-shadow",id:"exspc",inner:"Remove Leading Spaces",title:"The empty space in front of the paragraphs"}),3:mkBtn({class:"btn btn-primary btn-sm ms-1 usr-btn btn-shadow",id:"rmv-ol",inner:"Remove OL Markers",title:"Remove numbered OL markers"}),4:mkBtn({class:"btn btn-primary btn-sm ms-1 usr-btn btn-shadow",id:"ff",inner:"Format Filename",title:"Formats file names by lowercasing the text and adding underscores to replace spaces.",listeners:[{type:"click",execute:function(){let e=$("#TextArea").val();$("#TextArea").val(function(e){let t=[],a=e.split("\n"),l=/^(.*?)\s{1,}(\.(?:mp4|\w{3,4}))$/;for(let e of a)e.match(l)&&(e=e.replace(l,"$1$2")),t.push(e.toLowerCase().trim().replaceAll(/[ -]/g,"_").replaceAll(/_{2,}/g,"_").replace(/_(\..*?)$/,"$1"));return t.join("\n")}(e))}}]}),5:mkBtn({class:"btn btn-primary btn-sm ms-1 usr-btn btn-shadow",id:"clear",inner:"Clear",title:"Clear scratch pad"}),6:createToggle({id:"flat",label:"Flatten Text",title:"Convert multiple lines of text into a single line. Check 'How This Works' info button for example."}),7:createToggle({id:"dbl",label:"Paragraph Spacing",title:"Adds space between lines. Click Info button for more info",isLocked:"false"}),8:mkLnk({class:"btn btn-sml ms-1",title:"Click to report an issue or suggestion.",href:"mailto:aaaabncggffyesoyicuhyz3u7u@imaginelearning.org.slack.com",inner:'<img width="32" height="32" src="./data/Web/bug.png" alt="bug"/>'}),9:mkBtn({class:"btn btn-sm ms-1",id:"info",inner:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>',title:"How this works"})}]),2:mkElem({elemType:"textarea",name:"scratchPad",class:"dark",id:"TextArea",encoding:"UTF-8"})}])),$(".options > button").mousedown((function(){$(this).attr("id").includes("info")||$(this).removeClass("btn-shadow")})),$(".options > button").mouseup((function(){$(this).attr("id").includes("info")||$(this).addClass("btn-shadow")})),$("#exspc").click(i),$("#info").click((function(){$("body > .md-modal").removeClass("dnone"),$("body").attr("style","overflow: hidden;")})),$("#info-close").click((function(){$(".info-popup").addClass("dnone")})),$("#clear").click((function(){$("#TextArea").val(""),$("#TextArea").focus()})),$("#rmv-ol").click((async function(){let e=await function(e){let t=[/^[ \t]*[A-Z]{1,4}[).][ \t]*\b/gm,/^[ \t]*[a-z]{1,4}[).][ \t]*\b/gm,/^[ \t]*[0-9]{1,4}[).][ \t]*\b/gm],a=e;for(let e in t)a.match(t[e])&&(a=a.replaceAll(new RegExp(t[e]),""));return o({text:"Done!",timeOut:750}),a}($("#TextArea").val());c(e),$("#TextArea").val(e)})),$("#TextArea").on("input",(function(){r($("#TextArea").val())})),$("#TextArea").on("paste",d),$(".md-modal-background").click(n),$("#color").on("input",(function(){let e=$(this).val(),t=$("textarea"),a=t.attr("class");t.removeClass(a),t.addClass(e),t.focus()})),$("#ex").click((function(){let e=$("textarea").val();e=e.replaceAll(/((?:algebraOne|algebraone))/gm,"$1_ex"),e=e.replaceAll(".html","_ex.html");let t=e.split("\n");t.length>1&&(t[0].toLowerCase()===t[1].toLowerCase()?o({text:"The URLs Match!",timeOut:700}):(o({text:"The URL's are not a match",timeOut:1500}),e="")),$("textarea").val(e),$("textarea").focus()})),$(".toggle-cont, .switch-container > label").click((function(){!function(e){let t=$(e).parents(".switch-container"),a=$(t).attr("isLocked"),l=$(t).find("#lock");0==l.length&&"true"==a?$(t).find(".switch").append(nestElem([mkElem({elemType:"span",id:"lock"}),mkElem({elemType:"img",src:"./data/Web/lock.png",alt:"LOCK",width:"16px",height:"16px"})])):l.length>0&&"false"==a&&$("#lock").remove()}($(this)),$("textarea").focus()})),e.includes("toolBox")&&r("Admin")}));