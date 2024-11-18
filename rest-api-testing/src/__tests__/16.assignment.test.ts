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

describe("User Login Tests", () => {

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


describe('User Profile Test', () => {
  it('should return full users profile at first attempt, and limited information at second.', async () => {
    AuthService.getUserProfile.mockResolvedValueOnce({
      id: 1,
      name: 'saif',
      email: 'saif@example.com',
      password: "password123"
    })
      .mockResolvedValueOnce({
        id: 1,
        name: 'saif'
      });

    const getUserProfile1 = await AuthService.getUserProfile();
    expect(getUserProfile1).toEqual({
      id: 1,
      name: 'saif',
      email: 'saif@example.com',
      password: "password123"
    })


    const getUserProfile2 = await AuthService.getUserProfile();
    expect(getUserProfile2).toEqual({
      id: 1,
      name: 'saif'
    })

    expect(AuthService.getUserProfile).toHaveBeenCalledTimes(2);

  });
})