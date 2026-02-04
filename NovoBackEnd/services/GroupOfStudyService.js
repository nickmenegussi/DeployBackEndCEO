import appError from "../errors/AppError.js";

export async function getGroupsService() {
  try {
    // Implementar chamada ao repository
  } catch (error) {
    throw error;
  }
}

export async function getGroupsByTypeService(TypeGroup) {
  try {
    if (!TypeGroup) {
      throw appError("Parâmetro TypeGroup é obrigatório.", 400);
    }

    // Implementar chamada ao repository
  } catch (error) {
    throw error;
  }
}

export async function createGroupService(data) {
  try {
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
        "Dados incompletos! (Facilitador, Nome, Descrição e Tipo são obrigatórios)",
        400
      );
    }

    // Implementar chamada ao repository para verificar existência
    // Implementar chamada ao repository para criar

  } catch (error) {
    throw error;
  }
}

export async function updateGroupNameService(idGroupOfStudy, NameStudy) {
  try {
    if (!NameStudy) {
      throw appError("Nome do grupo é obrigatório", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateGroupDescriptionService(idGroupOfStudy, Description) {
  try {
    if (!Description) {
      throw appError("Descrição do grupo é obrigatória", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateGroupDayOfWeekService(idGroupOfStudy, DayOfWeek) {
  try {
    if (!DayOfWeek) {
      throw appError("Dia da semana é obrigatório", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateGroupStartTimeService(idGroupOfStudy, StartTime) {
  try {
    if (!StartTime) {
      throw appError("Hora de início é obrigatória", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateGroupEndTimeService(idGroupOfStudy, EndTime) {
  try {
    if (!EndTime) {
      throw appError("Hora de término é obrigatória", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateGroupTypeService(idGroupOfStudy, TypeGroup) {
  try {
    if (!TypeGroup) {
      throw appError("Tipo do grupo é obrigatório", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateGroupRequirementsService(idGroupOfStudy, Requirements) {
  try {
    if (!Requirements) {
      throw appError("Requisitos do grupo são obrigatórios", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function deleteGroupService(idGroupOfStudy) {
  try {
    if (!idGroupOfStudy) {
      throw appError("ID do grupo é obrigatório", 400);
    }

  } catch (error) {
    throw error;
  }
}
