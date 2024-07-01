// window.onload = function(){
    let body = document.querySelector('body');

    let rando = nestElem([
        mkDiv({class:'rando mb-2'}),
        mkbtn({class:'button is-small is-info is-rounded is-responsive', inner:'Random'}),
    ]);

    let search = nestElem([
        mkDiv({class:'search'}),
        {
            1:mkinp({type:'text', name:'q', class:'input is-info', id:'search-box', placeholder:'Search Title Here', autocomplete:'off'}).input,
            2:mkbtn({class:'button is-info ml-1 d-none', id:'submit-reset', inner:'Reset'})
        }
    ]);

    let header = nestElem(
        [
            mkDiv({class:'heading'}),
            mkDiv({class:'columns is-centered'}),
            mkDiv({class:'column is-half'}),
            mkDiv({class:'title'}),
            mkHead({class:'has-text-centered', inner:'Full Movie List', hType:'h1', style:'text-align: center;'})
        ]
    );

    let contentMsg = nestElem([
        mkDiv({class:'content msg'}),
        {
            1:mkP({inner:"Here is the list of ALL the movies and tv shows currently on the server."}),
            2:mkP({inner:"If there is a movie in the archive, or a movie that I don't have, that you want added just let me know."})
        }
    ]);

    let tabs = nestElem([
        mkDiv({class:'tabs-container'}),
        mkDiv({class:'tabs'}),
        {
            1:mkDiv({class:'tab has-background-info-light active', tag:'all', inner:'All'}),
            2:mkDiv({class:'tab has-background-info-light', tag:'mov', inner:'Movies'}),
            3:mkDiv({class:'tab has-background-info-light', tag:'tv', inner:'Shows'}),
            4:mkDiv({class:'tab has-background-info-light', tag:'arch', inner:'Archive'})
        }
    ]);

    let content = nestElem([
        mkDiv({class:'content'}),
        {
            1:tabs,
            2:mkDiv({class:'movies has-background-info-light'}),
            3:mkDiv({id:'totalTitles'})
        }
    ]);

    let modal = nestElem([
        mkDiv({class:'md-modal dnone'}),
        {
            1:nestElem([
                mkDiv({class:'md-modal-background'}),
                mkbtn({class:'close-btn'})
            ]),
            2:nestElem([
                mkDiv({class:'md-modal-content md-modal-small'}),
                {
                    1:mkP({style:'text-align: center;', inner:'This will randomly pick from what is available depending on what tab you are currently on. Use the slider to change the number of picks.<br><sub>All - Picks from everything<br>Movies - will only pick from active movies</sub>'}),
                    2:nestElem([
                        mkDiv({class:'spcl'}),
                        {
                            1:mkinp({type:'range', step:'5', class:'input', name:'num', id:'num', min:'5', max:'15', value:'5', autocomplete:'off'}).input,
                            2:mkbtn({class:'button is-success is-responsive', id:'rand', inner:'Pick&nbsp;<span id="selected">5</span>&nbsp;at Random'})
                        }
                    ])
                }
            ])
        }
    ]);

    let presentation = nestElem([
        mkDiv({class:'presentation'}),
        mkDiv({class:'columns is-centered'}),
        mkDiv({class:'column is-half'}),
        mkDiv({class:'box'}),
        {
            1:rando,
            2:search,
            3:contentMsg,
            4:content
        }
    ]);

    body.prepend(header, presentation, modal);
    
// }
