import { Router } from "express";

import { auth, restrictTo } from "../middleware/auth";
import * as salonController from "../Controllers/salonController";

const router: Router = Router();

router
  .route("/salons")
  .post(auth, salonController.createSalon)
  .get(auth, salonController.readSalons);

router
  .route("/salons/:id")
  .get(auth, salonController.readSalon)
  .patch(auth, restrictTo(["Owner", "Admin"]), salonController.UpdateSalon)
  .delete(auth, restrictTo(["Owner", "Admin"]), salonController.DeleteSalon);

export default router;
