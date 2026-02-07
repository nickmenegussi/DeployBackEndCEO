import { BookModel } from "../models/LibraryModel.js"

export const LibraryRepository = { 
    async findAll(){
        return await BookModel.findAll()
    },

    async findById(idLibrary){
        return await BookModel.findByPk(idLibrary)
    },
    // limit: quantos registros por consulta virá
    // offset: define a partir de qual registro a consulta começa
    async findPaginated(limit, offset) {
        return await BookModel.findAndCountAll({
            limit: limit,
            offset: offset, // em qual linha da coluna irá começar?
            order: [["nameBook", 'ASC']]
        })
    },


    async findByName(nameBook){
        return await BookModel.findOne({
            where: {
                nameBook
            }
        })
    },

    async create(data){
        return await BookModel.create(data)
    },

    async update(idLibrary, data){
        return await BookModel.update(data, {
            where: {idLibrary}
        })
    }, 

    async delete(idLibrary){
        return await BookModel.destroy({
            where: {idLibrary}
        })
    },
}