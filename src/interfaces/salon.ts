import { Document } from "mongoose";

export interface Salon extends Document {
  _id?: object;
  name: string;
  owner: object;
  address: {
    country: String;
    city: String;
    street: String;
    building_number: number;
    mapCoords: {
      Latitude: number;
      Logtitude: number;
    };
  };
  contact_Info: {
    email: string;
    landline?: number;
    mobile: Array<number>;
  };
  services: {
    name: string;
    cost: number;
    description?: string;
  }[];
  about: String;
  open_hrs: {
    starting_hour: number;
    closing_hour: number;
  };
}
