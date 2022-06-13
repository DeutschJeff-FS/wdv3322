const mongoose = require("mongoose");

const User = require("../api/model/user");
const { connect, findUser, saveUser, disconnect } = require("./db");

jest.mock("./db");

beforeEach(async () => {
  console.log("connecting");
  await connect();
});

describe("", () => {
  test("save user", async () => {
    const newUser = new User({
      _id: mongoose.Types.ObjectId(),
      firstName: "John",
      lastName: "Doe",
      address: "1234 Main St",
      city: "Cairo",
      state: "Missouri",
      zip: "123456",
      email: "johndoe@test.com",
      password: "jd12345",
    });
    const user = await saveUser(newUser);

    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.city).not.toBe("Versailles");
  });

  test("find user", async () => {
    const email = "johndoe@test.com";
    const login = await findUser(email);

    expect(login.firstName).toBe("John");
    expect(login.city).toBe("Cairo");
    expect(login.zip).not.toBe("112233");
  });
});

afterEach(async () => {
  console.log("disconnecting");
  await disconnect();
});
