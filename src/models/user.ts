import mongoose from "mongoose";
import crypt from "bcryptjs";
import crypto from "crypto";
import validate from "validator";

import {
  UserData,
  UserInterface,
  roles,
  UserReturn,
  UserModel,
} from "../interfaces/user";
import AppError from "../utils/appError";

const userSchema = new mongoose.Schema<UserData, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
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
    password: {
      required: true,
      type: String,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new AppError(
            'Password shouldnt include the word "Password"',
            400
          );
        }
      },
    },
    roles: {
      type: String,
      enum: ["User", "Owner", "Admin"],
      default: roles.User,
    },
    DoB: Date,
    avatar: {
      type: String,
      default: "default.jpg",
    },
    balance: {
      type: Number,
      default: 0.0,
    },
    // gender: {
    //   type: String,
    //   enum: ["Male", "Female"],
    //   required: true,
    // },
    token: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailToken: String,
    isVerified: Boolean,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.virtual("appointment", {
  ref: "appointment",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("salon", {
  ref: "salon",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function (): UserReturn {
  const user = this;
  const userObject = user.toObject() as any;

  delete userObject.password;
  delete userObject.roles;
  delete userObject.passwordChangedAt;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  delete userObject.token;
  delete userObject.emailToken;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;

  return userObject as UserReturn;
};

userSchema.static(
  "findByCredentials",
  async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("Unable to login!", 404);
    }

    const isMatch = await crypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Unable to login!", 404);
    }

    return user;
  }
);

userSchema.static("findByName", async (name: string) => {
  const user = await User.findOne({ name });

  if (!user) {
    throw new AppError(
      "Name isn't found. Please retry after entering the correct name!",
      404
    );
  }

  return user;
});

userSchema.static("findByRefreshToken", async (token: string) => {
  const user = await User.findOne({ token });

  if (!user) {
    throw new AppError(
      "Our Monkeys misplaced their bananas, please try again later!",
      404
    );
  }

  return user;
});

userSchema.methods.comparePasswords = async (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> => {
  return await crypt.compare(candidatePassword, userPassword);
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next): Promise<void> {
  const user = this;

  if (user.isModified("password")) {
    user.password = await crypt.hash(user.password, 12);
  }
  next();
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password") && user.isNew) {
    const savedAtdate = Date.now() - 1000;
    user.passwordChangedAt = new Date(savedAtdate);
  }
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpiryDate_ms = Date.now() + 10 * 60 * 1000;
  this.passwordResetExpires = new Date(passwordResetExpiryDate_ms);
  return resetToken;
};

const User = mongoose.model<UserInterface, UserModel>("user", userSchema);

export default User;
