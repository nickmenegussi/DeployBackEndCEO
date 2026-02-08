import GroupOfStudyDTO from "../Dtos/GroupOfStudyDTO.js";
import appError from "../errors/AppError.js";
import { GroupOfStudyRepository } from "../repository/GroupOfStudyRepository.js";

/* LISTAR TODOS */
export async function getGroupsService() {
  const groups = await GroupOfStudyRepository.findAll();

  return {
    success: true,
    data: GroupOfStudyDTO(groups),
  };
}

/* LISTAR POR TIPO */
export async function getGroupsByTypeService(TypeGroup) {
  if (!TypeGroup) {
    throw appError("Parâmetro TypeGroup é obrigatório.", 400);
  }

  const groups = await GroupOfStudyRepository.findByType(TypeGroup);

  if (!groups || groups.length === 0) {
    throw appError("Nenhum grupo encontrado para esse tipo.", 404);
  }

  return {
    message: "Sucesso ao exibir tópicos por categoria",
    success: true,
    data: GroupOfStudyDTO(groups),
  };
}

/* CRIAR */
export async function createGroupService(data) {
  const {
    IdFacilitador,
    NameStudy,
    Description,
    DayOfWeek,
    StartTime,
    EndTime,
    TypeGroup,
    Requirements,
  } = data;

  if (!IdFacilitador || !NameStudy || !Description || !TypeGroup) {
    throw appError(
      "Facilitador, Nome, Descrição e Tipo são obrigatórios.",
      400
    );
  }

  const exists = await GroupOfStudyRepository.findByNameAndType(
    NameStudy,
    TypeGroup
  );

  if (exists) {
    throw appError("Já existe um grupo com esse nome e tipo.", 409);
  }

  const group = await GroupOfStudyRepository.create({
    IdFacilitador,
    NameStudy,
    Description,
    DayOfWeek: DayOfWeek || null,
    StartTime: StartTime || null,
    EndTime: EndTime || null,
    TypeGroup,
    Requirements: Requirements || null,
  });

  return {
    success: true,
    message: "Grupo criado com sucesso.",
    data: GroupOfStudyDTO(group),
  };
}

/* UPDATES */
async function fetchGroupOrFail(idGroupOfStudy) {
  const group = await GroupOfStudyRepository.findById(idGroupOfStudy);
  if (!group) throw appError("Grupo não encontrado.", 404);

  return GroupOfStudyDTO(group);
}

export async function updateGroupNameService(idGroupOfStudy, NameStudy) {
  if (!NameStudy) throw appError("Nome do grupo é obrigatório.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, NameStudy);

  return {message: "Nome atualizado com sucesso.", success: true};
}

export async function updateGroupDescriptionService(idGroupOfStudy, Description) {
  if (!Description) throw appError("Descrição é obrigatória.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, Description );

  return { message: "Descrição atualizada com sucesso." , success: true};
}

export async function updateGroupDayOfWeekService(idGroupOfStudy, DayOfWeek) {
  if (!DayOfWeek) throw appError("Dia da semana é obrigatório.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, DayOfWeek);

  return { message: "Dia da semana atualizado com sucesso." , success: true };
}

export async function updateGroupStartTimeService(idGroupOfStudy, StartTime) {
  if (!StartTime) throw appError("Hora de início é obrigatória.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, StartTime);

  return {message: "Horário de começo da palestra atualizado com sucesso." , success: true };
}

export async function updateGroupEndTimeService(idGroupOfStudy, EndTime) {
  if (!EndTime) throw appError("Hora de término é obrigatória.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, EndTime )

  return {message: "Horário do fim da palestra atualizado com sucesso." , success: true };
}

export async function updateGroupTypeService(idGroupOfStudy, TypeGroup) {
  if (!TypeGroup) throw appError("Tipo é obrigatório.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, TypeGroup);

  return { success: true };
}

export async function updateGroupRequirementsService(idGroupOfStudy, Requirements) {
  if (!Requirements) throw appError("Requisitos são obrigatórios.", 400);

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.update(idGroupOfStudy, Requirements);

  return {message: "Arquivos atualizado com sucesso." , success: true };
}

/* DELETE */
export async function deleteGroupService(idGroupOfStudy) {
  if (!idGroupOfStudy) {
    throw appError("ID do grupo é obrigatório.", 400);
  }

  await fetchGroupOrFail(idGroupOfStudy);

  await GroupOfStudyRepository.delete(idGroupOfStudy);

  return {
    message: "Grupo deletado com sucesso.",
    success: true,
  };
}
