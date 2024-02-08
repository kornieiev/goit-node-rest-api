/*
return status-code 200
return token
return object User{email: String, subscription: String}
*/

// const loginUser = require("./loginUser");

// describe("test controller loginUser", () => {
//   test("status-code = 200", () => {
//     const req = { body: { email: "test@example.com", password: "password" } };
//     const result = loginUser(req, res);
//     console.log("result", result);
//     expect((res.status = 200)).toBe(200);
//   });
// });

const bcrypt = require("bcrypt");

const { loginUser } = require("./loginUser");
const { User } = require("../../models");

describe("Auth login test", () => {
  it("should respond with token and user object", async () => {
    const _id = "user-id";
    const email = "test@example.com";
    const password = "password";
    const regex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/g;
    const user = {
      _id,
      email,
      subscription: "free",
      password: await bcrypt.hash(password, 10),
      save: jest.fn(),
    };
    jest.spyOn(User, "findOne").mockImplementation(() => user);

    const req = { body: { email, password } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await loginUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.stringMatching(regex),
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });
});
