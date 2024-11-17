import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';



const AuthService = {
  login: jest.fn(),
  getUserProfile: jest.fn(),
  logout: jest.fn(),
  checkLoginAttempt: jest.fn()
}

beforeAll(() => {
  console.log("Initializing the test.")
});

afterAll(() => {
  console.log('Clearing up the test environment.');
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  console.log('Test case completed.');
});

describe("Testing Auth Service", () => {

  it('should return successfully login', async () => {

    const username = 'saif42';
    const password = 'holaAmigos42'

    AuthService.login.mockReturnValueOnce({ username: 'saiif42', password: 'holaAmigos42' });
    await AuthService.login(username, password);
    expect(AuthService.login).toHaveBeenCalled();

  });

});
