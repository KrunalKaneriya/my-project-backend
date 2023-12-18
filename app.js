// src/app.js
const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
// Middleware to parse JSON
app.use(express.json({}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Use routes
app.use('/api/', categoryRoutes);
app.use('/api/', productRoutes);

module.exports = app;
