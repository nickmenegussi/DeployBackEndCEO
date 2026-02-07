import {Router} from "express"
import { createBookController, findAllBookController, getBookByIdController } from "../controller/LibraryController.js"
import authMiddleware from "../middleware/authMidleware.js";
import { viewOnlyOneBookService } from "../services/LibraryService.js";

const router = Router()

router.get('/library', authMiddleware, findAllBookController)
router.get('/library/:idLibrary', getBookByIdController)

router.post('/library/register', authMiddleware, createBookController)

export default router