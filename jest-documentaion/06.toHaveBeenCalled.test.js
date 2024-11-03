const userService = {
  sendEmail: jest.fn(),
};

describe("User service Test", () => {
  test("should return user service test hase been called.", () => {
    function notifyUser() {
      userService.sendEmail();
    }
    notifyUser();
    expect(userService.sendEmail).toHaveBeenCalled();
  });
});
