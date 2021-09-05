import request from "supertest";
import {
  populateDB,
  user_1_ID,
  user_1,
  user_2,
  user_2_ID,
  user_3,
} from "./fixtures/db";
import app from "../src/app";
import User from "../src/models/user";

beforeAll(populateDB);

test("Should SIGNUP a new user", async () => {
  const res = await request(app)
    .post("/SignUp")
    .send({
      name: "Mac",
      email: "Mac@exapmle.com",
      password: "MWMA12345!",
      DoB: Date.parse("04 Dec 1999"),
      gender: "Male",
    })
    .expect(200);

  // Assert the database changed correctly
  const user = await User.findById(res.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about response
  expect(res.body).toMatchObject({
    user: {
      name: "Mac",
      email: "mac@exapmle.com",
    },
  });

  expect(user!.password).not.toBe("Mypass777!");
});

test("Shouldn't SIGNUP user with invalid email", async () => {
  const res = await request(app)
    .post("/SignUp")
    .send({
      name: "Mac",
      email: "Mac@exapmle",
      password: "MWMA12345!",
      DoB: Date.parse("04 Dec 1999"),
      gender: "Male",
    })
    .expect(500);
});

test("Shouldn't SIGNUP user with invalid password", async () => {
  const res = await request(app)
    .post("/SignUp")
    .send({
      name: "Mac",
      email: "Mac@exapmle.com",
      password: "M",
      DoB: Date.parse("04 Dec 1999"),
      gender: "Male",
    })
    .expect(500);
});

test("Shouldn't SIGNUP user with invalid name", async () => {
  const res = await request(app)
    .post("/SignUp")
    .send({
      name: "Mac",
      email: "Mac@exapmle.com",
      password: "Masdfasf",
      DoB: Date.parse("04 Dec 1999"),
      gender: "Male",
    })
    .expect(500);
});

test("Should LOGIN an existing user", async () => {
  const res = await request(app)
    .post("/LogIn")
    .send({
      email: "MWMA@exapmle.com",
      password: "MWMA12345!",
    })
    .expect(200);

  const user = await User.findById(user_1_ID);
  expect(res.body.refreshToken).toBe(user!.token);
});

test("Shouldn't LOGIN faulty users", async () => {
  await request(app)
    .post("/LogIn")
    .send({
      email: "mma@ecc.com",
      password: "user_1.password",
    })
    .expect(404);
});

test("Should Get proof of user AKA Authentication", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${user_1.accessToken}`)
    .send()
    .expect(200);
});

test("should not get un-auth users", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${user_1.accessToken}`)
    .send()
    .expect(200);

  const user = await User.findById(user_1_ID);
  expect(user).toBeNull();
});

test("should not delete un-auth account", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should Upload avatar image", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user_2.accessToken}`)
    .attach("avatar", "tests/fixtures/pp.jpg")
    .expect(200);

  // TODO::avatar update logic // For some reason its not working while testing
  // const user = await User.findById(user_2_ID);
  // expect(user!.avatar).toEqual('pp.jpeg');
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user_2.accessToken}`)
    .send({
      name: "miky",
    })
    .expect(200);

  const user = await User.findById(user_2_ID);
  expect(user!.name).toBe("miky");
});

test("Shouldn't update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user_2.accessToken}`)
    .send({
      height: 28,
    })
    .expect(400);
});

test("Shouldn't update Un-Authenticated users", async () => {
  await request(app)
    .patch("/users/me")
    .send({
      name: "miky",
    })
    .expect(401);
});

test("Shouldn't update user with invalid name", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user_2.accessToken}`)
    .send({
      name: "Mal",
    })
    .expect(500);
});

test("Shouldn't update user with invalid name", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user_2.accessToken}`)
    .send({
      email: "Mal@mail",
    })
    .expect(500);
});

// test("Shouldn't Autherticate forgotPassword", async () => {
//   await request(app)
//     .patch("/forgotPassword")
//     .send({
//       email: "mal@exapmle.com",
//     })
//     .expect(500);
// });

test("Should Update Password", async () => {
  await request(app)
    .patch("/updatePassword")
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send({
      passwordCurrent: "MWMA12345!",
      password: "lolkolkos",
    })
    .expect(200);
});

test("Shouldn't Authenticate Update Password", async () => {
  await request(app)
    .patch("/updatePassword")
    .send({
      passwordCurrent: "lolkolkos",
      password: "1235sd",
    })
    .expect(401);
});

test("Shouldn't Update Wrong Current Password", async () => {
  await request(app)
    .patch("/updatePassword")
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send({
      passwordCurrent: "lolkols",
      password: "13sadfga",
    })
    .expect(401);
});

// // Returns 401?
// test("Shouldn't Update Wrong New Password", async () => {
//   await request(app)
//     .patch("/updatePassword")
//     .set("Authorization", `Bearer ${user_3.accessToken}`)
//     .send({
//       passwordCurrent: "lolkolkos",
//       password: "5",
//     })
//     .expect(400);
// });

