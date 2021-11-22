$(document).ready(function(){

	var ideaList = [
["Krysta","Candles","Sweaters","House items"],
["Eileen Dohse","Amazon leverback sterling silver Swarovski zirconia earrings. $26.00","Amazon wood Home sign with eucalyptus wreath $28.99","Amazon utopia 24 piece plastic food containers with lids $21.99"],
["Deshawn","Basketball shorts","Polo shirts Xl","Nike crew socks black"],
["Wayne Dohse","White Cardinals Hat ajustable","Screw Driver Set","US Navy Crew neck Blue wGold Navy & Anchor &#9875; Sweatshirt"],
["Alec","Champion ankle socks","White addidas shoes","Band tshirts/ 70s short inseam men's shorts"],
["Ryan Dohse","Solar Lighting for backyard","Any Yard decoration, metal suns for wall, or any yard figurine.","Az Cardinals related stuff"],
["Michael","Gift card for Steam","Good mustache and nose hair trimmer","Dark color shoes (size 11 usually)"]
];

	$("#display").css("height", $(window).height());
	$("#display").css("width", $(window).width());

	for (z = 0; z < ideaList.length; z++){
		let peep = ideaList[z];
		$("#giftList").append("<ul class=\"listCotent\"><li>" + peep[0] + "</li><ul><li>" + peep[1] + "</li><li>" + peep[2] + "</li><li>" + peep[3] + "</li></ul><ul>");
	}

	$("#giftList").mouseleave(function(event) {
		$(this).toggle("hide");
	});
})