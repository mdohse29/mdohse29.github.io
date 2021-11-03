var people = [
	"Michael",
	"Ryan",
	"Wayne",
	"Sabrina",
	"Alec",
	"Krysta",
	"Eileen",
	"DeShawn"
]

var giftFor = "";

function picker(){
	let num = Math.floor(Math.random() * people.length);
	giftFor = people.splice(num, 1);
	$("#display").empty();
	if (giftFor == "" || giftFor == undefined){
		$("#display").append("<p>Everyone has been picked!</p>");
	}else{
		$("#display").append("<p>" + giftFor + "</p>");
		$("#display").append("<p><img src=\"" + giftFor + ".jpg\" width=\"300px\" height=\"auto\" alt=\"testing\"/></p>");
	}

}

function reset(){
		if (!(giftFor == "" || giftFor == undefined)){
			people.push(giftFor);
			$("#display").empty();
			$("#display").append("<p>OOPS! Go a head and try again.</p>");
		}
}

// picker();