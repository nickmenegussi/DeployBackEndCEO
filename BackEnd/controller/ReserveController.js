import {
  getAllReservesService,
  getReservesByUserService,
  processReservationService,
  deleteReserveService,
} from "../services/ReserveService.js";

export async function getAllReservesController(req, res, next) {
  try {
    const result = await getAllReservesService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export const viewAllReservesController = getAllReservesController;

export async function getReservesByUserController(req, res, next) {
  try {
    const loggedUserId = req.data.id;
    const roleUser = req.data.role;
    const { idUser } = req.params;

    const result = await getReservesByUserService(idUser, roleUser, loggedUserId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export const viewReservesByUserController = getReservesByUserController;

export async function processReservationController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const {idCart, Book_idLibrary, quantity} = req.body
    const item = {    
      idCart,
      Book_idLibrary,
      quantity
    }
    const result = await processReservationService(
      item,
      User_idUser
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export const reserveBookController = processReservationController;

export async function deleteReserveController(req, res, next) {
  try {
    const { ReserveId } = req.params;
    const loggedUserId = req.data.id;
    const roleUser = req.data.role;
    // Note: If you pass idUser in query or params to delete someone else's reserve as admin
    const idUser = req.query.idUser || loggedUserId;

    const result = await deleteReserveService(ReserveId, idUser, roleUser, loggedUserId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
