import { Router } from "express";

import { auth } from "../middleware/auth";
import * as reviewController from "../Controllers/reviewsController";

const router: Router = Router();

router.route("/reviews").post(auth, reviewController.createReview);

router
  .route("/salons/:id")
  .get(auth, reviewController.readReview)
  .patch(auth, reviewController.updateReview)
  .delete(auth, reviewController.deleteReview);

export default router;
