import {Router} from "express"
import { deleteController, getAllController, getByIdController, updateNameUserController, updateUserEmailController, updateUserForgotPasswordController, updateUserImageProfileController, updateUserPasswordController } from "../controller/UserController.js"
import authMiddleware from "../middleware/authMidleware.js"
import verifyPermission from "../middleware/roleMiddleware.js"
import upload from "../middleware/uploadImage.js"

const router = Router()
router.get('/user', getAllController)
router.get('/user/:idUser', authMiddleware, verifyPermission(['admin', 'SuperAdmin', 'User']), getByIdController)

router.patch('/user/nameUser',authMiddleware , updateNameUserController)
router.patch('/user/profile', authMiddleware , updateUserEmailController)
router.patch('/user/password', authMiddleware ,updateUserPasswordController )
router.patch('/user/forgot-password', updateUserForgotPasswordController)
router.patch('/user/picture', authMiddleware , upload.single('image'), updateUserImageProfileController)


router.delete('/user/:idUser/delete', authMiddleware, verifyPermission(["SuperAdmin", "Admin"]) ,deleteController)

export default router