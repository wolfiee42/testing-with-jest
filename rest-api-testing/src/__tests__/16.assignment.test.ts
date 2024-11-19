const AuthService = {
  login: jest.fn(),
  getUserProfile: jest.fn(),
  logout: jest.fn(),
  checkLoginAttempt: jest.fn()
}

const LoginAttempt = [
  ['user1', 1, 'Allowed'],
  ['user2', 3, 'Allowed'],
  ['user4', 4, 'Too many attempts.'],
]

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

describe('User Logout Test', () => {
  it('should return a successfull message regarding users login.', async () => {
    AuthService.logout
      .mockResolvedValueOnce({ msg: "Successfully Logged out" })
      .mockRejectedValueOnce(new Error("User is already logged out."))
    const firstAttempt = await AuthService.logout();
    expect(firstAttempt).toEqual({ msg: "Successfully Logged out" });
    expect(AuthService.logout).toHaveBeenCalled();
    try {
      await AuthService.logout();
      expect(AuthService.logout).toHaveBeenCalledTimes(2);
    } catch (error) {
      expect(error).toEqual(new Error("User is already logged out."))
    }
  });
});



describe.each(LoginAttempt)(
  "Login attempts for %s with %i attempts",
  (username, attempt, expectedResult) => {
    it(`should return ${expectedResult}`, async () => {
      const attemptResult = Number(attempt) <= 3 ? "Allowed" : "Too many attempts."
      AuthService.checkLoginAttempt.mockReturnValueOnce(attemptResult);

      const response = await AuthService.checkLoginAttempt(username);

      expect(response).toBe(expectedResult);

      if (expectedResult === 'Too many attempts.') {
        expect(response).not.toBeFalsy();
      } else {
        expect(response).toBeTruthy();
      }
    });
  }
);
