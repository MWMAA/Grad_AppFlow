import { Schema, model } from "mongoose";

import { ReviewData } from "../interfaces/reviews";

const reviewsSchema = new Schema<ReviewData>(
  {
    Reviewer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    Reviewed: { type: "objectId", required: true },
    stars: { type: Number, required: true },
    Review: { type: String, required: true },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

reviewsSchema.methods.toJSON = function (): ReviewData {
  const review = this;
  const reviewObject = review.toObject() as any;

  delete reviewObject.createdAt;
  delete reviewObject.updatedAt;
  delete reviewObject.__v;

  return reviewObject as ReviewData;
};

const Review = model<ReviewData>("review", reviewsSchema);

export default Review;
