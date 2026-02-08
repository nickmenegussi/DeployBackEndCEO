import { Router } from "express";
import {
  getAllVolunteerWorkController,
  getVolunteerWorkByIdController,
  createVolunteerWorkController,
  updateVolunteerWorkFieldController,
  deleteVolunteerWorkController,
} from "../controller/VolunteerWorkController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/work", authMiddleware, verifyPermission(["SuperAdmin", "admin", "User"]), getAllVolunteerWorkController);
router.get("/work/:idVolunteerWork", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), getVolunteerWorkByIdController);

router.post("/work/Create", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), createVolunteerWorkController);

router.patch("/work/:idVolunteerWork/nameVolunteerWork", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateVolunteerWorkFieldController);
router.patch("/work/:idVolunteerWork/address", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateVolunteerWorkFieldController);
router.patch("/work/:idVolunteerWork/dateVolunteerWork", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateVolunteerWorkFieldController);
router.patch("/work/:idVolunteerWork/work_description", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateVolunteerWorkFieldController);
router.patch("/work/:idVolunteerWork/timeVolunteerWork", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateVolunteerWorkFieldController);

router.delete("/work/:idVolunteerWork/delete", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), deleteVolunteerWorkController);

export default router;
