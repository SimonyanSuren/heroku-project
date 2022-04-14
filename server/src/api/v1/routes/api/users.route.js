const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/users.controller');

const { authenticateUser } = require('../../middleware/authentication.middleware');

router.get('/getAll', UserController.getAllUsers);
router.get('/get', authenticateUser,UserController.getEachUser);
router.get('/search',authenticateUser, UserController.searchUsers);

router.post('/fetch', UserController.fetchUsers);

router.patch('/edit',authenticateUser, UserController.editUser);
router.delete('/delete/:uuid', authenticateUser,UserController.deleteUser);

module.exports = router;
