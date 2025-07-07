const slideshow = document.getElementById('slideshow-wrapper');

function rmvNext(){
    this.classList.remove('nxt', 'ss-next');
    if (this.classList.contains('active')){
        this.classList.remove('active');
    }else{
        this.classList.add('active');
    }
    this.removeEventListener('animationend', rmvNext);
}

function rmvPrev(){
    this.classList.remove('prev', 'ss-previous');
    if (this.classList.contains('active')){
        this.classList.remove('active');
    }else{
        this.classList.add('active');
    }
    this.removeEventListener('animationend', rmvPrev);
}

$(slideshow)
.find('#previous')
.click(function(){
    const active = slideshow.querySelector('.active');
    const change = (active.previousElementSibling) ? active.previousElementSibling:active.parentElement.querySelector('.ss-item:last-child');
    
    active.addEventListener('animationend', rmvPrev);
    change.addEventListener('animationend', rmvPrev);
    active.classList.add('ss-previous');
    change.classList.add('prev', 'ss-previous');
});

$(slideshow)
.find('#next')
.click(function(){
    const active = slideshow.querySelector('.active');
    const change = (active.nextElementSibling) ? active.nextElementSibling:active.parentElement.querySelector('.ss-item:first-child');
    
    active.addEventListener('animationend', rmvNext);
    change.addEventListener('animationend', rmvNext);
    active.classList.add('ss-next');
    change.classList.add('nxt', 'ss-next');
});