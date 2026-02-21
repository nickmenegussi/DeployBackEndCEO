import appError from "../errors/AppError.js";
import { VolunteerWorkRepository } from "../repository/VolunteerWorkRepository.js";
import volunteerWorkResponseDTO from "../Dtos/volunteerWorkResponseDTO.js";

export async function getAllVolunteerWorkService() {
  const result = await VolunteerWorkRepository.findAll();

  if (!result || result.length === 0) {
    throw appError("Sem dados", 400);
  }

  return {
    message: "Sucesso ao exibir os trabalhos voluntários.",
    success: true,
    data: result.map(volunteerWorkResponseDTO),
  };
}

export async function getVolunteerWorkByIdService(idVolunteerWork) {
  if (!idVolunteerWork) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const result = await VolunteerWorkRepository.findById(idVolunteerWork);

  if (!result) {
    throw appError(`Erro ao exibir o trabalho voluntário com o id ${idVolunteerWork}. Tente novamente!`, 404);
  }

  return {
    message: "Sucesso ao exibir os trabalhos voluntários.",
    success: true,
    data: volunteerWorkResponseDTO(result),
  };
}

export async function createVolunteerWorkService(data) {
  const { nameVolunteerWork, address, dateVolunteerWork, work_description, timeVolunteerWork } = data;

  if (!nameVolunteerWork || !address || !dateVolunteerWork || !work_description) {
    throw appError("Preencha todos os campos de cadastro", 400);
  }

  const existing = await VolunteerWorkRepository.findExisting(
    nameVolunteerWork,
    address,
    dateVolunteerWork,
    work_description
  );

  if (existing) {
    throw appError("Trabalho voluntário já cadastrado.", 409);
  }

  const result = await VolunteerWorkRepository.create({
    nameVolunteerWork,
    address,
    dateVolunteerWork,
    work_description,
    timeVolunteerWork,
  });

  return {
    success: true,
    message: "Trabalho Voluntário cadastrado com sucesso",
    data: volunteerWorkResponseDTO(result),
  };
}

export async function updateNameVolunteerWorkService(idVolunteerWork, nameVolunteerWork) {
  if (!idVolunteerWork || !nameVolunteerWork) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const [affectedRows] = await VolunteerWorkRepository.update(idVolunteerWork, { nameVolunteerWork });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o trabalho voluntário ou dados iguais aos atuais.", 400);
  }

  const updatedWork = await VolunteerWorkRepository.findById(idVolunteerWork);

  return {
    success: true,
    message: "Trabalho voluntário atualizado com sucesso.",
    data: updatedWork.length  
  };
}

export async function updateAddressVolunteerWorkService(idVolunteerWork, address) {
  if (!idVolunteerWork || !address) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const [affectedRows] = await VolunteerWorkRepository.update(idVolunteerWork, { address });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o trabalho voluntário ou dados iguais aos atuais.", 400);
  }

  const updatedWork = await VolunteerWorkRepository.findById(idVolunteerWork);

  return {
    success: true,
    message: "Trabalho voluntário atualizado com sucesso.",
    data: updatedWork.length  
  };
}

export async function updateDateVolunteerWorkService(idVolunteerWork, dateVolunteerWork) {
  if (!idVolunteerWork || !dateVolunteerWork) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const [affectedRows] = await VolunteerWorkRepository.update(idVolunteerWork, { dateVolunteerWork });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o trabalho voluntário ou dados iguais aos atuais.", 400);
  }

  const updatedWork = await VolunteerWorkRepository.findById(idVolunteerWork);

  return {
    success: true,
    message: "Trabalho voluntário atualizado com sucesso.",
    data: updatedWork.length  
  };
}

export async function updateWorkDescriptionVolunteerWorkService(idVolunteerWork, work_description) {
  if (!idVolunteerWork || !work_description) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const [affectedRows] = await VolunteerWorkRepository.update(idVolunteerWork, { work_description });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o trabalho voluntário ou dados iguais aos atuais.", 400);
  }

  const updatedWork = await VolunteerWorkRepository.findById(idVolunteerWork);

  return {
    success: true,
    message: "Trabalho voluntário atualizado com sucesso.",
    data: updatedWork.length  
  };
}

export async function updateTimeVolunteerWorkService(idVolunteerWork, timeVolunteerWork) {
  if (!idVolunteerWork || !timeVolunteerWork) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const [affectedRows] = await VolunteerWorkRepository.update(idVolunteerWork, { timeVolunteerWork });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o trabalho voluntário ou dados iguais aos atuais.", 400);
  }

  const updatedWork = await VolunteerWorkRepository.findById(idVolunteerWork);

  return {
    success: true,
    message: "Trabalho voluntário atualizado com sucesso.",
    data: updatedWork.length  
  };
}
export async function updateWorkDescriptionVolunteerWorkService(idVolunteerWork, work_description) {
  if (!idVolunteerWork || !work_description) {
    throw appError("Preencha todos os campos obrigatórios!", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const [affectedRows] = await VolunteerWorkRepository.update(idVolunteerWork, { work_description });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o trabalho voluntário ou dados iguais aos atuais.", 400);
  }

  const updatedWork = await VolunteerWorkRepository.findById(idVolunteerWork);

  return {
    success: true,
    message: "Trabalho voluntário atualizado com sucesso.",
    data: updatedWork.length  
  };
}


export async function deleteVolunteerWorkService(idVolunteerWork) {
  if (!idVolunteerWork) {
    throw appError("ID do trabalho voluntário é obrigatório", 400);
  }

  const exists = await VolunteerWorkRepository.findById(idVolunteerWork);
  if (!exists) {
    throw appError(`O trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`, 404);
  }

  const deletedRows = await VolunteerWorkRepository.delete(idVolunteerWork);

  if (deletedRows === 0) {
    throw appError("Erro ao deletar o trabalho voluntário.", 400);
  }

  return {
    message: "Trabalho voluntário deletado com sucesso",
    success: true,
  };
}
