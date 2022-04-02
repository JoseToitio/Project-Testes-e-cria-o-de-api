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
module.exports = { getAll, getById };