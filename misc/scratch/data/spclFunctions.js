function mkDiv(c){
    let div = document.createElement('div');
    div.classList.add(...c.split(' '));

    return div;
}

function mkinp(t, n, p, c, o){
    let input = document.createElement('input');
    let label = undefined;
    input.type = t;
    input.name = n;
    input.id = n;
    if (t === "text" && p){
        input.placeholder = p;
        input.classList.add(...c.split(' '));
    }
    if (t === 'checkbox'){
        label = document.createElement('label');
        label.innerText = p;
        label.setAttribute('for', n);
    }
    
    if (t === 'select' && typeof(o) == 'object'){
        input = document.createElement(t);
        input.classList.add(...c.split(' '));
        input.id = n;
        input.name = n;

        for (let a in o){
            let option = document.createElement('option');
            option.classList.add(o[a].toLowerCase());
            option.value = o[a].toLowerCase();
            option.innerText = o[a][0].toUpperCase() + o[a].substring(1);
            input.appendChild(option);
        }
    }

    return {input:input, label:label};
}

function mkbtn(c, i, t, tt){
    let btn = document.createElement('button');

    btn.classList.add(...c.split(' '));
    btn.id = i;
    if (t){
        btn.innerText = t;
    }

    if (tt){
        btn.title = tt;
    }

    return btn;
}

function mkrtnl(){
    let rtrnTB = document.createElement('p');
    let TB = document.createElement('a');
    TB.href = '../../toolBox.html';
    TB.innerText = 'Return to ToolBox';
    rtrnTB.id = 'toolBox';
    rtrnTB.classList.add('me-3');
    rtrnTB.appendChild(TB);

    return rtrnTB;
}

function crtad(){
    let disbchk = document.querySelectorAll('button');
    let btnenbl = false;
    let div1 = mkDiv('spclFtr m-2');
    let div2 = mkDiv('dnone search-replace');
    let div2a = mkDiv('search');
    let div2b = mkDiv('search-options d-block');

    let indiv2a1 = mkinp('text', 'search', 'Search', 'form-control');
    let indiv2a2 = mkinp('text', 'replace', 'Replace', 'form-control');
    let indiv2b1 = mkinp('checkbox', 'word', 'Strict Search');
    let indiv2b2 = mkinp('checkbox', 'regex', 'Regex');

    let btndiv2a = mkbtn('btn btn-outline-success', 'rep', 'Replace');
    let btndiv2acls = mkbtn('btn btn-close btn-dark btn-lg mx-2', 'search-close');

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
    div1.appendChild(mkbtn('btn btn-outline-danger btn-sm', 'sandr', 'S&R'));

    for (let btn of disbchk){
        if (btn.disabled){
            btnenbl = btn.disabled;
            break;
        }
    }

    if (btnenbl){
        div1.appendChild(mkbtn('btn btn-outline-danger btn-sm dnone', 'stop', 'Disable Text Processing'));
        div1.appendChild(mkbtn('btn btn-outline-danger btn-sm', 'start', 'Enable Text Processing'));
    }else{
        div1.appendChild(mkbtn('btn btn-outline-danger btn-sm', 'stop', 'Disable Text Processing'));
        div1.appendChild(mkbtn('btn btn-outline-danger btn-sm dnone', 'start', 'Enable Text Processing'));
    }

    div1.appendChild(mkbtn('btn btn-outline-danger btn-sm', 'ff', 'Format Filename'));
    div1.appendChild(mkbtn('btn btn-close btn-dark', 'ad-close'));

    return div1;
}

let toggles = document.querySelectorAll('.toggle-pill');

for(let ts of toggles){
    ts.addEventListener('click', function(){
        let pill = this;
        let container = pill.parentElement;
        let pillStyle = window.getComputedStyle(pill);
        let marg = container.scrollWidth - (pill.scrollWidth + 4);
        let currentMarg = pillStyle.marginLeft.replace('px','');
        
        if (currentMarg < marg){
            pill.style.setProperty('margin-left', marg + 'px');
            container.classList.add('tg-on');
        }else{
            pill.style.setProperty('margin-left','2px');
            container.classList.remove('tg-on');
        }
        document.querySelector('textarea').focus();
    });
}
let labels = document.querySelectorAll('.switch-container > label');

for (let label of labels){
    label.addEventListener('click', function(){
        // document.querySelector('.toggle-pill').click();
        this.parentElement.children[1].children[0].click();
    });
}