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

    it('should retrive all the task from DB (GET, "/tasks")', async () => {

        await Task.create([{ title: 'title 1' }, { title: 'title 2' }]);
        const response = await request(TaskService).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('title', 'title 1')

    });

    it('should update old title with new title (PUT, "/tasks/:_id")', async () => {

        const task = await Task.create({ title: 'old title' });
        const updatedTask = { title: "new title" };
        const response = await request(TaskService).put(`/tasks/${task._id}`).send(updatedTask);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedTask);

    });

    it('should delete a task. (DELETE, "/tasks/:_id")', async () => {

        const task = await Task.create({ title: 'deletable task' });

        const response = await request(TaskService).delete(`/tasks/${task._id}`);
        expect(response.status).toBe(204);

        const remainingTasks = await Task.find();
        expect(remainingTasks).toHaveLength(0);

    });

    it('should return 404 for non-existent task (PUT / DELETE)', async () => {

        const invalidId = new mongoose.Types.ObjectId();

        const putResponse = await request(TaskService).put(`/tasks/${invalidId}`).send({ title: 'not found' });
        expect(putResponse.status).toBe(404);
        expect(putResponse.body).toEqual({ error: "Task not found" });

        const deleteResponse = await request(TaskService).delete(`/tasks/${invalidId}`);
        expect(deleteResponse.status).toBe(404);
        expect(deleteResponse.body).toEqual({ error: "Task not found" });

    });
});