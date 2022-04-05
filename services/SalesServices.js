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
const createSales = async (dados) => { 
  try {
    const sale = await salesModels.createSales(dados);
    return sale;
  } catch (error) {
    return error;
  }
};
const updateSales = async ({ id, productId, quantity }) => {
  const sale = salesModels.updateSales(id, productId, quantity);
  return sale;
};
module.exports = { getAll, getById, updateSales, createSales };