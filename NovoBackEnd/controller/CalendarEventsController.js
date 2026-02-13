import { 
  viewEventsByUserService, 
  viewAllEventsService, 
  createEventService, 
  updateEventLinkService, 
  updateEventTitleService, 
  updateEventDescriptionService, 
  updateEventStartService, 
  updateEventEndService, 
  updateAttachmentService, 
  deleteEventService 
} from "../services/CalendarEventService.js";

export async function viewAllEventsController(req, res, next) {
  try {
    // Note: Legacy viewAllEvents seemed to ignore User_idUser but I'll keep it as is
    const result = await viewAllEventsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function createEventController(req, res, next) {
  try {
    const attachment = req.file ? req.file.filename : null;
    const User_idUser = req.data.id;
    const result = await createEventService({ ...req.body, attachment, User_idUser });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateEventLinkController(req, res, next) {
  try {
    const { link } = req.body;
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await updateEventLinkService(idCalendarEvents, User_idUser, link);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateEventTitleController(req, res, next) {
  try {
    const { title } = req.body;
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await updateEventTitleService(idCalendarEvents, User_idUser, title);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateEventDescriptionController(req, res, next) {
  try {
    const { description } = req.body;
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await updateEventDescriptionService(idCalendarEvents, User_idUser, description);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateEventStartController(req, res, next) {
  try {
    const { start } = req.body;
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await updateEventStartService(idCalendarEvents, User_idUser, start);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateEventEndController(req, res, next) {
  try {
    const { end } = req.body;
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await updateEventEndService(idCalendarEvents, User_idUser, end);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateAttachmentController(req, res, next) {
  try {
    const attachment = req.file ? req.file.filename : null;
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await updateAttachmentService(idCalendarEvents, User_idUser, attachment);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteEventController(req, res, next) {
  try {
    const User_idUser = req.data.id;
    const { idCalendarEvents } = req.params;
    const result = await deleteEventService(idCalendarEvents, User_idUser);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
