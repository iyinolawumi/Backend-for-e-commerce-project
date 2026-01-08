const { connPool } = require('../models/connect');

// Get all products
const getProducts = async (req, res) => {
    try {
        const [rows] = await connPool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connPool.query('SELECT * FROM products WHERE product_id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new product
const createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const [result] = await connPool.query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description, price, stock]
        );
        res.status(201).json({ message: 'Product created', productId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const [result] = await connPool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE product_id = ?',
            [name, description, price, stock, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connPool.query('DELETE FROM products WHERE product_id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
