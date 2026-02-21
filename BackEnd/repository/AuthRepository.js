import { OtpModel } from "../models/OtpModel.js";
import { Op } from "sequelize";

export const AuthRepository = {
    async generateOtp(email, otp, expiresAt) {
        return await OtpModel.create({
            email,
            otp,
            expiresAt
        });
    },

    async findOtpByEmail(email) {
        return await OtpModel.findOne({
            where: {
                email,
            },
            attributes: ['otp', 'expiresAt'],
            order: [['id', 'DESC']] // Usando o ID para garantir que pegamos o último gerado
        });
    },

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