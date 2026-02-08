import appError from "../errors/AppError.js";
import { NotificationRepository } from "../repository/NotificationRepository.js";
import notificationResponseDTO from "../Dtos/notificationResponseDTO.js";
import sendPushNotification from "../utils/sendPushNotification.js";

export async function getUserNotificationsService(User_idUser) {
  const result = await NotificationRepository.findByUser(User_idUser);
  return {
    message: "Notificações carregadas com sucesso.",
    success: true,
    data: result.map(notificationResponseDTO),
  };
}

export async function markAllAsReadService(User_idUser) {
  const [affectedRows] = await NotificationRepository.markAllAsRead(User_idUser);
  return {
    message: `${affectedRows} notificações marcadas como lidas.`,
    success: true,
  };
}

export async function viewAllNotificationsService() {
  const result = await NotificationRepository.findAll();
  return {
    message: "Sucesso ao exibir as notificações.",
    success: true,
    data: result.map(notificationResponseDTO),
  };
}

export async function createNotificationService(data) {
  const { message, expoPushToken, User_idUser } = data;

  if (!message || !expoPushToken || !User_idUser) {
    throw appError("Por favor, preencha todos os campos obrigatórios.", 400);
  }

  const existing = await NotificationRepository.findDuplicate(expoPushToken, message, User_idUser);

  if (existing) {
    throw appError("Já existe uma notificação igual a essa criada recentemente.", 409);
  }

  const result = await NotificationRepository.create({
    message,
    isRead: false,
    expoPushToken,
    User_idUser,
  });

  let pushResult;
  try {
    pushResult = await sendPushNotification(expoPushToken, message);
  } catch (error) {
    console.error("Erro ao enviar push:", error);
  }

  return {
    message: "Sucesso ao criar a notificação.",
    success: true,
    push: pushResult,
    data: notificationResponseDTO(result),
  };
}

export async function updateNotificationStatusService(idNotifications, User_idUser, isRead) {
  const notification = await NotificationRepository.findByIdAndUser(idNotifications, User_idUser);

  if (!notification) {
    throw appError("Notificação não encontrada.", 404);
  }

  const [affectedRows] = await NotificationRepository.update(idNotifications, User_idUser, { isRead });

  if (affectedRows === 0) {
    throw appError("Não foi possível atualizar o status da notificação.", 400);
  }

  return {
    message: "O status da notificação foi atualizado.",
    success: true,
  };
}

export async function updateNotificationMessageService(idNotifications, User_idUser, message) {
  if (!message) {
    throw appError("Mensagem é obrigatória", 400);
  }

  const notification = await NotificationRepository.findByIdAndUser(idNotifications, User_idUser);

  if (!notification) {
    throw appError("Notificação não encontrada.", 404);
  }

  const [affectedRows] = await NotificationRepository.update(idNotifications, User_idUser, { message });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar a mensagem da notificação.", 400);
  }

  return {
    message: "A mensagem foi atualizada.",
    success: true,
  };
}

export async function deleteNotificationService(idNotifications, User_idUser) {
  const notification = await NotificationRepository.findByIdAndUser(idNotifications, User_idUser);

  if (!notification) {
    throw appError("Notificação não encontrada.", 404);
  }

  const deleted = await NotificationRepository.delete(idNotifications, User_idUser);

  if (deleted === 0) {
    throw appError("Erro ao deletar notificação.", 400);
  }

  return {
    message: "A notificação foi deletada.",
    success: true,
  };
}
