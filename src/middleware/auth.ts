import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserInterface } from "../interfaces/user";
import User from "../models/user";

export const generateAuthTokens = async (
  user: UserInterface,
  res: Response
) => {
  const refreshToken = generateRefreshToken(user._id!.toString());
  const accessToken = generateAccessToken(user._id!.toString());

  const cookieExpiryDate = parseInt(process.env.JWT_COOKIE_EXPIRY_IN_DAYS!);
  const cookieOptions = {
    expires: new Date(Date.now() + cookieExpiryDate * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "PRODUCTION") cookieOptions.secure = true;

  res.cookie("accessJWT", accessToken, cookieOptions);
  return { refreshToken, accessToken };
};

export const generateRefreshToken = (_id: string): string => {
  const refreshToken = jwt.sign(
    { _id },
    process.env.JWT_REFRESH_SECRET as Secret
  );
  return refreshToken;
};

export const generateAccessToken = (_id: string): string => {
  const accessToken = jwt.sign(
    { _id },
    process.env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return accessToken;
};

export const verifyUserByAccessToken = async (
  req: Request,
  res: Response
): Promise<{ accessToken: string; user: UserInterface }> => {
  const accessToken = req.header("Authorization")!.replace("Bearer ", "");

  const decoded = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET as Secret
  );
  const user = (await User.findById((<any>decoded)._id)) as UserInterface;

  if (!user) {
    res.status(401).send();
  }
  return { accessToken, user };
};

export const verifyUserByRefreshToken = async (
  req: Request,
  res: Response
): Promise<{ refreshToken: string; user: UserInterface }> => {
  if (!req.header("Authorization") || req.header("Authorization")!.length < 7) {
    res.status(401).send();
  }
  const refreshToken = req.header("Authorization")!.replace("Bearer ", "");

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret
  );
  const user = (await User.findById((<any>decoded)._id)) as UserInterface;

  if (!user) {
    res.status(401).send();
  }
  return { refreshToken, user };
};

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { accessToken, user } = await verifyUserByAccessToken(req, res);
    req.token = accessToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate properly." });
  }
};

export const restrictTo = ([...roles]: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user!.roles)) {
      res
        .status(403)
        .send({ error: "You do not have permission to perform this action." });
    }
    next();
  };
};
