import { NextFunction, Request, RequestHandler, Response } from "express";

import catchAsync from "../utils/catchAsync";
import Salon from "../models/salon";
import User from "../models/user";
import {
  sendSalonCreationEmail,
  sendSalonDeletionEmail,
} from "../emails/salon";

// Create Salon
export const createSalon: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const salon = new Salon({
      ...req.body,
      owner: req.user,
    });

    const user = await User.findById(salon.owner);

    await salon.save();
    await user!.updateOne({ roles: "Owner" } as object);
    sendSalonCreationEmail(salon.contact_Info.email, salon.name);
    res.status(201).send(salon);
  }
);

// Read Salon
// GET/ salons?limit=3&skip=3
// GET/ salons?sortBy=createdAt:asc
export const readSalons: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let sort: number = 0;
    let skip: number = 0;
    let limit: number = 0;

    if (req.query.sortBy) {
      const sortByQuery = req.query.sortBy as string;
      const parts = sortByQuery.split(":");
      sort = parts[1] === "desc" ? -1 : 1;
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip as string);
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string);
    }

    const salons = await Salon.find({}).skip(skip).limit(limit).sort(sort);
    res.send(salons);
  }
);

// Read Salon
export const readSalon: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const salon = await Salon.findOne({ _id } as object);

    if (!salon) {
      return res.status(404).send(salon);
    }
    res.send(salon);
  }
);

// Update Salon
export const UpdateSalon: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = Object.keys(req.body);
    const allowedUpdats = [
      "services",
      "contact_Info",
      "about",
      "open_hrs",
      "contact_Info",
      "address",
      "name",
    ];
    const isValidOperation = update.every((update) =>
      allowedUpdats.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const salon = await Salon.findOne({ _id: req.params.id } as object);

    if (!salon) {
      return res.status(404).send();
    }

    await salon.updateOne(req.body, { runValidators: true });
    await salon.save();
    res.send(salon);
  }
);

// Delete Salon
export const DeleteSalon: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const salon = await Salon.findOneAndDelete({
      _id: req.params.id,
    } as object);

    if (!salon) {
      res.status(404).send();
    }

    sendSalonDeletionEmail(salon!.contact_Info.email, salon!.name);
    await req.user!.updateOne({ roles: "User" } as object);
    res.status(200).send();
  }
);
