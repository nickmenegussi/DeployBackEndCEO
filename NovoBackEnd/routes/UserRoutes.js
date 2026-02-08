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
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";
// import upload from "../multerConfig/multer.js"

const router = Router();

router.get("/user/:userId", authMiddleware, verifyPermission(["admin", "SuperAdmin", "User"]), getByIdController);
router.get("/user", authMiddleware, verifyPermission(["admin", "SuperAdmin"]), getAllController);

router.post("/user/register", registerController);

router.patch("/user/nameUser", authMiddleware, updateNameUserController);
router.patch("/user/password", authMiddleware, updateUserPasswordController);
router.patch("/user/forgot-password", updateUserForgotPasswordController);
router.patch("/user/picture", authMiddleware, updateUserImageProfileController);

router.delete("/user/:idUser/delete", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), deleteController);

export default router;