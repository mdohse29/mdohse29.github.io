const drawers = {
    drawer1 : {
        hidden: false,
        title: 'Silly Things I Made',
        buttons:{
            button1: {
                hidden: false,
                url: './picker/',
                text: {
                    main: 'Gift Picker',
                    sub: 'Seasonal',
                    warn: true
                }
            },
            button2: {
                hidden: false,
                url: './misc/movieList/',
                text: {
                    main: 'Full Movie List',
                    sub: '',
                    warn: false
                }
            },
            button3: {
                hidden: false,
                url: './misc/scratch/',
                text: {
                    main: 'Scratch Pad for notes',
                    sub: '(Does not save)',
                    warn: true
                }
            },
            button4: {
                hidden: true,
                url: './templates/',
                text: {
                    main: 'Templates I Made',
                    sub: '',
                    warn: false
                }
            }
        }
    }
}