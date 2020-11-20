const express = require('express');
const router = express.Router();

// Controladores
const userController = require('../controllers/user.controller');
// - Controladores

// Rutas para usuarios
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById)
router.post('/', userController.createUser);
router.delete('/:userId', userController.deleteUser);
router.patch('/:userId', userController.updateUser);
// - Rutas para usuarios

module.exports = router;
