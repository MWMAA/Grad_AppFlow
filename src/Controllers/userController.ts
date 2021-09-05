import crypto from "crypto";
import { NextFunction, RequestHandler, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";

import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import {
  sendWelcomeEmail,
  sendByeByeEmail,
  passwordChangeEmail,
  passwordChangedEmail,
} from "../emails/user";
import {
  generateAccessToken,
  generateAuthTokens,
  verifyUserByRefreshToken,
} from "../middleware/auth";
import AppError from "../utils/appError";

export const SignUp: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body);
    const tokens = await generateAuthTokens(user, res);
    user.token = tokens.refreshToken;
    user.isVerified = false;
    user.emailToken = crypto.randomBytes(64).toString("hex");

    await user.save({ runValidators: true } as object);
    sendWelcomeEmail(
      user.email,
      user.name,
      user.emailToken,
      req.headers.host as string
    );

    res.status(200).send({
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      user,
    });
  }
);

export const verification: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ emailToken: req.query.token as string });

    if (!user) {
      throw new AppError("No User Found", 404);
    }

    user.isVerified = true;
    user.emailToken = null;

    await user.save();
    res.status(200).send();
  }
);

export const LogIn: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const tokens = await generateAuthTokens(user, res);

    user.token = tokens.refreshToken;
    await user.save();
    res.status(200).send({
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      user,
    });
  }
);

export const LogOut: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken, user } = await verifyUserByRefreshToken(req, res);

    user.token = null;
    await user.save();
    res.send();
  }
);

export const tokenRefresh: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken, user } = await verifyUserByRefreshToken(req, res);

    const accessToken = generateAccessToken(user._id!.toString());

    res.send({ accessToken, user });
  }
);

export const readUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(req.user);
  }
);

export const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await req.user!.remove();

    sendByeByeEmail(req.user!.email, req.user!.name);
    res.send();
  }
);

export const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updates = Object.keys(req.body);
    const allowedUpdated = ["name", "email", "DoB", "gender", "avatar"];
    const isValidObject = updates.every((update) =>
      allowedUpdated.includes(update)
    );

    if (!isValidObject) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    await req.user!.updateOne(req.body, { runValidators: true });
    res.send(req.user);
  }
);

// Avatar handling setup
const avatar = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new AppError("please insert a picture", 400));
    }

    cb(null, true);
  },
});

export const uploadUserAvatar = avatar.single("avatar");

export const resizeUserPhoto: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.user!.avatar = `user-${req.user!.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize({ width: 500, height: 500 })
      .png({ quality: 70, compressionLevel: 3 })
      .toFile("./public/userImages/" + `${req.user!.avatar}`)
      .catch();

    next();
  }
);

// Password handling Routes
export const forgotPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "Not Found!" });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      passwordChangeEmail(user.email, resetToken);
      res.status(200).send();
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(400).send({
        error: "There was an error sending the email. Try again later!",
      });
    }
  }
);

// Reset Password
export const resetPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const expiryDate: Date = new Date();
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: expiryDate },
    });

    if (!user) {
      return next(
        res.status(400).send({ error: "Token is invalid or has expired!" })
      );
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    passwordChangedEmail(user.email);
    res.send();
  }
);

// Update Password
export const updatePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user!._id).select("+password");

    const isMatch = await user!.comparePasswords(
      req.body.passwordCurrent,
      user!.password
    );
    if (!isMatch) {
      return res.status(401).send({ error: "Your current password is wrong." });
    }

    await user!.updateOne(
      { password: req.body.password },
      {
        runValidators: true,
      }
    );
    passwordChangedEmail(user!.email);
    res.status(200).send();
  }
);
