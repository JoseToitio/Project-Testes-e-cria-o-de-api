const quantityMessageEmpty = { message: 
  '"quantity" is required' };
const quantityLengthMessage = { message: 
  '"quantity" must be greater than or equal to 1' };

  const nameMessageEmpty = { message: 
    '"name" is required' };
  const nameLengthMessage = { message: 
    '"name" length must be at least 5 characters long' };

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json(nameMessageEmpty);
  if (name.length < 5) return res.status(422).json(nameLengthMessage);
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (!quantity && quantity !== 0) {
    return res.status(400).json(quantityMessageEmpty);
  }
  if (quantity < 1) return res.status(422).json(quantityLengthMessage);
  next();
};

module.exports = { validateName, validateQuantity };