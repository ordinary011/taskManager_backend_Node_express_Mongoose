const jwt = require('jsonwebtoken');
const {secret} = require('../constants/tokenSecret');

module.exports = token => {
	if (!token) throw new Error("you didn't pass token for verification");

	let user;

	jwt.verify(token, secret, (err, decoded) => {
		if (err) throw new Error('error during verification of token');
		user = decoded;
	});

	return user;
};