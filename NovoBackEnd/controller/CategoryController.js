import { 
  getCategoriesService, 
  getTopicByCategoryService, 
  createCategoryService 
} from "../services/CategoryService.js";

export async function getCategoriesController(req, res, next) {
  try {
    const result = await getCategoriesService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTopicByCategoryController(req, res, next) {
  try {
    const { nameCategory } = req.params;
    const result = await getTopicByCategoryService(nameCategory);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createCategoryController(req, res, next) {
  try {
    const { nameCategory } = req.body;
    const User_idUser = req.data.id;
    const result = await createCategoryService(nameCategory, User_idUser);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
