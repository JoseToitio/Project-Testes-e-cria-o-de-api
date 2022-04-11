require("dotenv/config");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const productModel = require('../../../models/ProductModels');
const connection = require("../../../models/connection");

const expect = chai.expect;
chai.use(sinonChai);
afterEach(() => {
  sinon.restore();
})


describe('Teste do Products Models', () => {
  
const product1 = [
  {
    id: 1,
    name: "Garrafa de Água",
    quantity: 20,
  },
  {
    id: 2,
    name: "Relógio",
    quantity: 10,
  },
  {
    id: 3,
    name: "Creatina",
    quantity: 5,
  }
]

  describe('testa a função getAll', () => {
    it('Deve retornar todos os produtos', async () => {
        sinon.stub(
          connection, "execute"
        ).resolves([product1]);
      const result = await productModel.getAll();
      expect(result).to.be.an("array").to.be.have.length(3);
      expect(result[0]).to.be.have.property("id");
      expect(result[0]).to.be.have.property("name");
      expect(result[0]).to.be.have.property("quantity");
      expect(result[0].name).to.be.equal("Garrafa de Água");
    });
  });

  describe('testa a função getById', () => {
    it('Deve retornar o produto por Id', async () => {
      sinon.stub(
        connection, "execute"
      ).resolves([product1]);
      const result = await productModel.getById(1);
      expect(result).to.be.an("object");
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result).to.have.property("quantity");
      expect(result).to.be.equal(product1[0]);
      expect(result.name).to.be.equal("Garrafa de Água");
      expect(result.quantity).to.be.exist;
    });
  });

  describe('Testa a função create', () => {
    it('Testa se pode criar um produto ou não', async () => {
      sinon.stub(connection, "execute").resolves([product1]);
      const result = await productModel.createProduct("produto A", 30);
      expect(result).to.be.false;
    });
    it("sucesso no retorno e cria um novo produto", async () => {
      sinon.stub(connection, "execute").resolves(product1);
      const result = await productModel.createProduct("Sabonete",10);
      expect(result).to.be.deep.equal({
        id: undefined,
        name: "Sabonete",
        quantity: 10,
      });
    });
  });

  describe('Testa a função update', () => {
    it("verifica se pode fazer update de um produto ja existente", async () => {
      sinon.stub(connection, "execute").resolves([{insertId: 1}]);
      const result = await productModel.updateProduct(1, "Mouse", 30);
      expect(result).to.be.an("object");
      expect(result).to.be.deep.equal({
        insertId: 1,
      })
    })
  })
  describe("testa função delete", () => {
    it("verifica se deleta produto", async () => {
      sinon.stub(connection, "execute").resolves();
      const result = await productModel.deleProduct(1);
      expect(result).to.be.an("undefined");
    });
  });
});