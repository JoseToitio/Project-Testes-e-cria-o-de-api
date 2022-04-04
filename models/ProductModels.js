const connection = require('../connection');

const getAll = async () => {
  const [products] = await connection
  .execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE id=?;', [id]);
  return products;
};

const createProduct = async (name, quantity) => {
  const [productsWithThisName] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name = ?;`, [name],
  );

  if (productsWithThisName.length > 0) return false;

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
     VALUES (?, ?)`,
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = { getAll, getById, createProduct };