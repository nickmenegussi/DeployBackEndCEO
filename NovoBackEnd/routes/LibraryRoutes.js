import { Router } from "express"
import { createBookController, findAllBookController, getBookByIdController } from "../controller/LibraryController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";
import { viewOnlyOneBookService } from "../services/LibraryService.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createBookSchema } from "../validations/LibraryValidation.js";

const router = Router();

router.get('/library', authMiddleware, findAllBookController);
router.get('/library/:idLibrary', authMiddleware, getBookByIdController);

router.post('/library/register', authMiddleware, verifyPermission([ROLES.ADMIN, ROLES.SUPER_ADMIN]), validate(createBookSchema), createBookController);

export default router;
