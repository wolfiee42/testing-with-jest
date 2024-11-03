const logger = {
  loggerMessage: jest.fn(),
};

describe("Logger Message", () => {
  test("should log the currect error and message", () => {
    function logError() {
      logger.loggerMessage("Error Occured", "ERROR");
    }

    logError();

    expect(logger.loggerMessage).toHaveBeenCalledWith("Error Occured", "ERROR");
  });
});
