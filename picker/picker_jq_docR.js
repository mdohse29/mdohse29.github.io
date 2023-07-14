$(document).ready(function(){
	$("#display").css("height", $(window).height());
	$("#display").css("width", $(window).width());

	$('#btn-add-lst').click(function(){
		window.open("https://docs.google.com/forms/d/e/1FAIpQLScH-FDJ7UzTiWB5xGv-8rbz-5oAZuumL4Veo4oY3Wa5bg8eHw/viewform?usp=sf_link", "_blank");
	});

	$('#btn-close').click(function(){
		$('#giftList').toggle('hide');
	});

$('button').attr('disabled', 'disabled');
$('#display').append("<p style=\"text-align: center\">Ohh, sorry! It is a little early.<br/>Come back in August 2023, The List will be online.</p>");
// Comment out ^^^^^ to activate the picker

$('button.list').removeAttr('disabled');
//// Activate list button only ^^^^^^

// $('#btn-add-lst').removeAttr('disabled');
// viewList();
//// Remove ^^^^^ to allow list view only and activate add to list button

// $('#btn-add-lst').attr('disabled', 'disabled');
//// Uncomment for picking time ^^^^^ ** No one should be submitting lists at this time **


// $("#giftList").mouseleave(function(event) {
// 	$(this).toggle("hide");
// });

	
});
