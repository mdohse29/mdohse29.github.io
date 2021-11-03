
var people = [
  {'name':'krysta',
  'selected':false},
  {'name':'michael',
  'selected':false},
  {'name':'wayne',
  'selected':false},
  {'name':'eileen',
  'selected':false},
  {'name':'ryan',
  'selected':false},
  {'name':'sabrina',
  'selected':false},
  {'name':'collin',
  'selected':false},
  {'name':'alec',
  'selected':false},
  {'name':'hailey',
  'selected':false},
  {'name':'deshawn',
  'selected':false}
]

var gifter = [];

function findPerson(name){
  for (var i in people){
    if (people[i].name == name) {
      return i;
    }
  }
  return null;
}

function available() {
  for (var j in people){
    if (!people[j].selected) {
      return true;
    }
  }
  return false;
}

function selector(name){
  name = name.toLowerCase();
  var found = false;
  var save = people[findPerson(name)];
  people.splice(findPerson(name), 1);
  var person = "";
  while(!found){
    if (!available()) {
      return "Everyone has been selected.";
    }
    var num = Math.floor((Math.random()*people.length));
    if (!people[num].selected && people[num].name != name) {
      people[num].selected = true;
      person = people[num].name;
      found = true;
    }
  }
  if (person == "") {
    alert("Something is wrong");
    return null;
  }
  people.splice(people.length, 0, save);
  gifter.push([name, person]);
  return person;
}

function chooseName(){
  var name = document.getElementsByTagName("input")[0].value;
  document.getElementById("display").innerHTML = "<p id=\"text\">" + selector(name).toUpperCase() + "</p>";
  //for (g = 0; g < people.length; g++){
  //$("#display").append("<p>" + people[g].name + "</p>");
  //}
  $("table").empty();
  for (z = 0; z < gifter.length; z++){
    $("table").append("<tr><td>" + gifter[z][0] + "</td><td>" + gifter[z][1] + "</td></tr>");
  }
  
}

function reset() {
  document.getElementById("display").innerHTML = "";
}
