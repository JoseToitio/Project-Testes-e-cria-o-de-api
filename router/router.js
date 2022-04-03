const express = require('express');
const Products = require('../controllers/ProductsControllers');
const Sales = require('../controllers/SalesControllers');

const router = express.Router();

router.get('/products', Products.getAll);
router.get('/products/:id', Products.getById);
router.get('/sales', Sales.getAll);
router.get('/sales/:id', Sales.getById);
module.exports = router;