const router = require('express').Router();

const userSignUp = require('../controllers/user/singUp');
const userLogIn = require('../controllers/auth/logIn');

router.post('/', userSignUp);
router.post('/logIn', userLogIn);

module.exports = router;
