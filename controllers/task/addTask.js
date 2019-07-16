const Task = require('../../db/models/taskModel');
const User = require('../../db/models/userModel');
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
		// getting token out of headers
		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		// getting user id out of verified token
		const { _id: user_id } = verify(token);

		// getting the text of the new task from req.body
		const { taskText } = req.body;
		if (!taskText) throw new Error('could not get task from req.body');

		// saving of the new task into tasks collection
		let createdTask = await Task.create({
			taskText,
			users: user_id
		});

		// pushing a reference of the new task into the array of tasks in users collection
		await User.findByIdAndUpdate(
			user_id,
			{
				$push: {
					tasks: {
						info: 'created by you',
						task: createdTask._id
					}
				}
			},
			{ useFindAndModify: false }
		);

		res.status(200).json({
			success: true,
			msg: {response: 'the task has been added'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
