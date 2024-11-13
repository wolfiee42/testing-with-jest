function isEven(n) {
  return n % 2 === 0;
}

test.each([
  [1, false],
  [2, true],
])(`return %s for isEven(%i)`, (input, expected) => {
  expect(isEven(input)).toBe(expected);
});
