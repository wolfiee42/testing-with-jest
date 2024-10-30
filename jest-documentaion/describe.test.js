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
