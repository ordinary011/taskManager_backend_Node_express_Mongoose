const router = require('express').Router();

const userLogIn = require('../controllers/auth/logIn');

router.post('/', userLogIn);

module.exports = router;
