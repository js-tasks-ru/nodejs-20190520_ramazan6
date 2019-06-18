const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		unique: true,
		index: true,
		validate: [
		  {
		  	validator(value) {
		  		return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
		  	},
		  	message: "Invalid email format"
		  }
		]
	},
	displayName: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		index: true
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('User', schema, 'users');
