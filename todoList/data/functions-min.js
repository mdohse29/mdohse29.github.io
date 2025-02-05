let targetElement=null,errorTimeoutID=NaN,toID=NaN,listVar="default";const frameCheck=window.top===window.self;function dupeCheck(e){let t=document.querySelectorAll("#list > p");if(t){let i=null;if(targetElement&&(i=targetElement.getAttribute("pid")),!i||"listSubItem"!==targetElement.id&&"addSub"!==getActiveBtn().id)for(let i of t){if(getItemText(i).toLowerCase()===e.toLowerCase())return!0;if(i.children.length>1){let t=i.querySelectorAll("#listSubItem");for(let i of t)if(getItemText(i).toLowerCase()===e.toLowerCase())return!0}}else for(let s of t){if(getItemText(s).toLowerCase()===e.toLowerCase())return!0;if(s.getAttribute("pid")===i&&s.children.length>1){let t=s.querySelectorAll("#listSubItem");for(let i of t)if(getItemText(i).toLowerCase()===e.toLowerCase())return!0}}}return!1}function rmvTimeout(){errorTimeoutID&&(clearTimeout(errorTimeoutID),errorTimeoutID=NaN)}function errorMsg(e="Empty items or duplicate items are not accepted.<br>Check your entry and try again.",t="danger",i=5e3){let s=document.querySelector("article.message");rmvTimeout(),s&&s.remove(),document.querySelector(".card-header.main-bg").prepend(nestElem([mkElem({elemType:"article",class:`message is-small is-${t}`,listeners:[{type:"mouseenter",execute:manRmvMsg}]}),{1:nestElem([mkDiv({class:"message-header is-justify-content-end"}),mkBtn({class:"delete",listeners:[{type:"click",execute:removeMsg}]})]),2:nestElem([mkDiv({class:"message-body is-flex is-justify-content-center",style:"text-align: center;"}),mkP({inner:e})])}])),document.querySelector("#item").classList.add("is-danger"),errorTimeoutID=setTimeout(removeMsg,i)}function manRmvMsg(){rmvTimeout(),this.addEventListener("mouseleave",removeMsg)}function removeMsg(){let e=document.querySelector("article.message");e&&(rmvTimeout(),e.remove())}function getActiveBtn(){let e=document.querySelector(".listBtn").querySelectorAll("button");for(let t of e)if(!t.classList.contains("dnone"))return t}function resetListBtn(){document.querySelector("#item").classList.remove("is-danger"),removeMsg(),document.querySelectorAll(".listBtn button").forEach((e=>{"addItem"===e.id?e.classList.remove("dnone"):e.classList.add("dnone")}))}function moListItem(e){let t=e.target;"I"===t.tagName&&(t=t.parentElement),"listItem"===t.id?(document.querySelectorAll("i.has-background-item").forEach((e=>{e.classList.remove("has-background-item")})),t.children[0].classList.add("has-background-item")):"listSubItem"===t.id&&(document.querySelectorAll("span.has-background-item").forEach((e=>{e.classList.remove("has-background-item")})),t.classList.add("has-background-item"))}function mlLitsItem(){this.querySelector("i").classList.remove("has-background-item")}function mlSubItem(){this.classList.remove("has-background-item")}function clkListItem(e){resetListBtn(),document.querySelector("#item").value="",targetElement="I"===e.target.tagName?e.target.parentElement:e.target,openOptions(e)}function clkEdit(){let e=document.querySelector("#item"),t=targetElement.querySelector("i"),i=targetElement.querySelectorAll("#listSubItem"),s=getItemText(targetElement),l=e.value.trim();!l||dupeCheck(l)||l.includes(";")?(l?dupeCheck(l)?errorMsg("No Change Was Made!<br>Press ESC to clear,<br>or select another list item and select cancel."):l.includes(";")&&errorMsg('ERROR: Semi colons ";" are not allowed.'):errorMsg("Empty items are not accepted.<br>If you want to remove the item,<br>just click complete in the options."),e.value=s,e.focus()):(s=s.replace(s,l),s=s.replace(s.substring(0,1),s.substring(0,1).toUpperCase()),targetElement.innerText=s,targetElement.prepend(t),i.forEach((e=>{targetElement.appendChild(e)})),document.querySelector("#editItem").classList.add("dnone"),document.querySelector("#addItem").classList.remove("dnone"),e.value="",setCookie(),targetElement=null)}function clkUndoItem(){let e=targetElement,t="listSubItem"===e.id;if(dupeCheck(e.innerText))errorMsg("A duplicate item is detected in the current list.<br>Undo was not successful!"),e.style.border="2px solid red",setTimeout((()=>{e.removeAttribute("style")}),1500);else if(t){let t=document.querySelector('#list p[pid="'+e.getAttribute("pid")+'"]');t?(setAllCaret(e),e.classList.remove("has-background-item"),e.removeEventListener("click",clkListItem),changeTitle(e),t.appendChild(e),setCookie()):(targetElement=null,dupeCheck(e.innerText)?(errorMsg("A duplicate item is detected in the current list.<br>Undo was not successful!"),e.style.border="2px solid red",setTimeout((()=>{e.removeAttribute("style")}),1500)):(setAllCaret(e),e.classList.remove("has-background-item"),e.removeEventListener("click",clkListItem),changeTitle(e),e.remove(),document.querySelector("#list").prepend(createItem(e.innerText)),setCookie()))}else{let t=e.querySelectorAll("i");e.querySelectorAll("#listSubItem").forEach((e=>{changeTitle(e)})),t.forEach((e=>{e.classList.remove("has-background-item"),e.parentElement.classList.remove("has-background-item")})),setAllCaret(e),e.remove(),e.removeEventListener("click",clkUndoItem),e.addEventListener("click",clkListItem),changeTitle(e),document.querySelector("#list").prepend(e),setCookie()}closeOptions();let i=document.querySelector("#done");i&&0===i.querySelectorAll("#listItem, #listSubItem").length&&i.remove(),targetElement=null}function clkCopyItem(){navigator.clipboard.writeText(getItemText(targetElement)),closeOptions(),targetElement=null}function toggleLstBtn(e){let t=e.target;"I"===t.tagName&&(t=t.parentElement),closeOptions(),"edit"===t.id?(document.querySelector("#item").value=getItemText(targetElement),document.querySelector("#editItem").classList.remove("dnone"),document.querySelector("#addSub").classList.add("dnone")):"crtSub"===t.id&&(document.querySelector("#addSub").classList.remove("dnone"),document.querySelector("#editItem").classList.add("dnone")),document.querySelector("#addItem").classList.add("dnone"),document.querySelector("#item").focus()}function changeTitle(e){e.title.includes("Click to Undo")?e.title="Click for Options":e.title="Click to Undo"}function getItemText(e){return"listItem"===e.id&&e.innerText.includes("\n")?e.innerText.substring(0,e.innerText.indexOf("\n")):e.innerText}function setAllCaret(e){e.querySelectorAll("i").forEach((e=>{e.classList.replace("bi-check-circle-fill","listSubItem"===e.parentElement.id?"bi-caret-right":"bi-caret-right-fill"),e.classList.remove("has-text-success")}))}function setAllCheck(e,t=!1){e.querySelectorAll("i").forEach((e=>{e.classList.replace("listSubItem"===e.parentElement.id?"bi-caret-right":"bi-caret-right-fill","bi-check-circle-fill"),t?e.classList.remove("has-text-success"):e.classList.add("has-text-success")}))}function createItem(e,t={isSub:!1,pid:NaN}){let i=mkElem({elemType:t.isSub?"span":"p",class:t.isSub?"":"mb-2",title:"Click for Options",id:t.isSub?"listSubItem":"listItem",pid:t.isSub?t.pid:crypto.randomUUID(),inner:e.toLowerCase().includes("http")?e.toLowerCase():e.substring(0,1).toUpperCase()+e.substring(1),listeners:t.isSub?[{type:"mouseleave",execute:mlSubItem}]:[{type:"mouseover",execute:moListItem},{type:"mouseleave",execute:mlLitsItem},{type:"click",execute:clkListItem}]});return i.prepend(mkElem({elemType:"i",class:"bi "+(t.isSub?"bi-caret-right":"bi-caret-right-fill")})),i}function doneContainer(){return nestElem([mkDiv({class:"card-content pt-0",id:"done"}),{1:mkElem({elemType:"h4",class:"h4",inner:'<i class="bi bi-check-circle-fill has-text-success"></i>Done!'}),2:mkP({id:"doneSubs"})}])}function moveElement(e){if("listItem"===e.id){let t=document.querySelectorAll("#doneSubs #listSubItem"),i=e.querySelectorAll("#listSubItem");i.length&&i.forEach((e=>{changeTitle(e),setAllCheck(e,!0)})),e.querySelector("i").classList.remove("has-background-item","has-text-success"),t.length&&t.forEach((t=>{t.getAttribute("pid")===e.getAttribute("pid")&&(t.removeEventListener("click",clkListItem),t.remove(),e.appendChild(t))})),changeTitle(e),document.querySelector("#done").appendChild(e)}else changeTitle(e),e.querySelector("i").classList.remove("has-text-success"),e.addEventListener("click",clkListItem),document.querySelector("#doneSubs").appendChild(e)}function removeItem(e){"I"===e.tagName&&(e=e.parentElement),setAllCheck(e),setTimeout((()=>{document.querySelector("#done")||document.querySelector("#list-container").appendChild(doneContainer()),e.remove(),moveElement(e),setCookie()}),1e3)}function getCookie(e){if(e&&(listVar=e),frameCheck){let e=document.cookie;e=e.split("; ");for(let t in e){let i=e[t].split("=");if(i[0]===listVar)return i[1]}}}function setCookie(e){if(frameCheck){let t=document.querySelector("#list").querySelectorAll("#listItem"),i="";t.forEach((e=>{i+=e.innerText.replaceAll("\n","|")+","})),i?(document.cookie=`${e||listVar}=${i.substring(0,i.length-1)}; max-age=31536000; samesite=none; secure`,document.cookie.length>3e3&&errorMsg("Please start completing items on the list.<br><br>There is < 1000 bytes of storage left.")):document.cookie=listVar+"=; max-age=0; samesite=none; secure"}}function optMo(e){let t=e.target.getAttribute("aria-description");e.target.parentElement.appendChild(mkElem({elemType:"span",class:"btn-popover",inner:t}))}function optMl(e){e.target.parentElement.querySelector("span").remove()}function closeOptions(){let e=document.querySelector(".options");e&&(e.classList.add("fade-out"),toID&&(clearTimeout(toID),toID=NaN),toID=setTimeout((function(){e.remove()}),350))}function openOptions(e){document.querySelector(".options")&&closeOptions();const t={b1:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-success is-outlined","aria-description":"Mark Item Complete",id:"tadone",inner:'<i class="bi bi-check-circle"></i>',listeners:[{type:"click",execute:complete},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b2:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-link is-outlined","aria-description":"Create Sub-List Item",id:"crtSub",inner:'<i class="bi bi-plus-circle-dotted"></i>',listeners:[{type:"click",execute:toggleLstBtn},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b3:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-warning is-outlined","aria-description":"Edit List Item",id:"edit",inner:'<i class="bi bi-pencil"></i>',listeners:[{type:"click",execute:toggleLstBtn},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b4:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-info is-outlined","aria-description":"Copy Item",id:"copy",inner:'<i class="bi bi-copy"></i>',listeners:[{type:"click",execute:clkCopyItem},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b5:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-warning is-outlined","aria-description":"Restore List Item",id:"undo",inner:'<i class="bi bi-arrow-counterclockwise"></i>',listeners:[{type:"click",execute:clkUndoItem},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b6:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-danger is-outlined","aria-description":"Close Options",id:"cancel",inner:'<i class="bi bi-x-circle"></i>',listeners:[{type:"click",execute:()=>{closeOptions(),targetElement=null}},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]})};nestElem([document.querySelector(".card"),mkDiv({class:"options",style:"top: "+(e.y-30)+"px; left: "+(e.x-27)+"px;",listeners:[{type:"mouseleave",execute:()=>{closeOptions(),targetElement=null}}]}),mkDiv({class:"card"}),mkDiv({class:"card-content p-0"}),"done"===targetElement.parentElement.id||"done"===targetElement.parentElement.parentElement.id?[t.b5,t.b6]:"listSubItem"===targetElement.id?[t.b1,t.b3,t.b4,t.b6]:[t.b1,t.b2,t.b3,t.b4,t.b6]])}function addItem(){let e=document.querySelector("#item"),t=e.value,i=document.querySelector("#list");const s=/[;]/g;t&&!t.match(s)?"addSub"===this.id&&targetElement?t.split(",").forEach((e=>{dupeCheck(e.trim())||(targetElement.append(createItem(e.trim(),{isSub:!0,pid:targetElement.getAttribute("pid")})),setCookie())})):t.split(",").reverse().forEach((e=>{dupeCheck(e.trim())||(i.prepend(createItem(e.trim())),setCookie())})):t.match(s)?errorMsg('ERROR: Semi colons ";" are not allowed.'):errorMsg("No value was entered, so no item was created.","info"),e.value="",e.focus(),e.classList.contains("is-danger")||(resetListBtn(),targetElement=null)}function listToString(){let e=document.querySelector("#list").querySelectorAll("p"),t="";return e.forEach((e=>{t+=e.innerText.replaceAll("\n","|")+","})),t}function inputActions(){if(removeMsg(),this.classList.remove("is-danger"),":export"===this.value){let e=listToString();if(e){navigator.clipboard.writeText(e.substring(0,e.length-1));let t=getActiveBtn();t.setAttribute("disabled","disabled"),this.classList.add("is-success"),this.value="Exported to Clipboard!",setTimeout((()=>{this.value="",this.classList.remove("is-success"),t.removeAttribute("disabled")}),1e3)}else errorMsg("Nothing to Export!","info",2e3),this.value=""}else if(":list"===this.value){let e=document.cookie.split("; "),t=!0,i=nestElem([mkElem({elemType:"article",id:"cookieList",class:"message is-small is-info"}),{1:nestElem([mkDiv({class:"message-header is-justify-content-end"}),mkBtn({class:"delete",listeners:[{type:"click",execute:removeMsg}]})]),2:nestElem([mkDiv({class:"message-body is-flex is-flex-direction-column is-align-content-center",id:"info",style:"text-align: center;"}),mkP({inner:"Current Saved Lists",style:"font-weight: bold;text-decoration: underline;"})])}]);document.body.prepend(i),e.forEach((e=>{let i=e.split("=")[0];i&&(document.querySelector("#info").append(mkP({inner:listVar===i?`<span style="color:red;">*</span> ${i} <span style="color:red;">*</span>`:i})),t=!1)})),t&&(document.querySelector(".message-body").append(mkP({class:"has-text-danger",inner:"No saved lists were found"})),rmvTimeout(),errorTimeoutID=setTimeout(removeMsg,2e3)),this.value=""}}function inputKeyActions(e){if(13===e.keyCode)if(this.value.match(/^:[a-z]*:.*/)){let e=this.value.split(":");switch(e.shift(),e[0]){case"save":setCookie(e[1]),clearList(),setCookie();break;case"load":clearList(),loadList(getCookie(e[1]));break}this.value=""}else{document.querySelectorAll(".listBtn button").forEach((e=>{e.classList.contains("dnone")||e.click()}))}else 27===e.keyCode&&(document.querySelector("#item").value="",document.querySelector("#item").classList.remove("is-danger"),removeMsg(),resetListBtn())}function complete(){closeOptions(),removeItem(targetElement),targetElement=null}function clearList(){document.querySelectorAll("#listItem").forEach((e=>{e.remove()})),document.getElementById("done")&&document.getElementById("done").remove()}function loadList(e){e&&(e=e.split(",")).forEach((e=>{if(e.includes("|")){let t=e.slice(e.indexOf("|")+1).split("|"),i=createItem(e.substring(0,e.indexOf("|")));t.forEach((e=>{i.appendChild(createItem(e,{isSub:!0,pid:i.getAttribute("pid")}))})),document.querySelector("#list").appendChild(i)}else document.querySelector("#list").appendChild(createItem(e))}))}window.onload=function(){loadList(getCookie()),frameCheck&&document.querySelector("#item").focus()};