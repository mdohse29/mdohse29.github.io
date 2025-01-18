let targetElement=null,errorTimeoutID=NaN;const frameCheck=window.top===window.self;function dupeCheck(e){let t=document.querySelectorAll("#list > p");if(t){let i=null;if(targetElement&&(i=targetElement.getAttribute("pid")),!i||"listSubItem"!==targetElement.id&&"addSub"!==getActiveBtn().id)for(let i of t){if(getItemText(i).toLowerCase()===e.toLowerCase())return!0;if(i.children.length>1){let t=i.querySelectorAll("#listSubItem");for(let i of t)if(getItemText(i).toLowerCase()===e.toLowerCase())return!0}}else for(let s of t){if(getItemText(s).toLowerCase()===e.toLowerCase())return!0;if(s.getAttribute("pid")===i&&s.children.length>1){let t=s.querySelectorAll("#listSubItem");for(let i of t)if(getItemText(i).toLowerCase()===e.toLowerCase())return!0}}}return!1}function rmvTimeout(){errorTimeoutID&&(clearTimeout(errorTimeoutID),errorTimeoutID=NaN)}function errorMsg(e="Empty items or duplicate items are not accepted.<br>Check your entry and try again."){let t=document.querySelector("article.is-danger");rmvTimeout(),t&&t.remove(),document.querySelector(".card-header.main-bg").prepend(nestElem([mkElem({elemType:"article",class:"message is-small is-danger",listeners:[{type:"mouseenter",execute:manRmvMsg}]}),{1:nestElem([mkDiv({class:"message-header is-justify-content-end"}),mkBtn({class:"delete",listeners:[{type:"click",execute:removeMsg}]})]),2:nestElem([mkDiv({class:"message-body is-flex is-justify-content-center",style:"text-align: center;"}),mkP({inner:e})])}])),document.querySelector("#item").classList.add("is-danger"),errorTimeoutID=setTimeout(removeMsg,5e3)}function manRmvMsg(){rmvTimeout(),this.addEventListener("mouseleave",removeMsg)}function removeMsg(){let e=document.querySelector("article.is-danger");e&&(rmvTimeout(),e.remove())}function getActiveBtn(){let e=document.querySelector(".listBtn").querySelectorAll("button");for(let t of e)if(!t.classList.contains("dnone"))return t}function resetListBtn(){document.querySelector("#item").classList.remove("is-danger"),removeMsg(),document.querySelectorAll(".listBtn button").forEach((e=>{"addItem"===e.id?e.classList.remove("dnone"):e.classList.add("dnone")}))}function moListItem(){let e=document.querySelectorAll("i.has-background-item");e&&e.forEach((e=>{e.classList.remove("has-background-item")})),this.querySelector("i").classList.add("has-background-item")}function moSubItem(){let e=document.querySelectorAll("span.has-background-item");e&&e.forEach((e=>{e.classList.remove("has-background-item")})),this.classList.add("has-background-item")}function mlLitsItem(){this.querySelector("i").classList.remove("has-background-item")}function mlSubItem(){this.classList.remove("has-background-item")}function clkListItem(e){resetListBtn(),document.querySelector("#item").value="",targetElement="I"===e.target.tagName?e.target.parentElement:e.target,openOptions(e)}function clkEdit(){let e=document.querySelector("#item"),t=targetElement.querySelector("i"),i=targetElement.querySelectorAll("#listSubItem"),s=getItemText(targetElement),r=e.value.trim();r&&!dupeCheck(r)?(s=s.replace(s,r),s=s.replace(s.substring(0,1),s.substring(0,1).toUpperCase()),targetElement.innerText=s,targetElement.prepend(t),i.forEach((e=>{targetElement.appendChild(e)})),document.querySelector("#editItem").classList.add("dnone"),document.querySelector("#addItem").classList.remove("dnone"),e.value="",setCookie(),targetElement=null):(r?dupeCheck(r)&&errorMsg("No Change Was Made!<br>Press ESC to clear,<br>or select another list item and select cancel."):errorMsg("Empty items are not accepted.<br>If you want to remove the item,<br>just click complete in the options."),e.value=s,e.focus())}function clkUndoItem(){let e=targetElement,t="listSubItem"===e.id;if(dupeCheck(e.innerText))errorMsg("A duplicate item is detected in the current list.<br>Undo was not successful!"),e.style.border="2px solid red",setTimeout((()=>{e.removeAttribute("style")}),1500);else if(t){let t=document.querySelector('#list p[pid="'+e.getAttribute("pid")+'"]');t?(setAllCaret(e),e.classList.remove("has-background-item"),e.removeEventListener("click",clkListItem),changeTitle(e),t.appendChild(e),setCookie()):(targetElement=null,dupeCheck(e.innerText)?(errorMsg("A duplicate item is detected in the current list.<br>Undo was not successful!"),e.style.border="2px solid red",setTimeout((()=>{e.removeAttribute("style")}),1500)):(setAllCaret(e),e.classList.remove("has-background-item"),e.removeEventListener("click",clkListItem),changeTitle(e),e.remove(),document.querySelector("#list").prepend(createItem(e.innerText)),setCookie()))}else{let t=e.querySelectorAll("i");e.querySelectorAll("#listSubItem").forEach((e=>{changeTitle(e)})),t.forEach((e=>{e.classList.remove("has-background-item"),e.parentElement.classList.remove("has-background-item")})),setAllCaret(e),e.remove(),e.removeEventListener("click",clkUndoItem),e.addEventListener("click",clkListItem),changeTitle(e),document.querySelector("#list").prepend(e),setCookie()}closeOptions();let i=document.querySelector("#done");i&&0===i.querySelectorAll("#listItem, #listSubItem").length&&i.remove(),targetElement=null}function clkCopyItem(){navigator.clipboard.writeText(getItemText(targetElement)),closeOptions(),targetElement=null}function toggleLstBtn(e){let t=e.target;"I"===t.tagName&&(t=t.parentElement),closeOptions(),"edit"===t.id?(document.querySelector("#item").value=getItemText(targetElement),document.querySelector("#editItem").classList.remove("dnone"),document.querySelector("#addSub").classList.add("dnone")):"crtSub"===t.id&&(document.querySelector("#addSub").classList.remove("dnone"),document.querySelector("#editItem").classList.add("dnone")),document.querySelector("#addItem").classList.add("dnone"),document.querySelector("#item").focus()}function changeTitle(e){e.title.includes("Click to Undo")?e.title="Click for Options":e.title="Click to Undo"}function getItemText(e){return"listItem"===e.id&&e.innerText.includes("\n")?e.innerText.substring(0,e.innerText.indexOf("\n")):e.innerText}function setAllCaret(e){e.querySelectorAll("i").forEach((e=>{e.classList.replace("bi-check-circle-fill","listSubItem"===e.parentElement.id?"bi-caret-right":"bi-caret-right-fill"),e.classList.remove("has-text-success")}))}function setAllCheck(e,t=!1){e.querySelectorAll("i").forEach((e=>{e.classList.replace("listSubItem"===e.parentElement.id?"bi-caret-right":"bi-caret-right-fill","bi-check-circle-fill"),t?e.classList.remove("has-text-success"):e.classList.add("has-text-success")}))}function createItem(e,t={isSub:!1,pid:NaN}){let i=mkElem({elemType:t.isSub?"span":"p",class:t.isSub?"":"mb-2",title:"Click for Options",id:t.isSub?"listSubItem":"listItem",pid:t.isSub?t.pid:crypto.randomUUID(),inner:e.toLowerCase().includes("http")?e.toLowerCase():e.substring(0,1).toUpperCase()+e.substring(1),listeners:t.isSub?[{type:"mouseover",execute:moSubItem},{type:"mouseleave",execute:mlSubItem}]:[{type:"mouseover",execute:moListItem},{type:"mouseleave",execute:mlLitsItem},{type:"click",execute:clkListItem}]});return i.prepend(mkElem({elemType:"i",class:"bi "+(t.isSub?"bi-caret-right":"bi-caret-right-fill")})),i}function doneContainer(){return nestElem([mkDiv({class:"card-content pt-0",id:"done"}),{1:mkElem({elemType:"h4",class:"h4",inner:'<i class="bi bi-check-circle-fill has-text-success"></i>Done!'}),2:mkP({id:"doneSubs"})}])}function moveElement(e){if("listItem"===e.id){let t=document.querySelectorAll("#doneSubs #listSubItem"),i=e.querySelectorAll("#listSubItem");i.length&&i.forEach((e=>{changeTitle(e),setAllCheck(e,!0)})),e.querySelector("i").classList.remove("has-background-item","has-text-success"),t.length&&t.forEach((t=>{t.getAttribute("pid")===e.getAttribute("pid")&&(t.removeEventListener("click",clkListItem),t.remove(),e.appendChild(t))})),changeTitle(e),document.querySelector("#done").appendChild(e)}else changeTitle(e),e.querySelector("i").classList.remove("has-text-success"),e.addEventListener("click",clkListItem),document.querySelector("#doneSubs").appendChild(e)}function removeItem(e){"I"===e.tagName&&(e=e.parentElement),setAllCheck(e),setTimeout((()=>{document.querySelector("#done")||document.querySelector("#list-container").appendChild(doneContainer()),e.remove(),moveElement(e),setCookie()}),1e3)}function getCookie(){if(frameCheck){let e=document.cookie;e=e.split(";");for(let t in e){let i=e[t].split("=");if("list"===i[0])return i[1]}}}function setCookie(e="list"){if(frameCheck){let t=document.querySelector("#list").querySelectorAll("#listItem"),i="";t.forEach((e=>{i+=e.innerText.replaceAll("\n","|")+","})),i?(document.cookie=`${e}=${i.substring(0,i.length-1)};max-age=31536000;samesite=none;secure`,document.cookie.length>3e3&&errorMsg("Please start completing items on the list.<br><br>There is < 1000 bytes of storage left.")):document.cookie=e+"=;max-age=0;samesite=none;secure"}}function optMo(e){let t=e.target.getAttribute("aria-description");e.target.parentElement.appendChild(mkElem({elemType:"span",class:"btn-popover",inner:t}))}function optMl(e){e.target.parentElement.querySelector("span").remove()}function closeOptions(){document.querySelector(".options").remove()}function openOptions(e){document.querySelector(".options")&&closeOptions();const t={b1:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-success is-outlined","aria-description":"Mark Item Complete",id:"tadone",inner:'<i class="bi bi-check-circle"></i>',listeners:[{type:"click",execute:complete},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b2:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-link is-outlined","aria-description":"Create A Sub-List Item",id:"crtSub",inner:'<i class="bi bi-plus-circle-dotted"></i>',listeners:[{type:"click",execute:toggleLstBtn},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b3:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-warning is-outlined","aria-description":"Edit List Item",id:"edit",inner:'<i class="bi bi-pencil"></i>',listeners:[{type:"click",execute:toggleLstBtn},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b4:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-info is-outlined","aria-description":"Copy Item",id:"copy",inner:'<i class="bi bi-copy"></i>',listeners:[{type:"click",execute:clkCopyItem},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b5:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-warning is-outlined","aria-description":"Restore List Item",id:"undo",inner:'<i class="bi bi-arrow-counterclockwise"></i>',listeners:[{type:"click",execute:clkUndoItem},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]}),b6:mkBtn({class:"button is-small ml-2 mr-2 is-rounded is-danger is-outlined","aria-description":"Close Options",id:"cancel",inner:'<i class="bi bi-x-circle"></i>',listeners:[{type:"click",execute:closeOptions},{type:"mouseenter",execute:optMo},{type:"mouseleave",execute:optMl}]})};nestElem([document.querySelector(".container"),mkDiv({class:"options",style:"top: "+(e.y-30)+"px; left: "+(e.x-27)+"px;"}),mkDiv({class:"card"}),mkDiv({class:"card-content p-0"}),"done"===targetElement.parentElement.id||"done"===targetElement.parentElement.parentElement.id?[t.b5,t.b6]:"listSubItem"===targetElement.id?[t.b1,t.b3,t.b4,t.b6]:[t.b1,t.b2,t.b3,t.b4,t.b6]])}function addSub(){let e=document.querySelector("#item"),t=e.value;if(t&&!dupeCheck(t))if(t.includes(",")){let e=t.split(",");for(let t of e)t&&!dupeCheck(t.trim())&&(targetElement.appendChild(createItem(t.trim(),{isSub:!0,pid:targetElement.getAttribute("pid")})),setCookie())}else targetElement.appendChild(createItem(t.trim(),{isSub:!0,pid:targetElement.getAttribute("pid")})),setCookie();else errorMsg();e.value="",document.querySelector("#item").focus(),e.classList.contains("is-danger")||(document.querySelector("#addItem").classList.remove("dnone"),document.querySelector("#addSub").classList.add("dnone"),targetElement=null)}function addItem(){let e=document.querySelector("#item"),t=e.value;if(t&&!dupeCheck(t))if(t.includes(",")){let e=t.split(",");for(let t of e.reverse())t&&!dupeCheck(t.trim())&&(document.querySelector("#list").prepend(createItem(t.trim())),setCookie())}else document.querySelector("#list").prepend(createItem(t.trim())),setCookie();else errorMsg();e.value="",document.querySelector("#item").focus()}function exportListStr(){if(removeMsg(),document.querySelector("#item").classList.remove("is-danger"),"export"===this.value){let e=document.querySelector("#list").querySelectorAll("p"),t="";if(e.forEach((e=>{t+=e.innerText.replaceAll("\n","|")+","})),t){navigator.clipboard.writeText(t.substring(0,t.length-1));let e=document.querySelector("#addItem");e.classList.contains("dnone")&&(e=document.querySelector("#addSub")),e.setAttribute("disabled","disabled"),this.classList.add("is-success"),this.value="Exported to Clipboard!",setTimeout((()=>{this.value="",this.classList.remove("is-success"),e.removeAttribute("disabled")}),1e3)}else document.cookie="list="}}function inputKeyActions(e){if(13===e.keyCode){document.querySelectorAll(".listBtn button").forEach((e=>{e.classList.contains("dnone")||e.click()}))}else 27===e.keyCode&&(document.querySelector("#item").value="",document.querySelector("#item").classList.remove("is-danger"),removeMsg(),resetListBtn())}function complete(){closeOptions(),removeItem(targetElement),targetElement=null}window.onload=function(){let e=getCookie();e&&(e=e.split(","),e.forEach((e=>{if(e.includes("|")){let t=e.slice(e.indexOf("|")+1).split("|"),i=createItem(e.substring(0,e.indexOf("|")));t.forEach((e=>{i.appendChild(createItem(e,{isSub:!0,pid:i.getAttribute("pid")}))})),document.querySelector("#list").appendChild(i)}else document.querySelector("#list").appendChild(createItem(e))})))};