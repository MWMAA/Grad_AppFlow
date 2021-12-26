import { NextFunction, Request, RequestHandler, Response } from "express";

import catchAsync from "../utils/catchAsync";
import Appointment from "../models/appointment";
import Salon from "../models/salon";
import {
  sendAppointmentApprovalEmail,
  sendAppointmentCancellationEmail,
  sendAppointmentUpdateEmail,
} from "../emails/appointment";
import { UserInterface } from "../interfaces/user";

export const createAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointment = new Appointment({
      ...req.body,
      user: req.user,
      salon: await Salon.findOne({ _id: req.body.salon }),
    });

    const servicesArray: Array<string | never> = [];

    for (let i = 0; i < appointment.services.length; i++) {
      servicesArray.push(appointment.services[i]);
    }

    for (let i = 0; i < servicesArray.length; i++) {
      if (!appointment.services.includes(servicesArray[i] as never))
        return res.status(400).send({ error: "Invalid services!" });
    }

    console.log("appointment");

    await appointment.save().catch((e) => console.log(e));
    // sendAppointmentApprovalEmail((<UserInterface>appointment.user).email);

    res.status(201).send(appointment);
  }
);

// Read Appointment
// GET/ appointments?completed=true
// GET/ appointments?limit=3&skip=3
// GET/ appointments?sortBy=createdAt:asc
export const readAppointments: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let sort: number = 0;
    let skip: number = 0;
    let limit: number = 0;

    // // If selective implementation is needed
    // const match = { completed: false };
    // if (req.query.completed) {
    //   match.completed = req.query.completed === "true";
    // }

    if (req.query.sortBy) {
      const parts = (<string>req.query.sortBy).split(":");
      sort = parts[1] === "desc" ? -1 : 1;
    }

    if (req.query.skip) {
      skip = parseInt(req.query.skip as string);
    }

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string);
    }

    const appointments = await Appointment.find({})
      .skip(skip)
      .limit(limit)
      .sort(sort);

    res.send(appointments);
  }
);

// Read Appointment
export const readAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;

    const appointment = await Appointment.findOne({
      _id,
    } as object);

    if (!appointment) {
      return res.status(404).send();
    }
    res.send(appointment);
  }
);

// Update Appointment
export const updateAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = Object.keys(req.body);
    const allowedUpdats = ["services", "date"];
    const isValidOperation = update.every((update) =>
      allowedUpdats.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const appointment = await Appointment.findOne({
      _id: req.params.id,
    } as object);

    appointment!.user = req.user as UserInterface;
    appointment!.salon = await Salon.findOne({
      _id: appointment!.salon,
    } as object);

    if (!appointment) {
      return res.status(404).send();
    }

    await appointment.updateOne(req.body, { runValidators: true });
    sendAppointmentUpdateEmail((<UserInterface>appointment.user).email);
    res.send(appointment);
  }
);

// Delete Appointment
export const deleteAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
    } as object);

    appointment!.user = req.user as UserInterface;

    if (!appointment) {
      res.status(404).send();
    }

    sendAppointmentCancellationEmail((<UserInterface>appointment!.user).email);
    res.send();
  }
);

export const completeAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const appointment = await Appointment.findOne({
      _id,
    } as object);

    if (!appointment) {
      return res.status(404).send();
    }

    await appointment.updateOne({ completed: true });
    res.status(200).send();
  }
);
