import { Router } from "express";
import {
  getGroupsController,
  getGroupsByTypeController,
  createGroupController,
} from "../controller/GroupOfStudyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import { ROLES } from "../utils/roles.js";
import verifyPermission from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { createGroupSchema } from "../validations/MiscValidation.js";

const router = Router();

// Lista todos os grupos
router.get("/groupOfStudy", getGroupsController);

// Lista grupos por tipo (ESDE, MEDIUNICO, EVANGELIZACAO, CIEDE)
router.get("/groupOfStudy/:TypeGroup", getGroupsByTypeController);

// Cria novo grupo (somente autenticado)
router.post("/groupOfStudy", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(createGroupSchema), createGroupController);

export default router;
