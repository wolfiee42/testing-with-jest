import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";


const app = createServer();

describe("product", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })


  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it('should return 404 error', async () => {
        const productID = "product-123";
        await supertest(app).get(`/api/products/${productID}`).expect(404)
      });
    })
  })
})