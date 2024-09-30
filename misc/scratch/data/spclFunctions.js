function mkrtnl(){

    return nestElem([
        mkP({class:'me-3', id:'toolBox'}),
        mkLnk({href:'../../toolBox.html', innerText:'Return to ToolBox'})
    ]);

}

function crtad(){

    let disbchk = document.querySelectorAll('button');
    let btnenbl = false;
    let strictSearch = mkInp({type:'checkbox', id:'word', label:'Strict Search', labelOpt:{class:'awesome'}});
    let regex = mkInp({type:'checkbox', id:'regex', label:'Regex'});

    for (let btn of disbchk){
        if (btn.classList.contains('dnone') || btn.disabled){
            btnenbl = true;
            break;
        }
    }

    return nestElem([
        mkDiv({class:'spclFtr m-2'}),
        {
            1:nestElem([
                mkDiv({class:'dnone search-replace'}),
                {
                    1:nestElem([
                        mkDiv({class:'search'}),
                        {
                            1:mkInp({type:'text', id:'search', placeholder:'Search', class:'form-control', autocomplete:'off'}),
                            2:mkInp({type:'text', id:'replace', placeholder:'Replace', class:'form-control', autocomplete:'off'}),
                            3:mkBtn({class:'btn btn-outline-success', id:'rep', inner:'Replace'}),
                            4:mkBtn({class:'btn btn-close btn-dark btn-lg mx-2', id:'search-close'})
                        }
                    ])/*,
                    2:nestElem([
                        mkDiv({class:'search-options d-block'}),
                        {
                            1:strictSearch.input,
                            2:strictSearch.label,
                            3:regex.input,
                            4:regex.label
                        }
                    ])*/
                }
            ]),
            2:mkBtn({class:'btn btn-outline-danger btn-sm', id:'sandr', inner:'S&R', title:'Still a work in progress...'}),
            3:mkBtn({class:'btn btn-outline-danger btn-sm' + ((btnenbl) ? ' dnone' : ''), id:'stop', inner:'Disable Text Processing'}),
            4:mkBtn({class:'btn btn-outline-danger btn-sm' + ((btnenbl) ? '' : ' dnone'), id:'start', inner:'Enable Text Processing'}),
            5:mkBtn({class:'btn btn-outline-danger btn-sm', id:'ff', inner:'Format Filename'}),
            6:mkBtn({class:'btn btn-outline-danger btn-sm', id:'tgDblSpc', inner:'Toggle DblSpc'}),
            20:mkBtn({class:'btn btn-close btn-dark', id:'ad-close'})
        }
    ]);
    
}

