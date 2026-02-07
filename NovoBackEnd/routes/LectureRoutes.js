import { Router } from "express";
import {
    findAllController,
    findByIdController,
    registerController,
    updateNameController,
    updateDescriptionController,
    updateDateController,
    updateTimeController,
    updateLinkUrlController,
    updateVideoUrlController,
    deleteController,
} from "../controller/LectureController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router()

router.get('/lectures', authMiddleware, verifyPermission(['SuperAdmin', 'admin', 'User']), findAllController)
router.get('/lectures/:idLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), findByIdController)

router.post('/lectures/create', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), registerController)

router.patch('/lectures/:idLecture/nameLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateNameController)
router.patch('/lectures/:idLecture/description', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateDescriptionController)
router.patch('/lectures/:idLecture/dateLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateDateController)
router.patch('/lectures/:idLecture/timeLecture', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateTimeController)
router.patch('/lectures/:idLecture/link_url', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateLinkUrlController)
router.patch('/lectures/:idLecture/video_url', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), updateVideoUrlController)

router.delete('/lectures/:idLecture/delete', authMiddleware, verifyPermission(['SuperAdmin', 'admin']), deleteController)

export default router
