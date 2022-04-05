const connection = require('../connection');

const getAll = async () => {
  const [products] = await connection
  .execute('SELECT * FROM products;');
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection
  .execute('SELECT * FROM products WHERE id=?;', [id]);
  return products;
};

const createProduct = async (name, quantity) => {
  const [productsWithThisName] = await connection.execute(
    `SELECT * FROM products
    WHERE name = ?;`, [name],
  );

  if (productsWithThisName.length > 0) return false;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name, quantity)VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

const updateProduct = async (id, name, quantity) => {
  const [product] = await connection.execute(
    'UPDATE products SET name=?, quantity=? WHERE id=?',
    [name, quantity, id],
  );
  return product;
};

const deleProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id=?', [id]);
};

module.exports = { getAll,
getById,
createProduct,
updateProduct,
deleProduct };