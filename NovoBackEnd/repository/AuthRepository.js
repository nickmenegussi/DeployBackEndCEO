import { OtpModel } from "../models/OtpModel.js";
import { Op } from "sequelize";

export const AuthRepository = {
    async generateOtp(email, otp, expiresAt){
       return await OtpModel.create({
           email,
           otp,
           expiresAt
       });
    },

    async findOtpByEmailAndOtp(email, otp) {
        return await OtpModel.findOne({
            where: {
                email,
                otp,
            }, attributes: ['expiresAt']
        });
    },

    // async findOtpByEmail(email) {
    //     return await OtpModel.findOne({
    //         where: {
    //             email,
    //         }, 
    //         attributes: ['otp', 'expiresAt'],
    //         order: [['createdAt', 'DESC']]
    //     });
    // },

    async deleteExpiredOtps() {
        return await OtpModel.destroy({
            where: {
                expiresAt: {
                    [Op.lt]: new Date()
                }
            }
        });
    }
}