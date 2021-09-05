import { UserInterface } from "../interfaces/user";

import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
      token?: string;
    }
  }
}
