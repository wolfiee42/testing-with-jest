const notificationService = {
  sendNotification: jest.fn(),
};

describe("notification service test.", () => {
  test("should send notification exactly 3 times", () => {
    function notifyUser(times) {
      for (let i = 0; i < times; i++) {
        notificationService.sendNotification();
      }
    }
    notifyUser(3);
    expect(notificationService.sendNotification).toHaveBeenCalledTimes(3);
  });
});
