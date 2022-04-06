const validateProductId = (req, res, next) => {
  const { body } = req;
  const sales = body.some((sale) => !sale.productId);
  if (sales) {
    return res.status(400)
    .json({ message: '"productId" is required' });
  }
  return next();
};

const validateQuantitySales = (req, res, next) => {
  const { body } = req;

  const saleUndefined = body.some((item) => item.quantity === undefined);
  if (saleUndefined) return res.status(400).json({ message: '"quantity" is required' });

  const saleQuantity = body.some((item) => item.quantity <= 0);
  if (saleQuantity) {
    return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  validateProductId,
  validateQuantitySales,
};