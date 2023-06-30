
// var people = ["michael"];
// var ideaList = [["Michael","Steam gift card","New Tennis Shoes","Pants and/or Shorts","Surprise Me!"]];


var ideaList = [];
var people = [];

$.get('https://mdohse29.github.io/picker/people.csv', function(data, status){
  let aa = [];
  for (a = 0; a < data.length; a++){
	if (data.split('\n')[a] != "" && data.split('\n')[a] != undefined){
		let bb = [];
		for (b = 0; b < data.split('\n')[a].split(',').length; b++){
			bb.push(data.split('\n')[a].split(',')[b]);
		}
		aa.push(bb);
	}
  }
  for (c = 0; c < aa.length; c++){
	ideaList.push(aa[c]);
	people.push(aa[c][0]);
  }
}, "text");

var userListItems;

var giftFor = "";

var listCheck = function(name){
	let found = false;
	name = name.toString().toLowerCase();
	for (item = 0; item < ideaList.length; item++){
		let listName = ideaList[item][0].toLowerCase();
		// let lowerName = 
		if (listName.includes(name)){
			userListItems = ideaList[item];
			found = true;
			break;
		}
	}
	 return found;
}

function picker(){
	if ($("#userGiftList").css("display") == "none"){
		$("#userGiftList").toggle("show");
		$('#clear').toggle('show');
	}
		$("#userGiftList").empty();
	let num = Math.floor(Math.random() * people.length);
	giftFor = people.splice(num, 1);
	$("#nameChoice").empty();
	if (giftFor == "" || giftFor == undefined){
		$("#nameChoice").append("<p>Everyone has been picked!</p>");
	}else{
		if (listCheck(giftFor) == true){
			$("#nameChoice").append("<p>" + giftFor + "</p>");
			$("#userGiftList").append("<ul id=\"userItems\"></ul>");
			for (item = 1; item < userListItems.length; item++){
				$("#userItems").append("<li class=\"xmas\">" + userListItems[item] + "</li>");
			}

		}else{
			$("#nameChoice").append("<p>" + giftFor + "</p>");
			$("#userGiftList").append("<p style=\"margin-left: 5%\">Sorry, there are no gift ideas to list for this person.</p>");
		}
		// $("#nameChoice").append("<p>" + giftFor + "</p>");
		// $("#display").append("<p><img src=\"" + giftFor + ".jpg\" width=\"300px\" height=\"auto\" alt=\"testing\"/></p>");
	}

}


function reset(){
			$("#userGiftList").empty();
			$("#userGiftList").toggle("hide");
			$('#clear').toggle('hide');
		if (!(giftFor == "" || giftFor == undefined)){
			people.push(giftFor);
			$("#nameChoice").empty();
			$("#nameChoice").append("<p>OOPS! Go a head and try again.</p>");
		}
}
function clearDisplay(){
	$("#userGiftList").empty();
	$('#nameChoice').empty();
	$("#userGiftList").toggle("hide");
	$('#clear').toggle('hide');
}
function viewList(){
	let visability = document.getElementsByClassName('listContent');
	// alert(visability.length);
	if (visability.length == 0){
		for (z = 0; z < ideaList.length; z++){
			let peep = ideaList[z];
			$("#giftList").append("<ul class=\"listContent build\"><li>" + peep[0] + "</li><ul></ul></ul>");
			for (xy = 1; xy < peep.length; xy++){
				$('.build > ul').append("<li>" + peep[xy] + "</li>");
			}
			$(".build").removeClass("build");
		}
	}

	$("#giftList").toggle("show");

}

// opening();
// picker();
$(document).ready(function(){
	$("#display").css("height", $(window).height());
	$("#display").css("width", $(window).width());

$('button').attr('disabled', 'disabled');
// Remove ^^^^^ to activate the picker


// $("#giftList").mouseleave(function(event) {
// 	$(this).toggle("hide");
// });

	
});