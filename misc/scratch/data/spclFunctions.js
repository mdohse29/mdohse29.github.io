function mkDiv(c){
    let div = document.createElement('div');
    let d = c.split(' ');
    for (let e in d){
        div.classList.add(d[e]);
    }

    return div;
}

function mkinp(t, n, p){
    let input = document.createElement('input');
    input.type = t;
    input.name = n;
    input.id = n;
    if (p){
        input.placeholder = p;
    }
    return input;
}

function mkbtn(c, i, t){
    let btn = document.createElement('button');
    let d = c.split(' ');
    for (let e in d){
        btn.classList.add(d[e]);
    }
    btn.id = i;
    if (t){
        btn.innerText = t;
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

    let indiv2a1 = mkinp('text', 'search', 'Search');
    let indiv2a2 = mkinp('text', 'replace', 'Replace');
    let indiv2b1 = mkinp('checkbox', 'word');

    let lbdiv2b1 = document.createElement('label');

    let btndiv2a = mkbtn('btn btn-outline-success', 'rep', 'Replace');


    div2a.appendChild(indiv2a1);
    div2a.appendChild(indiv2a2);
    div2a.appendChild(btndiv2a);
    div2b.appendChild(indiv2b1);
    div2b.appendChild(lbdiv2b1);
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
    div1.appendChild(mkbtn('btn btn-close btn-dark', 'srch-close'));

    return div1;
}

let ts = document.querySelector('.toggle-cont');

ts.addEventListener('click', () => {
    let pill = document.querySelector('.toggle-pill');
    let pillStyle = window.getComputedStyle(pill);
    let marg = ts.scrollWidth - (pill.scrollWidth + 4);
    let currentMarg = pillStyle.marginLeft.replace('px','');
    
    if (currentMarg < marg){
        pill.style.setProperty('margin-left', marg + 'px');
        ts.classList.add('tg-on');
    }else{
        pill.style.setProperty('margin-left','2px');
        ts.classList.remove('tg-on');
    }
});

let labels = document.querySelectorAll('.switch-container > label');

for (let label of labels){
    label.addEventListener('click', () => {
        document.querySelector('.toggle-cont').click();
    });
}