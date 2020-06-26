//import {Collection} from '../Models/collection';
const Collection = require('../Models/collection');


  //var mongoose = require('mongoose');
  //mongoose.connect('mongodb://Samy:nada@ds133597.mlab.com:33597/infinitologinapp');
  //const db = mongoose.connection;

    document.getElementById('btn_').addEventListener('click', () => {
    const userid = document.getElementById('userid').value;
    

    console.log(userid);

    document.getElementById('output').innerHTML = 'TESTING THE OUTPUT DIV';

  })  

  //const Collection = require('../Models/collection');


Collection.find({userID: userid}, function(err, collection) {
if (err) throw err;

// object of all the users
console.log(21323);
});