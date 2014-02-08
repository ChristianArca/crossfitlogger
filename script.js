
var url = "https://christianarca.firebaseio.com/";
var myDataRef = new Firebase(url);
var movementsRef  = new Firebase(url+"movements");

function createNewMovement( movementRecord, movementDate ) {
   console.log("In createNewMovement");
   var id = fb.child('user').push(movementRecord).name();
   console.log("Movement ID:" + id);
   myDataRef.child('movements_to_ids/'+movementRecord.movementName).set(id);
   return id;
}


function eventManager(evt) {
	var movementName = $('#movementInput').val();
	var createDate = Date();
	
	movementsRef.push({movementName: movementName, created: createDate});
	event.preventDefault();
	$("movementInput").val('');
}

movementsRef.on('child_added', function(snapshot){
	var movementData = snapshot.val();	
	//$('#movements').append("<li>" + movementData.movementName + "</li>");
});

window.onload = function() {
	movementsRef.on('value', function(snap){
		var movementData = snap.val();
		for (var key in movementData) {
			$('#movements').append("<li>" + movementData[key].movementName + " " + movementData[key].created + "</li>");
		}
	});
	var submit = document.getElementById("movementSubmit");
	submit.onclick = eventManager;
}
