class Animal {}
class Dog extends Animal {}

const myDog = new Dog();

//custom classes
test("should return a instance of a dof and animal", () => {
  expect(myDog).toBeInstanceOf(Dog); // passes
  expect(myDog).toBeInstanceOf(Animal); // passes
});

// built-in classes
test("should return a instance of string and array", () => {
  const string = new String();
  expect(string).toBeInstanceOf(String); // passes

  const array = new Array();
  expect(array).toBeInstanceOf(Array); // passes
});

// real world examples
class User {}
class Admin extends User {}

function userFactory(type) {
  if (type === "admin") return new Admin();
  return new User();
}

test("should return admin instance of user but not vice versa.", () => {
  const admin = userFactory("admin");
  const user = userFactory("user");

  expect(admin).toBeInstanceOf(Admin);
  expect(admin).toBeInstanceOf(User);

  expect(user).toBeInstanceOf(User);
  expect(user).not.toBeInstanceOf(Admin);
});
