import { 
  viewCartAllService, 
  viewCartByUserService, 
  updateActionService, 
  updateQuantityService, 
  createCartService, 
  deleteCartService 
} from "../services/CartService.js";

export async function viewCartAllController(req, res, next) {
  try {
    const idUser = req.data.id;
    const result = await viewCartAllService(idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewCartByUserController(req, res, next) {
  try {
    const { idUser, idLibrary } = req.params;
    const result = await viewCartByUserService(idUser, idLibrary);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateActionController(req, res, next) {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const User_idUser = req.data.id;
    const result = await updateActionService(id, User_idUser, action);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateQuantityController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const { Book_idLibrary, quantity } = req.body;
    const result = await updateQuantityService(User_idUser, Book_idLibrary, quantity);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createCartController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const { Book_idLibrary, action, quantity } = req.body;
    const result = await createCartService(User_idUser, Book_idLibrary, action, quantity);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function confirmCartController(req, res, next) {
    // This was not in legacy snippet but in routes, adding a stub
    return res.status(200).json({ message: "Checkout do carrinho em construção" });
}

export async function deleteCartController(req, res, next) {
  try {
    const { idCart } = req.params;
    const User_idUser = req.data.id;
    const result = await deleteCartService(idCart, User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
