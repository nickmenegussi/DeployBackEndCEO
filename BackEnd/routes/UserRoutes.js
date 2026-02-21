import { Router } from "express";
import {
  getByIdController,
  getAllController,
  registerController,
  updateNameUserController,
  // updateUserController, // General update
  updateUserPasswordController,
  updateUserForgotPasswordController,
  updateUserImageProfileController,
  deleteController,
} from "../controller/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
  registerSchema,
  updateNameUserSchema,
  updatePasswordUserSchema,
  updateForgotPasswordUserSchema
} from "../validations/UserValidation.js";
// import upload from "../multerConfig/multer.js"

import { ROLES } from "../utils/roles.js";

const router = Router();

router.get("/user/:userId", authMiddleware, verifyPermission([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.USER]), getByIdController);
router.get("/user", authMiddleware, verifyPermission([ROLES.ADMIN, ROLES.SUPER_ADMIN]), getAllController);

router.post("/user/register", validate(registerSchema), registerController);

router.patch("/user/nameUser", authMiddleware, validate(updateNameUserSchema), updateNameUserController);
router.patch("/user/password", authMiddleware, validate(updatePasswordUserSchema), updateUserPasswordController);
router.patch("/user/forgot-password", validate(updateForgotPasswordUserSchema), updateUserForgotPasswordController);
router.patch("/user/picture", authMiddleware, updateUserImageProfileController);

router.delete("/user/:idUser/delete", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), deleteController);

export default router;
