import {nestElem, mkDiv, mkBtn, mrd, mkInp, mkHeader} from "../../scripts/crtElm-mod-min.js";
import {inputActions, inputKeyActions, addItem, editItem, addSubItem, loadList, documentKeyActions} from "./functions-2.0-min.js"
document.addEventListener('keydown', documentKeyActions, {capture:true});
document.body.prepend(nestElem([
    mkDiv({class:'container mt-5'}),
    mkDiv({class:'columns is-centered'}),
    mkDiv({class:'column is-two-thirds'}),
    mkDiv({class:'card'}),
    [
        nestElem([
            mkDiv({class:'card-header main-bg'}),
            mkHeader({size:1, class:'card-header-title is-justify-content-center is-size-1', inner:'ToDo List'})
        ]),
        nestElem([
            mkDiv({class:'card-content is-flex is-justify-content-space-between'}),
            [
                mkInp({type:'text', id:'item', spellcheck:'true', class:'input is-inline', placeholder:'e.g. Laundry or Laundry|Dishes|Yard work', title:'Multiple items at once should be separated with a pipe character |', autocomplete:'off', listeners:[{type:'keyup', execute:inputKeyActions}, {type:'input', execute:inputActions}]}),
                nestElem([
                    mkDiv({class:'listBtn'}),
                    [
                        mkBtn({class:'button ml-2 is-rounded is-info is-outlined', id:'addItem', inner:'Add Item', prop:{disabled:true}, listeners:[{type:'click', execute:addItem}]}),
                        mkBtn({class:'button ml-2 is-rounded is-link is-outlined dnone', id:'addSub', inner:'Add Sub Item', prop:{disabled:true}, listeners:[{type:'click', execute:addSubItem}]}),
                        mkBtn({class:'button ml-2 is-rounded is-warning dnone', id:'editItem', inner:'Edit Item', prop:{disabled:true}, listeners:[{type:'click', execute:editItem}]})
                    ]
                ])
            ]
        ]),
        nestElem([
            mkDiv({id:'list-container'}),
            mkDiv({class:'card-content py-3', id:'list'})
        ]),
        mkDiv({class:'card-footer pb-4 pt-4 main-bg'})
    ]
]));
mrd();

if (window.top === window.self){
    loadList('default');
    document.querySelector('#item').focus();
}