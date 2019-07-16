const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = Schema({
	name: {
        type: String,
        minlength: 4,
        maxlength: 45,
        required: true,
    },
	lastName: {
        type: String,
        minlength: 4,
        maxlength: 45,
        required: true,
    },
	gender: {
		type: String,
		required: true
	},
	email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required'
        
    },
	password: {
        type: Schema.Types.Mixed,
        minlength: 8,
        maxlength: 65,
        required: true
    },
	tasks: [
		{
			info: String,
			task: {
				type: Schema.ObjectId,
				ref: 'tasks',
				required: true
			}
		}
	]
});

module.exports = mongoose.model('users', userSchema);
