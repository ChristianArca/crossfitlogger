
console.log(document.URL);
var url = "https://christianarca.firebaseio.com/";
var movementsRef  = url+"movements";
var myDataRef = new Firebase(url);
var test = "test";

function eventManager(event) {
	console.log("In eventManager");
	var movement = $('#movementInput').val();
	var date = Date();
	var onComplete = function(error) {
		if (error) {
			console.log("Data not saved" + error);
		} else {
			console.log("Data saved");
		}
	}
	var inputRef = new Firebase(movementsRef+"/"+movement);
	inputRef.push({name: movement, created: date})
};

var submit = document.getElementsByTagName('button')[0];