import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";


const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Stylish Backpack",
  description: "A versatile and trendy backpack perfect for school or travel.",
  price: 49.99,
  image: "https://example.com/images/backpack.jpg"
}


describe("product", () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  // if the product doesn't exist
  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it('should return 404 error', async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404)
      });
    })
  })


  // if the product exist.
  describe("get product route", () => {
    describe("given the product exist", () => {
      it('should return 200 and the product itself.', async () => {
        const product = await createProduct(productPayload);
        const { body, statusCode } = await supertest(app).get(`/api/products/${product.productId}`);
        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);
      });
    })
  })
})