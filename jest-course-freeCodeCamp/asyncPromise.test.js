const fetchPromise = require("./asyncPromise");

// to check the promise is resolved.
test("the data is peanit butter.", () => {
  return expect(fetchPromise()).resolves.toBe("peanut butter.");
});

// to check the promise is rejected.
test("the fetch fails with an error", () => {
  //   return expect(fetchPromise()).rejects.toThrow("error");
});
