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

  it("should login successfully with valid credentials", async () => {
    AuthService.login.mockResolvedValueOnce({ id: 1, name: "John Doe" });

    const response = await AuthService.login("john", "password123");
    expect(response).toEqual({ id: 1, name: "John Doe" });
    expect(AuthService.login).toHaveBeenCalledTimes(1);
    expect(AuthService.login).toHaveBeenCalledWith("john", "password123");
  });

  it('should not login because of invalid credentials.', async () => {
    AuthService.login.mockRejectedValueOnce(new Error('Invalid Credentials.'))
    try {
      await AuthService.login('john', 'wrongPassword');
    } catch (error) {
      expect(error).toEqual(new Error("Invalid Credentials."));
      expect(AuthService.login).toHaveBeenCalledTimes(1);
      expect(AuthService.login).toHaveBeenCalledWith('john', 'wrongPassword');
    }
  });
});
