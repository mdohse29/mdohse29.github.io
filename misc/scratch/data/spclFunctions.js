function mkrtnl(){
    let rtrnTB = document.createElement('p');
    let TB = mkLnk({href:'../../toolBox.html', innerText:'Return to ToolBox'});
    rtrnTB.id = 'toolBox';
    rtrnTB.classList.add('me-3');
    rtrnTB.appendChild(TB);

    return rtrnTB;
}

function crtad(){
    let disbchk = document.querySelectorAll('button');
    let btnenbl = false;

    let div1 = mkDiv({class:'spclFtr m-2'});
    let div2 = mkDiv({class:'dnone search-replace'});
    let div2a = mkDiv({class:'search'});
    let div2b = mkDiv({class:'search-options d-block'});

    let indiv2a1 = mkinp({type:'text', name:'search', placeholder:'Search', class:'form-control'});
    let indiv2a2 = mkinp({type:'text', name:'replace', placeholder:'Replace', class:'form-control'});
    let indiv2b1 = mkinp({type:'checkbox', name:'word', label:'Strict Search', labelOpt:{class:'awesome'}});
    let indiv2b2 = mkinp({type:'checkbox', name:'regex', label:'Regex'});

    let btndiv2a = mkbtn({class:'btn btn-outline-success', id:'rep', inner:'Replace'});
    let btndiv2acls = mkbtn({class:'btn btn-close btn-dark btn-lg mx-2', id:'search-close'});

    div2a.appendChild(indiv2a1.input);
    div2a.appendChild(indiv2a2.input);
    div2a.appendChild(btndiv2a);
    div2a.appendChild(btndiv2acls);
    div2b.appendChild(indiv2b1.input);
    div2b.appendChild(indiv2b1.label);
    div2b.appendChild(indiv2b2.input);
    div2b.appendChild(indiv2b2.label);
    div2.appendChild(div2a);
    div2.appendChild(div2b);
    div1.appendChild(div2);
    div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'sandr', inner:'S&R'}));

    for (let btn of disbchk){
        if (btn.disabled){
            btnenbl = btn.disabled;
            break;
        }
    }

    if (btnenbl){
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm dnone', id:'stop', inner:'Disable Text Processing'}));
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'start', inner:'Enable Text Processing'}));
    }else{
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'stop', inner:'Disable Text Processing'}));
        div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm dnone', id:'start', inner:'Enable Text Processing'}));
    }

    div1.appendChild(mkbtn({class:'btn btn-outline-danger btn-sm', id:'ff', inner:'Format Filename'}));
    div1.appendChild(mkbtn({class:'btn btn-close btn-dark', id:'ad-close'}));

    return div1;
}

