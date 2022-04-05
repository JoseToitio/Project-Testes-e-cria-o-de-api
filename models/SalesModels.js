const connection = require('../connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id AS saleId, product_id AS productId, quantity, sales.date FROM sales_products
        INNER JOIN sales ON sales_products.sale_id = sales.id
        ORDER BY sales.id`,
  );
  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT product_id AS productId, quantity, sales.date FROM sales_products
    INNER JOIN sales ON sales_products.sale_id = sales.id
    WHERE sales.id = ?`, [id],
  );
  return sales;
};

const createSales = async (dados) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  const promise = dados.map(async ({ productId, quantity }) => 
    connection.execute(
      `INSERT INTO sales_products
       (sale_id, product_id, quantity) VALUES(?,?,?)`,
       [insertId, productId, quantity],
    ));

    await Promise.all(promise);

    return {
      id: insertId,
      itemsSold: dados,
    };
};

const updateSales = async (id, productId, quantity) => {
  await connection.execute(`
  UPDATE sales SET date = NOW() WHERE id = ?`,
  [id]);
  await connection.execute(`
  UPDATE sales_products SET product_id = ?, quantity = ?
  WHERE sale_id = ?`,
  [productId, quantity, id]);
  return {
    saleId: id,
    itemUpdated: [productId, quantity],
  };
};

module.exports = { getAll, getById, updateSales, createSales };