
var url = "https://christianarca.firebaseio.com/";
var myDataRef = new Firebase(url);
var movementsRef  = new Firebase(url+"movements");

function eventManager(evt) {
	var movement = $('#movementInput').val();
	var date = Date();
	
	movementsRef.push({name: movement, created: date});
	event.preventDefault();
}

movementsRef.on('child_added', function(snapshot){
	var movementData = snapshot.val();
	console.log("Movement:" + movementData.name + " Created:" + movementData.created);
});

window.onload=function() {
	var submit = document.getElementById("movementSubmit");
	submit.onclick = eventManager;
}