$(document).ready(function(){

	let newDate = new Date();
	let currentMonth = newDate.getMonth();
	let currentDay = newDate.getDate();

	$("#display").css("height", $(window).height());
	$("#display").css("width", $(window).width());

	$('#btn-add-lst').click(function(){
		window.open("https://docs.google.com/forms/d/e/1FAIpQLScH-FDJ7UzTiWB5xGv-8rbz-5oAZuumL4Veo4oY3Wa5bg8eHw/viewform?usp=sf_link", "_blank");
	});

	$('#btn-close').click(function(){
		$('#giftList').toggle('fade',function(){
			
			$('.view').removeAttr('disabled');
// Uncomment when reactivating the picker

			// if ($('.pick').attr('data-listcomplete') === 'false'){
			// 	$('.pick').removeAttr('disabled');
			// }
		}, 1000);
	});

	$('.view').click(function(){

		viewList();

		if ($('#nameChoice').css('display') != "none"){
			$('#nameChoice').css('display', 'none');
		}
		if ($('#userGiftList').css('display') != "none"){
			$('#userGiftList').css('display', 'none');
		}

	});

	$('.reset').click(function(){
		reset();
	});

	$('.sel').click(function(){
		picker();
	})


	// $('#select button').attr('disabled', 'disabled');
	// $('#display').append("<p style=\"text-align: center\" id=\"erlmsg\">Ohh, sorry! It is a little early.<br/>Come back in September 2024, The List will be online.</p>");
	// Comment out ^^^^^ to activate the picker

	// $('button.list').removeAttr('disabled');
	//// Activate list button only ^^^^^^
	
	// if ((currentMonth == 11 && currentDay <= 22) || (currentMonth > 7 && currentMonth < 11)){
	// 	$('button').removeAttr('disabled');
		
	// 	$('#erlmsg').remove();
		// setTimeout(function(){
		// 	viewList();
		// }, 700);
	// }
	// Activates the picker from September 01 thru December 22 ^^^^^

	// $('#btn-add-lst').attr('disabled', 'disabled');
	//// Uncomment for picking time ^^^^^ ** No one should be submitting lists at this time **


	// $("#giftList").mouseleave(function(event) {
	// 	$(this).toggle("hide");
	// });

	
});
