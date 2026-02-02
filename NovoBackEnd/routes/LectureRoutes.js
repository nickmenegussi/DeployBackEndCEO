import { Router } from "express";
import { findAllController, findByIdController, registerController } from "../controller/LectureController.js";
import authMiddleware from "../middleware/authMidleware.js";
const router = Router()

router.get('/', authMiddleware,  findAllController)
router.get('/:idLecture', authMiddleware, findByIdController)

router.post('/', authMiddleware, registerController)
// router.patch('')

// router.delete('/:idLecture')

export default router
