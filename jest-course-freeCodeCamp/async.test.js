const fetchPromise = require("./promise");

test("the data is peanut butter", async () => {
  const data = await fetchPromise();
  expect(data).toBe("peanut butter.");
});
