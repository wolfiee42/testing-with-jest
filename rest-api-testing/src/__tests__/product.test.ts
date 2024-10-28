import supertest from "supertest";
import { app } from '../app'

describe("product", () => {
  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it('should return 404 error', async () => {
        const productID = "product-123";
        await supertest(app).get(`/api/products/${productID}`).expect(404)
      });
    })
  })
})