import {
  getGroupsService,
  getGroupsByTypeService,
  createGroupService,
  updateGroupNameService,
  updateGroupDescriptionService,
  updateGroupDayOfWeekService,
  updateGroupStartTimeService,
  updateGroupEndTimeService,
  updateGroupTypeService,
  updateGroupRequirementsService,
  deleteGroupService,
} from "../services/GroupOfStudyService.js";

/* GET */
export async function getGroupsController(req, res, next) {
  try {
    const result = await getGroupsService();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getGroupsByTypeController(req, res, next) {
  try {
    const { TypeGroup } = req.params;
    const result = await getGroupsByTypeService(TypeGroup);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/* POST */
export async function createGroupController(req, res, next) {
  try {
    const result = await createGroupService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

/* PATCH */
export async function updateGroupNameController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { NameStudy } = req.body;

    const result = await updateGroupNameService(idGroupOfStudy, NameStudy);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateGroupDescriptionController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { Description } = req.body;

    const result = await updateGroupDescriptionService(idGroupOfStudy, Description);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateGroupDayOfWeekController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { DayOfWeek } = req.body;

    const result = await updateGroupDayOfWeekService(idGroupOfStudy, DayOfWeek);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateGroupStartTimeController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { StartTime } = req.body;

    const result = await updateGroupStartTimeService(idGroupOfStudy, StartTime);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateGroupEndTimeController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { EndTime } = req.body;

    const result = await updateGroupEndTimeService(idGroupOfStudy, EndTime);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateGroupTypeController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { TypeGroup } = req.body;

    const result = await updateGroupTypeService(idGroupOfStudy, TypeGroup);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateGroupRequirementsController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const { Requirements } = req.body;

    const result = await updateGroupRequirementsService(idGroupOfStudy, Requirements);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/* DELETE */
export async function deleteGroupController(req, res, next) {
  try {
    const { idGroupOfStudy } = req.params;
    const result = await deleteGroupService(idGroupOfStudy);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
