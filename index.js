const express = require('express');
const bodyParser = require('body-parser');
const routerProducts = require('./router/routerProducts');
const routerSales = require('./router/routerSales');

require('dotenv').config();
// não remova esse endpoint, e para o avaliador funcionar
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});
app.use('/products', routerProducts);
app.use('/sales', routerSales);

if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.log(`Escutando na porta ${process.env.PORT}`);
  });
}

module.exports = app;