const { validationResult } = require("express-validator");
const { getUserByIdHandler } = require("../handlers/user.mjs");
const { mockUsers } = require("../utils/constants.mjs");

// here is a visual of mocking a third party funtions or methods.

// 1. package name with a callback func relate to react, to avoid an extra return
jest.mock("express-validator", () => ({
  // 2. the actual method or func you want to mock.
  validationResult: jest.fn(() => ({
    //  3. according to the response declaring
    // the methods under the function or method, which is comming from the package
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => []),
  })),
}));

const mockRequest = {
  findUserIndex: 1,
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => mockResponse),
};

describe("get users", () => {
  it("should return users.", () => {
    getUserByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith(mockUsers[1]);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });

  it("should return statusCode 404 when user is not found", () => {
    const copyMockRequest = { ...mockRequest, findUserIndex: 100 };
    getUserByIdHandler(copyMockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
    expect(mockResponse.send).not.toHaveBeenCalled();
  });
});

describe("create users", () => {
  it("should return 400 when result is empty.", () => {});
});
