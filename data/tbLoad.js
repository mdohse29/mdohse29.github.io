/*
.presentation
    .tilesContainer
        .expand
        .drawer
            .tiles
                .tile || flk

<span> && <span.red> for sub
*/
for (let drawer in drawers){

    let tilesContainer = document.createElement('div');
    tilesContainer.classList.add('tilesContainer');
    if (drawers[drawer].hidden){
        tilesContainer.classList.add('flk');
    }

    let expand = document.createElement('div');
    expand.classList.add('expand');
    expand.innerText = drawers[drawer].drawerTitle;

    let dwr = document.createElement('div');
    dwr.classList.add('drawer');

    let tiles = document.createElement('div');
    tiles.classList.add('tiles');


    let items = drawers[drawer].items;

    for (let item in items){
        let tile = document.createElement('div');
        tile.classList.add('tile');
        if (items[item].hidden){
            tile.classList.add('flk');
        }
        tile.setAttribute('url', items[item].url);

        let p = document.createElement('p');
        p.innerText = items[item].text.main;
        if (items[item].text.sub){
            let br = document.createElement('br');
            p.appendChild(br);

            let sub = document.createElement('span');
            if (items[item].text.warn){
                sub.classList.add('red');
            }
            sub.innerText = items[item].text.sub;

            p.appendChild(sub);
        }

        tile.appendChild(p);

        tiles.appendChild(tile);
    }

    dwr.appendChild(tiles);

    tilesContainer.appendChild(expand);

    tilesContainer.appendChild(dwr);

    document.querySelector('div.presentation').appendChild(tilesContainer);

}