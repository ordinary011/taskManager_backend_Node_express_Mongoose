const router = require('express').Router();

const getTask = require('../controllers/task/getTask');
const addTask = require('../controllers/task/addTask');
const shareTask = require('../controllers/task/shareTask');
const editTask = require('../controllers/task/editTask');
const deleteTask = require('../controllers/task/deleteTask');

router.get('/', getTask);
router.post('/', addTask);
router.put('/share', shareTask);
router.put('/', editTask);
router.delete('/:_id', deleteTask);

module.exports = router;