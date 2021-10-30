import { Model, Document } from "mongoose";

export interface Mailbody {
  from: { name: string; email: string };
  to: string;
  cc?: { name: string; email: string }[];
  subject: string;
  text: string;
  html?: string;
  mail_settings?: object;
}

enum gender {
  Male = "Male",
  Female = "Female",
}
export enum roles {
  User = "User",
  Owner = "Owner",
  Admin = "Admin",
}

export interface UserData extends Document {
  _id?: Object;
  name: string;
  email: string;
  password: string;
  roles: roles;
  DoB: Date;
  avatar: string;
  balance: number;
  // gender: gender;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  token: string | null;
  emailToken: string | null;
  isVerified: boolean;
}

export interface UserReturn {
  name: string;
  email: string;
  DoB: Date;
  Activated: boolean;
  avatar: string;
  balance: number;
  // gender: gender;
}

export interface UserInterface extends UserData {
  comparePasswords(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createPasswordResetToken(): string;
}

export interface UserModel extends Model<UserInterface> {
  findByCredentials(email: string, password: string): Promise<UserInterface>;
  findByRefreshToken(token: string): Promise<UserInterface>;
  findByName(name: string): Promise<UserInterface>;
}
