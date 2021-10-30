import { Document } from "mongoose";

export interface ReviewData extends Document {
  Reviewer: { name: string; email: string };
  Reviewed: Object;
  Review?: string;
  stars: number;
}
