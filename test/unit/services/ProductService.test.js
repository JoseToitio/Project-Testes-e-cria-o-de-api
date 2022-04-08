require("dotenv/config");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const ProductModel = require("../../../models/ProductModels");
const ProductService = require("../../../services/ProductsServices");

const expect = chai.expect;

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});
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

describe("Product Server Test", () => {
  describe("Testa função getAll",  () => {
    it("Verifica se retorna todos os produtos", async () => {
      sinon.stub(ProductModel, "getAll").resolves(product1);
      const result = await ProductService.getAll();
      expect(result).to.be.an('array').length(3);
      expect(result[0]).to.be.have.property('name');
      expect(result[0]).to.be.have.property('id');
      expect(result[0]).to.be.have.property('quantity');
      
    });
  });

});