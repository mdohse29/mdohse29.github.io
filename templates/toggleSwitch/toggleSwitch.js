let toggles = document.querySelectorAll('.toggle-pill');

for(let ts of toggles){
    ts.addEventListener('click', function(){
        let pill = this;
        let container = this.parentElement;
        let pillStyle = window.getComputedStyle(pill);
        let marg = container.scrollWidth - (pill.scrollWidth + 4);
        let currentMarg = pillStyle.marginLeft.replace('px','');
        
        if (currentMarg < marg){
            // console.log(currentMarg);
            pill.style.setProperty('margin-left', marg + 'px');
            container.classList.add('tg-on');
        }else{
            pill.style.setProperty('margin-left','2px');
            container.classList.remove('tg-on');
        }
    });
}

let labels = document.querySelectorAll('.switch-container > label');

for (let label of labels){
    label.addEventListener('click', function(){
        // document.querySelector('.toggle-pill').click();
        this.parentElement.children[1].children[0].click();
    });
}

document.querySelector('.presentation').appendChild(createToggle({id: 'test3', label: 'Test 3', isLocked: 'false'}))