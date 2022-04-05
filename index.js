require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router');
// não remova esse endpoint, e para o avaliador funcionar
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(router);
app.get('/', (_request, response) => {
  response.send();
});

if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.log(`Escutando na porta ${process.env.PORT}`);
  });
}
