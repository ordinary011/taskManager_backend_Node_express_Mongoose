const Task = require('../../db/models/taskModel');
const User = require('../../db/models/userModel');
const verify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
	try {
		// getting token out of headers
		const token = req.get('Authorization');
		if (!token) throw new Error('token should have come from headers');

		// getting email of the user who is sharing the task out of verified token
		const { email } = verify(token);

		// getting values from req.body
		const { emailOfRecipient, task_id } = req.body;
		if (!task_id || !emailOfRecipient)
			throw new Error(
				'emailOfRecipient or task_id should have come from req.body during sharing task'
			);

		// making sure that the user will not share the task with himself
		if (!emailOfRecipient === email)
			throw new Error('you can not share your task with yourself');

		// searching for a user to share the task with
		let recipient = await User.findOneAndUpdate(
			{ email: emailOfRecipient },
			{
				$push: {
					tasks: {
						info: `shared by ${email}`,
						task: task_id
					}
				}
			},
			{ useFindAndModify: false }
		);
		if(!recipient) throw new Error("sorry couldn't find the user with such email");

		//updating the task document => making a reference to the new user
		await Task.findByIdAndUpdate(
			// { _id: task_id },
			task_id,
			{
				$push: {
					users: recipient._id
				}
			},
			{ useFindAndModify: false }
		);

		res.status(200).json({
			success: true,
			msg: {response: 'shared'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
