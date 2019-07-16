const Task = require('../../db/models/taskModel');
const verify = require('../../helpers/tokenVerify');
const User = require('../../db/models/userModel');

module.exports = async (req, res) => {
	try {
		// getting token out of headers
		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		// getting user id out of verified token
		const { _id: user_id } = verify(token);

		// getting id of the task to delete
		const { _id } = req.params;
		if (!_id) throw new Error("couldn't get taskID from the req.body");

		// each user has an array with references of tasks, so first we need to delete the reference to the task from the user document
		await User.findByIdAndUpdate(
			user_id,
			{ $pull: { tasks: { task: _id } } },
			{ useFindAndModify: false }
		);

		// each task has an array with references of the users who have the task, so we need to delete the reference to the user out of that array
		let updatedTask = await Task.findByIdAndUpdate(
			_id,
			{ $pull: { users: user_id } },
			{ new: true, useFindAndModify: false }
		);

		// and finally if none of the users has a reference to this task, then it can be permanently deleted from the tasks collection
		if (updatedTask.users.length < 1) {
			await Task.findByIdAndDelete(_id, { useFindAndModify: false });
		}

		res.status(200).json({
			success: true,
			msg: {response: 'deleted'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
