import {mkTable} from '../scripts/crtElm-mod-min.js';



let testdata = {
    test1:'test',
    test2:'test',
    test3:'test'
}
let table1 = mkTable({
    rows:[
        [
            {
                type:'td',
                attr:{
                    inner:'r1c1'
                }
            },
            {
                type:'td',
                attr:{
                    inner:'r1c2'
                }
            }
        ],
        [
            {
                type:'td',
                attr:{
                    inner:'r2c1'
                }
            },
            {
                type:'td',
                attr:{
                    inner:'r2c2'
                }
            }
        ]
    ]
});
let table2 = mkTable({
    thead:[
        [{type:'th', attr:{inner:'Nala Data', colspan:'3', style:'text-align:center;'}}]
    ],
    tbody:Object.entries(testdata).map(i=>{
        return [{type:'td', attr:{inner:i[0]}}, {type:'td', attr:{inner:i[1]}}]
    })
}, {class:'results-table'})

document.body.append(table1, table2)