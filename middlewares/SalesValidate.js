const idEmptyMessage = { message: '"productId" is required' };
const quantityEmptyMessage = { message: '"quantity" is required' };
const quantityLengthMessage = { message: '"quantity" must be greater than or equal to 1' };

const validateId = (req, res, next) => {
  const sales = req.body;
  const idEmpty = sales.some((sale) => !sale.productId);
  if (idEmpty) return res.status(400).json(idEmptyMessage);
  next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  const emptyQuantity = sales.some((sale) => !sale.quantity && sale.quantity !== 0);
  if (emptyQuantity) return res.status(400).json(quantityEmptyMessage);

  const quantityLength = sales.some((sale) => sale.quantity < 1);
  if (quantityLength) return res.status(422).json(quantityLengthMessage);

  next();
};

module.exports = { validateId, validateQuantity };