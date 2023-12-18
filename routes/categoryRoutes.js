// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get("/category/:categoryName",CategoryController.getSingleCategory); 
router.get('/categories', CategoryController.getAllCategories);
router.post('/categories', CategoryController.createCategory);
// Add other routes for CRUD operations


module.exports = router;
