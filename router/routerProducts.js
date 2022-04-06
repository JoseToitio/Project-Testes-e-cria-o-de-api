const express = require('express');
const Products = require('../controllers/ProductsControllers');
const ProductValidate = require('../middlewares/ProductValidate');

const router = express.Router();

router.get('/', Products.getAll);
router.get('/:id', Products.getById);
router.post('/', 
ProductValidate.validateName, ProductValidate.validateQuantity, Products.createProduct);
router.put('/:id', Products.updateProduct);
router.delete('/:id', Products.deleProduct);

module.exports = router;