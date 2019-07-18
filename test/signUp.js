const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const User = require('../db/models/userModel');

chai.use(chaiHttp);

/**
 * Test in order to sign up a new user
 */

describe('POST /user (sign up)', () => {
	it('should sign up a new user', done => {
		const user = {
			name: 'igor',
			lastName: 'bobo',
			gender: 'male',
			email: 'igor7777@gmail.com',
			password: 12345678,
			passwordConfirm: 12345678
		};

		chai.request(app)
			.post('/user')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('msg').a('object');
				res.body.msg.response.should.be.a('string');
				res.body.should.have
					.property('success')
					.a('boolean')
					.eqls(true);
				done();
			});

		// deleting of the created user after the test
		after(done => {
			User.deleteOne({ email: 'igor7777@gmail.com' }, err => {
				done();
			});
		});
	});
});
