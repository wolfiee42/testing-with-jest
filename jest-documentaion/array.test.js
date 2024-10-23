const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping bag contains milk", () => {
  expect(shoppingList).toContain("milk");
});
