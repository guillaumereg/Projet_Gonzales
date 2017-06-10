var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: false
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
  }
});

UserSchema.methods.checkPassword = function(password){
  return password === this.password;
}

module.exports = mongoose.model('User', UserSchema);