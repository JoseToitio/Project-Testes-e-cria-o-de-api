const salesServices = require('../services/SalesServices');

const getAll = async (req, res) => {
  const sales = await salesServices.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesServices.getById(id);
  if (sales.message) return res.status(404).json(sales);
  return res.status(200).json(sales);
};

module.exports = { getAll, getById };