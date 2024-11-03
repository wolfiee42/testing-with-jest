describe("Array Method", () => {
  let testArray;

  beforeEach(() => {
    testArray = [1, 2, 3, 4];
  });

  afterEach(() => {
    testArray = [];
  });

  test("should add a new element at the end of the array.", () => {
    testArray.push(5);
    expect(testArray).toEqual([1, 2, 3, 4, 5]);
  });

  test("should remove an existing element from the array.", () => {
    testArray.pop();
    expect(testArray).toEqual([1, 2, 3]);
  });

  test("should return length 4.", () => {
    expect(testArray.length).toBe(4);
  });
});
