import { Router } from "express";
import {
  getGroupsController,
  getGroupsByTypeController,
  createGroupController,
} from "../controller/GroupOfStudyController.js";
import authMiddleware from "../middleware/authMidleware.js";

const router = Router();

// Lista todos os grupos
router.get("/groupOfStudy", getGroupsController);

// Lista grupos por tipo (ESDE, MEDIUNICO, EVANGELIZACAO, CIEDE)
router.get("/groupOfStudy/:TypeGroup", getGroupsByTypeController);

// Cria novo grupo (somente autenticado)
router.post("/groupOfStudy", authMiddleware, createGroupController);

export default router;
