const AuthService = {
  login: jest.fn(),
  getUserProfile: jest.fn(),
  logout: jest.fn(),
};

describe("User's Login process", () => {
  it("should login user in the first try and fail in second", async () => {
    AuthService.login.mockResolvedValueOnce({
      id: 1,
      name: "John Doe",
    });

    const loggedUser = await AuthService.login();
    expect(loggedUser).toEqual({
      id: 1,
      name: "John Doe",
    });

    AuthService.login.mockRejectedValueOnce(new Error("Invalid credentials."));
    try {
      await AuthService.login();
    } catch (error) {
      expect(error).toEqual(new Error("Invalid credentials."));
    }
  });
});

describe("fetching user's profile multiple times.", () => {
  it("should return users full biodata with password in the first attempt and only name in the second.", async () => {
    AuthService.getUserProfile.mockResolvedValueOnce({
      id: 1,
      name: "John Doe",
      password: "1233214",
      email: "johndoe@example.com",
    });
    const firstAttempt = await AuthService.getUserProfile();
    expect(firstAttempt).toEqual({
      id: 1,
      name: "John Doe",
      password: "1233214",
      email: "johndoe@example.com",
    });

    AuthService.getUserProfile.mockResolvedValueOnce({
      id: 1,
      name: "John Doe",
    });
    const secondAttempt = await AuthService.getUserProfile();
    expect(secondAttempt).toEqual({ id: 1, name: "John Doe" });
    expect(AuthService.getUserProfile).toHaveBeenCalledTimes(2);
  });
});

describe("should log out in the first attempt and error in the second.", () => {
  it("should logged out in the first attempt and returns error if tries for the second time.", async () => {
    AuthService.logout.mockReturnValueOnce([{ msg: "Logout successful" }]);
    const firstAttempt = await AuthService.logout();
    expect(firstAttempt).toEqual([{ msg: "Logout successful" }]);

    AuthService.logout.mockRejectedValueOnce(new Error("Log out failed."));
    try {
      await AuthService.logout();
    } catch (error) {
      expect(error).toEqual(new Error("Log out failed."));
    }
    expect(AuthService.logout).toHaveBeenCalledTimes(2);
  });
});
