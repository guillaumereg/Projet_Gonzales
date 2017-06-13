var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  age: {
  	type: Number,
  	unique: false
  },
  phoneNumber: {
    type: String,
    unique: false
  },
  country: {
    type: String,
    unique: false
  },
  city: {
    type: String,
    unique: false
  },
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}

module.exports = mongoose.model('User', UserSchema);