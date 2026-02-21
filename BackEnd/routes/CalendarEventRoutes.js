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
import authMiddleware from "../middleware/authMiddleware.js";
import verifyPermission from "../middleware/roleMiddleware.js";
// Assume multer is already configured in a central file or similar
// import upload from "../multerConfig/multer.js"; 

import { ROLES } from "../utils/roles.js";
import validate from "../middleware/validateMiddleware.js";
import { createCalendarEventSchema } from "../validations/CalendarEventValidation.js";

const router = Router();

router.get("/calendar", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER]), viewAllEventsController);
router.post("/calendar/register", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), validate(createCalendarEventSchema), createEventController);

router.patch("/calendar/:idCalendarEvents/title", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateEventTitleController);
router.patch("/calendar/:idCalendarEvents/link", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateEventLinkController);
router.patch("/calendar/:idCalendarEvents/description", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateEventDescriptionController);
router.patch("/calendar/:idCalendarEvents/start", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateEventStartController);
router.patch("/calendar/:idCalendarEvents/end", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateEventEndController);
router.patch("/calendar/:idCalendarEvents/attachment", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), updateAttachmentController);

router.delete("/calendar/:idCalendarEvents/delete", authMiddleware, verifyPermission([ROLES.SUPER_ADMIN, ROLES.ADMIN]), deleteEventController);

export default router;
