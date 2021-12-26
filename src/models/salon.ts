import { Schema, model } from "mongoose";
import validate from "validator";

import { Salon } from "../interfaces/salon";
import AppError from "../utils/appError";
import Appointment from "./appointment";

export const servicesSchema = new Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    description: { type: String, default: "None" },
  },
  { autoIndex: false }
);

const salonSchema = new Schema<Salon>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    owner: {
      type: "objectId",
      ref: "user",
      required: true,
    },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      building_number: { type: Number, required: true },
      mapCoords: {
        Latitude: { type: Number },
        Logtitude: { type: Number },
      },
    },
    contact_Info: {
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
          if (!validate.isEmail(value)) {
            throw new AppError("Email isnt valid", 400);
          }
        },
      },
      landline: Number,
      mobile: {
        _id: false,
        type: Number,
        required: true,
      },
    },
    services: {
      _id: false,
      type: [servicesSchema],
      validate: (services: []) =>
        Array.isArray(services) && services.length > 0,
    },
    about: String,
    // open_hrs: {
    //   starting_hour: { type: Number, required: true },
    //   closing_hour: { type: Number, required: true },
    // },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

salonSchema.methods.toJSON = function (): Salon {
  const salon = this;
  const salonObject = salon.toObject() as any;

  delete salonObject.owner;
  delete salonObject.createdAt;
  delete salonObject.updatedAt;
  delete salonObject.__v;

  return salonObject as Salon;
};

salonSchema.virtual("appointment", {
  ref: "appointment",
  localField: "_id",
  foreignField: "salon",
});

// Delete salon appointments when salon is removed
salonSchema.pre("remove", async function (next): Promise<void> {
  const salon = this;
  await Appointment.deleteMany({ salon_id: salon._id });
  next();
});

const Salon = model<Salon>("salon", salonSchema);

export default Salon;
