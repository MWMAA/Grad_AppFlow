import { Salon } from "./salon";
import { UserData } from "./user";

export interface Appointment extends Document {
  _id?: object;
  user: UserData | object;
  salon: Salon | object | null;
  date: Date;
  services: [];
  completed?: boolean;
}
