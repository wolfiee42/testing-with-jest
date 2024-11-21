import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from 'mongoose';
import { Book } from "../models/book.model";
import { BookService } from "../service/book.service";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(() => {
    jest.clearAllMocks();
})
describe('', () => {
    it('should return an array of books. (GET , "/books" )', async () => {
        const books = await Book.create([
            { title: 'sundarland', author: 'saif' },
            { title: 'bandarcand', author: 'ashik' }
        ]);
        const response = await request(BookService).get('/books').send(books);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty("title", "sundarland")
    });
})