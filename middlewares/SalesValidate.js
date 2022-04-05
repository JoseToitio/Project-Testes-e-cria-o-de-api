const validateProductId = (req, res, next) => {
  const sales = req.body;

  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].productId === undefined) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }
  next();
};

const validateQuantitySales = (req, res, next) => {
  const sales = req.body;

  for (let i = 0; i < sales.length; i += 1) {
    if (sales[i].quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (sales[i].quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }
  next();
};

module.exports = {
  validateProductId,
  validateQuantitySales,
};