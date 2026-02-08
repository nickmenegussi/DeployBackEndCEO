import {
  getUserNotificationsService,
  markAllAsReadService,
  viewAllNotificationsService,
  createNotificationService,
  updateNotificationStatusService,
  updateNotificationMessageService,
  deleteNotificationService,
} from "../services/NotificationService.js";

export async function getUserNotificationsController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const result = await getUserNotificationsService(User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function markAllAsReadController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const result = await markAllAsReadService(User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function viewAllNotificationsController(req, res, next) {
  try {
    const result = await viewAllNotificationsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createNotificationController(req, res, next) {
  try {
    const User_idUser = req.body.User_idUser || req.data.id;
    const result = await createNotificationService({ ...req.body, User_idUser });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateNotificationStatusController(req, res, next) {
  try {
    const { idNotification } = req.params;
    const User_idUser = req.data.id;
    const result = await updateNotificationStatusService(idNotification, User_idUser, true);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateNotificationMessageController(req, res, next) {
  try {
    const { idNotifications } = req.params;
    const User_idUser = req.data.id;
    const { message } = req.body;
    const result = await updateNotificationMessageService(idNotifications, User_idUser, message);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteNotificationController(req, res, next) {
  try {
    const { idNotifications } = req.params;
    const User_idUser = req.data.id;
    const result = await deleteNotificationService(idNotifications, User_idUser);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
