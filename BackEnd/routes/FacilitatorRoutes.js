import { Router } from "express";
import {
  viewAllFacilitadoresController,
  viewOnlyFacilitadorByIdController,
  viewFacilitadoresByGroupESDEController,
  viewFacilitadoresByGroupCIEDEController,
  viewFacilitadoresByGroupMEDIUNICOController,
  createFacilitadoresController,
  deleteFacilitadoresController,
} from "../controller/FacilitatorController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createFacilitatorSchema } from "../validations/FacilitatorValidation.js";

const router = Router();

router.get("/facilitadores", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewAllFacilitadoresController);
router.get("/facilitadores/:User_idUser", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewOnlyFacilitadorByIdController);
router.get("/facilitadores/grupo/esde", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewFacilitadoresByGroupESDEController);
router.get("/facilitadores/grupo/ciede", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewFacilitadoresByGroupCIEDEController);
router.get("/facilitadores/grupo/mediunico", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewFacilitadoresByGroupMEDIUNICOController);

router.post("/facilitadores/create", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(createFacilitatorSchema), createFacilitadoresController);

router.delete("/facilitadores/:idFacilitador/delete", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), deleteFacilitadoresController);

export default router;
