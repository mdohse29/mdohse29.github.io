$(document).ready(function(){
    let previous = document.referrer;
    const currentDate = new Date();
    function popup(text, timeOut){
        $('.popup > div').append('<p>' + text + '</p>');
        $('.popup').removeClass('dnone');
        setTimeout(() => {
            $('.popup').addClass('dnone');
            $('.popup > div').empty();
            $('#TextArea').focus();
        }, timeOut);
    }

    function toggleSpclFtr(text){
        if (text == "Admin"){
            $('.spclFtr').removeClass('dnone');
        }else if (text == "goodbye"){
            $('.spclFtr').addClass('dnone');
        }
    }

    function processText(){
        $('.popup > div').append('<p>Processing ...</p>');
        $('.popup').removeClass('dnone');
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

            regtest = /^[^a-zA-Z0-9\s,\.:\-–!?*+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s|^\s*[^a-zA-Z0-9\s,\.:\-–!?*+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s/gm;
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

            regtest = /^\s*\n/gm;
            if (text.match(regtest)){
                console.log('Removing empty lines');
                text = text.replaceAll(regtest, '');
                changed = true;
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

            regtest = /[]/gm;
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
                // alert("removing bullets");
                navigator.clipboard.writeText(text.trim());
                $('#TextArea').val(text.trim());
            // }
            $('.popup').addClass('dnone');
            $('.popup > div').empty();
        }, 700);
    }

    if (previous.includes("toolBox.html")){
        $('#toolBox').show();
    }

    // Set to clear user message after a certain number of days.
    if (currentDate.getMonth() >= 10){
        $('.msg > ul').empty();
    }

    if (document.querySelector('.msg').innerText.length > 0){
        $('.msg').prepend('<h1>Update!</h1>');
        $('.msg').append('<p style="text-align: right;">If an issue is found please report it here.<br/><a href="mailto:aaaabncggffyesoyicuhyz3u7u@imaginelearning.org.slack.com">BUG</a> &larr; Click to report an issue.</p>');
    }else{
        $('.msg').hide();
    }

    let currentVal = $('select').val();
    $('#TextArea').addClass(currentVal);
    

    // $('option').click(function(){
    //     let color = $(this).val();
    //     $('#TextArea').addClass(currentVal);
        
    //     location.reload();
    // });

    $('#exspc').mousedown(function(){
        $(this).css('box-shadow', 'none');
    });

    $('#exspc').mouseup(function(){
        $(this).css('box-shadow', '0px 0px 0px 1px darkgrey');
    });

    $('#exspc').click(function(){
        let regex = /^\s*[^\S]/g;
        let text = $('#TextArea').val().split('\n');
        for (let a in text){
            text[a] = text[a].replaceAll(regex, '');
        }
        navigator.clipboard.writeText(text.join('\n').trim());
        $('#TextArea').val(text.join('\n').trim());
        popup("Done!", 1000);
    });

    $('#sandr').click(function(){
        $('.search-replace').removeClass('dnone');
    });

    $('#rep').click(function(){
        let text = $('#TextArea').val();
        let search = $('#search').val();
        let replace = $('#replace').val();
        let regex = "\\b" + search + "\\b"
        text = text.replaceAll(new RegExp(regex, "gm"), replace);
        $('#TextArea').val(text);
        $('#search').val("");
        $('#replace').val("");
        $('.search-replace').addClass('dnone');
    })

    $('#stop').click(function (){
        $('#TextArea').off('paste', processText);
        // $('#TextArea').on('paste', () => {
        //     let text = $('#TextArea').val();
        //     toggleSpclFtr(text);
        // })
        popup("Processing has been disabled!", 1500);
        $('#stop').addClass('dnone');
        $('#start').removeClass('dnone');
    });

    $('#start').click(function (){
        $('#TextArea').off('paste');
        $('#TextArea').on('paste', processText);
        popup("Processing has been enabled", 1500);
        $('#start').addClass('dnone');
        $('#stop').removeClass('dnone');
    });

    $('#TextArea').keyup(function (){
        let text = $('#TextArea').val();
        toggleSpclFtr(text);
    });

    $('#TextArea').on('paste', processText);

});