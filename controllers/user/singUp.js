const User = require('../../db/models/userModel');

module.exports = async (req, res) => {
	try {
		// getting values from req.body
		const { name, lastName, gender, email, password, passwordConfirm } = req.body;

		// we want to make sure that the user remembers his password
		if (password !== passwordConfirm)
			throw new Error('could not confirm the password try again');

		// checking whether such email exists in db
		let count = await User.countDocuments({ email });
		if (count > 0) throw new Error('sorry this email already exists, try another one');

		// creating of a new user
		await User.create({ name, lastName, gender, email, password });

		res.status(200).json({
			success: true,
			msg: {response: 'user has been created'}
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
