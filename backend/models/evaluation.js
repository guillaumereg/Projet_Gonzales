var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var OfferSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false
  },
  evaluation: {
    type: Number,
    unique: false
  },
  commentaire: {
  	type: String,
  	unique: false
  }
});


module.exports = mongoose.model('Evaluation', EvaluationSchema);
