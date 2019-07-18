const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { token } = require('../constants/tokenForTests');

chai.use(chaiHttp);

/**
 * Test to get all user's tasks
 */

describe("GET /task (getting all the user's tasks)", () => {
	it("should return all user's tasks", done => {
		chai.request(app)
			.get('/task')
			.set({ Authorization: token })
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('msg');
				res.body.should.have
					.property('success')
					.a('boolean')
					.eqls(true);
				res.body.msg.userTasks.should.be.a('object');
				res.body.msg.userTasks.name.should.be.a('string');
				res.body.msg.userTasks.tasks.should.be.a('array');
				done();
			});
	});
});
