import {
  getAllVolunteerWorkService,
  getVolunteerWorkByIdService,
  createVolunteerWorkService,
  updateVolunteerWorkFieldService,
  deleteVolunteerWorkService,
} from "../services/VolunteerWorkService.js";

export async function getAllVolunteerWorkController(req, res, next) {
  try {
    const result = await getAllVolunteerWorkService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getVolunteerWorkByIdController(req, res, next) {
  try {
    const { idVolunteerWork } = req.params;
    const result = await getVolunteerWorkByIdService(idVolunteerWork);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createVolunteerWorkController(req, res, next) {
  try {
    const result = await createVolunteerWorkService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateVolunteerWorkController(req, res, next) {
  try {
    const { idVolunteerWork } = req.params;
    const { nameVolunteerWork, description, dateStart, dateEnd, location, responsible, status_permission } = req.body
    const result = await updateVolunteerWorkFieldService(idVolunteerWork, 
      nameVolunteerWork,
      description,
      dateStart,
      dateEnd,
      location,
      responsible,
      status_permission
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export const updateVolunteerWorkFieldController = updateVolunteerWorkController;

export async function deleteVolunteerWorkController(req, res, next) {
  try {
    const { idVolunteerWork } = req.params;
    const result = await deleteVolunteerWorkService(idVolunteerWork);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
