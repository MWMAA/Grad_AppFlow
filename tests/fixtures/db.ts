import jwt, { Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import crypto from "crypto";

import User from "../../src/models/user";
import Appointment from "../../src/models/appointment";
import Salon from "../../src/models/salon";

export const user_1_ID = new mongoose.Types.ObjectId();
export const user_1 = {
  _id: user_1_ID,
  name: "MWMA",
  email: "MWMA@exapmle.com",
  password: "MWMA12345!",
  token: jwt.sign({ _id: user_1_ID }, process.env.JWT_REFRESH_SECRET as Secret),
  accessToken: jwt.sign(
    { _id: user_1_ID },
    process.env.JWT_ACCESS_SECRET as Secret
  ),
  roles: "Admin",
  DoB: Date.parse("04 Dec 1999"),
  balance: 156.23,
  gender: "Male",
  passwordChangedAt: Date.parse("04 8 2021"),
  passwordResetToken: null,
  passwordResetExpires: null,
  emailToken: null,
  isVerified: true,
};

export const user_2_ID = new mongoose.Types.ObjectId();
export const user_2 = {
  _id: user_2_ID,
  name: "MWMAA",
  email: "MWMAA@exapmle.com",
  password: "MWMA12345!",
  token: jwt.sign({ _id: user_2_ID }, process.env.JWT_REFRESH_SECRET as Secret),
  accessToken: jwt.sign(
    { _id: user_2_ID },
    process.env.JWT_ACCESS_SECRET as Secret
  ),
  roles: "User",
  DoB: Date.parse("04 Dec 1999"),
  balance: 156.23,
  gender: "Male",
  passwordChangedAt: Date.parse("04 8 2021"),
  passwordResetToken: null,
  passwordResetExpires: null,
  emailToken: crypto.randomBytes(64).toString("hex"),
  isVerified: false,
};

export const user_3_ID = new mongoose.Types.ObjectId();
export const user_3 = {
  _id: user_3_ID,
  name: "Mal",
  email: "Mal@exapmle.com",
  password: "MWMA12345!",
  token: jwt.sign({ _id: user_3_ID }, process.env.JWT_REFRESH_SECRET as Secret),
  accessToken: jwt.sign(
    { _id: user_3_ID },
    process.env.JWT_ACCESS_SECRET as Secret
  ),
  roles: "Owner",
  DoB: Date.parse("04 Dec 1999"),
  balance: 156.23,
  gender: "Male",
  passwordChangedAt: Date.parse("04 8 2021"),
  passwordResetToken: null,
  passwordResetExpires: null,
  emailToken: null,
  isVerified: true,
};

export const salon_1_ID = new mongoose.Types.ObjectId();
export const salon_1 = {
  _id: salon_1_ID,
  name: "salon el 7ob",
  contact_Info: {
    email: "mahmoudamer95.bird@gmail.com",
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
  owner: user_2_ID,
};

export const salon_2_ID = new mongoose.Types.ObjectId();
export const salon_2 = {
  _id: salon_2_ID,
  name: "salon el korh",
  contact_Info: {
    email: "mowww@gmail.com",
    mobile: [113216542],
  },
  address: {
    country: "Egypt",
    city: "Cairo",
    street: "bekh",
    building_number: 593,
    mapCoords: {
      Latitude: 50,
      Logtitude: 48,
    },
  },
  open_hrs: {
    starting_hour: 12.0,
    closing_hour: 22.0,
  },
  services: [
    {
      name: "hair 7ar2",
      cost: 50,
      description: "E7na gamdeen awii",
    },
    {
      name: "nail polish",
      cost: 100,
    },
  ],
  owner: user_1_ID,
};

export const populateDB = async () => {
  await User.deleteMany();
  await Salon.deleteMany();

  await new User(user_1).save();
  await new User(user_2).save();
  await new User(user_3).save();

  await new Salon(salon_1).save();
  await new Salon(salon_2).save();
};
