require("dotenv/config");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const app = require("../../../index");
const { end } = require("../../../models/connection");
const SaleService = require("../../../services/SalesServices");

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});

describe("Testa Sales Controllers", () => {
  const createSales = [
    {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 110,
        },
        {
          productId: 2,
          quantity: 230,
        },
      ],
    },
  ]
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
  describe("Testa se retorna todos os sales", () => {
    it("GetAll Sales", (done) => {
      sinon.replace(SaleService, "getAll", () => {
        return Promise.resolve(product1);
      });
      chai.request(app)
      .get("/sales")
      .end((_req, res) => {
        expect(res).to.be.have.status(200);
        expect(res.body[0]).to.be.have.property("id");
        expect(res.body[0]).to.be.have.property("name");
        expect(res.body[0]).to.be.have.property("quantity");
        done()
      });
    });
  });

  describe("Testa se retorna um sales", () => {
    it("getById", (done) => {
      sinon.replace(SaleService, "getById", () => {
        return Promise.resolve({
          id:3,
          name: "Teclado",
          quantity: 5
        });
      });
      chai.request(app)
      .get("/sales/3")
      .end((_req, res) => {
        expect(res.body).to.be.have.property("id");
        expect(res.body).to.be.have.property("name").to.be.equals("Teclado")
        expect(res.body).to.be.have.property("quantity").to.be.equals(5);
        done();
      })
    });
  });
  describe("Testa se é possivel criar um sales", () => {
    it("Create Sales", (done) => {
      sinon.stub(SaleService, "createSales").resolves(createSales)
      chai.request(app)
      .post("/sales")
      .send([
        {
          productId: 1,
          quantity: 110
        },
        {
          productId: 2,
          quantity: 230
        }
      ])
      .end((_req, res) => {
        expect(res.body[0]).to.be.have.property("id");
        expect(res.body[0]).to.be.have.property("itemsSold");
        expect(res.body[0].itemsSold[0]).to.be.have.property("productId");
        expect(res.body[0].itemsSold[0]).to.be.have.property("quantity");
        done();
      })
    })
  })
});