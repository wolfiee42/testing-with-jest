const user = { name: "saif", age: 23 };

// checking whether there is property available or not
const profile = { user };
test("should have a a key named 'name'", () => {
  expect(user).toHaveProperty("name");
});

// checking whether there is nested property available or not
test('should have a nested key named "name"', () => {
  expect(profile).toHaveProperty("user.name");
});

// confirming the value of the property.
test("should return the property and its value", () => {
  expect(profile).toHaveProperty("user.age", 23);
});

// real-world scenario
const fetUser = {
  userId: 1,
  user: {
    profile: {
      name: "saif",
      age: 22,
    },
  },
};

test("should return users name and age property along with value", () => {
  expect(fetUser).toHaveProperty("userId");
  expect(fetUser.user).toHaveProperty("profile.name");
  expect(fetUser).toHaveProperty("user.profile.age", 22);
});
