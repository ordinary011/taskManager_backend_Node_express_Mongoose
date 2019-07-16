const User = require('../../db/models/userModel');
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
		// getting token out of headers
		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		// getting user id out of verified token
		const { _id } = verify(token);

		// searching for a user and then for user's tasks
		let userTasks = await User.findOne({ _id }, ['name', 'tasks', '-_id']).populate('tasks.task', 'taskText')

		res.status(200).json({
			success: true,
			msg: { userTasks }
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
