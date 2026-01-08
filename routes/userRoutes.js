const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

// CRUD routes
router.get('/', getUsers);          // GET all users
router.get('/:id', getUserById);    // GET user by ID
router.post('/', createUser);       // CREATE user
router.put('/:id', updateUser);     // UPDATE user
router.delete('/:id', deleteUser);  // DELETE user

module.exports = router;
