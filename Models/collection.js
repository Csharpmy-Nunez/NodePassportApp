const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose.connect('mongodb://localhost/loginapp');
//const db = mongoose.connection;

// Collection Schema
const CollectionSchema = mongoose.Schema({
	type: {
		type: String,
		index:true
	},
	title: {
		type: String
	},
	acquisitiondate: {
		type: String
	},
	condition: {
		type: String
  },
  message: {
    type: String
  },
  userID: {
    type: String
  }
});

// Create a variable that can be accessed outside of this file
const Collection = module.exports = mongoose.model('Collection', CollectionSchema);


module.exports.createCollection = function(newCollection, callback){
//	bcrypt.genSalt(10, function(err, salt) {
	   // bcrypt.hash(newCollection.message, salt, function(err, hash) {
        //newCollection.message = hash;
        newCollection.save(callback);
	    //});
	//});
}

module.exports.getCollectionByUserId = function(userID, callback){
  const query = {userID: userID};
  Collection.findOne(query, callback);
}

// module.exports.getCollectionByUserId = function(id, callback){
// 	Collection.findById(id, callback);
// }
