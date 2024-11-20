import request from 'supertest';
import app from "../service/userManagement.service";

describe('User Management API', () => {
    it('should return all users (GET, "/users") ', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]); // Initially, no users
    });
})