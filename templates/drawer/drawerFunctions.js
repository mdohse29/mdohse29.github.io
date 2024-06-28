const flk = document.querySelectorAll('.flk');

if (flk.length <= 0){
    document.querySelector('#magic').classList.add('dnone');
}

const magic = document.querySelector('#magic');

magic.addEventListener('click', () => {
    if (flk.length > 0){
        for (let i of flk){
            if (i.classList.contains('dnone')){
                // if (i.classList.contains('msg')){
                //     i.style.display = 'grid';
                // }else if(i.classList.contains('tilesContainer')){
                //     i.style.display = 'block';
                // }else{
                //     i.style.display = 'flex';
                // }
                i.classList.remove('dnone');
            }else{
                i.classList.add('dnone');
            }
        }
    }
});

magic.addEventListener('mouseenter', () => {
    magic.style.border = '1px solid red';
});
magic.addEventListener('mouseleave', () => {
    magic.style.border = 'none';
});

const tiles = document.querySelectorAll('.tile');

for (let tile of tiles){
    tile.addEventListener('mousedown', () => {
        tile.classList.add('click');
    });
    tile.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    tile.addEventListener('mouseup', (e) => {
        const link = tile.getAttribute('url');
        tile.classList.remove('click');
        if (link){
            switch(e.button){
                case 0:
                    if (link.includes('http')){
                        window.open(link, '_blank');
                    }else{
                        window.open(link, '_self');
                    }
                    break;
                case 1:
                    window.open(link, '_blank', 'popup');
                    break;
            }
        }
    });
}

const expand = document.querySelectorAll('.expand');

for (let ex of expand){
        ex.addEventListener('click', function () {
            const parent = this.parentElement;
            let drawer = parent.querySelector('.drawer');
            let openDrawer = document.querySelector('.selected');
            if (!drawer.classList.contains('selected')){
                if (openDrawer != null){
                    openDrawer.classList.remove('selected');
                    openDrawer.style.maxHeight = null;
                    openDrawer.parentElement.querySelector('.expand').removeAttribute('style');
                }
                drawer.style.maxHeight = drawer.scrollHeight + 'px';
                this.style.borderRadius = '5px 5px 0px 0px';
            }else{
                drawer.style.maxHeight = null;
                this.removeAttribute('style');

            }
            drawer.classList.toggle('selected');
            
    })
}