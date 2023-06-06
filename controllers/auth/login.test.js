const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../../app");
const { User } = require("../../models/user");


const { DB_HOST_TEST, PORT } = process.env;

/*
1. відповідь повина мати статус-код 200
2. у відповіді повинен повертатися токен
3. у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
*/

describe("test login ctrl", () => {

    let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login", async () => {
    const password = await bcrypt.hash("123456", 10);

    const newUser = {
      email: "test@test.com",
      password: password,
      avatarURL: "avatars\\646f63eb186de43d49c3fcd5_test.jpg"
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "test@test.com",
      password: "123456",
    };

    const res = await request(app).post("/users/login").send(loginUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(res.body.token).toBe(token);
    expect(res.body.user).toEqual({email: "test@test.com", subscription: expect.any(String)});
  });
});
