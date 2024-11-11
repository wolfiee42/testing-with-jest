const UserService = {
  fetchUserData: jest.fn(),
};

describe("User Service Test", () => {
  it("should return user data successfully.", async () => {
    UserService.fetchUserData.mockResolvedValue({ id: 1, name: "saif" });
    const user = await UserService.fetchUserData();
    expect(user).toEqual({ id: 1, name: "saif" });
  });

  it("should return 2 separate object in two different call.", async () => {
    UserService.fetchUserData.mockResolvedValueOnce({ id: 1, name: "saif" });
    UserService.fetchUserData.mockResolvedValueOnce({ id: 2, name: "fahad" });

    const firstCall = await UserService.fetchUserData();
    const secondCall = await UserService.fetchUserData();

    expect(firstCall).toEqual({ id: 1, name: "saif" });
    expect(secondCall).toEqual({ id: 2, name: "fahad" });
  });
});
