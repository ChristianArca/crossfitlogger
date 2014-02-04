
var url = "https://christianarca.firebaseio.com/";
var myDataRef = new Firebase(url);
var movementsRef  = url+"movements";

function eventManager(event) {
	var movement = $('#movementInput').val();
	var date = Date();
	
	movementsRef.push({name: movement, created: date});
	event.preventDefault();
}

var submit = document.getElementsByTagName('button')[0];
submit.onclick = eventManager;