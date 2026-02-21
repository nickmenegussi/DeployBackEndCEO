import {
    getLectureById,
    listLecture,
    register,
    updateLectureNameService,
    updateLectureDateService,
    updateLectureTimeService,
    updateLectureDescriptionService,
    updateLectureLinkUrlService,
    updateLectureVideoUrlService,
    deleteLectureService,
} from "../services/LectureService.js";

export async function findAllController(req, res, next) {
    try {
        const lecture = await listLecture()

        return res.status(200).json({
            message: "Palestras listadas com sucesso.",
            success: true,
            ...lecture
        })
    } catch (err) {
        next(err)
    }
}

export async function findByIdController(req, res, next) {
    try {
        const { idLecture } = req.params

        const lecture = await getLectureById(idLecture)

        return res.status(200).json({
            message: "Palestra encontrada com sucesso.",
            success: true,
            data: lecture,
        })
    } catch (err) {
        next(err)
    }
}

export async function registerController(req, res, next) {
    try {
        const lecture = await register(req.body)

        return res.status(201).json({
            message: "Palestra cadastrada com sucesso",
            success: true,
            data: lecture,
        })
    } catch (err) {
        next(err)
    }
}

export async function updateNameController(req, res, next) {
    try {
        const { idLecture } = req.params
        const { nameLecture } = req.body

        const result = await updateLectureNameService(idLecture, nameLecture)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}

export async function updateDateController(req, res, next) {
    try {
        const { idLecture } = req.params
        const { dateLecture } = req.body

        const result = await updateLectureDateService(idLecture, dateLecture)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}

export async function updateTimeController(req, res, next) {
    try {
        const { idLecture } = req.params
        const { timeLecture } = req.body

        const result = await updateLectureTimeService(idLecture, timeLecture)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}

export async function updateDescriptionController(req, res, next) {
    try {
        const { idLecture } = req.params
        const { description } = req.body

        const result = await updateLectureDescriptionService(idLecture, description)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}

export async function updateLinkUrlController(req, res, next) {
    try {
        const { idLecture } = req.params
        const { link_url } = req.body

        const result = await updateLectureLinkUrlService(idLecture, link_url)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}

export async function updateVideoUrlController(req, res, next) {
    try {
        const { idLecture } = req.params
        const { video_url } = req.body

        const result = await updateLectureVideoUrlService(idLecture, video_url)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}

export async function deleteController(req, res, next) {
    try {
        const { idLecture } = req.params

        const result = await deleteLectureService(idLecture)

        return res.status(200).json({
            ...result
        })
    } catch (err) {
        next(err)
    }
}