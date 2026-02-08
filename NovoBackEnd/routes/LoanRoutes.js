import { Router } from "express";
import {
  getAllLoansController,
  viewLoansByUserController,
  updateReturnDateController,
  deleteLoanController,
} from "../controller/LoanController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/loan/user", authMiddleware, verifyPermission(["admin", "SuperAdmin", "User"]), viewLoansByUserController);
router.get("/loan", authMiddleware, getAllLoansController);

router.patch("/loan/:Cart_idCart/returnDate", authMiddleware, verifyPermission(["admin", "SuperAdmin"]), updateReturnDateController);

router.delete("/loan/:LoansId/:UserId/delete", authMiddleware, verifyPermission(["admin", "SuperAdmin"]), deleteLoanController);

export default router;
