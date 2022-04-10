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
const product2 = {
    id: 1,
    name: "Garrafa de Água",
    quantity: 20,
}


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
  describe('Testa função getByid', () => {
    it("Retorna um produto", async () => {
      sinon.stub(ProductService, "createProduct").resolves(product2);
      const result = await ProductService.createProduct('a', 2);
      expect(result).to.be.an("object")
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result).to.have.property("quantity");
    });
  });

  describe("testa função delete", () => {
    it("produto deletado", async () => {
      sinon.stub(ProductModel, "getById").resolves(product2);
      sinon.stub(ProductModel, "deleProduct").resolves(product2);
      const result = await ProductService.deleteProduct(product2.id);
      expect(result).to.be.an("undefined");
    });
  });

  describe("testa a função update", () => {
    it("produto atualizado", async() =>{
      const product = {
        id:1,
        name: "Chocolate",
        quantity: 300
      }
      sinon.stub(ProductModel, "getById").resolves(product);
      sinon.stub(ProductModel, "updateProduct").resolves(product);
      const result = await ProductService.updateProduct(
        product.id,
        product.name,
        product.quantity
      );
      expect(result).to.be.an("object");
      expect(result).to.have.property("id");
      expect(result).to.have.property("name");
      expect(result).to.have.property("quantity");
    })
  })

});