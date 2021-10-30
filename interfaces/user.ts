enum gender {
  Male = "Male",
  Female = "Female",
}
export enum roles {
  User = "User",
  Owner = "Owner",
  Admin = "Admin",
}

export interface UserData {
  _id?: Object;
  name: string;
  email: string;
  DoB: Date;
  Activated: boolean;
  avatar: string;
  balance: number;
  gender: gender;
}
