const connection = require('../connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id as saleId,
  sp.product_id as productId, sp.quantity, s.date
  FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id ORDER BY sale_id, product_id`,
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

const updateSales = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
    [quantity, saleId, productId],
  );

  return { saleId, itemUpdated: [{ productId, quantity }] };
};

module.exports = { getAll, getById, updateSales, createSales };