const router = require('express').Router();
const {userController} = require('../controllers');
const {verifyToken} = require('../middleware/verifyToken');

router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);
router.patch('/update/', verifyToken, userController.changeIdentity);

module.exports = router;