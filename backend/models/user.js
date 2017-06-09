var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  age: {
  	type: Number,
  	unique: false,
  	required: false,
  }
});

UserSchema.methods.checkPassword = function(password){
  return password === this.password;
}

module.exports = mongoose.model('User', UserSchema);