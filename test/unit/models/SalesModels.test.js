require("dotenv/config");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const SaleModel = require("../../../models/SalesModels");
const connection = require("../../../models/connection");
const { object } = require("joi");

const expect = chai.expect;
chai.use(sinonChai);
afterEach(() => {
  sinon.restore();
})
const sales = [
  {
    id: 1,
    productId: 1,
    quantity: 120
  },
  {
    id: 2,
    productId: 2,
    quantity: 203
  },
  {
    id:3,
    productId:3,
    quantity:13
  }
];
describe("Testando Sales Models",() => {
  describe('testa o retorno de todos os sales', () => { 
    it("retorno de todos os sales", async () => {
      sinon.stub(connection, "execute").resolves([sales]);
      const result = await SaleModel.getAll();
      expect(result).to.be.have.length(3);
      expect(result).to.be.an('array')
    });
   });
  
  describe("Testa o retorno de um elemento por id", () => {
    it("retorna um elemento de acordo com o Id", async () => {
      sinon.stub(connection, "execute").resolves(sales);
      const result = await SaleModel.getById(1);

      expect(result).to.be.an("object");
      expect(result).to.have.property("id");
      expect(result).to.have.property("quantity");
      expect(result).to.be.equal(sales[0]);
      expect(result.quantity).to.be.exist;
    });
  });

  describe("Testa se é possivel criar um sales", () => {
    it("testa função createSales", async () => {
      sinon.stub(connection, "execute").resolves(sales);
      const result = await SaleModel.createSales([
        {
          productId: 1,
          quantity: 12,
        },
        {
          productId: 2,
          quantity: 240,
        },
      ]);
      expect(result).to.be.an("object");
      expect(result).to.be.have.property("id");
      expect(result).to.be.have.property("itemsSold")
    })
  })

  describe("Testa se é possivel deletar um sales", () => {
    it("Testa a função deleteSales", async () => {
      sinon.stub(connection, "execute").resolves(sales);
      const result = await SaleModel.deleteSales(1);
      expect(result).to.be.an("object")
    })
  })

  describe("Testa se é possivel fazer update em um sales", () => {
    it("Testa a função updateSales", async () => {
      const items = [
        {
          productId: 1,
          quantity: 110,
        }]
      sinon.stub(connection, "execute").resolves(sales);
      const result = await SaleModel.updateSales(1,items )
      expect(result).to.be.an("object");
      expect(result).to.be.have.property('saleId');
      expect(result).to.be.have.property('itemUpdated')
    })
  })
});