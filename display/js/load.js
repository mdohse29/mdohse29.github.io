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
 *                      p.border-start.border-end.border-bottom.dnone - "description-of-frame"
 *              ||
 *                  "description-of-frame"
 *                  
 * 
 */
let browserInfo = navigator.userAgent;

document.body.prepend(
    nestElem([
        mkDiv({class:'container-fluid'}),
        {
            0:nestElem([
                mkDiv({class:'row pt-3 pb-3 sticky-top header'}),
                mkDiv({class:'col text-center'}),
                mkHead({hType:'h1', class:'h1', inner:'Page Gallery'})
            ]),
            1:nestElem([
                mkDiv({class:'row mt-4 justify-content-center'}),
                mkDiv({class:'col col-lg-6'}),
                {
                    1:mkP({inner:'Welcome to the Gallery'}),
                    2:mkP({inner:'This showcases some of my work, featuring simple web pages I have developed. While these examples may not be particularly elaborate, they represent some of my current capabilities as I continue to refine my skills. I am currently enrolled in an online web development course, and I look forward to creating more sophisticated projects in the future.'}),
                    3:mkP({inner:'My primary focus is on JavaScript and functionality, rather than design. Although I incorporate CSS frameworks for basic layout and styling, all JavaScript and jQuery used in my pages is entirely my own work. I prefer to write my own JavaScript code, as it allows me to learn and understand the intricacies of the language better. Additionally, I have a passion for writing JavaScript, among other programming languages.'}),
                    4:mkP({inner:'Below, you\'ll find a brief description of each page, with an interactive frame that expands for a more detailed view and interaction.'}),
                    99:mkElem({elemType:'hr'})
                }
            ]),
            2:nestElem([
                mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
                {
                    1:nestElem([
                        mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
                        mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
                        {
                            1:nestElem([
                                mkDiv({class:'card-body pb-0'}),
                                mkDiv({class:'card-title'}),
                                mkHead({hType:'h3', class:'h3', inner:'The Scratchpad'}) // Title
                            ]),
                            2:nestElem([
                                mkDiv({class:'card-body'}),
                                nestElem([
                                    mkDiv({class:'ratio'}),
                                    {
                                        1:mkDiv({class:'frame-cover'}),
                                        2:mkElem({elemType:'iframe', scrolling:'no', src:'../misc/scratch/'}) // IFRAME
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
                                    1:mkHead({hType:'h5', class:'h5', inner:'Purpose'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'This tool was developed to address the need for pasting clean text from a Word document into a content management application. At my workplace, our content team frequently transfers content authored in Word into the CMT. Unfortunately, this process often introduces hidden characters and unwanted formatting from the Word document.<br><br>To mitigate these issues, I created this solution to reduce the likelihood of unwanted entities being pasted into the CMT. The tool automatically runs the text through several checks to ensure that no hidden entities or formatting errors are present before the text is entered into the CMT. This simple yet effective tool has significantly reduced the amount of post-entry work required to find, fix, and replace unwanted formatting and entities.'})
                                }
                            ]),
                            2:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkHead({hType:'h5', class:'h5', inner:'Assets Used'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'<strong>Styling</strong><br>Bootstrap - for buttons and basic layout<br>Custom CSS - for everything else<br>Icons 8 @ <a href="https://icons8.com" target="_blank">https://icons8.com</a> - for the bug, info, and lock icons<br><br><strong>Scripting</strong><br>Javascript - for logic and creating elements<br>JQuery - for functionality<br>RegEX - for some of the text validating functions'})
                                }
                            ]),
                            3:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkHead({hType:'h5', class:'h5', inner:'Extra Details'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'I decided to make my own modal and toggle switch for this, instead of using something from Bootstrap. Nothing super fancy, but it works. This one probably gets fiddled with the most since it is currently being used by people in my office. A bug will come up or a request made for something to be added. More requests than bugs <span style="font-size: 25px;">😉</span>'})
                                }
                            ])
                        }
                    ])
                }
            ]),
            3:nestElem([
                mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
                {
                    1:nestElem([
                        mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
                        mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
                        {
                            1:nestElem([
                                mkDiv({class:'card-body pb-0'}),
                                mkDiv({class:'card-title'}),
                                mkHead({hType:'h3', class:'h3', inner:'Movie List'}) // Title
                            ]),
                            2:nestElem([
                                mkDiv({class:'card-body'}),
                                nestElem([
                                    mkDiv({class:'ratio'}),
                                    {
                                        1:mkDiv({class:'frame-cover '}),
                                        2:mkElem({elemType:'iframe', scrolling:'no', src:'../misc/movieList/'}) // IFRAME
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
                                    1:mkHead({hType:'h5', class:'h5', inner:'Purpose'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'The title speaks for itself&mdash;I created this tool to have a complete and searchable list of movies on my media server. While my app allows me to see what\'s currently available to watch, I also wanted a way to view the contents of my archive.<br><br>One weekend, when I couldn\'t sleep, I decided to build this tool. It\'s fairly simple, but I enjoyed the process. It\'s especially useful when I\'m deciding what to swap out from the server. I also added a randomizer feature for those times when I don\'t want to spend an hour deciding what to watch—because why not? While this tool is primarily useful for those with access to my media server, I thought it was worth showcasing here.'})
                                }
                            ]),
                            2:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkHead({hType:'h5', class:'h5', inner:'Assets Used'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'<strong>Style</strong><br>Bulma CSS - for the buttons, inputs, and general layout<br>Custom CSS - to get things just right<br><br><strong>Scripting</strong><br>Javascript - for loading the page<br>OMDb API @ <a href="http://www.omdbapi.com" target="_blank">www.omdbapi.com</a> - for the movie data<br>Axios - for retrieving list data and movie data<br>JQuery - for the functionality'})
                                }
                            ]),
                            3:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkHead({hType:'h5', class:'h5', inner:'Extra Details'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'The lists automatically get updated via script run on my media server that updates github. I recently added some movie data to the list, thanks to OMDb API. Just a movie poster and a summary. You gotta enjoy the little things. I decided to make my own tabs instead of using something from Bulma. Again, simple but effective. In the end I am probably more about making something function properly over how pretty it is.'})
                                }
                            ])
                        }
                    ])
                }
            ]),
            /*4:nestElem([
                mkDiv({class:'row mt-5 align-items-center justify-content-center'}),
                {
                    1:nestElem([
                        mkDiv({class:'col-6 col-lg-4 text-center col-content'}),
                        mkDiv({class:'card' + ((browserInfo.includes('Mobile')) ? '' : ' shadow')}),
                        {
                            1:nestElem([
                                mkDiv({class:'card-body pb-0'}),
                                mkDiv({class:'card-title'}),
                                {
                                    1:mkHead({hType:'h3', class:'h3', inner:'The Gift Picker'}), // Title
                                    2:mkP({class:'frame-info dnone', inner:'This page is quite old and is going to get redone soon. Just FYI'})
                                }
                            ]),
                            2:nestElem([
                                mkDiv({class:'card-body'}),
                                nestElem([
                                    mkDiv({class:'ratio'}),
                                    {
                                        1:mkDiv({class:'frame-cover '}),
                                        2:mkElem({elemType:'iframe', scrolling:'no', src:'../picker/'}) // IFRAME
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
                                    1:mkHead({hType:'h5', class:'h5', inner:'Purpose'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'Something Here'})
                                }
                            ]),
                            2:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkHead({hType:'h5', class:'h5', inner:'Assets Used'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'Something Here'})
                                }
                            ]),
                            3:nestElem([
                                mkDiv({class:'drawer border-bottom'}),
                                {
                                    1:mkHead({hType:'h5', class:'h5', inner:'Extra Details'}),
                                    2:mkP({class:'border-start border-end border-bottom dnone', isexpanded:'false', inner:'Something Here'})
                                }
                            ])
                        }
                    ])
                }
            ]),*/
            5:mkDiv({class:'row pt-3 pb-4 mb-0 mt-5 ' + ((!browserInfo.includes('Mobile')) ? 'sticky-bottom' : '') + ' footer'})
        }
    ])
);