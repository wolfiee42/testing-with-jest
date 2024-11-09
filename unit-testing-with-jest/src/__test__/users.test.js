import * as validator from "express-validator";
import * as helpers from "../utils/helpers.mjs";
import { getUserByIdHandler, createUserHandler } from "../handlers/user.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
// here is a visual of mocking a third party funtions or methods.

// 1. package name with a callback func relate to react, to avoid an extra return
jest.mock("express-validator", () => ({
  // 2. the actual method or func you want to mock.
  validationResult: jest.fn(() => ({
    //  3. according to the response declaring
    // the methods under the function or method, which is comming from the package
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "invalid field" }]),
  })),
  matchedData: jest.fn(() => ({
    username: "test_name",
    displayName: "test_displayname",
    password: "password",
  })),
}));

jest.mock("../utils/helpers.mjs", () => ({
  hashPassword: jest.fn((password) => `hashed_${password}`),
}));

jest.mock("../mongoose/schemas/user.mjs");

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
  it("should return 400 when result is empty.", async () => {
    await createUserHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalled();
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([{ msg: "invalid field" }]);
  });

  it("should return 201 and a user created.", async () => {
    // this is how i overwrite validationResult's isEmpty's output.
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    // const saveMethod = User.mock.instances[0].save;
    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockResolvedValueOnce({
        id: 1,
        username: "test_name",
        displayName: "test_displayname",
        password: "password",
      });

    await createUserHandler(mockRequest, mockResponse);
    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    expect(helpers.hashPassword).toHaveBeenCalledWith("password");
    expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
    expect(User).toHaveBeenCalledWith({
      username: "test_name",
      displayName: "test_displayname",
      password: "hashed_password",
    });
    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      username: "test_name",
      displayName: "test_displayname",
      password: "password",
    });
  });
});
