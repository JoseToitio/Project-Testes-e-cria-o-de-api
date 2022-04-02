const salesModels = require('../models/SalesModels');

const messageError = { message: 'Sale not found' };

const getAll = async () => {
  const sales = await salesModels.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await salesModels.getById(id);
  if (sales.length === 0) return messageError;
  return sales;
};

module.exports = { getAll, getById };