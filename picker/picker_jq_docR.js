$(document).ready(function(){

	let newDate = new Date();
	let currentMonth = newDate.getMonth();

	$("#display").css("height", $(window).height());
	$("#display").css("width", $(window).width());

	$('#btn-add-lst').click(function(){
		window.open("https://docs.google.com/forms/d/e/1FAIpQLScH-FDJ7UzTiWB5xGv-8rbz-5oAZuumL4Veo4oY3Wa5bg8eHw/viewform?usp=sf_link", "_blank");
	});

	$('#btn-close').click(function(){
		$('.view').removeAttr('disabled');
		$('#giftList').toggle('hide');
	});

	$('.view').click(function(){
		$(this).attr('disabled', 'disabled');

		if ($('#nameChoice').css('display') != "none"){
			$('#nameChoice').css('display', 'none');
		}
		if ($('#userGiftList').css('display') != "none"){
			$('#userGiftList').css('display', 'none');
		}

	});

	$('button').attr('disabled', 'disabled');
	$('#display').append("<p style=\"text-align: center\" id=\"erlmsg\">Ohh, sorry! It is a little early.<br/>Come back in August 2023, The List will be online.</p>");
	// Comment out ^^^^^ to activate the picker

	// $('button.list').removeAttr('disabled');
	//// Activate list button only ^^^^^^
	if (currentMonth > 5){
		$('button.pick, #giftList > button').removeAttr('disabled');
		
		$('#erlmsg').remove();
		setTimeout(function(){
			viewList();
		}, 500);
	}
	// Remove ^^^^^ to allow list view only and activate add to list button

	// $('#btn-add-lst').attr('disabled', 'disabled');
	//// Uncomment for picking time ^^^^^ ** No one should be submitting lists at this time **


	// $("#giftList").mouseleave(function(event) {
	// 	$(this).toggle("hide");
	// });

	
});
