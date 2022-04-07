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

const updateSales = async (saleId, productId, quantity) => {
  const item = await salesModels.updateSales(saleId, productId, quantity);
  return item;
};

const deleteSales = async (id) => {
  const sale = await salesModels.getById(id);
  if (sale.length === 0) {
    throw new Error('Sale not found');
  }
  await salesModels.deleteSales(id);
};

module.exports = { getAll, getById, updateSales, createSales, deleteSales };