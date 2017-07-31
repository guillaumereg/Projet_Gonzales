var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var OfferSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false
  },
  eval: {
    type: Number,
    unique: false
  },
  commentary: {
  	type: String,
  	unique: false
  }
});


module.exports = mongoose.model('Evaluation', EvaluationSchema);
