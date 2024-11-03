const database = {
  connect: jest.fn(),
  disconnet: jest.fn(),
  getData: jest.fn(),
};

describe("Database test", () => {
  // gets called before all other function
  beforeAll(() => {
    database.connect();
  });
  // gets called after every othere function.
  afterAll(() => {
    database.disconnet();
  });

  test("should retrive data successfully.", () => {
    database.getData.mockReturnValue({ id: 1, user: "test user" });
    const data = database.getData();
    expect(data).toEqual({ id: 1, user: "test user" });
  });

  test("should return null.", () => {
    database.getData.mockReturnValue(null);
    const data = database.getData();
    expect(data).toEqual(null);
  });
});
