import { 
  viewAllFacilitadoresService, 
  viewOnlyFacilitadorByIdService, 
  viewFacilitadoresByCategoryService, 
  createFacilitadoresService, 
  deleteFacilitadoresService 
} from "../services/FacilitatorService.js";

export async function viewAllFacilitadoresController(req, res, next) {
  try {
    const result = await viewAllFacilitadoresService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewOnlyFacilitadorByIdController(req, res, next) {
  try {
    const { User_idUser } = req.params;
    const result = await viewOnlyFacilitadorByIdService(User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewFacilitadoresByGroupESDEController(req, res, next) {
  try {
    const result = await viewFacilitadoresByCategoryService('ESDE');
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewFacilitadoresByGroupCIEDEController(req, res, next) {
  try {
    const result = await viewFacilitadoresByCategoryService('CIEDE');
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewFacilitadoresByGroupMEDIUNICOController(req, res, next) {
  try {
    const result = await viewFacilitadoresByCategoryService('MEDIUNIDADE');
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createFacilitadoresController(req, res, next) {
  try {
    const result = await createFacilitadoresService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteFacilitadoresController(req, res, next) {
  try {
    const { idFacilitador } = req.params;
    const result = await deleteFacilitadoresService(idFacilitador);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
