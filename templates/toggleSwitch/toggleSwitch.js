let ts = document.querySelector('.toggle-cont');

console.log(ts);

ts.addEventListener('click', () => {
    let pill = ts.querySelector('.toggle-pill');
    let pillMarg = ts.scrollWidth - (pill.scrollWidth + 4);
    if (pill.style.marginLeft < pillMarg){
        pill.style.marginLeft = pillMarg + 'px';
        ts.style.backgroundColor = "var(--bs-success)";
    }else{
        pill.removeAttribute('style');
        ts.removeAttribute('style');
    }
    
});