require("dotenv/config");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const ProductService = require("../../../services/ProductsServices");
const app = require('../../../index');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(sinonChai);

afterEach(() => {
  sinon.restore()
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
];

describe("Testa o product Controller", () => {
  describe("Testa o retorno de todos os produtos", () => {
    it("getAll",  (done) => {
      sinon.replace(ProductService, "getAll", () => {
        return Promise.resolve(product1)
      });
      chai.request(app).get("/products")
      .end((_req, res) => {
        expect(res).to.be.have.status(200);
        expect(res.body).to.be.have.length(3);
        done();
      });
    });
  });
  describe("Testa retorno de um produto", () => {
    it("getById", (done) => {
      sinon.stub(ProductService, "getById").resolves({
        id:3,
        name: "Teclado",
        quantity: 100
      });
      chai.request(app)
      .get("/products/3")
      .end((_req, res) => {
        expect(res).to.be.have.status(200);
        expect(res.body).to.be.have.property("name").to.be.equal("Teclado")
        expect(res.body).to.be.have.property('id').to.be.equal(3)
        done();
      })
    })
  })



});