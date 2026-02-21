import { Router } from "express";
import {
  getAllLoansController,
  viewLoansByUserController,
  updateReturnDateController,
  deleteLoanController,
} from "../controller/LoanController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { updateReturnDateSchema } from "../validations/LoanValidation.js";

const router = Router();

router.get("/loan/user", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), viewLoansByUserController);
router.get("/loan", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), getAllLoansController);

router.patch("/loan/:Cart_idCart/returnDate", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(updateReturnDateSchema), updateReturnDateController);

router.delete("/loan/:LoansId/:UserId/delete", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), deleteLoanController);

export default router;
