import { LectureModel} from "../models/LectureModel.js"

export const LectureRepository = {
    async findAll(){
        return await LectureModel.findAll()
    },

    async findById(idLecture){
        return await LectureModel.findByPk(idLecture)
    },

    async findByNameAndDate(nameLecture, dateLecture){
        return await LectureModel.findOne({
            where: {nameLecture, dateLecture}
        })
    },

    async create(data){
        return await LectureModel.create(data)
    }, 

    async update(idLecture, data) {
        return await LectureModel.update(data, {
            where: {idLecture}
        })
    },

    async delete(id) {
        return await LectureModel.destroy({
            where: {id}
        })
    }
}