import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

import userRouter from "./routers/userRoutes";
import salonRouter from "./routers/salonRoutes";
import appointmentRouter from "./routers/appointmentRouter";
import reviewRouter from "./routers/reviewRouter";

const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  retryWrites: false,
};
mongoose.connect(process.env.MONGODB as string, MONGOOSE_OPTIONS);

const app = express();
app.use(express.json());
app.use(cors());

// HTTP security
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP please try again in an hour!",
});
app.use(limiter);

// Sanitization
app.use(mongoSanitize());

// Prevent param pollution
app.use(hpp());

//Routers
app.use(userRouter);
app.use(salonRouter);
app.use(appointmentRouter);
app.use(reviewRouter);

export default app;
