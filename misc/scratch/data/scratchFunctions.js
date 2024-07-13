$(document).ready(function(){
    // Figure out a way to have a check clipboard button that
    //     displays what someone currently has in the clipboard
    let previous = document.referrer;
    const currentDate = new Date();

    function stopProcessing(){
        $('#TextArea').off('paste', processText);
        $('#exspc').off('click');

        popup({timeOut:1500});
        $('#stop').addClass('dnone');
        $('#start').removeClass('dnone');
        $('#exspc').addClass('dnone');
        $('#rmv-ol').addClass('dnone');
        $('.switch-container#flat').addClass('dnone');
    }

    function startProcessing(){
        $('#TextArea').off('paste');
        $('#TextArea').on('paste', processText);
        $('#exspc').click(removeExtraLines);
        popup({timeOut:1500});
        $('#start').addClass('dnone');
        $('#stop').removeClass('dnone');
        $('#exspc').removeClass('dnone');
        $('#rmv-ol').removeClass('dnone');
        $('.switch-container#flat').removeClass('dnone');
    }

    function closePopup(){
        $('.md-modal').addClass('dnone').removeAttr('style');
        $('.md-modal-background').removeClass('dnone');
        if ($('.md-modal-content').hasClass('dnone')){
            $('.md-modal-content').removeClass('dnone');
            $('.spinner-background').remove();
        }else{
            $('.md-modal-content').removeAttr('style');
            $('.static').removeClass('dnone');
            $('#temp').remove();
        }
        $('#TextArea').focus();
    }

    function popup(prop = {}){
        // text should at least have empty quotes "" in order to keep the variables in the current order.
        // popup("", 500) to set the spinner for 500 mls
        // popup("text", 500) to set a popup with text message for 500 mls
        // "" = null
        let width = $('textarea').prop('scrollWidth');
        let height = $('textarea').prop('scrollHeight');
        let position = $('textarea').position();
        
        $('.md-modal').attr('style', 'width: ' + width + 'px; height: ' + height + 'px; top: ' + position.top + 'px; left: ' + position.left + 'px;');
        $('.md-modal-background').addClass('dnone');
        if (prop.text){
            $('.static').addClass('dnone');
            $('.md-modal-content').attr('style', 'overflow: hidden;');
            
            if ($('#temp')){
                $('#temp').remove();
            }
            $('.md-modal-content').append(mkP({id:'temp', inner:prop.text}));
            if (!prop.timeOut){
                $('.md-modal-background').removeClass('dnone');
            }
        }else{
            $('.md-modal-content').addClass('dnone');
            if ($('.spinner-background')){
                $('.spinner-background').remove();
            }
            $('.md-modal').append(crtSpin());
        }
        $('.md-modal').removeClass('dnone');
        if (prop.timeOut){
            setTimeout(() => {
                closePopup();
            }, prop.timeOut);
        }
    }

    function closeSearch(){
        $('#search').val("");
        $('#replace').val("");
        $('#word').prop('checked', false);
        $('.search-replace').addClass('dnone');
        $('.search-replace').removeAttr('style');
        $('textarea').focus();
    }

    function toggleSpclFtr(text){

        if (text == 'Admin' && $('.spclFtr').length === 0){
            $('body').prepend(crtad());
            $('body').prepend(mkrtnl());

            $('#ff').click(function(){
                let currentText = $('#TextArea').val();
                $('#TextArea').val(formatFilename(currentText));
            });

            $('#sandr').click(function(){
                $('.search-replace').removeClass('dnone');

                let position = $('#TextArea').position();
                let scWidth = $('#TextArea').prop('scrollWidth') / 2;
                let scHeight = $('#TextArea').prop('scrollHeight') / 2;
                let srScWidth = $('.search-replace').prop('scrollWidth') / 2;
                let srScHeight = $('.search-replace').prop('scrollHeight') / 2;
                let top = (position.top + (scHeight - srScHeight));
                let left = (position.left + (scWidth - srScWidth))

                $('.search-replace').attr('style', 'top: ' + top + 'px; left: ' + left + 'px;');
                $('#search').focus();
                
            });
        
            $('#rep').click(function(){
                //Search and Replace
                let text = $('#TextArea').val();
                let search = $('#search').val();
                let replace = $('#replace').val();
                let strict = $('#word').is(':checked');
                if (strict){
                    let regex = searchRegex(search);
                    // let regex = search;
                    // console.log(regex);
                    text = text.replaceAll(new RegExp(regex, "gm"), replace);
                }else{
                    text = text.replaceAll(search, replace);
                }
                $('#TextArea').val(text);
                // closeSearch();
            })
        
            $('#stop').click(function(){
                stopProcessing();
            });
        
            $('#start').click(function(){
                startProcessing();
            });
        
            $('#ad-close').click(function(){
                toggleSpclFtr("goodbye");
            });

            $('#search-close').click(closeSearch);

        }else if (text == "goodbye"){
            $('.spclFtr').remove();
            $('#toolBox').remove();

        }
    }

    function updateClipboard(text){
        navigator.clipboard.writeText(text.trim())
    }

    function formatFilename(text){
        return text.toLowerCase().trim().replaceAll(' ', '_');
    }

    function removeOlMarkers(text){
        let singleDigit = [/^\d\W\s\b/gm, /^\d\d\W\s\b/gm, /^\w\W\s\b/gm, /^\w\w\W\s\b/gm, /^\w\w\w\W\s\b/gm]
        let editedText = text;
        for (let a in singleDigit){
            // console.log(singleDigit[a]);
            if (editedText.match(singleDigit[a])){
                editedText = editedText.replaceAll(new RegExp(singleDigit[a]), '');
            }
        }
        popup({text:"Done!", timeOut:750});
        return editedText;
    }

    function removeExtraLines(){
        let regex = /^\s*[^\S]/g;
        let text = $('#TextArea').val().split('\n');

        for (let a in text){
            text[a] = text[a].replaceAll(regex, '');
        }

        updateClipboard(text.join('\n'))
        $('#TextArea').val(text.join('\n').trim());
        popup({text:"Done!", timeOut:750});
    }

    function searchRegex(searchText){
        /*
        Seems to be working so far. Most likely still needs some work.
        Right now it is escaping any non-alphanumeric character, except white space
        Further testing is needed.
        */
        // let spclCharCheck = new RegExp("([\[\]\.\,\\\/\!\@\#\$\%\^\&\*\(\)\_\-\=\+\<\>\{\}\"\?])", "g");

        let spclCharCheck = new RegExp("([^A-Za-z0-9 \\w])", "g"); // create new function
        
        if (searchText.match(spclCharCheck)){ // Delete
            
            let formattedText = searchText.replace(spclCharCheck, '\\$1'); // new fun
            formattedText = formattedText.replaceAll("_", "\\_"); // new fun

            let pat1 = new RegExp("\\b" + formattedText + "\\b", "g");
            let pat2 = new RegExp("\\b" + formattedText + "\\B", "g");
            let pat3 = new RegExp("\\B" + formattedText + "\\b", "g");
            let pat4 = new RegExp("\\B" + formattedText + "\\B", "g");

            if (searchText.match(pat1)){
                return "\\b" + formattedText + "\\b";
            }else if (searchText.match(pat2)){
                return "\\b" + formattedText + "\\B";
            }else if (searchText.match(pat3)){
                return "\\B" + formattedText + "\\b";
            }else if (searchText.match(pat4)){
                return "\\B" + formattedText + "\\B";
            }
            
        } //Delete
        return "\\b" + searchText + "\\b"; // Get rid of this
    }

    function processText(){
        popup();
        /*
        Possible regex for stripping html from the text
        cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, ""); -- stack overflow

        The following is the beginning of the format detector
        Currently it only detects closing and self closing html tags
        Waiting for positive test case where Unicode is slipping by.
        So far I have been able to reproduce copying a list and having the bullets remain in the text when pasted.
        I have not had any success in reproducing the event that actual HTML styling is being pasted in, making it
        very difficult to find a way to detect it.
        I have confirmed that the text I was using did have formatting,
            when I paste it into the scratch pad the formatting is removed
            as previously expected, but I have had reports of formatting
            still getting through. Isolated reports, but still. Not able to reproduce

        I am also on the fence on whether or not to strip the found html
        tags or stick with just alerting the user. There are cases where html
        tags maybe legit and not need to be removed. Maybe we just add a remove
        formatting button or something. Food for thought
        */
       
        setTimeout(function(){
            let changed = false;
            let text = $('#TextArea').val();

            if (text.includes("/>") || text.includes("</")){
                console.log("HTML closing tags have been detected.");
                alert("HTML MARKERS HAVE BEEN DETECTED\n\nDOUBLE CHECK THE DOCUMENT FOR UNUSUAL FORMATTING");
            }

            let regtest = /^[o]\b\s/gm;
            if (text.match(regtest)){
                console.log("Removing bullets 1");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            regtest = /^[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s|^\s*[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s/gm;
            if (text.match(regtest)){
                console.log("Removing bullets 2");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            regtest = /[“”]/gm;
            if (text.match(regtest)){
                console.log("Replacing special formatted quotes with regular quotes");
                text = text.replaceAll(regtest, "\"");
                changed = true;
            }

            regtest = /[\‘\ߵ\’]/gm;
            if (text.match(regtest)){
                console.log("Replacing odd characters");
                text = text.replaceAll(regtest, "'");
                changed = true;
            }

            regtest = /^\s*\n/gm;
            if (text.match(regtest)){
                console.log('Removing empty lines');
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            if ($('#flat > .toggle-cont').hasClass('tg-on')){
                let oneStr = text.split('\n');
                for (a = 0; a < oneStr.length; a++){
                    if (a > 0){
                        text += " " + oneStr[a];
                    }else{
                        text = oneStr[a];
                    }
                }
            }
            
            regtest = /(\S)\s{2,}(\S)/gm;
            if (text.match(regtest)){
                console.log('Removing multiple spaces between words');
                let textArr = text.split('\n');
                for (let i = 0; i < textArr.length; i++){
                    textArr[i] = textArr[i].replaceAll(regtest, '$1 $2');
                }
                text = textArr.join('\n');
                changed = true;
            }

            // Not sure what this is (	) or why I added it. 
            regtest = /[​]/gm; // invisible chars: U+000b, U+200b
            if (text.match(regtest)){
                console.log("Removing odd invisible character");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            // If issues arise from replacing the text when no changes were made 
            // uncomment the if statement
            // remove the part checking for new line at the end and find the best spot for it
            if ($('#dbl > .toggle-cont').hasClass('tg-on')){
                text = text.replaceAll('\n', '\n\n');
            }

            if (text.substring(text.length - 1) == "\n"){
                console.log("Removing extra line at the end.")
                text = text.substring(0, text.length - 1);
            }

            updateClipboard(text);

            $('#TextArea').val(text.trim());
            
            closePopup();
        }, 700);
    }



    $('body').prepend(
        nestElem([
            mkDiv({class:'presentation my-3 mx-2'}),
            mkDiv({id:'TextAreaContain'}),
            {
                1:nestElem([
                    mkDiv({class:'options mb-2'}),
                    {
                        1:mkinp({type:'select', id:'color', name:'color', class:'form-select-sm', options:[{value:'dark'},{value:'green'},{value:'blue'},{value:'white'},{value:'yellow'}]}).input,
                        2:mkbtn({class:'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id:'exspc', inner:'Remove Leading Spaces', title:'The empty space in front of the paragraphs'}),
                        3:mkbtn({class:'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id:'rmv-ol', inner:'Remove OL Markers', title:'Remove numbered OL markers'}),
                        4:mkbtn({class:'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id:'clear', inner:'Clear', title:'Clear scratch pad'}),
                        // 5:mkbtn({class:'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id:'ex', inner:'Fix URL'}),
                        6:createToggle({id:'flat', label:'Flatten Text', title:'Convert multiple lines of text into a single line. Check \'How This Works\' info button for example.'}),
                        7:createToggle({id:'dbl', label:'Paragraph Spacing', title:'Adds space between lines.', class:'dnone'}),
                        8:mkLnk({class:'btn btn-sml ms-1', title:'Click to report an issue or suggestion.', href:'mailto:aaaabncggffyesoyicuhyz3u7u@imaginelearning.org.slack.com', inner:'<img width="32" height="32" src="./data/icons8-bug-64.png" alt="bug"/>'}),
                        9:mkbtn({class:'btn btn-sm ms-1', id:'info', inner:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>', title:'How this works'})
                    }
                ]),
                2:mkElem({elemType:'textarea', name:'scratchPad', class:'dark', id:'TextArea', encoding:'UTF-8'})
            }
        ])
    );

    setToggleListeners();

    $('textarea').focus();

    $('.options > button').mousedown(function(){
        if (!$(this).attr('id').includes('info')){
            $(this).removeClass('btn-shadow');
        }
    });

    $('.options > button').mouseup(function(){
        if (!$(this).attr('id').includes('info')){
            $(this).addClass('btn-shadow');
        }
    });

    $('#exspc').click(removeExtraLines);

    $('#info').click(function(){
        $('body > .md-modal').removeClass('dnone');
        $('body').attr('style', 'overflow: hidden;');
    });

    $('#info-close').click(function(){
        $('.info-popup').addClass('dnone');
    });
    
    $('#clear').click(function(){
        $('#TextArea').val('');
        $('#TextArea').focus();
    });

    $('#rmv-ol').click(async function(){
        let cleanText = await removeOlMarkers($('#TextArea').val());
        updateClipboard(cleanText);
        $('#TextArea').val(cleanText);
    })

    $('#TextArea').on('input', function (){
        let text = $('#TextArea').val();
        toggleSpclFtr(text);
        // Remove after decision is made
        if (text == "Testing"){
            $('#dbl').removeClass('dnone');
        }
    });

    $('#TextArea').on('paste', processText);


    // Close the modal
    $('.md-modal-background').click(closePopup);


    $('#color').on('input', function(){
        let color = $(this).val();
        let ta = $('textarea');
        let currentColor = ta.attr('class');

        ta.removeClass(currentColor);
        ta.addClass(color);
        ta.focus();
    });

    $('#ex').click(function(){
        let text = $('textarea').val();
        text = text.replaceAll(/((?:algebraOne|algebraone))/gm, '$1_ex');
        text = text.replaceAll('.html', '_ex.html');
        let test = text.split('\n');
        if (test.length > 1){
            if (test[0].toLowerCase() === test[1].toLowerCase()){
                popup({text:'The URLs Match!', timeOut:700});
            }else{
                popup({text:'The URL\'s are not a match', timeOut:1500});
                text = '';
            }
        }
        $('textarea').val(text);
        $('textarea').focus();
    });

    if (previous.includes("toolBox.html")){
        toggleSpclFtr('Admin');
    }

});