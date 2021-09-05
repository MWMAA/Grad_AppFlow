import { NextFunction, Request, RequestHandler, Response } from "express";

import catchAsync from "../utils/catchAsync";
import Appointment from "../models/appointment";
import Salon from "../models/salon";
import User from "../models/user";
import Review from "../models/reviews";
import { ReviewData } from "../interfaces/reviews";
import { sendBadReviewEmail } from "../emails/appointment";

const findInDbById = async (
  reviewerType: string,
  reviewerId: string,
  reviewedId: string
) => {
  if (reviewerType == "salon") {
    const reviwer = await Salon.findOne({ _id: reviewerId } as object);
    const reviwed = await User.findOne({ _id: reviewedId } as object);
    return { reviwer, reviwed };
  } else {
    const reviwer = await User.findOne({ _id: reviewerId } as object);
    const reviwed = await Appointment.findOne({ _id: reviewedId } as object);
    return { reviwer, reviwed };
  }
};

export const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = new Review({
      ...req.body,
    });

    if (req.body.star < 2) {
      sendBadReviewEmail(
        review!.Reviewer.email,
        review!.Reviewer.name,
        req.body.stars
      );
    }

    await review.save();
    res.status(201).send(review);
  }
);

export const deleteReview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
    } as object);

    if (!review) {
      res.status(404).send();
    }

    res.status(200);
  }
);

export const updateReview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findOne({
      _id: req.params.id,
    } as object);

    if (!review || !req.body.review) {
      return res.status(404).send();
    }

    await review.update(req.body.review, { runValidators: true });
    res.send(review);
  }
);

export const readReview: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewData = await findInDbById(
      req.body.reviewerType,
      req.body.Reviewer,
      req.body.Reviewed
    );
    const review = await Review.findOne({
      _id: req.params.id,
    } as object);

    if (!review) {
      return res.status(404).send();
    }

    review.Reviewer = reviewData.reviwer as any;
    review.Reviewed = reviewData.reviwed as any;

    res.send(review);
  }
);
