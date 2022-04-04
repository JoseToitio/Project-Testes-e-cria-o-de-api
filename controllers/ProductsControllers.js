const productsServices = require('../services/ProductsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const products = await productsServices.getById(id);
  if (products.message) return res.status(404).json(products);
  return res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsServices.createProduct(name, quantity);

  if (product.message) return res.status(409).json(product);
  return res.status(201).json(product);
};
module.exports = { getAll, getById, createProduct };