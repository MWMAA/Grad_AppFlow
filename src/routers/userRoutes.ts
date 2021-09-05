import { Router } from "express";

import { auth } from "../middleware/auth";
import * as userController from "../Controllers/userController";

const router: Router = Router();

router.post("/SignUp", userController.SignUp);
router.post("/LogIn", userController.LogIn);
router.post("/LogOut", userController.LogOut);
router.post("/tokenRefresh", userController.tokenRefresh);
router.get("/emailVerification", userController.verification);
router.post("/forgotPassword", userController.forgotPassword);
router.patch("/resetPassword/:resetToken", userController.resetPassword);
router.patch("/updatePassword", auth, userController.updatePassword);

router
  .route("/users/me")
  .get(auth, userController.readUser)
  .patch(
    auth,
    userController.uploadUserAvatar,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(auth, userController.deleteUser);

export default router;
