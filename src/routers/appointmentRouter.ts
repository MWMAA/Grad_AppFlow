import { Router } from "express";

import { auth } from "../middleware/auth";
import * as appointmentContrtoller from "../Controllers/appointmentController";

const router: Router = Router();

router
  .route("/appointments")
  .post(auth, appointmentContrtoller.createAppointment)
  .get(auth, appointmentContrtoller.readAppointments);

router
  .route("/appointments/:id")
  .get(auth, appointmentContrtoller.readAppointment)
  .patch(auth, appointmentContrtoller.updateAppointment)
  .delete(auth, appointmentContrtoller.deleteAppointment);

router
  .route("/completeAppointment/:id")
  .post(auth, appointmentContrtoller.completeAppointment);

export default router;
