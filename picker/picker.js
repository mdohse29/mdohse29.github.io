// var people = [
// 	"Michael",
// 	"Ryan",
// 	"Wayne",
// 	"Sabrina",
// 	"Alec",
// 	"Krysta",
// 	"Eileen",
// 	"DeShawn",
// 	"Hailey",
// 	"Collin"
// ]

// var ideaList = [
// ["Krysta","Candles","Sweaters","House items"],
// ["Eileen","Amazon leverback sterling silver Swarovski zirconia earrings.","Amazon wood Home sign with eucalyptus wreath","Amazon utopia 24 piece plastic food containers with lids"],
// ["Deshawn","Basketball shorts","Polo shirts Xl","Nike crew socks black"],
// ["Wayne","White Cardinals Hat ajustable","Screw Driver Set","US Navy Crew neck Blue wGold Navy & Anchor &#9875; Sweatshirt"],
// ["Alec","Champion ankle socks","White addidas shoes","Band tshirts/ 70s short inseam men's shorts"],
// ["Ryan","Solar Lighting for backyard","Any Yard decoration, metal suns for wall, or any yard figurine.","Az Cardinals related stuff"],
// ["Michael","Gift card for Steam","Good mustache and nose hair trimmer","Aero Garden","Dark color shoes (size 11 usually)"],
// ["Sabrina","Giftcard to Kirkland","1500 Count Deep Pocket Microfiber 7 piece King Sheet Set Teal from Walmart or gift card","Driftwood Buffalo Checker Pattern Lined Blackout Grommet Window Curtains Printed Plaid set of 2 Black and White 52×96 at Walmart online or gift card"],
// ["Hailey","Red high Top Converse size 7.5","Forever 21 gift card","Tilly's Soda Lug Sole Womens Combat Boots Black 7.5"],
// ["Collin","gift card to boot barn, amazon, tillys","buckwear tshirts ford,don’t tread on me, we the people","assassins creed valhalla"]
// ];
var people = ["michael"];
var ideaList = [["Michael","Steam gift card","New Tennis Shoes","Pants and/or Shorts","Surprise Me!"]];

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
		$("#giftList").toggle("show");

	}

// opening();
// picker();
$(document).ready(function(){

// 	var ideaList = [
// ["Krysta","Candles","Sweaters","House items"],
// ["Eileen Dohse","Amazon leverback sterling silver Swarovski zirconia earrings. $26.00","Amazon wood Home sign with eucalyptus wreath $28.99","Amazon utopia 24 piece plastic food containers with lids $21.99"],
// ["Deshawn","Basketball shorts","Polo shirts Xl","Nike crew socks black"],
// ["Wayne Dohse","White Cardinals Hat ajustable","Screw Driver Set","US Navy Crew neck Blue wGold Navy & Anchor &#9875; Sweatshirt"],
// ["Alec","Champion ankle socks","White addidas shoes","Band tshirts/ 70s short inseam men's shorts"],
// ["Ryan Dohse","Solar Lighting for backyard","Any Yard decoration, metal suns for wall, or any yard figurine.","Az Cardinals related stuff"],
// ["Michael","Gift card for Steam","Good mustache and nose hair trimmer","Dark color shoes (size 11 usually)"]
// ];

	$("#display").css("height", $(window).height());
	$("#display").css("width", $(window).width());

	for (z = 0; z < ideaList.length; z++){
		let peep = ideaList[z];
		if (peep[0].includes("Michael")){
			$("#giftList").append("<ul class=\"listCotent\"><li>" + peep[0] + "</li><ul><li>" + peep[1] + "</li><li>" + peep[2] + "</li><li>" + peep[3] + "</li><li>" + peep[4] + "</li></ul><ul>");
		}else{
			$("#giftList").append("<ul class=\"listCotent\"><li>" + peep[0] + "</li><ul><li>" + peep[1] + "</li><li>" + peep[2] + "</li><li>" + peep[3] + "</li></ul><ul>");
		}
	}

	// $("#giftList").mouseleave(function(event) {
	// 	$(this).toggle("hide");
	// });

	
});