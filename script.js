
var url = "https://christianarca.firebaseio.com/";
var myDataRef = new Firebase(url);
var movementsRef  = new Firebase(url+"movement");

function createNewMovement( movementRecord, movementDate ) {
   console.log("In createNewMovement");
   var id = myDataRef.child('movement').push(movementRecord).name();
   console.log("Movement ID:" + id);
   myDataRef.child('movements_to_ids/'+movementRecord.movementName).set(id);
   return id;
}

function getMovementIdByName( movementName, callback ) {
   myDataRef.child('movements_to_ids/'+movementName).once('value', function(snap) {
       callback( snap.val() );
   });
}

function eventManager(evt) {
	var evtInput = {
		movementName: $('#movementInput').val(),
		created: Date()
	}
	createNewMovement(evtInput);
	evt.preventDefault();
	$("movementInput").val('');
}

function getMovements(){
	movementsRef.on('child_added', function(snap){
		var movementData = snap.val();
		$('#movements').append("<li>" + movementData.movementName + " " + movementData.created + "</li>");
	});
}

window.onload = function() {
	getMovements();
	var submit = document.getElementById("movementSubmit");
	submit.onclick = eventManager;
}

function checkIfMovementExists(movement) {
	var exists = getMovementIdByName(movement, function(callback) {
		if (callback == null){
			console.log("Nothing here");
		}
		else {
			console.log(callback);
		}
		//console.log(callback);
	});
}