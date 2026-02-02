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

    create(data){
        return UserModel.create(data)
    },

    update(id, data){
        return UserModel.update(data, {
            where: {id}
        })
    },

    delete(id){
        return UserModel.destroy({
            where: {id}
        })
    }
}