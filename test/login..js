const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const User = require('../db/models/userModel');

chai.use(chaiHttp);

/**
 * Test: user log in
 */

describe('POST /auth (user log in)', () => {

    // creating a new user before test
	before(done => {
		User.create({
			name: 'igor',
			lastName: 'bobo',
			gender: 'male',
			email: 'igor77775@gmail.com',
			password: 12345678,
			passwordConfirm: 12345678
		}, (err) => {
            done()
        });
	});

	it('should return token', done => {
		const user = {
			email: 'igor77775@gmail.com',
			password: 12345678
		};

		chai.request(app)
			.post('/auth')
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
				// token validation
				res.body.msg.response.should.match(
					/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
				);
				done();
			});

		// deleting of the created user after the test
		after(done => {
			User.deleteOne({ email: 'igor77775@gmail.com' }, err => {
				done();
			});
		});
	});
});
