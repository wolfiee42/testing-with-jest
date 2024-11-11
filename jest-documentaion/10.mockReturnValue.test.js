const UserService = {
  isUserLoggedIn: jest.fn(),
};

describe("User service test", () => {
  it("should return true when user is logged in", () => {
    UserService.isUserLoggedIn.mockReturnValue(true);
    const isLoggedIn = UserService.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);
  });
  it("should return false when user is not logged in.", () => {
    UserService.isUserLoggedIn.mockReturnValue(false);
    const isLoggedIn = UserService.isUserLoggedIn();
    expect(isLoggedIn).toBe(false);
  });
});
