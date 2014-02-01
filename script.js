console.log("In Javascript");
var url = "https://christianarca.firebaseio.com/";
var movementsRef  = "movements";
var myDataRef = new Firebase(url);

console.log(url+movementsRef);

function eventManager(event) {
	console.log("In event manager");
	var movement = $('#movementInput').val();
	var date = Date();
	var onComplete = function(error) {
		if (error) {
			alert("Data not saved" + error);
		} else {
			alert("Data saved");
		}
	};
	myDataRef.push({movement: movement, date: date}, onComplete);
	console.log("The movement is:"+movement);
};

var submit = document.getElementsByTagName('button')[0];
submit.onclick = eventManager;

//Commit trouble so I'm writing a comment