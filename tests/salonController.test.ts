import request from "supertest";
import {
  populateDB,
  user_1_ID,
  user_1,
  user_2,
  user_2_ID,
  user_3,
  salon_1_ID,
  salon_2_ID,
} from "./fixtures/db";
import app from "../src/app";
import User from "../src/models/user";
import Salon from "../src/models/salon";

beforeAll(populateDB);

test("Should Create a new Salon", async () => {
  await request(app)
    .post("/salons")
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send({
      name: "salon el ma7aba",
      contact_Info: {
        email: "moon.bird@gmail.com",
        mobile: [15613],
      },
      address: {
        country: "Egypt",
        city: "Giza",
        street: "3aww",
        building_number: 593,
        mapCoords: {
          Latitude: 20,
          Logtitude: 15,
        },
      },
      open_hrs: {
        starting_hour: 10.3,
        closing_hour: 10.3,
      },
      services: [
        {
          name: "hair drying",
          cost: 50,
          description: "E7na gamdeen awii",
        },
        {
          name: "hair cutting",
          cost: 100,
        },
      ],
    })
    .expect(201);
});

test("Shouldn't Create a new Salon without services array", async () => {
  await request(app)
    .post("/salons")
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send({
      name: "salon el ma7aba",
      contact_Info: {
        email: "moon.bird@gmail.com",
        mobile: [15613],
      },
      address: {
        country: "Egypt",
        city: "Giza",
        street: "3aww",
        building_number: 593,
        mapCoords: {
          Latitude: 20,
          Logtitude: 15,
        },
      },
      open_hrs: {
        starting_hour: 10.3,
        closing_hour: 10.3,
      },
      services: null,
    })
    .expect(500);
});

test("Should Read Salons", async () => {
  await request(app)
    .get("/salons")
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send()
    .expect(200);
});

test("Shouldn't Read Salons for unAuthorized user", async () => {
  await request(app).get("/salons").send().expect(401);
});

test("Should Read Salon by Id", async () => {
  await request(app)
    .get(`/salons/${salon_1_ID}`)
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send()
    .expect(200);
});

test("Shouldn't Read Salon for unAuthorized user", async () => {
  await request(app).get(`/salons/${salon_1_ID}`).send().expect(401);
});

test("Should Update Salon by Id", async () => {
  await request(app)
    .patch(`/salons/${salon_1_ID}`)
    .set("Authorization", `Bearer ${user_3.accessToken}`)
    .send({
      name: "salon el araf",
      services: [
        {
          name: "hair drying",
          cost: 50,
        },
        {
          name: "hair cutting",
          cost: 100,
        },
      ],
    })
    .expect(200);
});

// test("Shouldn't Update Salon by non Owners", async () => {
//   await request(app)
//     .patch(`/salons/${salon_1_ID}`)
//     .set("Authorization", `Bearer ${user_2.accessToken}`)
//     .send({
//       name: "salon el araf",
//       services: [
//         {
//           name: "hair drying",
//           cost: 50,
//         },
//         {
//           name: "hair cutting",
//           cost: 100,
//         },
//       ],
//     })
//     .expect(403);
// });

test("Shouldn't Update Salon by non Authernticated", async () => {
  await request(app)
    .patch(`/salons/${salon_1_ID}`)
    .send({
      name: "salon el araf",
      services: [
        {
          name: "hair drying",
          cost: 50,
        },
        {
          name: "hair cutting",
          cost: 100,
        },
      ],
    })
    .expect(401);
});

// test("Should Delete Salon by Id if Owner", async () => {
//   await request(app)
//     .delete(`/salons/${salon_1_ID}`)
//     .set("Authorization", `Bearer ${user_3.accessToken}`)
//     .send()
//     .expect(200);
// });

test("Shouldn't Delete Salon by Id if unAuthenticated", async () => {
  await request(app).delete(`/salons/${salon_2_ID}`).send().expect(401);
});

test("Shouldn't Delete Salon by Id if not Owner", async () => {
  await request(app)
    .delete(`/salons/${salon_2_ID}`)
    .set("Authorization", `Bearer ${user_2.accessToken}`)
    .send()
    .expect(403);
});
