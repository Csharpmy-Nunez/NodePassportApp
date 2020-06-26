var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const Collection = require('../Models/collection');


// Add Collection
router.get('/addcollection',  function(req, res){
	res.render('addcollection');
});


// Add Collection
router.post('/addcollection',  function(req, res){
	var type = req.body.col-type;
	var title = req.body.title;
	var acquisitiondate = req.body.acquisitiondate;
	var condition = req.body.condition;
	var message = req.body.message;
  var userid = req.body.userid;
  
  console.log(type);

// Validation
// req.checkBody('type', 'type is required').notEmpty();
// req.checkBody('title', 'Title is required').notEmpty();
// req.checkBody('acquisitiondate', 'acquisition-date is required').notEmpty();
// req.checkBody('condition', 'Condition is required').notEmpty();
// req.checkBody('message', 'Message is required').notEmpty();

// 	var errors = req.validationErrors();

// 	if(errors){
// 		res.render('addcollection', {errors:errors});
// 	}else{
// 		var newCollection = new Collection({
// 			type: type,
// 			title: title,
// 			acquisitiondate:acquisitiondate,
// 			condition:condition,
// 			message:message,
// 			userID: userid
// 		});

// 				//Create Collection
// 				User.createCollection(newCollection, function(err, collection){
// 					if(err)throw err;
// 					console.log(collection);
// 				});
		
// 				//Set success message
// 				req.flash('success_msg', 'New collection created...');
// 				//Redirect
// 				res.redirect('/');
// 			}

});