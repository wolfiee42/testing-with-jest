import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose'
describe("Testing Auth Service", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })


});
