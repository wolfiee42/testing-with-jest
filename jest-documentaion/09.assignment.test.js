// create a describe function using these functions beforeAll(), afterAll(),  .toHaveBeenCalledTimes(), .toHaveBeenCalledWith() , .toBeTruthy() , .toBeFalsy().

const authService = {
  login: jest.fn(),
  logout: jest.fn(),
  isAuthenticated: jest.fn(),
};

describe("Auth Service Test", () => {
  /* The `beforeAll` is used to run a function before any of the
test cases within the `describe` block are executed. */
  beforeAll(() => {
    authService.login.mockReturnValue(true);
    authService.isAuthenticated.mockReturnValue(true);
  });

  /* The `afterAll` function in the code snippet is used to define a function that will be executed after
all the test cases within the `describe` block have been run. */
  afterAll(() => {
    authService.logout.mockClear();
    authService.login.mockClear();
  });

  /* This test case is checking the behavior of the `login` function in the `authService` object. Here's
a breakdown of what the test is doing: */
  test("should call login with correct username and password ", () => {
    const username = "wolfiee42";
    const password = "how you doin'";

    authService.login(username, password);

    expect(authService.login).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith(username, password);
  });

  /* This test case is checking the behavior of the `isAuthenticated` function in the `authService`
 object after a user has logged in. */
  test("should be authenticated after login.", () => {
    const isLoggedIn = authService.isAuthenticated();

    expect(isLoggedIn).toBeTruthy();
  });

  /* This test case is checking the behavior of the `isAuthenticated` function in the `authService`
 object after a user has logged out. Here's a breakdown of what the test is doing: */
  test("should not be authenticated after logout.", () => {
    authService.isAuthenticated.mockReturnValue(false);
    authService.logout();

    expect(authService.logout).toHaveBeenCalledTimes(1);
    expect(authService.isAuthenticated()).toBeFalsy();
  });
});
