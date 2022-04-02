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

module.exports = { getAll, getById };