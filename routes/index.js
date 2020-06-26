var express = require('express');
var router = express.Router();

const Collection = require('../Models/collection');
const Users = require('../routes/users');
//Collection object
var collectionObject = '';
var globalUserID = '';

globalUserID = Users.user_id;



//-------------------------------------------------------------------------------
	 // get all the collections by user
	 function getCollectionByUser(useridParameter){	 
	     Collection.find({userID: useridParameter}, function(err, collection) {
		    if (err) throw err;
	     // object of all the users
	     collectionObject = collection;
	     console.log('This is the userID: ' + globalUserID);
      });
	 }
	
//collections by user
router.get('/', function(req, res){
 globalUserID =	'Value from client: ' + req.body.userid;
res.render('index', {collection: globalUserID});
});
//-------------------------------------------------------------------------------

router.post('/getCollections', (req, res) => {
	console.log('This is the userID: ' + req.body.userid);
});





function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;