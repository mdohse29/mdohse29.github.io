async function getData(){let e=await(await fetch("./js/data.json")).json();return e.length?await e:null}let browserInfo=navigator.userAgent;getData().then((e=>{let t=mkDiv({class:"container-fluid"}),r=nestElem([mkDiv({class:"row pt-3 pb-3 sticky-top header"}),mkDiv({class:"col text-center"}),mkElem({elemType:"h1",class:"h1",inner:"Page Gallery"})]),s=nestElem([mkDiv({class:"row mt-4 justify-content-center"}),mkDiv({class:"col col-lg-6"}),{1:mkP({inner:"Welcome to the Gallery"}),2:mkP({inner:"This showcases some of my work, featuring simple web pages I have developed. While these examples may not be particularly elaborate, they represent some of my current capabilities as I continue to refine my skills. I am currently enrolled in an online web development course, and I look forward to creating more sophisticated projects in the future."}),3:mkP({inner:"My primary focus is on JavaScript and functionality, rather than design. Although I incorporate CSS frameworks for basic layout and styling, all JavaScript and jQuery used in my pages is entirely my own work. I prefer to write my own JavaScript code, as it allows me to learn and understand the intricacies of the language better. Additionally, I have a passion for writing JavaScript, among other programming languages."}),4:mkP({inner:"Below, you'll find a brief description of each page, with an interactive frame that expands for a more detailed view and interaction."}),99:mkElem({elemType:"hr"})}]),l=nestElem([mkDiv({class:"row pt-2 pb-3 mb-0 mt-5 "+(browserInfo.includes("Mobile")?"":"sticky-bottom")+" footer"}),mkSpan({inner:"Created By: MR D",style:"font-size: 8px;color: transparent;"})]);nestElem([t,{1:r,2:s}]);for(let r of e)nestElem([t,nestElem([mkDiv({class:"row mt-5 align-items-center justify-content-center"}),{1:nestElem([mkDiv({class:"col-6 col-lg-4 text-center col-content"}),mkDiv({class:"card"+(browserInfo.includes("Mobile")?"":" shadow")}),{1:nestElem([mkDiv({class:"card-body pb-0"}),mkDiv({class:"card-title"}),mkElem({elemType:"h3",class:"h3",inner:r.title})]),2:nestElem([mkDiv({class:"card-body"}),nestElem([mkDiv({class:"ratio"}),{1:mkDiv({class:"frame-cover"+(browserInfo.includes("Mobile")?" mobile":""),listeners:[{type:"click",execute:coverClk},{type:"mouseenter",execute:coverMe},{type:"mouseleave",execute:coverMl}]}),2:mkElem({elemType:"iframe",scrolling:"no",src:r.url,loading:"lazy",sandbox:"allow-scripts allow-same-origin"})}])])}]),2:nestElem([mkDiv({class:"col-6 col-lg-4 col-content align-self-start"}),mkDiv({class:"container description"}),{1:nestElem([mkDiv({class:"drawer border-bottom"}),{1:mkElem({elemType:"h5",class:"h5",inner:"Purpose/Description",pptIcon:mkElem({elemType:"i",class:"bi bi-caret-right"}),listeners:[{type:"click",execute:drawerClk},{type:"mouseenter",execute:drawerMe},{type:"mouseleave",execute:drawerMl}]}),2:mkP({class:"border-start border-end border-bottom dnone",isexpanded:"false",inner:r.details[0]})}]),2:nestElem([mkDiv({class:"drawer border-bottom"}),{1:mkElem({elemType:"h5",class:"h5",inner:"Assets Used",pptIcon:mkElem({elemType:"i",class:"bi bi-caret-right"}),listeners:[{type:"click",execute:drawerClk},{type:"mouseenter",execute:drawerMe},{type:"mouseleave",execute:drawerMl}]}),2:mkP({class:"border-start border-end border-bottom dnone",isexpanded:"false",inner:r.details[1]})}]),3:nestElem([mkDiv({class:"drawer border-bottom"}),{1:mkElem({elemType:"h5",class:"h5",inner:"Extra Details",pptIcon:mkElem({elemType:"i",class:"bi bi-caret-right"}),listeners:[{type:"click",execute:drawerClk},{type:"mouseenter",execute:drawerMe},{type:"mouseleave",execute:drawerMl}]}),2:mkP({class:"border-start border-end border-bottom dnone",isexpanded:"false",inner:r.details[2]})}])}])}])]);nestElem([t,l]),document.body.prepend(t),document.querySelectorAll(".mobile").forEach((e=>{e.removeEventListener("mouseenter",coverMe),e.removeEventListener("mouseleave",coverMl),e.append(mkBtn({class:"btn btn-info",id:"submit",inner:"Click to Engage"}))}))}));