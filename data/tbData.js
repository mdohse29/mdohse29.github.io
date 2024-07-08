const drawers = {
    drawer1 : {
        hidden: false,
        title: 'Home Made Tools',
        buttons:{
            button1: {
                hidden: true,
                url: './repo/glyn/repo_lookup.htm',
                text: {
                    main: 'Repo Lookup',
                    sub: 'RETIRED',
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
                hidden: false,
                url: './linkMaker/',
                text: {
                    main: 'The CDN Link Maker',
                    sub: '',
                    warn: false
                }
            },
            button5: {
                hidden: true,
                url:'https://cdn.lti.glynlyon.com/media/43010bf5-de09-4dfe-879d-da7e4e791ccb/misc/scratchPad.html',
                text:{
                    main:'CDN Scratch Pad',
                    sub:'Routed through the GL CDN',
                    warn:true
                }
            },
            button4: {
                hidden: false,
                url: './misc/scratch/',
                text: {
                    main: 'Scratch Pad for notes',
                    sub: '(Does not save)',
                    warn: true
                }
            }
        }
    },
    drawer2 : {
        hidden: false,
        title: 'Company Tools',
        buttons:{
            button1: {
                hidden: true,
                url: 'https://ims-tools.owteam.com/',
                text: {
                    main: 'IMS Tools',
                    sub: '(IL VPN Required)',
                    warn: true
                }
            },
            button2: {
                hidden: false,
                url: 'http://learn.bluejacks.edgenuity.com/login/',
                text: {
                    main: 'Bluejacks',
                    sub: '(Chrome Only)',
                    warn: true
                }
            },
            button3: {
                hidden: false,
                url: 'https://cayman-ui.glct-prod.il-apps.com/#/login',
                text: {
                    main: 'Cayman Production',
                    sub: 'NEW',
                    warn: false
                }
            },
            button4: {
                hidden: true,
                url: 'https://curriculum-management.owteam.com/',
                text: {
                    main:'Cayman Production',
                    sub:'OLD Retiring',
                    warn: true
                }
            },
            button5: {
                hidden: false,
                url: './helpDocs.html',
                text: {
                    main: 'Help Documents',
                    sub: 'Bluejacks and HTML',
                    warn: false
                }
            },
            button6: {
                hidden: false,
                url: './workDocs/htmlGlossaryHelp.html',
                text: {
                    main: 'HTML Glossary Help',
                    sub: 'HTML Vocab/Glossary',
                    warn: false
                }
            },
            button7: {
                hidden: false,
                url: 'http://sandbox.education2020.com/curriculum/',
                text: {
                    main: '{N}ternal Tools',
                    sub: '',
                    warn: false
                }
            },
            button8: {
                hidden: false,
                url: 'https://media.edgenuity.com/contentengine/common/closereader/',
                text: {
                    main: 'CloseReaders Index',
                    sub: '',
                    warn: false
                }
            }
        }
    },
    drawer5 : {
        hidden: true,
        title:'Company Platforms',
        buttons:{
            button1 : {
                hidden: false,
                url:'http://45sandbox.education2020.com/',
                text:{
                    main:'CW 4.5 SandBox',
                    sub:'Courseware',
                    warn: false
                }
            },
            button2 : {
                hidden: false,
                url:'https://auth.qa.edgenuity.com/Login/',
                text:{
                    main:'CW QA',
                    sub:'Courseware',
                    warn: false
                }
            },
            button3:{
                hidden: false,
                url:'https://auth.edgenuity.com/Login/Login/',
                text:{
                    main:'CW Production',
                    sub:'Courseware',
                    warn: false
                }
            },
            button4 : {
                hidden: false,
                url:'https://curric-stage.owschools.com/owsoo/login/auth',
                text:{
                    main:'OW Curric Stage',
                    sub:'Odysseyware',
                    warn: false
                }
            },
            button5 : {
                hidden: false,
                url:'https://curric-stage.sooschools.com/owsoo/login/auth',
                text:{
                    main:'AOP Curric Stage',
                    sub:'Alpha Omega',
                    warn: false
                }
            },
            button6 : {
                hidden: true,
                url:'https://consumer-lms.cns-staging-shard-monarch.il-consumer.com/',
                text:{
                    main:'Monarch Stage',
                    sub:'Consumer',
                    warn: false
                }
            },
            button7 : {
                hidden: true,
                url:'https://consumer-lms.cns-staging-shard-calvert.il-consumer.com/',
                text:{
                    main:'Calvert Stage',
                    sub:'Consumer',
                    warn: false
                }
            },
            button8 : {
                hidden: false,
                url:'https://testapp.imaginelearning.com/?dev',
                text:{
                    main:'Imagine Learning',
                    sub:'Legacy IL Test App',
                    warn: false
                }
            }
        }
    },
    drawer3 : {
        hidden: false,
        title: 'Import HTML Courses',
        buttons:{
            button1: {
                hidden: false,
                url: 'http://sandbox.education2020.com/questionimporter/',
                text: {
                    main: 'CW Question Importer',
                    sub: '',
                    warn: false
                }
            },
            button2: {
                hidden: false,
                url: 'http://sandbox.education2020.com/CurriculumUpload/UserLogin.aspx',
                text: {
                    main: 'CW CUT',
                    sub: 'Curriculum Upload Tool',
                    warn: false
                }
            },
            button3: {
                hidden: true,
                url: 'http://tools.education2020.com/CMT/',
                text: {
                    main: 'CW CMT',
                    sub: 'OLD<br>Content Management Tool',
                    warn: true
                }
            },
            button4: {
                hidden: false,
                url: 'http://cmt.education2020.com/CMT/',
                text: {
                    main: 'CW CMT',
                    sub: 'Content Management Tool',
                    warn: false
                }
            }
        }
    },
    drawer4 : {
        hidden: false,
        title: 'Other Stuff',
        buttons:{
            button1: {
                hidden: false,
                url: 'https://www.guidgenerator.com/online-guid-generator.aspx',
                text: {
                    main: 'GUID Generator',
                    sub: '',
                    warn: false
                }
            },
            button2: {
                hidden: false,
                url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference',
                text: {
                    main: 'MDN',
                    sub: '',
                    warn: false
                }
            },
            button3: {
                hidden: false,
                url: 'https://www.diffchecker.com/text-compare/',
                text: {
                    main: 'Online Diff Checker',
                    sub: '',
                    warn: false
                }
            },
            button4: {
                hidden: false,
                url: 'https://getbootstrap.com/docs/5.3/getting-started/introduction/',
                text: {
                    main: 'Bootstrap Docs',
                    sub: '',
                    warn: false
                }
            },
            button5: {
                hidden: false,
                url: 'https://bulma.io/documentation/',
                text: {
                    main: 'Bulma Docs',
                    sub: '',
                    warn: false
                }
            },
            button6: {
                hidden: false,
                url: 'https://nodejs.org/docs/latest-v18.x/api/index.html',
                text: {
                    main: 'NodeJS Docs',
                    sub: '',
                    warn: false
                }
            },
            button7: {
                hidden: false,
                url: 'https://dev.to',
                text: {
                    main: 'DEV',
                    sub: '(dev.to)',
                    warn: false
                }
            }
        }
    }
}