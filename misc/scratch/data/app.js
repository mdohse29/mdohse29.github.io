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
            mkBtn({class:'btn btn-outline-danger btn-sm', id:'abc', inner:'A -> Z', title:'Alphabetize a list', listeners:[{type:'click', execute:()=>{let TA = document.querySelector('#TextArea'); if (TA.value.length){let temp = TA.value.split('\n'); temp.sort(); TA.value=temp.join('\n');} TA.focus();}}]}),
            mkBtn({class:'btn btn-outline-danger btn-sm', id:'clrun', inner:'Clear Unselected', listeners:[{type:'click', execute:()=>{
                const textarea = document.querySelector('textarea'),
                start = textarea.selectionStart,
                end = textarea.selectionEnd
                if (start!==end)
                    textarea.value = textarea.value.substring(start, end);
                textarea.focus();
            }}]}),
            mkBtn({class:'btn btn-outline-danger btn-sm', id:'caps', inner:'Transform All Caps', listeners:[{type:'click', execute:()=>{let TA = document.querySelector('#TextArea'); if (TA.value.length) TA.value = TA.value.toUpperCase(); TA.focus()}}]}),
            mkBtn({class:'btn btn-outline-danger btn-sm' + ((btnenbl) ? ' dnone' : ''), id:'stop', inner:'Disable Text Processing'}),
            mkBtn({class:'btn btn-outline-danger btn-sm' + ((btnenbl) ? '' : ' dnone'), id:'start', inner:'Enable Text Processing'}),
            mkBtn({class:'btn btn-close btn-dark', id:'ad-close'})
        ]
    ]);
    
}

