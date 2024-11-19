const user = {
  name: "saif",
  age: 30,
};

const elementArr = [1, 2, undefined, 4];

test("should return value as a defined", () => {
  expect(user.name).toBeDefined();
  expect(user.age).not.toBeUndefined();
});

test("should return one value defined and another undefined.", () => {
  expect(elementArr[1]).toBeDefined();
  expect(elementArr[2]).not.toBeDefined();
});
