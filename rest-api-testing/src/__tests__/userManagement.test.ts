import request from 'supertest';
import app from "../service/userManagement.service";

describe('User Management API', () => {

    it('should return all users (GET, "/users") ', async () => {

        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]); // Initially, no users

    });

    it('should create a new user (POST, "/users")', async () => {

        const newUser = { name: 'Ashik', age: 20 };

        const response = await request(app).post('/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({ id: 1, name: 'Ashik', age: 20 });

    });

    it('should return error (POST, "/users")', async () => {

        const response = await request(app).post('/users').send({ name: 'Ashik' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Both name and message are required.' });

    });

    it('should return all users, (GET / "/users")', async () => {

        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toMatchObject({ id: 1, name: 'Ashik', age: 20 });

    });
})