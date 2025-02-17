function coverClk () {
            
    document.querySelector('html').style = 'overflow: hidden;';

    let parent = this.parentElement.parentElement.parentElement;
    let btnClose = mkBtn({class:'btn btn-close btn-outline-danger'});
    let currentHeight = $(parent).height();
    
    parent.classList.add('active');

    btnClose.addEventListener('click', function () {

        let parent = document.querySelector('.active');
        let info = parent.querySelectorAll('.frame-info');

        this.remove();
        document.querySelector('html').removeAttribute('style');

        info.forEach(p => {
            p.classList.add('dnone');
        });
        
        parent.classList.remove('active');
        parent.querySelector('.frame-cover').classList.remove('dnone');
        parent.querySelector('.ratio').removeAttribute('style');
        document.querySelector('.header').removeAttribute('style');
        document.querySelector('.footer').removeAttribute('style');
        parent.querySelector('iframe').scrolling = 'no';

        let columns = document.querySelectorAll('.col-content');

        columns.forEach(col => {

            if (col.hasAttribute('style')){

                col.removeAttribute('style');

            }

        });

        // jquery for effects
        $(parent).addClass('dnone');
        $(parent).fadeIn({
            duration:1000,
            easing: 'swing',
            complete: function(){

                $(this).removeClass('dnone');
                $(this).removeAttr('style');

            }
        })

    });

    parent.querySelector('iframe').scrolling = 'auto';
    this.classList.add('dnone');
    
    let columns = document.querySelectorAll('.col-content');
    let info = parent.querySelectorAll('.frame-info');

    document.querySelector('.header').style.zIndex = 1;
    document.querySelector('.footer').style.zIndex = -1;

    info.forEach(p => {

        p.classList.remove('dnone');

    });
    
    columns.forEach(col => {

        if (!col.childNodes[0].classList.contains('active')){

            col.setAttribute('style', 'z-index: -1;');

        }else{

            col.setAttribute('style', 'height: ' + currentHeight + 'px;');

        }

    });

    let offset = document.querySelector('.active').querySelector('.card-title').scrollHeight * 2.65;
    let cardHeight = parent.clientHeight;
    let currentFrame = parent.querySelector('.ratio').clientHeight;
    let frameHeight = ((currentFrame - (currentFrame - cardHeight)) - offset) + 'px';

    // if (currentFrame > cardHeight)
    parent.querySelector('.ratio').style.height = frameHeight;

    parent.querySelector('.card-title').prepend(btnClose);

    // jquery for effects
    $(parent).addClass('dnone');
    $(parent).slideDown({
        duration: 700,
        complete:function(){

            $(this).removeClass('dnone');
            $(this).removeAttr('style');

        }
    });

}

function coverMe(){

    this.appendChild(mkBtn({class:'btn btn-info', id:'submit', inner:'Click to Engage'}));

}

function coverMl(){

    this.querySelector('#submit').remove();

}

function drawerClk(){

    let content = this.nextElementSibling;
    let openDrawer = document.querySelector('p[isexpanded="true"]');

    if (openDrawer && (openDrawer != content)){

        let parent = openDrawer.parentElement;

        parent.querySelector('i').classList.replace('bi-caret-down', 'bi-caret-right');
        parent.querySelector('h5').click();

    }

    if (content.getAttribute('isexpanded') === 'true'){

        $(content).slideUp({
            duration: 500,
            start: function(){

                let icon = $(this).parent().find('i');
                let fillCheck = $(icon).attr('class');

                if (fillCheck.includes('-fill')){

                    $(icon).addClass('bi-caret-right-fill');
                    $(icon).removeClass('bi-caret-down-fill');

                }else{

                    $(icon).addClass('bi-caret-right');
                    $(icon).removeClass('bi-caret-down');

                }

                $(this).attr('isexpanded', 'false');

            },
            complete: function(){

                $(this).parents('.drawer').addClass('border-bottom');
                $(this).addClass('dnone');
                $(this).removeAttr('style');

            }
        });

    }else{

        $(content).slideDown({
            duration: 500,
            start: function(){

                let icon = $(this).parent().find('i');
                let fillCheck = $(icon).attr('class');

                if (fillCheck.includes('-fill')){

                    $(icon).removeClass('bi-caret-right-fill');
                    $(icon).addClass('bi-caret-down-fill');

                }else{

                    $(icon).removeClass('bi-caret-right');
                    $(icon).addClass('bi-caret-down');

                }
                
                $(this).parent().removeClass('border-bottom');
                $(this).attr('isexpanded', 'true');
                $(this).removeClass('dnone');

            },
            complete: function(){

                $(this).removeAttr('style');

            }
        });

    }
}

function drawerMe(){

    let isExpanded = this.nextElementSibling.getAttribute('isexpanded');
    let icon = this.querySelector('i');

    if (isExpanded === 'true'){

        icon.classList.remove('bi-caret-down');
        icon.classList.add('bi-caret-down-fill');

    }else{

        icon.classList.remove('bi-caret-right');
        icon.classList.add('bi-caret-right-fill');

    }

}

function drawerMl(){

    let isExpanded = this.nextElementSibling.getAttribute('isexpanded');
    let icon = this.querySelector('i');

    if (isExpanded === 'true'){

        icon.classList.add('bi-caret-down');
        icon.classList.remove('bi-caret-down-fill');

    }else{

        icon.classList.add('bi-caret-right');
        icon.classList.remove('bi-caret-right-fill');
        
    }
}
