const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const date = require('date-and-time');
const client = require('socket.io').listen(4000).sockets;
var convert = require('object-array-converter');



mongoose.connect('mongodb://Samy:nada@ds133597.mlab.com:33597/infinitologinapp');
const db = mongoose.connection;


const routes = require('./routes/index');
const users = require('./routes/users');
const collections = require('./routes/collections');

//From database
const Collection = require('./Models/collection');
//Collection object
var collectionObject = [];

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Connect Flash
app.use(flash());



// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);

//Connect to mongodb
mongo.connect('mongodb://Samy:nada@ds133597.mlab.com:33597/infinitologinapp', (err, db) => {
   if(err){
        throw err;
    }
client.on('connection', (socket) => {
  let collections = db.collection('collections');
  let userid = '';

  socket.on('user_id_', (data) => {
    userid = data.id;

    
    collections.find({userID: userid}).limit(1000).sort({_id:1}).toArray(function(err, res){
      if(err){
          throw err;
      }
      // Emit the messages
      console.log(res);
      socket.emit('collections', res);
  });
  })

  // Collection.find({userID: userid}, function(err, collection) {
  //   if (err) throw err;
  //   // object of all the users
  //   collectionObject = collection;

  //   var object = {
  //     name: "Franklin", 
  //     phone: "123456789"};


  //         //console.log('value: ' + collectionObject);
  //         //Emit array to the client
  //         socket.emit('collections', collectionObject.toString());
  // });

      // Get chats from mongo collection

});

});
// get all the users


app.get('/api', (req, res) => {
  res.json({
    msg: collectionObject
  });
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});

