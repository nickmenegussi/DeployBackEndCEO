import { FacilitatorModel } from "../models/FacilitatorModel.js"
import { UserModel } from "../models/UserModel.js"

export const UserRepository = {
    findAll(){
        return UserModel.findAll({
            attributes: {exclude: ['password']}
        })
    },

    findById(id){
        return UserModel.findByPk(id)
    },

    findByEmail(email) {
        return UserModel.findOne({
            where: {email}
        })
    },

    async create(data){
        return await UserModel.create(data)
    },

    update(idUser, data){
        return UserModel.update(data, {
            where: {idUser}
        })
    },

    async delete(idUser){
        await FacilitatorModel.destroy({
            where: {User_idUser: idUser}
        })

        return await UserModel.destroy({
            where: {idUser}
        })
    }
}