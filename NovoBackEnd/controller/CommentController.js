import {
  getCommentsByPostIdService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from "../services/CommentService.js";

export async function getCommentsByPostIdController(req, res, next) {
  try {
    const { postId } = req.params;
    const result = await getCommentsByPostIdService(postId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createCommentController(req, res, next) {
  try {
    const { postId } = req.params;
    const User_idUser = req.data.id;
    const { message } = req.body;
    const result = await createCommentService({ postId, User_idUser, message });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateCommentController(req, res, next) {
  try {
    const { idComments } = req.params;
    const User_idUser = req.data.id;
    const { message } = req.body;
    const result = await updateCommentService(idComments, User_idUser, message);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteCommentController(req, res, next) {
  try {
    const { idComments } = req.params;
    const User_idUser = req.data.id;
    const result = await deleteCommentService(idComments, User_idUser);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
