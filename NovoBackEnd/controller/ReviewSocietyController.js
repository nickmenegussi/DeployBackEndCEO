import {
  createReviewSocietyService,
  getAllReviewSocietyService,
  updateReviewSocietyService,
  deleteReviewSocietyService,
} from "../services/ReviewSocietyService.js";

export async function createReviewSocietyController(req, res, next) {
  try {
    const userId = req.data.id;
    const {description, rating} = req.body

    const data = {
      description,
      rating
    }

    const result = await createReviewSocietyService( 
      data,
      userId 
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllReviewSocietyController(req, res, next) {
  try {
    const { sortOrder } = req.query;
    const result = await getAllReviewSocietyService(sortOrder);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateReviewSocietyController(req, res, next) {
  try {
    const { idReviewSociety } = req.params;
    const userId = req.data.id;
    const {description, rating } = req.body

    const data = {
      description,
      rating
    }
    
    const result = await updateReviewSocietyService(idReviewSociety, userId, 
      data
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteReviewSocietyController(req, res, next) {
  try {
    const { idReviewSociety } = req.params;
    const userId = req.data.id;
    const result = await deleteReviewSocietyService(idReviewSociety, userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
