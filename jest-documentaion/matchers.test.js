// .toBe

const can = {
  name: "pamplemousse",
  ounces: 12,
  stockInWarehouse: 0.1,
  stockInStore: 0.2,
};

describe("The can", () => {
  test("has 12 ounce.", () => {
    expect(can.ounces).toBe(12);
  });

  test("has a sopisticated name.", () => {
    expect(can.name).toBe("pamplemousse");
  });

  //.not
  test("has a sopisticated name.", () => {
    expect(can.name).not.toBe("lemon");
  });

  //   .toBeCloseTo
  test("has 0.3 cans in stock", () => {
    expect(can.stockInStore + can.stockInWarehouse).toBeCloseTo(0.3);
  });
});

function drinkAll(callback, flavour) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

// .toHaveBeenCalled
describe("drinkAll", () => {
  test("drink something lemon-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });

  test("does not drink something octopus-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "octopus");
    expect(drink).not.toHaveBeenCalled();
  });
});
