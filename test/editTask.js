// const app = require('../app');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const { token } = require('../constants/tokenForTests');
// const Task = require('../db/models/taskModel');

// chai.use(chaiHttp);

/**
 * Test for edditing of the task
 */

// describe('PUT /task (editing of the task)', () => {
// 	it('should edit the task', done => {
//         let taskToEdit = '';

// 		// finding of the test task
// 		before(done => {
// 			taskToEdit = Task.findOne(
// 				{
// 					taskText: 'test task'
// 				},
// 				err => {
//                     console.log(taskToEdit)
// 					done();
// 				}
// 			);
// 		});

// 		// chai.request(app)
// 		// 	.put('/task')
// 		// 	.set({ Authorization: token })
// 		// 	.send({
// 		// 		editedTask: 'test task edited'
// 		// 	})
// 		// 	.end((err, res) => {
// 		// 		res.should.have.status(200);
// 		// 		res.body.should.be.a('object');
// 		// 		res.body.should.have.property('msg').a('object');
// 		// 		res.body.msg.response.should.be.a('string');
// 		// 		res.body.should.have
// 		// 			.property('success')
// 		// 			.a('boolean')
// 		// 			.eqls(true);
// 		// 		done();
// 		// 	});
// 	});
// });
