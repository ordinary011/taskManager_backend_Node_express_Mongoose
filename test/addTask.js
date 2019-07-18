const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { token } = require('../constants/tokenForTests');

chai.use(chaiHttp);

/**
 * Test for adding of a new task
 */

describe('POST /task (creating of a new task)', () => {
    
    it('should create a new task', done => {
		chai.request(app)
			.post('/task')
			.set({ Authorization: token })
			.send({
				taskText: 'test task'
			})
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
	});
});
