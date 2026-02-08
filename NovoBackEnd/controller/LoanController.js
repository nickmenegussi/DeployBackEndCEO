import {
  getAllLoansService,
  getLoansByUserService,
  processLoanService,
  updateLoanFieldService,
  deleteLoanService,
} from "../services/LoanService.js";

export async function getAllLoansController(req, res, next) {
  try {
    const result = await getAllLoansService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewLoansByUserController(req, res, next) {
  try {
    const idUser = req.data.id;
    const result = await getLoansByUserService(idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function processLoanController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const result = await processLoanService(req.body, User_idUser);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateReturnDateController(req, res, next) {
  try {
    const { LoansId } = req.params;
    const User_idUser = req.data.id;
    const { returnDate } = req.body;

    const result = await updateLoanFieldService(LoansId, User_idUser, { returnDate });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteLoanController(req, res, next) {
  try {
    const { LoansId } = req.params;
    const User_idUser = req.data.id;

    const result = await deleteLoanService(LoansId, User_idUser);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
