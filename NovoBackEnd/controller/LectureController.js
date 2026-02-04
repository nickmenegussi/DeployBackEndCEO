import { getLectureById, listLecture, register } from "../services/LectureService.js";


export async function findAllController(req, res, next) {
    try {
        const lecture = await listLecture()

        return res.status(200).json({
            message: "Palestras listadas com sucesso.",
            success: true,
            ...lecture
        })
    } catch (err){
        next(err)
    }
}

export async function findByIdController(req, res, next) {
    try {
        const {idLecture} = req.params

        const lecture = await getLectureById(idLecture)

        return res.status(200).json({
            message: "Palestra encontrada com sucesso.",
            success: true,
            data: lecture,
        })
    } catch (err){
        next(err)
    }
}

export async function registerController(req, res, next) {
    try {
        const lecture = await register(req.body)

        return res.status(201).json({
            message: "Palestra cadastrada com sucesso",
            data: lecture,
        })
    } catch (err){
        next(err)
    }
}

export async function updateController(req, res, next) {

}