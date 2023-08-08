
// var people = ["michael"];
// var ideaList = [["Michael","Steam gift card","New Tennis Shoes","Pants and/or Shorts","Surprise Me!"]];


var ideaList = [];
var people = [];

// Use this to test without local server.
// https://mdohse29.github.io/picker/people.csv

$.get('./people.csv', function(data, status){
  let aa = [];
  for (a = 1; a < data.length; a++){
	let row = data.split('\n')[a];
	
	if (row != "" && row != undefined){
		if (row.includes(", ") || row.includes("\"")){
			row = row.replaceAll(", ", "; ");
			row = row.replaceAll("\"", "");
		}
		let bb = [];
		for (b = 1; b < row.split(',').length; b++){
			let col = row.split(',')[b];
			if (col.length > 1 && col != ""){
				bb.push(col);
			}
		}
		aa.push(bb);
	}
	for (cc in aa){
		for (dd in aa[cc]){
			if (aa[cc][dd].includes("; ")){
				aa[cc][dd] = aa[cc][dd].replaceAll("; ", ", ");
			}
		}
	}
  }
  for (c = 0; c < aa.length; c++){
	ideaList.push(aa[c]);
	people.push(aa[c][0]);
  }
}, "text");

var userListItems;

var giftFor = "";
var putBack = "";

function listCheck(name){
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
	if ($('#giftList').css('display') != 'none'){
		alert("Please close the list before picking someone.");
		return null;
	}
	
	if ($("#userGiftList").css("display") == "none"){
		$("#userGiftList").toggle("show");
	}

	if ($("#nameChoice").css("display") == "none"){
		$("#nameChoice").toggle("show");
	}


	$("#userGiftList").empty();
	let num = Math.floor(Math.random() * people.length);
	giftFor = people.splice(num, 1);
	$("#nameChoice").empty();
	if (giftFor == "" || giftFor == undefined){
		$('.pick').attr('disabled', 'disabled');
		$('.pick').attr('data-listcomplete', 'true');
		$("#nameChoice").append("<p>Everyone has been picked!<br><br>Merry Christmas in advance!</p>");
	}else{
		if (listCheck(giftFor) == true){
			$("#nameChoice").append("<p><img src=\"./icons8-santa-48.png\" class=\"santa\"/>" + giftFor + "</p>");
			$("#userGiftList").append("<ul id=\"userItems\"></ul>");
			for (item = 1; item < userListItems.length; item++){
				$("#userItems").append("<li class=\"xmas\">" + userListItems[item] + "</li>");
			}

		}else{
			$("#nameChoice").append("<p>" + giftFor + "</p>");
			$("#userGiftList").append("<p style=\"margin-left: 5%\">Sorry, there are no gift ideas to list for this person.</p>");
		}
		if (putBack.length > 0){
			people.push(putBack);
			putBack = "";
		}
		
	}

}

function reset(){
	if (people.length > 0){
		
		$("#userGiftList").css("display", "none");
		$("#userGiftList").empty();

		if (!(giftFor == "" || giftFor == undefined)){

			putBack = giftFor;
			$("#nameChoice").empty();
			$("#nameChoice").append("<p>" + giftFor + " has been put back.<br><br>Go a head and try again.</p>");
		
		}

	}else{

		alert("There are no other names to pick from.");
		$('#select button:first-child').attr('disabled','disabled');
	
	}
}

function clearDisplay(){
	$("#userGiftList").empty();
	$('#nameChoice').empty();
	$("#userGiftList").toggle("hide");
}

function amazonUrl(searchItem){
	let convertText = searchItem.replaceAll(" ", "+").toLowerCase();
	return "https://www.amazon.com/s?k=" + convertText;
}

function viewList(){
	let visability = document.getElementsByClassName('listContent');
	// alert(visability.length);
	if (visability.length == 0){
		if (ideaList.length >= 1){
			$('#emptyList').remove();
		}
		for (z = 0; z < ideaList.length; z++){
			let peep = ideaList[z];
			$("#giftList").append("<ul class=\"listContent build\"><li>" + peep[0] + "</li><ul></ul></ul>");
			for (xy = 1; xy < peep.length; xy++){
				let searchUrl = amazonUrl(peep[xy]);
				if (peep[xy] != ""){
					$('.build > ul').append("<li><a href=\"" + searchUrl + "\" target=\"_blank\" title=\"Click to search Amazon!\">" + peep[xy] + "</a></li>");
				}
			}
			$(".build").removeClass("build");
		}
	}

	// $("#giftList").css('display', 'flex');
	$('#giftList').toggle('fade',function(){
		$('.view').attr('disabled', 'disabled');
		$('.pick').attr('disabled', 'disabled');
	}, 1000);

}


