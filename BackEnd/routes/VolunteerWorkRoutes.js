import { Router } from "express";
import {
  getAllVolunteerWorkController,
  getVolunteerWorkByIdController,
  createVolunteerWorkController,
  deleteVolunteerWorkController,
} from "../controller/VolunteerWorkController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createVolunteerWorkSchema } from "../validations/VolunteerWorkValidation.js";

const router = Router();

router.get("/work", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), getAllVolunteerWorkController);
router.get("/work/:idVolunteerWork", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), getVolunteerWorkByIdController);

router.post("/work/Create", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(createVolunteerWorkSchema), createVolunteerWorkController);

// router.patch("/work/:idVolunteerWork/nameVolunteerWork", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateVolunteerWorkFieldController);
// router.patch("/work/:idVolunteerWork/address", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateVolunteerWorkFieldController);
// router.patch("/work/:idVolunteerWork/dateVolunteerWork", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateVolunteerWorkFieldController);
// router.patch("/work/:idVolunteerWork/work_description", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateVolunteerWorkFieldController);
// router.patch("/work/:idVolunteerWork/timeVolunteerWork", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateVolunteerWorkFieldController);

router.delete("/work/:idVolunteerWork/delete", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), deleteVolunteerWorkController);

export default router;
