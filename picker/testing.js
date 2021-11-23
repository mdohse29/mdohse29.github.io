var people = [
	"Michael",
	"Ryan",
	"Wayne",
	"Sabrina",
	"Alec",
	"Krysta",
	"Eileen",
	"DeShawn",
	"Hailey"
]

var ideaList = [
["Krysta","Candles","Sweaters","House items"],
["Eileen Dohse","Amazon leverback sterling silver Swarovski zirconia earrings. $26.00","Amazon wood Home sign with eucalyptus wreath $28.99","Amazon utopia 24 piece plastic food containers with lids $21.99"],
["Deshawn","Basketball shorts","Polo shirts Xl","Nike crew socks black"],
["Wayne Dohse","White Cardinals Hat ajustable","Screw Driver Set","US Navy Crew neck Blue wGold Navy & Anchor &#9875; Sweatshirt"],
["Alec","Champion ankle socks","White addidas shoes","Band tshirts/ 70s short inseam men's shorts"],
["Ryan Dohse","Solar Lighting for backyard","Any Yard decoration, metal suns for wall, or any yard figurine.","Az Cardinals related stuff"],
["Michael","Gift card for Steam","Good mustache and nose hair trimmer","Dark color shoes (size 11 usually)"]
];

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
				$("#userItems").append("<li>" + userListItems[item] + "</li>");
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
		if (!(giftFor == "" || giftFor == undefined)){
			people.push(giftFor);
			$("#nameChoice").empty();
			$("#nameChoice").append("<p>OOPS! Go a head and try again.</p>");
		}
}
function viewList(){
		$("#giftList").toggle("show");

	}

// opening();
// picker();