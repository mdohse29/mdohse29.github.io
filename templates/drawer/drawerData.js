const drawers = {
    drawer1 : {
        hidden: false,
        title: 'TitleForTheDrawer',
        buttons:{
            button1: {
                hidden: false,
                url: '',
                text: {
                    main: 'Button Display Text',
                    sub: 'Optional Sub Text',
                    warn: false
                }
            }
        }
    },
    drawer2 : {
        hidden: true,
        title: 'TitleForTheDrawer',
        buttons:{
            button1: {
                hidden: false,
                url: '',
                text: {
                    main: 'Button Display Text',
                    sub: 'Optional Important Sub Text',
                    warn: true
                }
            }
        }
    }
}