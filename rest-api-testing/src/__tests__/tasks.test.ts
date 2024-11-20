import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import mongoose from 'mongoose';
import { Task } from '../schema/task.schema';
import { TaskService } from '../service/task.service';


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

describe('', () => {
    it('should create a task (POST, "/tasks") ', async () => {
        const task = { title: "Test Task", description: "Learn Supertest." };
        const response = await request(TaskService).post("/tasks").send(task);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ title: "Test Task", description: "Learn Supertest." });
        expect(response.body).toHaveProperty('_id');
    });

    it('should retrive all the task from DB', async () => {
        await Task.create([{ title: 'title 1' }, { title: 'title 2' }]);
        const response = await request(TaskService).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('title', 'title 1')
    });
})