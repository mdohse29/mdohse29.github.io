$(document).ready(function () {
    // Figure out a way to have a check clipboard button that
    //     displays what someone currently has in the clipboard
    let previous = document.referrer;
    const currentDate = new Date();

    function stopProcessing() {
        $('#TextArea').off('paste', processText);
        $('#exspc').off('click');

        popup({ timeOut: 1500 });
        $('#stop').addClass('dnone');
        $('#start').removeClass('dnone');
        $('#exspc').addClass('dnone');
        $('#ff').addClass('dnone');
        $('#rmv-ol').addClass('dnone');
        $('.switch-container#flat').addClass('dnone');
        $('.switch-container#dbl').addClass('dnone');
    }

    function startProcessing() {
        // $('#TextArea').off('paste');
        $('#TextArea').on('paste', processText);
        $('#exspc').click(removeExtraLines);
        popup({ timeOut: 1500 });
        $('#start').addClass('dnone');
        $('#stop').removeClass('dnone');
        $('#exspc').removeClass('dnone');
        $('#ff').removeClass('dnone');
        $('#rmv-ol').removeClass('dnone');
        $('.switch-container#flat').removeClass('dnone');
        $('.switch-container#dbl').removeClass('dnone');
    }

    function closePopup() {
        $('.md-modal').addClass('dnone').removeAttr('style');
        $('.md-modal-background').removeClass('dnone');
        if ($('.md-modal-content').hasClass('dnone')) {
            $('.md-modal-content, .md-modal-header, .md-modal-footer').removeClass('dnone');
            $('.spinner-background').remove();
        } else {
            $('.md-modal-content').removeAttr('style');
            $('.static, .md-modal-header, .md-modal-footer').removeClass('dnone');
            $('#temp').remove();
        }
        $('#TextArea').focus();
    }

    function popup(prop = {}) {
        // text should at least have empty quotes "" in order to keep the variables in the current order.
        // popup("", 500) to set the spinner for 500 mls
        // popup("text", 500) to set a popup with text message for 500 mls
        // "" = null
        let width = $('textarea').prop('scrollWidth');
        let height = $('textarea').prop('scrollHeight');
        let position = $('textarea').position();

        $('.md-modal').attr('style', 'width: ' + width + 'px; height: ' + height + 'px; top: ' + position.top + 'px; left: ' + position.left + 'px;');
        $('.md-modal-background').addClass('dnone');
        if (prop.text) {
            $('.static, .md-modal-header, .md-modal-footer').addClass('dnone');
            $('.md-modal-content').attr('style', 'overflow: hidden;');

            if ($('#temp')) {
                $('#temp').remove();
            }
            $('.md-modal-content').append(mkP({ id: 'temp', inner: prop.text, class: ((prop.class) ? prop.class : '') }));
            if (!prop.timeOut) {
                $('.md-modal-background').removeClass('dnone');
            }
        } else {
            $('.md-modal-content, .md-modal-header, .md-modal-footer').addClass('dnone');
            if ($('.spinner-background')) {
                $('.spinner-background').remove();
            }
            $('.md-modal').append(crtSpin());
        }
        $('.md-modal').removeClass('dnone');
        if (prop.timeOut) {
            setTimeout(() => {
                closePopup();
            }, prop.timeOut);
        }
    }

    function closeSearch() {
        $('#search').val("");
        $('#replace').val("");
        $('#word').prop('checked', false);
        $('.search-replace').addClass('dnone');
        $('.search-replace').removeAttr('style');
        $('textarea').focus();
    }

    function toggleSpclFtr(text) {

        if (text == 'Admin' && $('.spclFtr').length === 0) {
            $('body').prepend(crtad());
            // if (previous.includes('toolBox'))
            //     $('body').prepend(mkrtnl());

            // $('#ff').click(function(){
            //     let currentText = $('#TextArea').val();
            //     $('#TextArea').val(formatFilename(currentText));
            // });

            // $('#tgDblSpc').click(function(){
            //     $('#dbl').toggleClass('dnone');
            // });

            $('#sandr').click(function () {
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

            $('#rep').click(function () {
                //Search and Replace
                let text = $('#TextArea').val();
                let search = $('#search').val();
                let replace = $('#replace').val();
                let strict = $('#word').is(':checked');
                if (strict) {
                    let regex = searchRegex(search);
                    // let regex = search;
                    // console.log(regex);
                    text = text.replaceAll(new RegExp(regex, "gm"), replace);
                } else {
                    text = text.replaceAll(search, replace);
                }
                $('#TextArea').val(text);
                // closeSearch();
            })

            $('#stop').click(stopProcessing);

            $('#start').click(startProcessing);

            $('#ad-close').click(function () {
                toggleSpclFtr("goodbye");
            });

            $('#search-close').click(closeSearch);

        } else if (text == "goodbye") {
            $('.spclFtr').remove();
            $('#toolBox').remove();

        }
    }

    // Update Clipboard with trimmed text

    function updateClipboard(text) {
        navigator.clipboard.writeText(text.trim())
    }

    function formatFilename(text) {
        let formatted = [];
        let lines = text.split('\n');
        let regex = /^(.*?)\s{1,}(\.(?:mp4|\w{3,4}))$/;
        for (let fn of lines) {
            if (fn.match(regex)) {
                fn = fn.replace(regex, '$1$2');
            }

            formatted.push(fn.toLowerCase().trim().replaceAll(/[ -]/g, '_').replaceAll(/_{2,}/g, '_').replace(/_(\..*?)$/, '$1'));

        }
        return formatted.join('\n');
    }

    function removeOlMarkers(text) {
        let singleDigit = [
            /^[ \t]*[A-Z]{1,4}[).][ \t]*\b/gm, // Upper Alpha
            /^[ \t]*[a-z]{1,4}[).][ \t]*\b/gm, // Lower Alpha
            /^[ \t]*[0-9]{1,4}[).][ \t]*\b/gm // Digits
        ]

        let editedText = $('#TextArea').val();
        for (let a in singleDigit) {
            // console.log(singleDigit[a]);
            if (editedText.match(singleDigit[a])) {
                editedText = editedText.replace(new RegExp(singleDigit[a]), '');
            }
        }
        
        updateClipboard(editedText)
        $('#TextArea').val(editedText);
    }

    function removeExtraLines() {
        let regex = /^\s*[^\S]/g;
        let text = $('#TextArea').val().split('\n');

        for (let a in text) {
            text[a] = text[a].replaceAll(regex, '');
        }

        updateClipboard(text.join('\n'))
        $('#TextArea').val(text.join('\n').trim());
        // popup({timeOut:500});
    }

    function searchRegex(searchText) {
        /*
        Seems to be working so far. Most likely still needs some work.
        Right now it is escaping any non-alphanumeric character, except white space
        Further testing is needed.
        */
        // let spclCharCheck = new RegExp("([\[\]\.\,\\\/\!\@\#\$\%\^\&\*\(\)\_\-\=\+\<\>\{\}\"\?])", "g");

        let spclCharCheck = new RegExp("([^A-Za-z0-9 \\w])", "g"); // create new function

        if (searchText.match(spclCharCheck)) { // Delete

            let formattedText = searchText.replace(spclCharCheck, '\\$1'); // new fun
            formattedText = formattedText.replaceAll("_", "\\_"); // new fun

            let pat1 = new RegExp("\\b" + formattedText + "\\b", "g");
            let pat2 = new RegExp("\\b" + formattedText + "\\B", "g");
            let pat3 = new RegExp("\\B" + formattedText + "\\b", "g");
            let pat4 = new RegExp("\\B" + formattedText + "\\B", "g");

            if (searchText.match(pat1)) {
                return "\\b" + formattedText + "\\b";
            } else if (searchText.match(pat2)) {
                return "\\b" + formattedText + "\\B";
            } else if (searchText.match(pat3)) {
                return "\\B" + formattedText + "\\b";
            } else if (searchText.match(pat4)) {
                return "\\B" + formattedText + "\\B";
            }

        } //Delete
        return "\\b" + searchText + "\\b"; // Get rid of this
    }

    function processText() {
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

        setTimeout(function () {
            let changed = false;
            let text = $('#TextArea').val();

            if (text.includes("/>") || text.includes("</")) {
                console.log("HTML closing tags have been detected.");
                alert("HTML MARKERS HAVE BEEN DETECTED\n\nDOUBLE CHECK THE DOCUMENT FOR UNUSUAL FORMATTING");
            }

            let regtest = /^[o]\b\s/gm;
            if (text.match(regtest)) {
                console.log("Removing bullets 1");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            regtest = /^[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s|^\s*[^a-zA-Z0-9\s,\.:\-–!?+><;"'=&@\/‘’”()\\≤©#$%\][}{~`]\s/gm;
            if (text.match(regtest)) {
                console.log("Removing bullets 2");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            regtest = /[“”]/gm;
            if (text.match(regtest)) {
                console.log("Replacing special formatted quotes with regular quotes");
                text = text.replaceAll(regtest, "\"");
                changed = true;
            }

            regtest = /[\‘\ߵ\’]/gm;
            if (text.match(regtest)) {
                console.log("Replacing odd characters");
                text = text.replaceAll(regtest, "'");
                changed = true;
            }

            regtest = /^\s*\n/gm;
            if (text.match(regtest)) {
                console.log('Removing empty lines');
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            if ($('#flat .toggle-cont').hasClass('tg-on')) {
                let oneStr = text.split('\n');
                for (a = 0; a < oneStr.length; a++) {
                    if (a > 0) {
                        text += " " + oneStr[a];
                    } else {
                        text = oneStr[a];
                    }
                }
                $('.toggle-pill').click() // Reset the toggle after single use
            }

            regtest = /(\S)\s{2,}(\S)/gm;
            if (text.match(regtest)) {
                console.log('Removing multiple spaces between words');
                let textArr = text.split('\n');
                for (let i = 0; i < textArr.length; i++) {
                    textArr[i] = textArr[i].replaceAll(regtest, '$1 $2');
                }
                text = textArr.join('\n');
                changed = true;
            }

            // Not sure what this is (	) or why I added it. 
            regtest = /[​]/gm; // invisible chars: U+000b, U+200b
            if (text.match(regtest)) {
                console.log("Removing odd invisible character");
                text = text.replaceAll(regtest, '');
                changed = true;
            }

            // If issues arise from replacing the text when no changes were made 
            // uncomment the if statement
            // remove the part checking for new line at the end and find the best spot for it
            if ($('#dbl .toggle-cont').hasClass('tg-on')) {
                text = text.replaceAll('\n', '\n\n');
                $('#dbl .toggle-pill').click();
            }

            if (text.substring(text.length - 1) == "\n") {
                console.log("Removing extra line at the end.")
                text = text.substring(0, text.length - 1);
            }

            updateClipboard(text);

            $('#TextArea').val(text.trim());

            closePopup();
        }, 700);
    }

    function toggleLockImg(elem) {
        let parent = $(elem).parents('.switch-container');
        let isLocked = $(parent).attr('isLocked');
        let hasMessage = $(parent).find('#lock');

        if (hasMessage.length == 0 && isLocked == 'true') {

            $(parent).find('.switch').append(
                nestElem([
                    mkElem({ elemType: 'span', id: 'lock' }),
                    mkElem({ elemType: 'img', src: './data/Web/lock.png', alt: 'LOCK', width: '16px', height: '16px' })
                ])
            );

        } else if (hasMessage.length > 0 && isLocked == 'false') {
            hasMessage.remove();
        }
        $('textarea').focus();
    }

    function frag() {
        let lines = $('#TextArea').val().split('\n');
        let nl = lines.map(li => {
            if (li.match(/^[A-Z]/)) {
                li = `${li[0].toLowerCase()}${li.substring(1)}`;
            }
            if (li.match(/[.?!]$/)) {
                li = li.trim().substring(0, li.length - 1);
            }
            return li
        });

        if (nl.length) {
            updateClipboard(nl.join('\n'));
            $('#TextArea').val(nl.join('\n'));
        }
    }

    $('body').prepend(
        nestElem([
            mkDiv({ class: 'presentation my-3 mx-2' }),
            mkDiv({ id: 'TextAreaContain' }),
            [
                nestElem([
                    mkDiv({ class: 'options mb-2' }),
                    [
                        mkInp({ type: 'select', id: 'color', name: 'color', class: 'form-select-sm', options: [{ value: 'dark', isColor: true }, { value: 'green', isColor: true }, { value: 'lavender', isColor: true }, { value: 'blue', isColor: true }, { value: 'white', isColor: true }, { value: 'yellow', isColor: true }] }),
                        mkBtn({ class: 'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id: 'exspc', inner: 'Remove Leading Spaces', title: 'The empty space in front of the paragraphs' }),
                        mkBtn({ class: 'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id: 'rmv-ol', inner: 'Remove OL Markers', title: 'Remove numbered OL markers' }),
                        mkBtn({ class: 'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id: 'ff', inner: 'Format Filename', title: 'Formats file names by lowercasing the text and adding underscores to replace spaces.', listeners: [{ type: 'click', execute: function () { let currentText = $('#TextArea').val(); $('#TextArea').val(formatFilename(currentText)); } }] }),
                        mkBtn({ class: 'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id: 'frag', inner: 'Fix Fragments', listeners: [{ type: 'click', execute: frag }] }),
                        mkBtn({ class: 'btn btn-primary btn-sm ms-1 usr-btn btn-shadow', id: 'clear', inner: 'Clear', title: 'Clear scratch pad' }),
                        createToggle({ id: 'flat', label: 'Flatten Text', title: 'Convert multiple lines of text into a single line. Check \'How This Works\' info button for example.', isLocked: 'false' }),
                        createToggle({ id: 'dbl', label: 'Paragraph Spacing', title: 'Adds space between lines. Click Info button for more info', isLocked: 'false' }),
                        mkBtn({ class: 'btn btn-sm ms-1', id: 'info', inner: '<i class="bi bi-info-circle"></i>', title: 'How this works' })
                    ]
                ]),
                mkElem({ elemType: 'textarea', name: 'scratchPad', class: 'dark', id: 'TextArea', encoding: 'UTF-8' })
            ]
        ])
    );

    $('#exspc').click(removeExtraLines);

    $('#info').click(function () {
        $('body > .md-modal').removeClass('dnone');
        $('body').attr('style', 'overflow: hidden;');
    });

    $('#info-close').click(function () {
        $('.info-popup').addClass('dnone');
    });

    $('#clear').click(function () {
        $('#TextArea').val('');
        $('#TextArea').focus();
    });

    $('#rmv-ol').click(removeOlMarkers);

    $('#TextArea').on('input', function () {
        let text = $('#TextArea').val();
        toggleSpclFtr(text);
        // Remove after decision is made
        // if (text == "Testing"){
        //     $('#dbl').removeClass('dnone');
        // }
    });

    $('#TextArea').on('paste', processText);


    // Close the modal
    $('.md-modal-background').click(closePopup);


    $('#color').on('input', function () {
        let color = $(this).val();
        let ta = $('textarea');
        let currentColor = ta.attr('class');

        ta.removeClass(currentColor);
        ta.addClass(color);
        ta.focus();
    });

    $('#ex').click(function () {
        let text = $('textarea').val();
        text = text.replaceAll(/((?:algebraOne|algebraone))/gm, '$1_ex');
        text = text.replaceAll('.html', '_ex.html');
        let test = text.split('\n');
        if (test.length > 1) {
            if (test[0].toLowerCase() === test[1].toLowerCase()) {
                popup({ text: 'The URLs Match!', timeOut: 700 });
            } else {
                popup({ text: 'The URL\'s are not a match', timeOut: 1500 });
                text = '';
            }
        }
        $('textarea').val(text);
        $('textarea').focus();
    });

    $('.toggle-cont, .switch-container > label').click(function () {
        toggleLockImg($(this));
    });

    if (previous.includes("toolBox")) {
        toggleSpclFtr('Admin');
    }

});