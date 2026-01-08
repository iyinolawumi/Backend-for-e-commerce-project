const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// CRUD routes
router.get('/', getProducts);          // GET all products
router.get('/:id', getProductById);    // GET product by ID
router.post('/', createProduct);       // CREATE product
router.put('/:id', updateProduct);     // UPDATE product
router.delete('/:id', deleteProduct);  // DELETE product

module.exports = router;