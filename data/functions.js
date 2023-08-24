const flk = document.querySelectorAll('.flk');

if (flk.length <= 0){
    document.querySelector('#magic').style.display = 'none'
}

const magic = document.querySelector('#magic');

magic.addEventListener('click', () => {
    if (flk.length > 0){
        for (let i of flk){
            if (i.style.display === 'none'){
                if (i.classList.contains('msg')){
                    i.style.display = 'grid';
                }else{
                    i.style.display = 'flex';
                }
            }else{
                i.style.display = 'none';
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
        tile.style.boxShadow = '0px 0px 5px 0px darkgrey';
    });
    tile.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    tile.addEventListener('mouseup', (e) => {
        const link = tile.getAttribute('url');
        tile.style.boxShadow = '0px 0px 5px 3px darkgrey';
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
                    window.open(link, '_blank');
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
                }
                drawer.style.maxHeight = drawer.scrollHeight + 'px'
            }else{
                drawer.style.maxHeight = null;

            }
            drawer.classList.toggle('selected');
            
    })
}