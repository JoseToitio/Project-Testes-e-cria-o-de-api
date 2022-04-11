require("dotenv/config");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const SaleModel = require("../../../models/SalesModels");
const ProductModel = require("../../../models/ProductModels");
const SaleService = require("../../../services/SalesServices");

const expect = chai.expect;
chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});


describe("Testa Sales Services", () => {
  const sales = [
    {
      id: 1,
      productId: 1,
      quantity: 2,
    },
    {
      id: 2,
      productId: 2,
      quantity: 1,
    },
  ];
  describe("Testa função getall", () => {
    it("Verifica se retorna todos os sales", async () => {
      sinon.stub(SaleModel, "getAll").resolves(sales);
      const result = await SaleService.getAll();
      expect(result).to.be.have.length(2);
      expect(result[0]).to.be.have.property('id')
      expect(result[0]).to.be.have.property('productId')
      expect(result[0]).to.be.have.property('quantity')
    });
  });

  describe("Testa função getbyid", () => {
    it("Verifica se retorna um sales por id", async () => {
      const sale = {
        id:1,
        productId: 1,
        quantity: 3
      };
      sinon.stub(SaleModel, "getById").resolves([sale]);
      const result = await SaleService.getById(1);
      expect(result[0]).to.be.have.property("id").to.be.equals(1);
      expect(result[0]).to.be.have.property("productId").to.be.equals(1);
      expect(result[0]).to.be.have.property("quantity").to.be.equals(3);
    });
  })
})