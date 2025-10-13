import {mkTable} from '../../scripts/crtElm-mod-min.js';

document.getElementById('root').append(
    mkTable({
        rows:[
            [{type:'th', attr:{inner:'Wow, What a Table!', colspan:'3'}}],
            [{type:'th', attr:{inner:'Test 1'}},{type:'th', attr:{inner:'Test 2'}},{type:'th', attr:{inner:'Test 3'}}],
            [
                {type:'td', attr:{inner:'Let\'s do'}},
                {type:'td', attr:{inner:'some testing'}},
                {type:'td', attr:{inner:'with this'}}
            ],
            [
                {type:'td', attr:{inner:'Let\'s do'}},
                {type:'td', attr:{inner:'some testing'}},
                {type:'td', attr:{inner:'with this'}}
            ]
        ]
    }, {class:'grid'})
)