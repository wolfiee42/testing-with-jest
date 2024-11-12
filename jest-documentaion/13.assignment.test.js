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

describe("User's Logout proccess.", () => {
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

describe("Login User and Fetch User's Information.", () => {
  it("should login with user credindials and fetch users information.", async () => {
    AuthService.login.mockResolvedValueOnce({ id: 2, name: "Ashik" });
    const loginAttepmt = await AuthService.login();
    expect(loginAttepmt).toEqual({ id: 2, name: "Ashik" });

    AuthService.getUserProfile.mockResolvedValueOnce({
      id: 2,
      name: "Ashik",
      email: "ashik@example.com",
      password: "1234321",
    });

    const secondAttempt = await AuthService.getUserProfile();
    expect(secondAttempt).toEqual({
      id: 2,
      name: "Ashik",
      email: "ashik@example.com",
      password: "1234321",
    });
  });

  it("should not return user info as it is not able to login it n the first place.", async () => {
    AuthService.login.mockRejectedValueOnce(new Error("Login Failed."));
    try {
      await AuthService.login();
    } catch (error) {
      expect(error).toEqual(new Error("Login Failed."));
    }

    AuthService.getUserProfile.mockRejectedValueOnce(
      new Error("No User Detected.")
    );
    try {
      await AuthService.getUserProfile();
    } catch (error) {
      expect(error).toEqual(new Error("No User Detected."));
    }

    expect(AuthService.login).toHaveBeenCalled();
    expect(AuthService.getUserProfile).toHaveBeenCalled();
  });
});
