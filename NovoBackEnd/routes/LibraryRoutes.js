import {Router} from "express"
import { createBookController, findAllBookController, getBookByIdController } from "../controller/LibraryController.js"
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";
import { viewOnlyOneBookService } from "../services/LibraryService.js";

const router = Router()

router.get('/library', authMiddleware, findAllBookController)
router.get('/library/:idLibrary', getBookByIdController)

router.post('/library/register', authMiddleware, verifyPermission(["Admin", "SuperAdmin"]), createBookController)

export default router