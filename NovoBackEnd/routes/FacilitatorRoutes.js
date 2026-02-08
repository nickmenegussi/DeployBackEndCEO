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
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/facilitadores", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), viewAllFacilitadoresController);
router.get("/facilitadores/:User_idUser", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), viewOnlyFacilitadorByIdController);
router.get("/facilitadores/grupo/esde", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), viewFacilitadoresByGroupESDEController);
router.get("/facilitadores/grupo/ciede", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), viewFacilitadoresByGroupCIEDEController);
router.get("/facilitadores/grupo/mediunico", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), viewFacilitadoresByGroupMEDIUNICOController);

router.post("/facilitadores/create", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), createFacilitadoresController);

router.delete("/facilitadores/:idFacilitador/delete", authMiddleware, verifyPermission(["SuperAdmin", "Admin"]), deleteFacilitadoresController);

export default router;
