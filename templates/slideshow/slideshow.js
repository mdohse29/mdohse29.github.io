    const slideshow = document.getElementById('slideshow-wrapper');

    // Reset slides after animation ends
    function ssComplete(){
        this.classList.remove('nxt', 'ss-next', 'prev', 'ss-previous');
        if (this.classList.contains('active')){
            this.classList.remove('active');
        }else{
            this.classList.add('active');
        }
        this.removeEventListener('animationend', ssComplete);
    }

    // Toggle between next and previous slides
    function toggleSlideShow(){
        const active = slideshow.querySelector('.active');
        const nxtSlide = (this.id === 'next')?active.nextElementSibling:active.previousElementSibling;
        const slide = (nxtSlide)?nxtSlide:active.parentElement.children[(this.id === 'next')?0:active.parentElement.children.length - 1];

        active.addEventListener('animationend', ssComplete);
        slide.addEventListener('animationend', ssComplete);
        
        if(this.id === 'next'){
            active.classList.add('ss-next');
            slide.classList.add('nxt', 'ss-next');
        }else{
            active.classList.add('ss-previous');
            slide.classList.add('prev', 'ss-previous');
        }

    }

    // Add listeners to buttons
    [...slideshow.querySelectorAll('#next, #previous')].forEach(btn=>{
        btn.addEventListener('click', toggleSlideShow);
    })