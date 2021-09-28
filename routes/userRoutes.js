const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const {register,login,getSingleUser,getAllUsers,logout} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/getSingleUser', auth, getSingleUser);
router.get('/getAllUsers', auth, getAllUsers);
router.post('/logout',auth, logout);

module.exports = router;