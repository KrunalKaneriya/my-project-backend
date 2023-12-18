// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/products', ProductController.getAllProducts);
router.post('/products', ProductController.createProduct);

router.get("/products/:category/:product_id",ProductController.getSingleProduct);

router.get('/products-from-firestore', async (req, res) => {
    try {
      const products = await ProductController.getAllProductsFromFirestore();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Add other routes for CRUD operations

module.exports = router;
