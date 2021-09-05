import { Document } from "mongoose";
import { Salon } from "./salon";
import { UserInterface } from "./user";

export interface Appointment extends Document {
  _id?: object;
  user: UserInterface | object;
  salon: Salon | object | null;
  date: Date;
  services: [];
  completed?: boolean;
}
