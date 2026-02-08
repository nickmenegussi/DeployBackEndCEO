import { Router } from "express";
import {
  viewAllEventsController,
  createEventController,
  updateEventTitleController,
  updateEventDescriptionController,
  updateEventStartController,
  updateEventEndController,
  updateAttachmentController,
  updateEventLinkController,
  deleteEventController,
} from "../controller/CalendarEventsController.js";
import authMiddleware from "../middleware/authMidleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";
// Assume multer is already configured in a central file or similar
// import upload from "../multerConfig/multer.js"; 

const router = Router();

router.get("/calendar", authMiddleware, verifyPermission(["SuperAdmin", "admin", "User"]), viewAllEventsController);
router.post("/calendar/register", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), createEventController);

router.patch("/calendar/:idCalendarEvents/title", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateEventTitleController);
router.patch("/calendar/:idCalendarEvents/link", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateEventLinkController);
router.patch("/calendar/:idCalendarEvents/description", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateEventDescriptionController);
router.patch("/calendar/:idCalendarEvents/start", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateEventStartController);
router.patch("/calendar/:idCalendarEvents/end", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateEventEndController);
router.patch("/calendar/:idCalendarEvents/attachment", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), updateAttachmentController);

router.delete("/calendar/:idCalendarEvents/delete", authMiddleware, verifyPermission(["SuperAdmin", "admin"]), deleteEventController);

export default router;
