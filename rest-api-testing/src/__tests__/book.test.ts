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


afterEach(async () => {
    jest.clearAllMocks();
    await Book.deleteMany();
})

describe('', () => {
    it('should return an array of books. (GET , "/books" )', async () => {
        const books = await Book.create([
            { title: 'sundarland', author: 'saif' },
            { title: 'bandarcand', author: 'ashik' }
        ]);
        const response = await request(BookService).get('/books').send(books);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty("title", "sundarland");
        // have to resolve this.
        // expect(response.headers).toHaveProperty('content-type', 'application/json')
        expect(response.headers['content-type']).toContain('application/json');
    });

    it('should return a book by unique id. (GET, "/books/:_id")', async () => {

        const id = new mongoose.Types.ObjectId;

        const invalidResponse = await request(BookService).get(`/books/${id}`);
        expect(invalidResponse.status).toBe(404);
        expect(invalidResponse.body.message).toBe("Book not found");

        const book = await Book.create({ title: 'sundarland', author: 'saif' });
        const response = await request(BookService).get(`/books/${book._id}`).send(book);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("title", "sundarland");

    });

    it('should create a book in the database. (POST, "/books")', async () => {
        const book = { title: 'bandarcand', author: 'ashik', publishedYear: 2020, genre: 'crime' };
        const response = await request(BookService).post('/books').send(book);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("author");

    });

    test.each([
        [{ title: '', author: 'saif' }, 'Title is required'],
        [{ title: 'bandarcand', author: '' }, 'Author is required.']
    ])('should return 400 if the book is invalid. (POST, "/books")', async (invalidBook, expectedError) => {
        const response = await request(BookService).post('/books').send(invalidBook);
        expect(response.status).toBe(400);
    });

    it('should update book information, (PUT / "/books/:_id")', async () => {
        const oldBook = await Book.create({ title: 'sundarland', author: 'saif' });
        const newBook = { title: 'cola-land' };
        const response = await request(BookService).put(`/books/${oldBook._id}`).send(newBook);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("title", "cola-land");

        const invalidId = new mongoose.Types.ObjectId;
        const invalidResponse = await request(BookService).put(`/books/${invalidId}`);

        expect(invalidResponse.status).toBe(404);
        expect(invalidResponse.body.message).toBe("Book not found")
    });

    it('should delete a book information. (DELETE, "/books/:_id")', async () => {

        const book = await Book.create({ title: 'sundarland', author: 'saif' });
        const response = await request(BookService).delete(`/books/${book._id}`).send(book);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Book deleted successfully");

        const invalidID = new mongoose.Types.ObjectId;
        const invalidResponse = await request(BookService).put(`/books/${invalidID}`);

        expect(invalidResponse.status).toBe(404);
        expect(invalidResponse.body.message).toBe("Book not found");
    });
});
