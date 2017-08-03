var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var OfferSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false
  },
  brand: {
    type: String,
    unique: false
  },
  model: {
  	type: String,
  	unique: false
  },
  price: {
    type: Number,
    unique: false
  },
  city: {
    type: String,
    unique: false
  },
  usernameSelect: {
    type: String,
    unique: false
  }
});


module.exports = mongoose.model('Offer', OfferSchema);
