import { FacilitatorRepository } from "../repository/FacilitatorRepository.js";
import appError from "../errors/AppError.js";

export async function viewAllFacilitadoresService() {
  const result = await FacilitatorRepository.findAll();
  return {
    message: "Sucesso ao exibir os usuários facilitadores.",
    success: true,
    data: result,
  };
}

export async function viewOnlyFacilitadorByIdService(User_idUser) {
  const result = await FacilitatorRepository.findById(User_idUser);

  if (!result) {
    throw appError("Facilitador não encontrado.", 404);
  }

  return {
    message: "Sucesso ao exibir o facilitador desejado.",
    success: true,
    data: result,
  };
}

export async function viewFacilitadoresByCategoryService(category) {
  const result = await FacilitatorRepository.findByCategory(category);

  if (result.length === 0) {
    throw appError("Facilitadores não encontrados.", 404);
  }

  const groupNames = {
      'ESDE': 'ESDE',
      'CIEDE': 'CIEDE',
      'MEDIUNIDADE': 'MEDIUNIDADE'
  };

  return {
    message: `Sucesso ao exibir os facilitadores do grupo ${groupNames[category]}.`,
    success: true,
    data: result,
  };
}

export async function createFacilitadoresService(data) {
  const { User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen } = data;

  if (!User_idUser || !description || !apelido || !espiritaSinceTime || !category || !memberSinceWhen) {
    throw appError("Dados inválidos.", 400);
  }

  const result = await FacilitatorRepository.create(data);

  return {
    message: "Facilitador criado com sucesso.",
    success: true,
    data: result,
  };
}

export async function deleteFacilitadoresService(idFacilitadores) {
  const deleted = await FacilitatorRepository.delete(idFacilitadores);

  if (deleted === 0) {
    throw appError("Facilitador não encontrado.", 404);
  }

  return {
    message: "Facilitador deletado com sucesso.",
    success: true,
  };
}
