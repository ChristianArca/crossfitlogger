
var url = "https://christianarca.firebaseio.com/";
var myDataRef = new Firebase(url);
var movementsRef  = new Firebase(url+"movement");

function createNewWorkout(workoutRecord) {
   var workout = myDataRef.child('workout').push(workoutRecord);
   var id = workout.name();
   console.log("This is the workout id:"+id);
}

function createNewMovement( movementRecord ) {
   console.log("In createNewMovement");
   console.log(movementRecord);
   var id = myDataRef.child('movement').push(movementRecord).name();
   console.log("Movement ID:" + id);
   myDataRef.child('movements_to_ids/'+movementRecord.movementName).set(id);
   return id;
}

function movementManager(evt) {
	var testCopy ="Test";
	var evtInput = {
		movementName: $('#movementInput').val(),
		created: Date()
	}
	console.log("Viewing the evtInput");
	console.log(evtInput);
	createNewMovement(evtInput);
	evt.preventDefault();
	$("movementInput").val('');
}

function workoutManager(evt) {
  var workoutArr = [ ];
  var workoutInput = {
    movementName: $('#movementName').val(),
    movementValue: $('#movementValue').val(),
    movementTime: Date()
  }
  workoutArr.push(workoutInput);
  createNewWorkout(workoutArr);
}

function getMovements(){
	movementsRef.on('child_added', function(snap){
		var movementData = snap.val();
		$('#movements').append("<li>" + movementData.movementName + " " + movementData.created + "</li>");
	});
}

window.onload = function() {
	getMovements();
	//var movementSubmit = document.getElementById("movementSubmit");
	//movementSubmit.onclick = movementManager;
  var workoutSubmit = document.getElementById("workoutSubmit");
  workoutSubmit.onclick = workoutManager;
}

function checkIfMovementExists(movement) {
	var exists = getMovementIdByName(movement, function(callback) {
		if (callback == null){
			//console.log("Nothing here");
      return 0;
		}
		else {
		  console.log(callback);
      return callback;

		}
		//console.log(callback);
	});
}

function getMovementIdByName( movementName, callback ) {
   myDataRef.child('movements_to_ids/'+movementName).once('value', function(snap) {
     callback( snap.val() );
   });
}

var test = getMovementIdByName("Front Squat", function(callback){
  return callback;
});

console.log(test);
