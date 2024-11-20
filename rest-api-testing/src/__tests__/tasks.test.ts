import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { Task } from '../schema/task.schema';


let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
})

afterEach(async () => {
    await Task.deleteMany(); // Clear database after each test
})

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
})