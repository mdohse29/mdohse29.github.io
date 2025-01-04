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
async function getData(){
    let data = await (await fetch('./js/data.json')).json();
    console.log(data)
    if (data.length){
        return await data;
    }
    return null;
}

let browserInfo = navigator.userAgent;
getData().then(data => {

    let container = mkDiv({class:'container-fluid'});
    let header = nestElem([
        mkDiv({class:'row pt-3 pb-3 sticky-top header'}),
        mkDiv({class:'col text-center'}),
        mkElem({elemType:'h1', class:'h1', inner:'Page Gallery'})
    ]);
    let greeting = nestElem([
        mkDiv({class:'row mt-4 justify-content-center'}),
        mkDiv({class:'col col-lg-6'}),
        {
            1:mkP({inner:'Welcome to the Gallery'}),
            2:mkP({inner:'This showcases some of my work, featuring simple web pages I have developed. While these examples may not be particularly elaborate, they represent some of my current capabilities as I continue to refine my skills. I am currently enrolled in an online web development course, and I look forward to creating more sophisticated projects in the future.'}),
            3:mkP({inner:'My primary focus is on JavaScript and functionality, rather than design. Although I incorporate CSS frameworks for basic layout and styling, all JavaScript and jQuery used in my pages is entirely my own work. I prefer to write my own JavaScript code, as it allows me to learn and understand the intricacies of the language better. Additionally, I have a passion for writing JavaScript, among other programming languages.'}),
            4:mkP({inner:'Below, you\'ll find a brief description of each page, with an interactive frame that expands for a more detailed view and interaction.'}),
            99:mkElem({elemType:'hr'})
        }
    ]);
    let footer = nestElem([
        mkDiv({class:'row pt-2 pb-3 mb-0 mt-5 ' + ((!browserInfo.includes('Mobile')) ? 'sticky-bottom' : '') + ' footer'}),
        mkSpan({inner: 'Created By: MR D', style: 'font-size: 8px;color: transparent;'})
    ]);

    nestElem([
        container,
        {
            1:header,
            2:greeting
        }
    ]);
    for (let d of data){
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
                                        2:mkElem({elemType:'iframe', scrolling:'no', src:d.url}) // IFRAME
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
        footer
    ]);

    document.body.prepend(container);

    // mobile check and alter

    document.querySelectorAll('.mobile').forEach(cover => {
        cover.removeEventListener('mouseenter', coverMe)
        cover.removeEventListener('mouseleave', coverMl);
        cover.append(mkBtn({class:'btn btn-info', id:'submit', inner:'Click to Engage'}));
    })

});

// document.body.prepend(
//     nestElem([
//         mkDiv({class:'container-fluid'}),
//         {
//             0:nestElem([
//                 mkDiv({class:'row pt-3 pb-3 sticky-top header'}),
//                 mkDiv({class:'col text-center'}),
//                 mkElem({elemType:'h1', class:'h1', inner:'Page Gallery'})
//             ]),
//             1:nestElem([
//                 mkDiv({class:'row mt-4 justify-content-center'}),
//                 mkDiv({class:'col col-lg-6'}),
//                 {
//                     1:mkP({inner:'Welcome to the Gallery'}),
//                     2:mkP({inner:'This showcases some of my work, featuring simple web pages I have developed. While these examples may not be particularly elaborate, they represent some of my current capabilities as I continue to refine my skills. I am currently enrolled in an online web development course, and I look forward to creating more sophisticated projects in the future.'}),
//                     3:mkP({inner:'My primary focus is on JavaScript and functionality, rather than design. Although I incorporate CSS frameworks for basic layout and styling, all JavaScript and jQuery used in my pages is entirely my own work. I prefer to write my own JavaScript code, as it allows me to learn and understand the intricacies of the language better. Additionally, I have a passion for writing JavaScript, among other programming languages.'}),
//                     4:mkP({inner:'Below, you\'ll find a brief description of each page, with an interactive frame that expands for a more detailed view and interaction.'}),
//                     99:mkElem({elemType:'hr'})
//                 }
//             ]),
//             2:nestElem([
//                 mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
//                 {
//                     1:nestElem([
//                         mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
//                         mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
//                         {
//                             1:nestElem([
//                                 mkDiv({class:'card-body pb-0'}),
//                                 mkDiv({class:'card-title'}),
//                                 mkElem({elemType:'h3', class:'h3', inner:'The Scratchpad'}) // Title
//                             ]),
//                             2:nestElem([
//                                 mkDiv({class:'card-body'}),
//                                 nestElem([
//                                     mkDiv({class:'ratio'}),
//                                     {
//                                         1:mkDiv({class:`frame-cover${((browserInfo.includes('Mobile')) ? ' mobile' : '')}`}),
//                                         2:mkElem({elemType:'iframe', scrolling:'no', src:'../misc/scratch/'}) // IFRAME
//                                     }
//                                 ])
//                             ])
//                         }

//                     ]),
//                     2:nestElem([
//                         mkDiv({class:'col-6 col-lg-4 col-content align-self-start'}),
//                         mkDiv({class:'container description'}),
//                         {
//                             1:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Purpose/Description'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'This tool was developed to address the need for pasting clean text from a Word document into a content management application. At my workplace, our content team frequently transfers content authored in Word into the CMT. Unfortunately, this process often introduces hidden characters and unwanted formatting from the Word document.<br><br>To mitigate these issues, I created this solution to reduce the likelihood of unwanted entities being pasted into the CMT. The tool automatically runs the text through several checks to ensure that no hidden entities or formatting errors are present before the text is entered into the CMT. This simple yet effective tool has significantly reduced the amount of post-entry work required to find, fix, and replace unwanted formatting and entities.'})
//                                 }
//                             ]),
//                             2:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Assets Used'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'<strong>Styling</strong><br>Bootstrap - for buttons and basic layout<br>Custom CSS - for everything else<br>Icons 8 @ <a href="https://icons8.com" target="_blank">https://icons8.com</a> - for the bug, info, and lock icons<br><br><strong>Scripting</strong><br>Javascript - for logic and creating elements<br>JQuery - for functionality<br>RegEX - for some of the text validating functions'})
//                                 }
//                             ]),
//                             3:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Extra Details'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'I decided to make my own modal and toggle switch for this, instead of using something from Bootstrap. Nothing super fancy, but it works. This one probably gets fiddled with the most since it is currently being used by people in my office. A bug will come up or a request made for something to be added. More requests than bugs <span style="font-size: 25px;">😉</span>'})
//                                 }
//                             ])
//                         }
//                     ])
//                 }
//             ]),
//             3:nestElem([
//                 mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
//                 {
//                     1:nestElem([
//                         mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
//                         mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
//                         {
//                             1:nestElem([
//                                 mkDiv({class:'card-body pb-0'}),
//                                 mkDiv({class:'card-title'}),
//                                 mkElem({elemType:'h3', class:'h3', inner:'Movie List'}) // Title
//                             ]),
//                             2:nestElem([
//                                 mkDiv({class:'card-body'}),
//                                 nestElem([
//                                     mkDiv({class:'ratio'}),
//                                     {
//                                         1:mkDiv({class:`frame-cover${((browserInfo.includes('Mobile')) ? ' mobile' : '')}`}),
//                                         2:mkElem({elemType:'iframe', scrolling:'no', src:'../misc/movieList/'}) // IFRAME
//                                     }
//                                 ])
//                             ])
//                         }

//                     ]),
//                     2:nestElem([
//                         mkDiv({class:'col-6 col-lg-4 col-content align-self-start'}),
//                         mkDiv({class:'container description'}),
//                         {
//                             1:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Purpose/Description'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'The title speaks for itself&mdash;I created this tool to have a complete and searchable list of movies on my media server. While my app allows me to see what\'s currently available to watch, I also wanted a way to view the contents of my archive.<br><br>One weekend, when I couldn\'t sleep, I decided to build this tool. It\'s fairly simple, but I enjoyed the process. It\'s especially useful when I\'m deciding what to swap out from the server. I also added a randomizer feature for those times when I don\'t want to spend an hour deciding what to watch—because why not? While this tool is primarily useful for those with access to my media server, I thought it was worth showcasing here.'})
//                                 }
//                             ]),
//                             2:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Assets Used'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'<strong>Style</strong><br>Bulma CSS - for the buttons, inputs, and general layout<br>Custom CSS - to get things just right<br><br><strong>Scripting</strong><br>Javascript - for loading the page<br>OMDb API @ <a href="http://www.omdbapi.com" target="_blank">www.omdbapi.com</a> - for the movie data<br>Axios - for retrieving list data and movie data<br>JQuery - for the functionality'})
//                                 }
//                             ]),
//                             3:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Extra Details'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'The lists automatically get updated via script run on my media server that updates github. I recently added some movie data to the list, thanks to OMDb API. Just a movie poster and a summary. You gotta enjoy the little things. I decided to make my own tabs instead of using something from Bulma. Again, simple but effective. In the end I am probably more about making something function properly over how pretty it is.'})
//                                 }
//                             ])
//                         }
//                     ])
//                 }
//             ]),
//             4:nestElem([
//                 mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
//                 {
//                     1:nestElem([
//                         mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
//                         mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
//                         {
//                             1:nestElem([
//                                 mkDiv({class:'card-body pb-0'}),
//                                 mkDiv({class:'card-title'}),
//                                 {
//                                     1:mkElem({elemType:'h3', class:'h3', inner:'ToDo List'})/*, // Title
//                                     2:mkP({class:'frame-info dnone', inner:'This page is quite old and is going to get redone soon. Just FYI'})*/
//                                 }
//                             ]),
//                             2:nestElem([
//                                 mkDiv({class:'card-body'}),
//                                 nestElem([
//                                     mkDiv({class:'ratio'}),
//                                     {
//                                         1:mkDiv({class:`frame-cover${((browserInfo.includes('Mobile')) ? ' mobile' : '')}`}),
//                                         2:mkElem({elemType:'iframe', scrolling:'no', src:'../todoList/'}) // IFRAME
//                                     }
//                                 ])
//                             ])
//                         }

//                     ]),
//                     2:nestElem([
//                         mkDiv({class:'col-6 col-lg-4 col-content align-self-start'}),
//                         mkDiv({class:'container description'}),
//                         {
//                             1:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Purpose/Description'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'This page originally started as a simple to-do list project I created during an HTML class. Initially, it allowed users to add items to the list—nothing particularly special. However, one weekend, I decided to enhance its functionality.<br><br>The page now uses cookies for local storage, enabling the list to be saved between sessions, due to not having access to a database at the moment.<br><br>Users can add items and mark them as completed. Once an item is completed, it moves to the "Done" area, where it can be undone by clicking on it and selecting "Undo". Please note that completed items are not permanently saved; the "Done" area resets once the browser is closed or refreshed, and the items can no longer be undone.<br><br>Additionally, the page supports the creation of sub-lists, allowing users to break down tasks into smaller steps or mini-tasks, which can also be marked as completed.'})
//                                 }
//                             ]),
//                             2:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Assets Used'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'<strong>Styling</strong><br>Bulma CSS - for basic layout and styling<br>Bootstrap Icons - for the icons being used<br>Custom CSS - for the personal touch<br><br><strong>Scripting</strong><br>Javascript - for creating elements and functionality'})
//                                 }
//                             ]),
//                             3:nestElem([
//                                 mkDiv({class:'drawer border-bottom'}),
//                                 {
//                                     1:mkElem({elemType:'h5', class:'h5', inner:'Extra Details'}),
//                                     2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'I didn\'t expect it, but I learned quite a bit while working on this project. I explored the Crypto interface, which I used to generate unique IDs for the list items, and also got a refresher on using cookies on the client side. Though I had worked with cookies before, it had been a long time, so revisiting this was a valuable experience. <br><br> What started as a way to pass the time turned into a surprisingly enjoyable project. Initially, I was just bored and looking for something to do, but enhancing the functionality of this to-do list has made it a tool I now use daily. Despite the abundance of to-do list apps available, I\'ve grown fond of the simplicity of my own creation—though I might be a bit biased!'})
//                                 }
//                             ])
//                         }
//                     ])
//                 }
//             ]),
//             5:nestElem([
//                 mkDiv({class:'row pt-2 pb-3 mb-0 mt-5 ' + ((!browserInfo.includes('Mobile')) ? 'sticky-bottom' : '') + ' footer'}),
//                 mkSpan({inner: 'Created By: MR D', style: 'font-size: 8px;color: transparent;'})
//             ])
//         }
//     ])
// );