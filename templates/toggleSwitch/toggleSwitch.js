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
            setTimeout(() => {
                container.classList.add('tg-on');
            }, 500);
        }else{
            pill.style.setProperty('margin-left','2px');
            setTimeout(() => {
                container.classList.remove('tg-on');
            }, 500);
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