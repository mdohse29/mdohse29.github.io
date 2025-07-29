let drawers = null;
async function getData(){
    const data = await fetch('./tbData.json');
    if (data.ok){
        return data.json();
    }
    return null;
}

async function createNavBtns() {
    drawers = await getData();
    if (drawers)
        for (d of drawers){
            if (!d.hidden)
            document.querySelector('nav .btn-group').appendChild(
                mkBtn({
                    class:'btn btn-primary p-3',
                    id:d.id,
                    inner:d.title
                })
            );
        }
}

let nav_bar = nestElem([
    mkElem({elemType:'header', style:'padding: 0 10%;'}),
    mkElem({elemType:'nav', class:'navbar bg-body-tertiary'}),
    mkDiv({class:'container-fluid'}),
    mkDiv({class:'btn-group', 'aria-label':'Categories'})
]);

document.body.prepend(nav_bar, mkElem({elemType:'main', style:`padding: 0 10%;`}));
createNavBtns();