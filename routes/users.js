var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../Models/user');
const Collection = require('../Models/collection');
//Collection object
var collectionObject = '';
var globalUserID = '';


// Get Homepage
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login',  function(req, res){
	res.render('login');
});

// Add Collection
router.get('/addCollection',  function(req, res){
	res.render('addCollection');
});


//-------------------------------------------------------------


// Add Collection
router.post('/addcollection',  function(req, res){
	var type = req.body.type;
	var title = req.body.title;
	var acquisitiondate = req.body.acquisitiondate;
	var condition = req.body.condition;
	var message = req.body.message;
	var userid = req.body.userid;

	globalUserID = userid;

// Validation
req.checkBody('type', 'type is required').notEmpty();
req.checkBody('title', 'Title is required').notEmpty();
req.checkBody('acquisitiondate', 'acquisition-date is required').notEmpty();
req.checkBody('condition', 'Condition is required').notEmpty();
req.checkBody('message', 'Message is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('addcollection', {errors:errors});
	}else{
		var newCollection = new Collection({
			type: type,
			title: title,
			acquisitiondate:acquisitiondate,
			condition:condition,
			message:message,
			userID: userid
		});

				//Create Collection
				Collection.createCollection(newCollection, function(err, collection){
					if(err)throw err;
					console.log(collection);
				});
		
				//Set success message
				req.flash('success_msg', 'New collection created...');
				//Redirect
				res.redirect('/');
			}

			//Send data

}); 





//Register User
router.post('/register', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

// Validation
req.checkBody('name', 'Name is required').notEmpty();
req.checkBody('email', 'Email is required').notEmpty();
req.checkBody('email', 'Email is not valid').isEmail();
req.checkBody('username', 'Username is required').notEmpty();
req.checkBody('password', 'Password is required').notEmpty();
req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register', {errors:errors});
	}else{
		var newUser = new User({
			name: name,
			email: email,
			username:username,
			password:password
		});

		//Create User
		User.createUser(newUser, function(err, user){
			if(err)throw err;
			console.log(user);
		});

		//Set success message
		req.flash('success_msg', 'You are registered and can now login');
		//Redirect
		res.redirect('/users/login');
	}
	
});


passport.use(new LocalStrategy(
  function(username, password, done) {
		User.getUserByUserName(username, function(err, user){
			if(err) throw err;
			if(!user){
				return done(null, false, {message: 'Unknown User'});
			}

			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user)
				}else{
					return done(null, false, {message: password})
				}
			});
		})

	}
));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login', 
passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}), function(req, res) {
	res.redirect('/');
});


// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		res.redirect('/users/login');
// 	}
// }


//Create a logout route
router.get('/logout', function(req, res){
	req.logOut();
	//send a message
	req.flash('warning_msg', 'You are logged out');
	//Redirect
	res.redirect('/users/login');
});
module.exports = router;