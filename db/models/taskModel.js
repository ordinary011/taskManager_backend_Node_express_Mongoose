const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const taskSchema = Schema({
	taskText: {
        type: Schema.Types.String,
        minLength:[10,"Your comment should have at least 10 symbols"],
        required: true
    },
	users: [
        {
            type: Schema.ObjectId,
            ref: 'users',
            required: true
        }
    ]
});

module.exports = mongoose.model('tasks', taskSchema);
