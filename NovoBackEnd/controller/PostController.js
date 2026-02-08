import {
  getAllPostsService,
  createPostService,
  getPostByIdService,
  toggleLikeService,
  updatePostFieldService,
  deletePostService,
} from "../services/PostService.js";

export async function getAllPostsController(req, res, next) {
  try {
    const result = await getAllPostsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createPostController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const image = req.file ? req.file.filename : null;
    const result = await createPostService({
      ...req.body,
      User_idUser,
      image,
    });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getPostByIdController(req, res, next) {
  try {
    const { postId } = req.params;
    const result = await getPostByIdService(postId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function toggleLikeController(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.data.id;
    const result = await toggleLikeService(postId, userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updatePostController(req, res, next) {
  try {
    const { postId } = req.params;
    const User_idUser = req.data.id;
    const { content } = req.body;
    const image = req.file ? req.file.filename : null;

    const dataToUpdate = {};
    if (content) dataToUpdate.content = content;
    if (image) dataToUpdate.image = image;

    const result = await updatePostFieldService(postId, User_idUser, dataToUpdate);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deletePostController(req, res, next) {
  try {
    const { postId } = req.params;
    const User_idUser = req.data.id;
    const result = await deletePostService(postId, User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
