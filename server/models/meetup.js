var mongoose = require('mongoose');

module.exports = mongoose.model('Meetup', { //give access to our model
	name: String
});