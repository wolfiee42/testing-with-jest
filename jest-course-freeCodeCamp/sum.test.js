const sum = require("./sum");
const myFunction = require("./myFunction");

test("adds 1 + 2 equals to 3.", () => {
  expect(sum(1, 2)).toBe(3);
});

test("two ples two is four", () => {
  expect(2 + 2).toBe(4); // toBe is used for premivite data.
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;

  expect(data).toEqual({ one: 1, two: 2 }); //toEqual is used for non-premitive data.
});

test("null is falsy", () => {
  const n = null;
  expect(n).toBeFalsy(); //toBeFalsy is used for falsy value. ex. null, 0, false
});

test("One is truthy", () => {
  const n = 1;
  expect(n).toBeTruthy(); //toBeTruthy is used for truthy value;
});

test("throws on invalid input.", () => {
  expect(() => {
    myFunction("dfghnb");
  }).toThrow();
});
