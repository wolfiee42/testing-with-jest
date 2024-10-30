const myBeverage = {
  delicious: true,
  sour: false,
};

describe("My beverage is ", () => {
  test("delicious", () => {
    expect(myBeverage.delicious).toBeTruthy(); //.toBeTruthy()
  });
  test("not sour", () => {
    expect(myBeverage.sour).toBeFalsy(); //.toBeFalsy();
  });
});

//nested describe blocks, hierarchy of tests.

class CustomError {
  constructor() {
    this.error = new Error();
  }
}

const binaryStringToNumber = (binString) => {
  if (!/^[01]+$/.test(binString)) {
    throw new CustomError("Not a binary number.");
  }

  return parseInt(binString, 2);
};

describe("binary String To Number", () => {
  describe("given an invalid binary string.", () => {
    test("composed of non-numbers throws CustomErrors.", () => {
      expect(() => binaryStringToNumber("abc")).toThrow(CustomError);
    });

    test("with extra white space throws CustomError", () => {
      expect(() => binaryStringToNumber("   100")).toThrow(CustomError);
    });
  });

  describe("given a valid number", () => {
    test("returns the correct number.", () => {
      expect(binaryStringToNumber("100")).toBe(4);
    });
  });
});
