const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany();

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "testuser", passwordHash });

  await user.save();
});

describe("Creation of new user", () => {
  test("creation fails with proper statuscode and message if username/ password is invalid", async () => {
    const user = {
      username: "hi",
      name: "John Smith",
      password: "ab",
    };

    const response = await api.post("/api/users").send(user).expect(400);

    expect(response.body.error).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
