const drawers = {
    drawer1 : {
        hidden: false,
        title: 'Silly Things I Made',
        buttons:{
            button1: {
                hidden: true,
                url: './picker/',
                text: {
                    main: 'Gift Picker',
                    sub: 'Seasonal',
                    warn: true
                }
            },
            button2: {
                hidden: true,
                url: './misc/movieList/',
                text: {
                    main: 'Full Movie List',
                    sub: '',
                    warn: false
                }
            },
            button3: {
                hidden: true,
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
            },
            button5: {
                hidden: false,
                url: './display/',
                text: {
                    main: 'Page Gallery',
                    sub: '',
                    warn: false
                }
            },
            button6: {
                hidden: false,
                url: './todoList/',
                text: {
                    main: 'Todo List',
                    sub: 'Temp Save w/ Cookie',
                    warn: true
                }
            }
        }
    }
}