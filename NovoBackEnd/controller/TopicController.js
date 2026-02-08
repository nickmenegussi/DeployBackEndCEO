import {
  viewOnlyTopicByIdService,
  viewAllTopicService,
  createTopicService,
  updateTopicFieldService,
  deleteTopicService,
} from "../services/TopicService.js";

export async function viewOnlyTopicByIdController(req, res, next) {
  try {
    const { topicId } = req.params;
    const result = await viewOnlyTopicByIdService(topicId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewAllTopicController(req, res, next) {
  try {
    const result = await viewAllTopicService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createTopicController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const image = req.file ? req.file.filename : null;
    const result = await createTopicService({
      ...req.body,
      User_idUser,
      image,
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateTopicController(req, res, next) {
  try {
    const { topicId } = req.params;
    const User_idUser = req.data.id;
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (description) dataToUpdate.description = description;
    if (image) dataToUpdate.image = image;

    const result = await updateTopicFieldService(topicId, User_idUser, dataToUpdate);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteTopicController(req, res, next) {
  try {
    const { topicId } = req.params;
    const User_idUser = req.data.id;
    const result = await deleteTopicService(topicId, User_idUser);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
