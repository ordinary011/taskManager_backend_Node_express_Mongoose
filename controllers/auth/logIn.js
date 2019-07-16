const User = require('../../db/models/userModel');
const tokenSign = require('../../helpers/tokenSign');

module.exports = async (req, res) => {
	try {
		// getting email and password out of req.body
		const { email = '', password = '' } = req.body;
		if (!email || !password) throw new Error('email or password was missing during logging in');

		// searching for a user with corresponding email and password
		const isPresent = await User.findOne({ email, password });
		if (!isPresent) throw new Error('sorry wrong email or password');

		// encoding data about the user into the token
		const { _id, name, lastName } = isPresent;
		const token = tokenSign({ _id, name, lastName, email });

		res.status(200).json({
			success: true,
			msg: { response: token }
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			msg: e.message
		});
	}
};
