const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

mongoose.connect('mongodb://localhost:27017/taskManager', { useNewUrlParser: true });

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const taskRouter = require('./routes/taskRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/task', taskRouter);

app.use('*', (req, res) => {
	res.status(404).json('The page does not exist');
});

const server = app.listen(3000, () => {
	console.log('Listening to the port 3000');
});

const io = socket(server);

io.on('connection', socket => {
	socket.on('sharing', data => {
		io.emit('sharing', data);
	});
});
