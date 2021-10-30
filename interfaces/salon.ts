import { UserData } from "./user";

export interface Salon {
  _id?: object | number;
  name: string;
  owner: UserData | string;
  address: {
    country: string;
    city: string;
    street: string;
    building_number: number;
    mapCoords?: {
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
  about: string;
  open_hrs: {
    starting_hour: string;
    closing_hour: string;
  };
}
