const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:userId', userController.deleteUser);
router.patch('/:userId', userController.updateUser);

module.exports = router;