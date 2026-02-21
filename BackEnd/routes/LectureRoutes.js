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
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createLectureSchema } from "../validations/LectureValidation.js";

const router = Router();

router.get('/lectures', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), findAllController);
router.get('/lectures/:idLecture', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), findByIdController);

router.post('/lectures/create', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(createLectureSchema), registerController);

router.patch('/lectures/:idLecture/nameLecture', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateNameController);
router.patch('/lectures/:idLecture/description', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateDescriptionController);
router.patch('/lectures/:idLecture/dateLecture', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateDateController);
router.patch('/lectures/:idLecture/timeLecture', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateTimeController);
router.patch('/lectures/:idLecture/link_url', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateLinkUrlController);
router.patch('/lectures/:idLecture/video_url', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateVideoUrlController);

router.delete('/lectures/:idLecture/delete', authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), deleteController);

export default router
