import { CalendarEventRepository } from "../repository/CalendarEventRepository.js";
import appError from "../errors/AppError.js";

export async function viewEventsByUserService(User_idUser) {
  const result = await CalendarEventRepository.findByUser(User_idUser);

  if (result.length === 0) {
    throw appError("Nenhum evento encontrado.", 404);
  }

  return {
    message: "Eventos encontrados com sucesso.",
    success: true,
    data: result,
  };
}

export async function viewAllEventsService() {
  // Simple implementation matching legacy behavior for now
  const result = await CalendarEventRepository.findAllAdminRaw();

  if (result.length === 0) {
    throw appError("Eventos não encontrados.", 404);
  }

  return {
    message: "Eventos encontrados com sucesso.",
    success: true,
    data: result,
  };
}

export async function createEventService(data) {
  const { title, description, start, end, link, dateEvent, attachment, User_idUser } = data;

  if (!title || !description || !start || !end || !link || !dateEvent || !attachment) {
    throw appError("Preencha todos os campos.", 400);
  }

  const existingEvent = await CalendarEventRepository.findOne({
    title, description, start, end, User_idUser, link, dateEvent
  });

  if (existingEvent) {
    throw appError("Esse evento já foi criado.", 400);
  }

  const result = await CalendarEventRepository.create(data);

  return {
    message: "Evento criado com sucesso.",
    success: true,
    data: result,
  };
}

export async function updateEventLinkService(idCalendarEvents, User_idUser, link) {
  if (!link) throw appError("Link do evento não informado", 400);

  const affected = await CalendarEventRepository.update(idCalendarEvents, User_idUser, { link });

  if (affected[0] === 0) throw appError("Link não encontrado ou permissão negada", 404);

  return { message: "Link atualizado com sucesso.", success: true };
}

export async function updateEventTitleService(idCalendarEvents, User_idUser, title) {
  if (!title) throw appError("Título do evento não informado.", 400);
  const affected = await CalendarEventRepository.update(idCalendarEvents, User_idUser, { title });
  if (affected[0] === 0) throw appError("Evento não encontrado ou permissão negada.", 404);
  return { message: "Título do evento atualizado com sucesso.", success: true };
}

export async function updateEventDescriptionService(idCalendarEvents, User_idUser, description) {
  if (!description) throw appError("Descrição do evento não informada.", 400);
  const affected = await CalendarEventRepository.update(idCalendarEvents, User_idUser, { description });
  if (affected[0] === 0) throw appError("Evento não encontrado ou permissão negada.", 404);
  return { message: "Descrição do evento atualizada com sucesso.", success: true };
}

export async function updateEventStartService(idCalendarEvents, User_idUser, start) {
  if (!start) throw appError("Início do evento não informado.", 400);
  const affected = await CalendarEventRepository.update(idCalendarEvents, User_idUser, { start });
  if (affected[0] === 0) throw appError("Evento não encontrado ou permissão negada.", 404);
  return { message: "Início do evento atualizado com sucesso.", success: true };
}

export async function updateEventEndService(idCalendarEvents, User_idUser, end) {
  if (!end) throw appError("Fim do evento não informado.", 400);
  const affected = await CalendarEventRepository.update(idCalendarEvents, User_idUser, { end });
  if (affected[0] === 0) throw appError("Evento não encontrado ou permissão negada.", 404);
  return { message: "Fim do evento atualizado com sucesso.", success: true };
}

export async function updateAttachmentService(idCalendarEvents, User_idUser, attachment) {
  if (!attachment) throw appError("Anexo não informado.", 400);
  const affected = await CalendarEventRepository.update(idCalendarEvents, User_idUser, { attachment });
  if (affected[0] === 0) throw appError("Evento não encontrado ou permissão negada.", 404);
  return { message: "Anexo do evento atualizado com sucesso.", success: true };
}

export async function deleteEventService(idCalendarEvents, User_idUser) {
  const deleted = await CalendarEventRepository.delete(idCalendarEvents, User_idUser);
  if (deleted === 0) throw appError("Evento não encontrado ou permissão negada.", 404);
  return { message: "Evento deletado com sucesso.", success: true };
}
