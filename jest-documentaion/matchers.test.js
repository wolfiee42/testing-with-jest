// .toBe

const can = {
  name: "pamplemousse",
  ounces: 12,
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
});
