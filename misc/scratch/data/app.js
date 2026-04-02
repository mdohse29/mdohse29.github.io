function mkrtnl(){

    return nestElem([
        mkP({class:'me-3', id:'toolBox'}),
        mkLnk({href:'../../toolBox.html', innerText:'Return to ToolBox'})
    ]);

}

function crtad(){

    let disbchk = document.querySelectorAll('button');
    let btnenbl = false;
    // let strictSearch = mkInp({type:'checkbox', id:'word', label:'Strict Search', labelOpt:{class:'awesome'}});
    // let regex = mkInp({type:'checkbox', id:'regex', label:'Regex'});

    for (let btn of disbchk){
        if (btn.classList.contains('dnone') || btn.disabled){
            btnenbl = true;
            break;
        }
    }

    return nestElem([
        mkDiv({class:'spclFtr'}),
        [
            mkBtn({class:'btn btn-outline-danger btn-sm', id:'sandr', inner:'S&R', title:'Still a work in progress...'}),
            mkBtn({class:'btn btn-outline-danger btn-sm' + ((btnenbl) ? ' dnone' : ''), id:'stop', inner:'Disable Text Processing'}),
            mkBtn({class:'btn btn-outline-danger btn-sm' + ((btnenbl) ? '' : ' dnone'), id:'start', inner:'Enable Text Processing'}),
            mkBtn({class:'btn btn-outline-danger btn-sm', id:'caps', inner:'Transform All Caps', listeners:[{type:'click', execute:function(){let TA = document.querySelector('#TextArea'); if (TA.value.length) TA.value = TA.value.toUpperCase(); TA.focus()}}]}),
            // mkBtn({class:'btn btn-outline-danger btn-sm', id:'tgDblSpc', inner:'Toggle DblSpc'}),
            mkBtn({class:'btn btn-close btn-dark', id:'ad-close'})
        ]
    ]);
    
}

