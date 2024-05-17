let ts = document.querySelector('.toggle-cont');

// ts.addEventListener('click', () => {
//     let pill = ts.querySelector('.toggle-pill');
//     let pillMarg = ts.scrollWidth - (pill.scrollWidth + 4);
//     console.log(pillMarg)
//     if (pill.style.marginLeft < pillMarg){
//         pill.style.marginLeft = pillMarg + 'px';
//         ts.style.backgroundColor = "var(--bs-success)";
//     }else{
//         pill.removeAttribute('style');
//         ts.removeAttribute('style');
//     }
    
// });

ts.addEventListener('click', () => {
    let pill = document.querySelector('.toggle-pill');
    let pillStyle = window.getComputedStyle(pill);
    let marg = ts.scrollWidth - (pill.scrollWidth + 4);
    let currentMarg = pillStyle.marginLeft.replace('px','');
    
    if (currentMarg < marg){
        // console.log(currentMarg);
        pill.style.setProperty('margin-left', marg + 'px');
        // setTimeout(() => {
            ts.classList.add('tg-on');
        // }, 500);
    }else{
        pill.style.setProperty('margin-left','2px');
        // setTimeout(() => {
            ts.classList.remove('tg-on');
        // }, 500);
    }
});

let labels = document.querySelectorAll('.switch-container > label');

for (let label of labels){
    label.addEventListener('click', () => {
        document.querySelector('.toggle-cont').click();
    });
}