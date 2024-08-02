    window.onload = function(){

    let covers = document.querySelectorAll('.frame-cover');

    covers.forEach(cover => {

        cover.addEventListener('click', function () {
            
            document.querySelector('html').style = 'overflow: hidden;';

            let parent = this.parentElement.parentElement.parentElement;
            let btnClose = mkbtn({class:'btn btn-close btn-outline-danger'});
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

        });

    });

    let frameCovers = document.querySelectorAll('.frame-cover');

    frameCovers.forEach(cover => {

        cover.addEventListener('mouseenter', function(){

            this.appendChild(mkbtn({class:'btn btn-info', id:'submit', inner:'Click to Engage'}));

        });

        cover.addEventListener('mouseleave', function(){

            this.querySelector('#submit').remove();

        });

    });

    let drawers = document.querySelectorAll('.drawer');

    drawers.forEach(drawer => {
        
        let test = drawer.querySelector('p').getAttribute('isexpanded');

        drawer.querySelector('h5').prepend(mkElem({elemType:'i', class:'bi ' + ((test === 'true') ? 'bi-caret-down' : 'bi-caret-right')}))
        drawer.querySelector('h5').addEventListener('click', function(){

            let content = drawer.querySelector('p');
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

                        let fillCheck = $(this).parent().find('i').attr('class');

                        if (fillCheck.includes('-fill')){

                            $(this).parent().find('i').addClass('bi-caret-right-fill');
                            $(this).parent().find('i').removeClass('bi-caret-down-fill');

                        }else{

                            $(this).parent().find('i').addClass('bi-caret-right');
                            $(this).parent().find('i').removeClass('bi-caret-down');

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

                        let fillCheck = $(this).parent().find('i').attr('class');

                        if (fillCheck.includes('-fill')){

                            $(this).parent().find('i').removeClass('bi-caret-right-fill');
                            $(this).parent().find('i').addClass('bi-caret-down-fill');

                        }else{

                            $(this).parent().find('i').removeClass('bi-caret-right');
                            $(this).parent().find('i').addClass('bi-caret-down');

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
        });

        drawer.querySelector('h5').addEventListener('mouseenter', function(){

            let isExpanded = drawer.querySelector('p').getAttribute('isexpanded');
            let icon = this.querySelector('i');

            if (isExpanded === 'true'){

                icon.classList.remove('bi-caret-down');
                icon.classList.add('bi-caret-down-fill');

            }else{

                icon.classList.remove('bi-caret-right');
                icon.classList.add('bi-caret-right-fill');

            }

        });

        drawer.querySelector('h5').addEventListener('mouseleave', function(){

            let isExpanded = drawer.querySelector('p').getAttribute('isexpanded');
            let icon = this.querySelector('i');

            if (isExpanded === 'true'){

                icon.classList.add('bi-caret-down');
                icon.classList.remove('bi-caret-down-fill');

            }else{

                icon.classList.add('bi-caret-right');
                icon.classList.remove('bi-caret-right-fill');
                
            }
        });
        
    });

}