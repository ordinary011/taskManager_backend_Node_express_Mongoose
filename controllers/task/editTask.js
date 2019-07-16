const Task = require('../../db/models/taskModel');
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
		// getting token out of headers
		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		// getting user id out of verified token
		const { _id: user_id } = verify(token);

		// getting task_id and an updated task out of req.body
		const { task_id, editedTask } = req.body;

		// we want to make sure that only the users who have access to the task can update it
		let foundTask = await Task.findById(task_id);
		if(!foundTask.users.includes(user_id)) throw new Error("sorry you don't have access to this task, hence you can not update it");

		// updating the task in the tasks collection
		await Task.findByIdAndUpdate(
			task_id,
			{ $set: { taskText: editedTask } },
			{ useFindAndModify: false }
		);

		res.status(200).json({
			success: true,
			msg: {response: 'edited'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
