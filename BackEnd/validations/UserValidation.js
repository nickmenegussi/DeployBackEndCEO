import * as yup from 'yup';

export const getUserByIdSchema = yup.object({
    params: yup.object({
        idUser: yup.number()
        .required("O id do usuário é obrigatório")
        .integer("O id do usuário deve ser um número inteiro")
    })
})

export const registerSchema = yup.object({
    body: yup.object({
        nameUser: yup.string()
        .required("O nome do usuário é obrigatório")
        .min(3, "O nome do usuário deve ter pelo menos 3 caracteres")
        .max(50, "O nome do usuário deve ter no máximo 50 caracteres")
        .matches(/^[A-Za-zÀ-ÖØ-ößñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ ]+$/, "O nome do usuário deve conter apenas letras"),
        email: yup.string()
        .required("O e-mail é obrigatório")
        .email("E-mail inválido")
        .min(5, "O e-mail deve ter pelo menos 5 caracteres")
        .max(30, "O e-mail deve ter no máximo 30 caracteres")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "E-mail inválido"),
        password: yup.string()
        .required("A senha é obrigatória")
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .max(12, "A senha deve ter no máximo 12 caracteres")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
        status_permission: yup.string()
        .oneOf(["Admin", "SuperAdmin", "User"], "O status de permissão deve ser Admin, SuperAdmin ou User")
    })
})

export const updateNameUserSchema = yup.object({
    body: yup.object({
        nameUser: yup.string()
        .required("O nome do usuário é obrigatório")
        .min(3, "O nome do usuário deve ter pelo menos 3 caracteres")
        .max(50, "O nome do usuário deve ter no máximo 50 caracteres")
        .matches(/^[A-Za-zÀ-ÖØ-ößñÑáéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕçÇ ]+$/, "O nome do usuário deve conter apenas letras")
    })
})

export const updateEmailUserSchema = yup.object({
    body: yup.object({
        email: yup.string()
        .required("O e-mail é obrigatório")
        .email("E-mail inválido")
        .min(5, "O e-mail deve ter pelo menos 5 caracteres")
        .max(30, "O e-mail deve ter no máximo 30 caracteres")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "E-mail inválido")
    })
})

export const updatePasswordUserSchema = yup.object({
    body: yup.object({
        newPassword: yup.string()
        .required("A nova senha é obrigatória")
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .max(12, "A senha deve ter no máximo 12 caracteres")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
        currentPassword: yup.string()
        .required("A senha atual é obrigatória")
        .min(6, "A senha atual deve ter pelo menos 6 caracteres")
        .max(12, "A senha atual deve ter no máximo 12 caracteres")
        .matches(/[A-Z]/, "A senha atual deve conter pelo menos uma letra maiúscula")
        .matches(/[a-z]/, "A senha atual deve conter pelo menos uma letra minúscula")
        .matches(/[0-9]/, "A senha atual deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha atual deve conter pelo menos um caractere especial"),
        confirmedPassword: yup.string()
        .required("A senha confirmada é obrigatória")
        .min(6, "A senha confirmada deve ter pelo menos 6 caracteres")
        .max(12, "A senha confirmada deve ter no máximo 12 caracteres")
        .matches(/[A-Z]/, "A senha confirmada deve conter pelo menos uma letra maiúscula")
        .matches(/[a-z]/, "A senha confirmada deve conter pelo menos uma letra minúscula")
        .matches(/[0-9]/, "A senha confirmada deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha confirmada deve conter pelo menos um caractere especial")
    })
})

export const updateForgotPasswordUserSchema = yup.object({
    body: yup.object({
        email: yup.string()
        .required("O e-mail é obrigatório")
        .email("E-mail inválido")
        .min(5, "O e-mail deve ter pelo menos 5 caracteres")
        .max(30, "O e-mail deve ter no máximo 30 caracteres")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "E-mail inválido"),
        otp: yup.string()
        .required("O código OTP é obrigatório")
        .length(6, "O código OTP deve ter 6 caracteres")
        .matches(/^[0-9]+$/, "O código OTP deve conter apenas números"),
        newPassword: yup.string()
        .required("A nova senha é obrigatória")
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .max(12, "A senha deve ter no máximo 12 caracteres")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial"),
        confirmedPassword: yup.string()
        .required("A senha confirmada é obrigatória")
        .min(6, "A senha confirmada deve ter pelo menos 6 caracteres")
        .max(12, "A senha confirmada deve ter no máximo 12 caracteres")
        .matches(/[A-Z]/, "A senha confirmada deve conter pelo menos uma letra maiúscula")
        .matches(/[a-z]/, "A senha confirmada deve conter pelo menos uma letra minúscula")
        .matches(/[0-9]/, "A senha confirmada deve conter pelo menos um número")
        .matches(/[^A-Za-z0-9]/, "A senha confirmada deve conter pelo menos um caractere especial")
    })
})

