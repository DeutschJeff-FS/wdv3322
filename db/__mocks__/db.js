const connect = async () => {
  console.log("Mocked Connection");
};

const saveUser = async () => {
  console.log("Mocked User Found");
  return Promise.resolve({
    firstName: "John",
    lastName: "Doe",
    address: "1234 Main St",
    city: "Cairo",
    state: "Missouri",
    zip: "123456",
    email: "johndoe@test.com",
    password: "jd12345",
  });
};

const findUser = async () => {
  console.log("Mocked User Saved");
  return Promise.resolve({
    email: "johndoe@test.com",
    firstName: "John",
    city: "Cairo",
    lastName: "Doe",
  });
};

const disconnect = async () => {
  console.log("Mocked Disconnection");
};

module.exports = { connect, saveUser, findUser, disconnect };
