import { Router } from "express";
import {
  getUserNotificationsController,
  viewAllNotificationsController,
  viewNotificationsByUserController,
  markAllAsReadController,
  updateNotificationStatusController,
  createNotificationController,
  updateNotificationMessageController,
  deleteNotificationController,
} from "../controller/NotificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createNotificationSchema } from "../validations/MiscValidation.js";

const router = Router();

router.get("/notifications", authMiddleware, getUserNotificationsController);
router.get("/admin/notifications", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewAllNotificationsController);
router.get("/admin/notifications/:idNotification", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), viewNotificationsByUserController);

router.put("/notifications/read-all", authMiddleware, markAllAsReadController);
router.put("/notifications/:idNotification/read", authMiddleware, updateNotificationStatusController);

router.post("/notifications", authMiddleware, validate(createNotificationSchema), createNotificationController);

router.patch("/admin/notifications/:idNotification/status", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateNotificationStatusController);
router.patch("/admin/notifications/:idNotification/message", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateNotificationMessageController);
router.delete("/admin/notifications/:idNotifications", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), deleteNotificationController);

export default router;
