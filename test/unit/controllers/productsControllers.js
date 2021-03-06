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

describe("Testa o product Controller", () => {
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
      });
    });
  })
  describe("testa se é possivel criar um produto", () => {
    it("create product", (done) => {
      sinon.stub(ProductService, "createProduct").resolves({
        id:5,
        name:"Mouse",
        quantity: 20,
      });
      chai.request(app)
      .post("/products")
      .send({name: "Mouse", quantity: 20})
      .end((_req, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("quantity").to.be.equal(20);
        expect(res.body).to.have.property("id").to.be.equal(5);
        expect(res.body).to.have.property("name").to.be.equal("Mouse");
        done();
      });
    })
  })


});