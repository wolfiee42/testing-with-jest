const { getUserByIdHandler } = require("../handlers/user.mjs");

const mockRequest = {
  findUserIndex: 1,
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
};

describe("get users", () => {
  it("should return users.", () => {
    getUserByIdHandler(mockRequest, mockResponse);
  });
});
