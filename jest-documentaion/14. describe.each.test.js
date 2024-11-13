// 1
function isEven(n) {
  return n % 2 === 0;
}

// 2
function calculateDiscounts(price, userType) {
  if (userType === "member") return price * 0.9;
  if (userType === "vip") return price * 0.8;
  return price;
}

// 1
describe.each([
  [2, true],
  [3, false],
  [4, true],
  [5, false],
  [6, true],
])(`isEven(%i)`, (input, expected) => {
  it(`return ${expected} for ${input}`, () => {
    expect(isEven(input)).toBe(expected);
  });
});

describe.each([
  [2, true],
  [3, false],
])(`isEven(%i)`, (input, expected) => {
  it(`return ${expected} for ${input}`, () => {
    expect(isEven(input)).toBe(expected);
  });
});

// 2
describe.each([
  [100, "member", 90],
  [100, "vip", 80],
  [100, "guest", 100],
  [200, "member", 180],
  [200, "vip", 160],
])("calculateDiscounts(%i, %s)", (price, userType, expected) => {
  it(`return ${expected} for ${userType}`, () => {
    expect(calculateDiscounts(price, userType)).toBe(expected);
  });
});
