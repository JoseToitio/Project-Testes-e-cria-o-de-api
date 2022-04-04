const productsModels = require('../models/ProductModels');

const errorCreateUser = { message: 'Product already exists' };
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
const createProduct = async (name, quantity) => {
  const product = await productsModels.createProduct(name, quantity);
  if (!product) return errorCreateUser;
  return product;
};
module.exports = { getAll, getById, createProduct };