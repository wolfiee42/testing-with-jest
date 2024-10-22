function fetchData(callback) {
  setTimeout(() => {
    callback("Peanut butter.");
  }, 1000);
}

module.exports = fetchData;
