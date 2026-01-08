const { connPool } = require('../models/connect');

// Get all users
const getUsers = async (req, res) => {
    try {
        const [rows] = await connPool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connPool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [result] = await connPool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        res.status(201).json({ message: 'User created', userId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const [result] = await connPool.query(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?',
            [name, email, password, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connPool.query('DELETE FROM users WHERE user_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
