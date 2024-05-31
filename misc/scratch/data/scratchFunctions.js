$(document).ready(function(){
    // Figure out a way to have a check clipboard button that
    //     displays what someone currently has in the clipboard
    let previous = document.referrer;
    const currentDate = new Date();

    function stopProcessing(){
        $('#TextArea').off('paste', processText);
        $('#exspc').off('click');

        popup("", 1500);
        $('#stop').addClass('dnone');
        $('#start').removeClass('dnone');
        $('#exspc').attr('disabled', 'disabled');
        $('#rmv-ol').attr('disabled', 'disabled');
    }

    function startProcessing(){
        $('#TextArea').off('paste');
        $('#TextArea').on('paste', processText);
        $('#exspc').click(removeExtraLines);
        popup("", 1500);
        $('#start').addClass('dnone');
        $('#stop').removeClass('dnone');
        $('#exspc').removeAttr('disabled');
        $('#rmv-ol').removeAttr('disabled');
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

    function popup(text, timeOut){
        // text should at least have empty quotes "" in order to keep the variables in the current order.
        // popup("", 500) to set the spinner for 500 mls
        // popup("text", 500) to set a popup with text message for 500 mls
        // "" = null
        let width = $('textarea').prop('scrollWidth');
        let height = $('textarea').prop('scrollHeight');
        let position = $('textarea').position();
        
        $('.md-modal').attr('style', 'width: ' + width + 'px; height: ' + height + 'px; top: ' + position.top + 'px; left: ' + position.left + 'px;');
        $('.md-modal-background').addClass('dnone');
        if (text){
            $('.static').addClass('dnone');
            $('.md-modal-content').attr('style', 'overflow: hidden;');
            $('.md-modal-content').append('<p id="temp">' + text + '</p>');
        }else{
            $('.md-modal-content').addClass('dnone');
            $('.md-modal').append('<div class="spinner-background"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
        }
        $('.md-modal').removeClass('dnone');
        if (timeOut){
            setTimeout(() => {
                closePopup();
            }, timeOut);
        }
    }

    function toggleSpclFtr(text){

        if (text == "Admin" && $('.spclFtr').length === 0){
            // $('.spclFtr').removeClass('dnone');
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
                $('#search').val("");
                $('#replace').val("");
                $('#word').prop('checked', false);
                $('.search-replace').addClass('dnone');
                $('.search-replace').removeAttr('style');
                $('#TextArea').focus();
            })
        
            $('#stop').click(function (){
                stopProcessing();
            });
        
            $('#start').click(function (){
                startProcessing();
            });
        
            $('#srch-close').click(function(){
                toggleSpclFtr("goodbye");
            });
        }else if (text == "goodbye"){
            $('.spclFtr').remove();
            $('#toolBox').remove();

        }
    }

    function formatFilename(text){
        return text.toLowerCase().trim().replaceAll(' ', '_');
    }

    function removeOlMarkers(text){
        let singleDigit = [/^\d\W\s\b/gm, /^\d\d\W\s\b/gm, /^\w\W\s\b/gm, /^\w\w\W\s\b/gm, /^\w\w\w\W\s\b/gm]
        let editedText = text;
        for (let a in singleDigit){
            console.log(singleDigit[a]);
            if (editedText.match(singleDigit[a])){
                editedText = editedText.replaceAll(new RegExp(singleDigit[a]), '');
            }
        }
        popup("Done!", 750);
        return editedText;
    }

    // function applicationFormat(x){
    //     // need to add toggle for COSMOS or Other
    //     // If toggle = COSMOS
    //     return x.replaceAll('\n', '\n\n');
    //     // else
    //     return x

    // }

    function removeExtraLines(){
        let regex = /^\s*[^\S]/g;
        let text = $('#TextArea').val().split('\n');
        for (let a in text){
            text[a] = text[a].replaceAll(regex, '');
        }
        navigator.clipboard.writeText(text.join('\n').trim());
        $('#TextArea').val(text.join('\n').trim());
        popup("Done!", 750);
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

            let regtest = /\b[o]\b\s/gm;
            if (text.match(regtest)){
                console.log("Removing bullets");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            regtest = /^[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s|^\s*[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s/gm;
            if (text.match(regtest)){
                console.log("Removing bullets");
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

            if ($('div.toggle-cont').hasClass('tg-on')){
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

            regtest = /[​]/gm; // invisible chars: U+000b, U+200b
            if (text.match(regtest)){
                console.log("Removing odd invisible character");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            // If issues arise from replacing the text when no changes were made 
            // uncomment the if statement
            // remove the part checking for new line at the end and find the best spot for it
            // if (changed){
                if (text.substring(text.length - 1) == "\n"){
                    console.log("Removing extra line at the end.")
                    text = text.substring(0, text.length - 1);
                }


                navigator.clipboard.writeText(text.trim());
                // text = text.replaceAll('\n', '\n\n');
                $('#TextArea').val(text.trim());
            // }
            closePopup();
        }, 700);
    }

    // create color select and buttons for options
    $('.options').prepend(
        mkinp('select', 'color', '', 'form-select-sm', ['dark', 'green', 'blue', 'white', 'yellow', 'lavender']).input,
        mkbtn('btn btn-primary btn-sm ms-1 usr-btn', 'exspc', 'Remove Leading Spaces', 'The empty space in front of the paragraphs'), 
        mkbtn('btn btn-primary btn-sm ms-1 usr-btn', 'rmv-ol', 'Remove OL Markers', 'Remove numbered OL markers'),
        mkbtn('btn btn-primary btn-sm ms-1 usr-btn', 'clear', 'Clear', 'Clear scratch pad')
    );
    // Set TA background
    let currentVal = $('select').val();
    $('#TextArea').addClass(currentVal);

    colorPicker();

    $('textarea').focus();

    $('#exspc, #clear, #rmv-ol').mousedown(function(){
        $(this).css('box-shadow', 'none');
    });

    $('#exspc, #clear, #rmv-ol').mouseup(function(){
        $(this).css('box-shadow', '0px 0px 0px 1px darkgrey');
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
        navigator.clipboard.writeText(cleanText);
        $('#TextArea').val(cleanText);
    })

    $('#TextArea').on('input', function (){
        let text = $('#TextArea').val();
        toggleSpclFtr(text);
    });

    $('#TextArea').on('paste', processText);


    // Close the modal
    $('.md-modal-background').click(function(){
        $('.md-modal').addClass('dnone');
        $('body').removeAttr('style');
    });

    if (previous.includes("toolBox.html")){
        // $('#toolBox').show();
        toggleSpclFtr('Admin');
        // stopProcessing();
    }

});