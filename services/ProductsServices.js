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

const updateProduct = async (id, name, quantity) => {
  const findProduct = await productsModels.getById(id);
  if (!findProduct) {
    throw new Error('Product not found');
  }
  await productsModels.updateProduct(id, name, quantity);
  const productUpdate = await productsModels.getById(id);
  return productUpdate;
};

const deleteProduct = async (id) => {
  const findProduct = await productsModels.getById(id);
  if (!findProduct) {
    throw new Error('Product not found');
  }
  await productsModels.deleProduct(id);
};
module.exports = { 
getAll, 
getById,
createProduct,
updateProduct,
deleteProduct };