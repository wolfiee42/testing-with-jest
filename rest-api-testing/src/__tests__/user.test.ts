import { Types } from 'mongoose';
import * as UserService from '../service/user.service';
import * as SessionService from '../service/session.service';
import supertest from 'supertest';
import createServer from '../utils/server';
import { createUserSessionHandler } from '../controller/session.controller';

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

const sessionPayload = {
    _id: userId,
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-09-30T13:31:07.674Z"),
    UpdatedAt: new Date("2021-09-30T13:31:07.674Z"),
    __v: 0
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
        it('should return a 400 error', async () => {
            const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValueOnce(userPayload);

            const { statusCode } = await supertest(app).post('/api/users').send({ ...userInput, passwordConfirmation: 'doesnotmatchwiththepassword' })

            expect(statusCode).toBe(400);
            expect(createUserServiceMock).not.toHaveBeenCalledWith();

        });
    });

    describe('given the user service gives error', () => {
        it('should return a 409 error.', async () => {
            const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                .mockRejectedValueOnce(":( oh no test failing.")

            const { statusCode } = await supertest(app).post('/api/users').send(userInput)

            expect(statusCode).toBe(409);
            expect(createUserServiceMock).toHaveBeenCalledWith(userInput);

        });
    });

    describe('create user session', () => {
        describe('given the username and password are valid.', () => {
            it('should return a signed accessToken & refreshToken.', async () => {
                jest
                    .spyOn(UserService, "validatePassword")
                    // @ts-ignore
                    .mockReturnValue(userPayload);

                jest
                    .spyOn(SessionService, 'createSession')
                    // @ts-ignore
                    .mockReturnValue(sessionPayload)

                const req = {
                    get: () => {
                        return 'a user agent'
                    },
                    body: {
                        email: "text@halwa.com",
                        password: "shobjiandshobji"
                    }
                }

                const send = jest.fn();
                const res = { send };

                //@ts-ignore
                await createUserSessionHandler(req, res);

                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String)
                })
            });
        });
    });
})