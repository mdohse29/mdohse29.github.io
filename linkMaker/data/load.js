let pffCheck = mkinp({
    type:'checkbox',
    class:'checkbox',
    id:'pffCheck',
    label:'PFF File?&nbsp;',
    labelOpt:{
        class:'label is-inline'
    }
});
let exText = mkinp({
    type:'checkbox',
    class:'checkbox',
    id:'text',
    label:'Extra Text?&nbsp;',
    labelOpt:{
        class:'label is-inline'
    }
});

document.querySelector('body').prepend(nestElem([
    mkDiv({class:'container'}),
    {
        1:nestElem([
            mkDiv({class:'columns'}),
            mkDiv({class:'column'}),
            mkHead({hType:'h1', class:'title has-text-centered is-2', inner:'Link Maker 2.0'})
        ]),
        2:nestElem([
            mkDiv({class:'columns'}),
            mkDiv({class:'column'}),
            {
                1:nestElem([
                    mkDiv({class:'box', id:'selectMenu'}),
                    {
                        1:nestElem([
                            mkDiv({class:'field'}),
                            mkDiv({class:'select'}),
                            {
                                1:mkLabel({class:'label is-inline-block', for:'mediaType', inner:'Choose a type:&nbsp;'}),
                                2:mkinp({type:'select', id:'mediaType', options:[
                                    {
                                        value:'DOC',
                                        title:'aka CDN Link',
                                        inner:'Media File Link'
                                    },
                                    {
                                        value:'Animation',
                                        disabled:'disabled',
                                        inner:'Animation'
                                    },
                                    {
                                        value:'DLA',
                                        inner:'DLA'
                                    }
                                ]})
                            }
                        ]),
                        2:nestElem([
                            mkDiv({class:'field', title:'Does this have a transcript/CC?'}),
                            {
                                1:pffCheck.label,
                                2:pffCheck.input
                            }
                        ]),
                        3:nestElem([
                            mkDiv({class:'field', title:'Extra text will appear above or below the media.'}),
                            {
                                1:exText.label,
                                2:exText.input
                            }
                        ]),
                        4:nestElem([
                            mkDiv({class:'field'}),
                            mkbtn({class:'button mt-4 is-rounded is-info', id:'mediaselect', inner:'Submit'})
                        ])
                    }
                ]),
                2:mkDiv({class:'box dnone', id:'linkData'}),
                3:nestElem([
                    mkDiv({class:'box dnone', id:'linkBuild'}),
                    mkDiv({class:'head'}),
                    {
                        1:mkbtn({class:'button is-small is-info is-light', id:'showPreview', inner:'Preview'}),
                        2:mkHead({hType:'h1', class:'title has-text-centered', inner:'CDN Link'})
                    }
                ]),
                4:nestElem([
                    mkDiv({class:'box'}),
                    mkElem({elemType:'textarea', placeholder:'Area to keep notes', name:'notes', id:'notes', class:'textarea', cols:'30', rows:'5'})
                ])
            }
        ])
    }
]))