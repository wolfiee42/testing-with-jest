const fetchData = require("./callback");

//callback based async data's test case
test("the data is peanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("Peanut butter.");
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
