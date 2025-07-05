const slideshow = document.getElementById('slideshow-wrapper');

function rmvNext(){
    this.classList.remove('ss-next');
    this.classList.add('active');
    this.removeEventListener('transitionend', rmvNext)
}

function rmvPrev(){
    this.classList.remove('ss-previous');
    this.classList.add('active');
    this.removeEventListener('transitionend', rmvPrev)
}

$(slideshow)
.find('#previous')
.click(function(){
    const active = slideshow.querySelector('.active');
    const change = (active.previousElementSibling) ? active.previousElementSibling:active.parentElement.querySelector('.ss-item:last-child');
    
    active.classList.remove('active');
    active.addEventListener('transitionend', rmvPrev);
    active.classList.add('ss-previous')
    change.classList.add('active')
});

$(slideshow)
.find('#next')
.click(function(){
    const active = slideshow.querySelector('.active');
    const change = (active.nextElementSibling) ? active.nextElementSibling:active.parentElement.querySelector('.ss-item:first-child');
    
    change.addEventListener('transitionend', rmvNext);
    change.classList.add('ss-next');
    active.classList.remove('active');
});