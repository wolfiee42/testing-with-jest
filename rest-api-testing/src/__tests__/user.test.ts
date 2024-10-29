import { Types } from 'mongoose';
import * as UserService from '../service/user.service';
import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();
const userId = new Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: "kibole123@example.com",
    name: "pepe baji"
}

const userInput = {
    email: "text@halwa.com",
    name: "mishti kumra",
    password: "shobjiandshobji",
    passwordConfirmation: "shobjiandshobji",
}

describe("User Registration", () => {
    describe("given the username and password are valid.", () => {
        it('should return user payload', async () => {
            const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValueOnce(userPayload);

            const { statusCode, body } = await supertest(app).post('/api/users').send(userInput)

            expect(statusCode).toBe(200);
            expect(body).toEqual(userPayload);
            expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
        });
    });

    describe("given the username and password are not valid.", () => {
        it('should return a 400 error', () => {

        });
    });

    describe('given the user service gives error', () => {
        it('should return a 409 error.', () => {

        });
    });

    describe('create user session', () => {
        describe('given the username and password are valid.', () => {
            it('should return a signed accessToken & refreshToken.', () => {

            });
        });
    });
})