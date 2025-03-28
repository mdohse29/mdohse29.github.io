async function getData(){let e=await fetch("./js/data.json");return e.ok?await e.json():null}let browserInfo=navigator.userAgent;getData().then((e=>{let t=nestElem([mkDiv({class:"container-fluid"}),{1:nestElem([mkDiv({class:"row pt-3 pb-3 sticky-top header"}),mkDiv({class:"col text-center"}),mkElem({elemType:"h1",class:"h1",inner:e.title})]),2:nestElem([mkDiv({class:"row mt-4 justify-content-center"}),nestElem([nestElem([mkDiv({class:"col col-lg-6"}),e.greeting.map((e=>mkP({inner:e})))]),mkElem({elemType:"hr"})])])}]);for(let s of e.demos)nestElem([t,nestElem([mkDiv({class:"row mt-5 align-items-center justify-content-center"}),{1:nestElem([mkDiv({class:"col-6 col-lg-4 text-center col-content"}),mkDiv({class:"card"+(browserInfo.includes("Mobile")?"":" shadow")}),{1:nestElem([mkDiv({class:"card-body pb-0"}),mkDiv({class:"card-title"}),mkElem({elemType:"h3",class:"h3",inner:s.title})]),2:nestElem([mkDiv({class:"card-body"}),nestElem([mkDiv({class:"ratio"}),{1:mkDiv({class:"frame-cover"+(browserInfo.includes("Mobile")?" mobile":""),listeners:[{type:"click",execute:coverClk},{type:"mouseenter",execute:coverMe},{type:"mouseleave",execute:coverMl}]}),2:mkElem({elemType:"iframe",scrolling:"no",src:s.url,loading:"lazy",tabindex:"-1"})}])])}]),2:nestElem([mkDiv({class:"col-6 col-lg-4 col-content align-self-start"}),mkDiv({class:"container description"}),{1:nestElem([mkDiv({class:"drawer border-bottom",tabindex:"0"}),{1:mkElem({elemType:"h5",class:"h5",inner:"Purpose/Description",pptIcon:mkElem({elemType:"i",class:"bi bi-caret-right"}),listeners:[{type:"click",execute:drawerClk},{type:"mouseenter",execute:drawerMe},{type:"mouseleave",execute:drawerMl}]}),2:mkP({class:"border-start border-end border-bottom dnone",isexpanded:"false",inner:s.details[0]})}]),2:nestElem([mkDiv({class:"drawer border-bottom",tabindex:"0"}),{1:mkElem({elemType:"h5",class:"h5",inner:"Assets Used",pptIcon:mkElem({elemType:"i",class:"bi bi-caret-right"}),listeners:[{type:"click",execute:drawerClk},{type:"mouseenter",execute:drawerMe},{type:"mouseleave",execute:drawerMl}]}),2:mkP({class:"border-start border-end border-bottom dnone",isexpanded:"false",inner:s.details[1]})}]),3:nestElem([mkDiv({class:"drawer border-bottom",tabindex:"0"}),{1:mkElem({elemType:"h5",class:"h5",inner:"Extra Details",pptIcon:mkElem({elemType:"i",class:"bi bi-caret-right"}),listeners:[{type:"click",execute:drawerClk},{type:"mouseenter",execute:drawerMe},{type:"mouseleave",execute:drawerMl}]}),2:mkP({class:"border-start border-end border-bottom dnone",isexpanded:"false",inner:s.details[2]})}])}])}])]);nestElem([t,mkDiv({class:"row pt-2 pb-3 mb-0 mt-5 "+(browserInfo.includes("Mobile")?"":"sticky-bottom")+" footer"}),mrd(!0)]),document.body.prepend(t),document.querySelectorAll(".mobile").forEach((e=>{e.removeEventListener("mouseenter",coverMe),e.removeEventListener("mouseleave",coverMl),e.append(mkBtn({class:"btn btn-info",id:"submit",inner:"Click to Engage"}))}))}));