const UserService = {
  fetchUserData: jest.fn(),
};

describe("User Service Test", () => {
  // mockResolvedValue
  it("should return user data successfully.", async () => {
    UserService.fetchUserData.mockResolvedValue({ id: 1, name: "saif" });
    const user = await UserService.fetchUserData();
    expect(user).toEqual({ id: 1, name: "saif" });
  });

  // mockResolvedValueOnce
  it("should return 2 separate object in two different call.", async () => {
    UserService.fetchUserData.mockResolvedValueOnce({ id: 1, name: "saif" });
    UserService.fetchUserData.mockResolvedValueOnce({ id: 2, name: "fahad" });

    const firstCall = await UserService.fetchUserData();
    const secondCall = await UserService.fetchUserData();

    expect(firstCall).toEqual({ id: 1, name: "saif" });
    expect(secondCall).toEqual({ id: 2, name: "fahad" });
  });

  // mockRejectedValue
  it("should return error if fetchUserData is not able to fetch data.", async () => {
    UserService.fetchUserData.mockRejectedValue(
      new Error("Failed to fetch new data.")
    );
    try {
      await UserService.fetchUserData();
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch new data."));
    }
  });

  // mockRejectedValueOnce
  it("should return error in the first try and return data int he second call.", async () => {
    UserService.fetchUserData.mockRejectedValueOnce(new Error("Network Fail."));
    UserService.fetchUserData.mockResolvedValueOnce({ id: 1, name: "saif" });
    try {
      await UserService.fetchUserData();
    } catch (error) {
      expect(error).toEqual(new Error("Network Fail."));
    }
    const user = await UserService.fetchUserData();
    expect(user).toEqual({ id: 1, name: "saif" });
  });
});
