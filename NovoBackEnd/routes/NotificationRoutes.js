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
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/notifications", authMiddleware, getUserNotificationsController);
router.get("/admin/notifications", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), viewAllNotificationsController);
router.get("/admin/notifications/:idNotification", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), viewNotificationsByUserController);

router.put("/notifications/read-all", authMiddleware, markAllAsReadController);
router.put("/notifications/:idNotification/read", authMiddleware, updateNotificationStatusController);

router.post("/notifications", authMiddleware, createNotificationController);

router.patch("/admin/notifications/:idNotification/status", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateNotificationStatusController);
router.patch("/admin/notifications/:idNotification/message", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateNotificationMessageController);
router.delete("/admin/notifications/:idNotifications", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), deleteNotificationController);

export default router;
