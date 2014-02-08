<html>
<script type="text/javascript">
var url = "https://christianarca.firebaseio.com/";
var fb = new Firebase(URL);
 
/**
 * Looks up a user id by email address and invokes callback with the id or null if not found
 * @return {Object|null} the object contains the key/value hash for one user
 */
function getMovementIDByName( emailAddress, callback ) {
   fb.child('emails_to_ids/'+emailAddress.once('value', function(snap) {
       callback( snap.val() );
   });
}
 
/**
 * Creates a new user record and also updates the index
 */
function createNewMovement( userRecord ) {
   var id = fb.child('user').push(userRecord).name();
   fb.child('emails_to_ids/'+userRecord.email).set(id);
   return id;
}

//createNewUser({'name': 'Front Squat'});
createNewUser("Front Squat");
</script>
</html>