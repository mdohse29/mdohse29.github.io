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
// $('button.list').removeAttr('disabled');
$('#display').append("<p style=\"text-align: center\">Ohh, sorry! It is a little early.<br/>Come back in August 2023, The List will be online.</p>");
// Remove ^^^^^ to activate the picker


// $("#giftList").mouseleave(function(event) {
// 	$(this).toggle("hide");
// });

	
});
