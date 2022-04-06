const express = require('express');
const Sales = require('../controllers/SalesControllers');
const saleValidate = require('../middlewares/SalesValidate');

const router = express.Router();

router.get('/', Sales.getAll);
router.get('/:id', Sales.getById);
router.post('/', 
saleValidate.validateProductId, saleValidate.validateQuantitySales, Sales.createSales);
router.put('/:id',
saleValidate.validateProductId, saleValidate.validateQuantitySales, Sales.updateSales);
router.delete('/:id', Sales.deleteSales);

module.exports = router;