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
const createSales = async (req, res) => {
  try {
    const sale = await salesServices.createSales(req.body);
    return res.status(201).json(sale);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateSales = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const [productId, quantity] = req.body;
  const sale = await salesServices
  .updateSales(id, productId, quantity);
  return res.status(200).json(sale);
};
module.exports = { getAll, getById, updateSales, createSales };