const productsModels = require('../models/ProductModels');

const messageError = { message: 'Product not found' };

const getAll = async () => {
  const products = await productsModels.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModels.getById(id);
  if (!product) return messageError;
  return product;
};

module.exports = { getAll, getById };