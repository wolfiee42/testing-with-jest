import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";


const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Stylish Backpack",
  description: "A versatile and trendy backpack perfect for school or travel. A versatile and trendy backpack perfect for school or travel. A versatile and trendy backpack perfect for school or travel.",
  price: 49.99,
  image: "https://example.com/images/backpack.jpg"
}

export const userPayload = {
  _id: userId,
  email: 'jane.doe@example.com',
  name: 'Jane Doe',
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

  describe("given the user is not logged in", () => {
    it('should return a 403', async () => {
      const { statusCode } = await supertest(app).post('/api/products');
      expect(statusCode).toBe(403);
    });
  })

  describe("given the user is logged in", () => {
    it('should return a 200 and create the product.', async () => {
      const jwt = signJwt(userPayload);

      const { statusCode, body } = await supertest(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${jwt}`)
        .send(productPayload)

      expect(statusCode).toBe(200)
      expect(body).toEqual({
        "__v": 0,
        "_id": expect.any(String),
        "createdAt": expect.any(String),
        "description": "A versatile and trendy backpack perfect for school or travel. A versatile and trendy backpack perfect for school or travel. A versatile and trendy backpack perfect for school or travel.",
        "image": "https://example.com/images/backpack.jpg",
        "price": 49.99,
        "productId": expect.any(String),
        "title": "Stylish Backpack",
        "updatedAt": expect.any(String),
        "user": expect.any(String),
      })
    });
  })
})