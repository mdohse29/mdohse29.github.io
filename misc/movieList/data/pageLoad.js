// let body = document.querySelector('body');

let rando = nestElem([
    mkDiv({class:'rando mb-2'}),
    mkBtn({class:'button is-small is-info is-rounded is-responsive', inner:'Random'}),
]);

let search = nestElem([
    mkDiv({class:'search'}),
    {
        1:mkInp({type:'text', name:'q', class:'input is-info', id:'search-box', placeholder:'Search Title Here', autocomplete:'off'}),
        2:mkBtn({class:'button is-info ml-1 d-none', id:'submit-reset', inner:'Reset'})
    }
]);

let header = nestElem(
    [
        mkDiv({class:'heading'}),
        mkDiv({class:'columns is-centered'}),
        mkDiv({class:'column is-half'}),
        mkDiv({class:'title'}),
        mkElem({inner:'Full Movie List', elemType:'h1'})
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
        1:mkDiv({class:'tab has-background-info-light active', tabindex:'1', title:'All active movies, archived movies, and tv shows.', tag:'all', inner:'All'}),
        2:mkDiv({class:'tab has-background-info-light', tabindex:'1', title:'All active movies available to watch on the server.', tag:'mov', inner:'Movies'}),
        3:mkDiv({class:'tab has-background-info-light', tabindex:'1', title:'All active tv shows available to watch on the server.', tag:'tv', inner:'TV Shows'}),
        4:mkDiv({class:'tab has-background-info-light', tabindex:'1', title:'All archived movies that are available for request to be active.', tag:'arch', inner:'Movie Archive'}),
        5:mkDiv({class:'tab has-background-info-light', tabindex:'1', title:'All archived tv shows that are available for request to be active.', tag:'tvarch', inner:'TV Archive'})
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
    mkDiv({class:'md-modal dnone', id:'randGen'}),
    {
        1:nestElem([
            mkDiv({class:'md-modal-background'}),
            mkBtn({class:'close-btn'})
        ]),
        2:nestElem([
            mkDiv({class:'md-modal-content md-modal-small'}),
            {
                1:mkP({class:'has-text-centered', inner:'This will randomly pick from what is available depending on what tab you are currently on. Use the slider to change the number of picks.<br><sub>All - Picks from everything<br>Movies - will only pick from active movies</sub>'}),
                2:nestElem([
                    mkDiv({class:'rand-cont'}),
                    {
                        1:mkInp({type:'range', step:'5', class:'input', name:'num', id:'num', min:'5', max:'15', value:'5', autocomplete:'off'}),
                        2:mkBtn({class:'button is-success is-responsive', id:'rand', inner:'Pick&nbsp;<span id="selected">5</span>&nbsp;at Random'})
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

nestElem([
    document.body,
    {
        1:header,
        2:presentation,
        3:modal
    }
])