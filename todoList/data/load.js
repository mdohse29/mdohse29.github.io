document.body.prepend(nestElem([
    mkDiv({class:'container mt-5'}),
    mkDiv({class:'columns is-centered'}),
    mkDiv({class:'column is-two-thirds'}),
    mkDiv({class:'card'}),
    {
        1:nestElem([
            mkDiv({class:'card-header main-bg'}),
            [
                mkDiv({class:'card-header-title is-justify-content-center is-size-2', inner:'ToDo List'}),
                nestElem([
                    mkDiv({class:'settings-menu dnone'}),
                    mkBtn({id:'settings', class:'button ml-2 is-small is-rounded', inner:'<i class="bi bi-gear"></i>', listeners:[{type:'click', execute:openSettings}]})
                ])
            ]
        ]),
        2:nestElem([
            mkDiv({class:'card-content is-flex is-justify-content-space-between'}),
            {
                1:mkInp({type:'text', id:'item', spellcheck:'true', class:'input is-inline', placeholder:'e.g. Laundry or Laundry, Dishes, Yard work', title:'Multiple items at once should be separated with a comma ,', autocomplete:'off', listeners:[{type:'input', execute:inputActions}, {type:'keydown', execute:inputKeyActions}]}),
                2:nestElem([
                    mkDiv({class:'listBtn'}),
                    {
                        1:mkBtn({class:'button ml-2 is-rounded is-info is-outlined', id:'addItem', inner:'Add Item', listeners:[{type:'click', execute:addItem}]}),
                        2:mkBtn({class:'button ml-2 is-rounded is-link is-outlined dnone', id:'addSub', inner:'Add Sub Item', listeners:[{type:'click', execute:addItem}]}),
                        3:mkBtn({class:'button ml-2 is-rounded is-warning dnone', id:'editItem', inner:'Edit Item', listeners:[{type:'click', execute:clkEdit}]})
                    }
                ])
            }
        ]),
        4:nestElem([
            mkDiv({id:'list-container'}),
            mkDiv({class:'card-content', id:'list'})
        ]),
        5:mkDiv({class:'card-footer pb-4 pt-4 main-bg'})
    }
]));
mrd();