/**
 *  structure for frame
 *  div.card.shadow
 *      div.card-body
 *          div.card-title
 *              h3.h3
 *              p.frame-info.dnone - Optional "Additional info about the frame" (Only appears when frame is active)
 *      div.card-body
 *          div.ratio
 *              div.frame-cover
 *              iframe[scrolling="no"]
 * 
 *  Overall Structure
 *  div.container-fluid
 *      div.row.mt-4.header
 *          div.col.text-center
 *              h1.h1
 *      div.row.mt-5.align-items-center.justify-content-center <-- Repeat structure for every frame
 *          div.col-6.col-lg-4.text-center.col-content
 *              {{frame}}
 *          div.col-6.col-lg-4.col-content.align-self-start
 *              div.container.description
 *                  .drawer.border-bottom
 *                      h5.h5 - "Header for drawer"
 *                      p.border-start.border-end.border-bottom.dnone - "Content body for drawer"
 *              ||
 *                  "description-of-frame"
 *                  
 * 
 */

/*
Save for reference to use when mapping if using different elements, maybe add as function in crtElem
    let attr = [];
    if (d.attr != undefined){
        attr = d.attr;
        delete d.attr;
    }
    let key = Object.keys(d)[0];
    return mkElem({elemType:key, inner:d[key], ...attr});

setup in json file should be formatted like the following

{
    "h1":"inner html for the element"
}
    ||
{
    "button":"inner html for element",
    "attr":{
        "attribute":"value",
        "class":"btn btn-success"
    }
}

The element tag should be the key and whatever the inner HTML should be would be the value
Adding the attr object allows adding attributes to the element when created
*/
async function getData(){
    let data = await fetch('./js/data.json');
    // console.log(data)
    if (data.ok){
        return await data.json();
    }
    return null;
}

let browserInfo = navigator.userAgent;

getData().then(data => {

    let container = nestElem([
        mkDiv({class:'container-fluid'}),
        {
            1:nestElem([
                mkDiv({class:'row pt-3 pb-3 sticky-top header'}),
                mkDiv({class:'col text-center'}),
                mkElem({elemType:'h1', class:'h1', inner:data.title})
            ]),
            2:nestElem([
                mkDiv({class:'row mt-4 justify-content-center'}),
                nestElem([ 
                    nestElem([
                        mkDiv({class:'col col-lg-6'}),
                        data.greeting.map(d => {return mkP({inner:d})})
                    ]),
                    mkElem({elemType:'hr'})
                ])
            ])
        }
    ])

    for (let d of data.demos){
        nestElem([
            container,
            nestElem([
                mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
                {
                    1:nestElem([
                        mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
                        mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
                        {
                            1:nestElem([
                                mkDiv({class:'card-body pb-0'}),
                                mkDiv({class:'card-title'}),
                                mkElem({elemType:'h3', class:'h3', inner:d.title}) // Title
                            ]),
                            2:nestElem([
                                mkDiv({class:'card-body'}),
                                nestElem([
                                    mkDiv({class:'ratio'}),
                                    {
                                        1:mkDiv({class:`frame-cover${((browserInfo.includes('Mobile')) ? ' mobile' : '')}`, listeners:[{type:'click', execute: coverClk}, {type:'mouseenter', execute: coverMe}, {type:'mouseleave', execute: coverMl}]}),
                                        2:mkElem({elemType:'iframe', scrolling:'no', src:d.url, loading:'lazy'}) // IFRAME
                                    }
                                ])
                            ])
                        }

                    ]),
                    2:nestElem([
                        mkDiv({class:'col-6 col-lg-4 col-content align-self-start'}),
                        mkDiv({class:'container description'}),
                        {
                            1:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkElem({elemType:'h5', class:'h5', inner:'Purpose/Description', pptIcon:mkElem({elemType:'i', class:'bi bi-caret-right'}), listeners:[{type:'click', execute:drawerClk}, {type:'mouseenter', execute: drawerMe}, {type:'mouseleave', execute:drawerMl}]}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:d.details[0]})
                                }
                            ]),
                            2:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkElem({elemType:'h5', class:'h5', inner:'Assets Used', pptIcon:mkElem({elemType:'i', class:'bi bi-caret-right'}), listeners:[{type:'click', execute:drawerClk}, {type:'mouseenter', execute: drawerMe}, {type:'mouseleave', execute:drawerMl}]}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:d.details[1]})
                                }
                            ]),
                            3:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkElem({elemType:'h5', class:'h5', inner:'Extra Details', pptIcon:mkElem({elemType:'i', class:'bi bi-caret-right'}), listeners:[{type:'click', execute:drawerClk}, {type:'mouseenter', execute: drawerMe}, {type:'mouseleave', execute:drawerMl}]}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:d.details[2]})
                                }
                            ])
                        }
                    ])
                }
            ])
        ])
    }

    nestElem([
        container,
        mkDiv({class:'row pt-2 pb-3 mb-0 mt-5 ' + ((!browserInfo.includes('Mobile')) ? 'sticky-bottom' : '') + ' footer'}),
        mrd(true)
    ]);

    document.body.prepend(container);

    // mobile check and alter

    document.querySelectorAll('.mobile').forEach(cover => {
        cover.removeEventListener('mouseenter', coverMe)
        cover.removeEventListener('mouseleave', coverMl);
        cover.append(mkBtn({class:'btn btn-info', id:'submit', inner:'Click to Engage'}));
    })

});