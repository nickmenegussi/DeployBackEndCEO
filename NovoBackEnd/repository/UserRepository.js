import { FacilitadorModel } from "../models/FacilitadorModel.js"
import { UserModel } from "../models/UserModel.js"

export const UserRepository = {
    findAll(){
        return UserModel.findAll({
            attributes: {exclude: ['password']}
        })
    },

    findById(id){
        return UserModel.findByPk(id, {
            attributes: {exclude: ['password']}
        })
    },
    
    // criado para que possamos em algum momento pegar a senha
    findByEmail(email, includePassword = false) {
        const attributes = includePassword ? {} : { exclude: ['password'] };
        return UserModel.findOne({
            where: {email},
            attributes
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
        await FacilitadorModel.destroy({
            where: {User_idUser: idUser}
        })

        return await UserModel.destroy({
            where: {idUser}
        })
    }
}