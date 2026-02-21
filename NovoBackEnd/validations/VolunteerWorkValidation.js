import * as yup from 'yup';

export const createVolunteerWorkSchema = yup.object({
    body: yup.object({
        nameVolunteerWork: yup.string()
            .required("O nome do trabalho voluntário é obrigatório")
            .min(3, "O nome do trabalho voluntário deve ter pelo menos 3 caracteres")
            .max(100, "O nome do trabalho voluntário deve ter no máximo 100 caracteres"),
        address: yup.string()
            .required("O endereço é obrigatório")
            .min(3, "O endereço deve ter pelo menos 3 caracteres")
            .max(100, "O endereço deve ter no máximo 100 caracteres"),
        dateVolunteerWork: yup.date()
            .required("A data do trabalho voluntário é obrigatória")
            .min(new Date(), "A data do trabalho voluntário deve ser maior que a data atual"),
        work_description: yup.string()
            .required("A descrição do trabalho voluntário é obrigatória")
            .min(10, "A descrição do trabalho voluntário deve ter pelo menos 10 caracteres")
            .max(500, "A descrição do trabalho voluntário deve ter no máximo 500 caracteres"),
        timeVolunteerWork: yup.string()
            .required("O horário do trabalho voluntário é obrigatório")
            .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido (HH:MM:SS)")
    })
})

export const updateNameVolunteerWorkSchema = yup.object({
    params: yup.object({
        idVolunteerWork: yup.number()
            .required("O id do trabalho voluntário é obrigatório")
            .integer("O id do trabalho voluntário deve ser um número inteiro")
            .positive("O id do trabalho voluntário deve ser um número positivo")
    }),
    body: yup.object({
        nameVolunteerWork: yup.string()
            .required("O nome do trabalho voluntário é obrigatório")
            .min(3, "O nome do trabalho voluntário deve ter pelo menos 3 caracteres")
            .max(100, "O nome do trabalho voluntário deve ter no máximo 100 caracteres"),
    })
})

export const updateAddressVolunteerWorkSchema = yup.object({
    params: yup.object({
        idVolunteerWork: yup.number()
            .required("O id do trabalho voluntário é obrigatório")
            .integer("O id do trabalho voluntário deve ser um número inteiro")
            .positive("O id do trabalho voluntário deve ser um número positivo")
    }),
    body: yup.object({
        address: yup.string()
            .required("O endereço é obrigatório")
            .min(3, "O endereço deve ter pelo menos 3 caracteres")
            .max(100, "O endereço deve ter no máximo 100 caracteres"),
    })
})

export const updateDateVolunteerWorkSchema = yup.object({
    params: yup.object({
        idVolunteerWork: yup.number()
            .required("O id do trabalho voluntário é obrigatório")
            .integer("O id do trabalho voluntário deve ser um número inteiro")
            .positive("O id do trabalho voluntário deve ser um número positivo")
    }),
    body: yup.object({
        dateVolunteerWork: yup.date()
            .required("A data do trabalho voluntário é obrigatória")
            .min(new Date(), "A data do trabalho voluntário deve ser maior que a data atual"),
    })
})

export const updateWorkDescriptionVolunteerWorkSchema = yup.object({
    params: yup.object({
        idVolunteerWork: yup.number()
            .required("O id do trabalho voluntário é obrigatório")
            .integer("O id do trabalho voluntário deve ser um número inteiro")
            .positive("O id do trabalho voluntário deve ser um número positivo")
    }),
    body: yup.object({
        work_description: yup.string()
            .required("A descrição do trabalho voluntário é obrigatória")
            .min(10, "A descrição do trabalho voluntário deve ter pelo menos 10 caracteres")
            .max(500, "A descrição do trabalho voluntário deve ter no máximo 500 caracteres"),
    })
})

export const updateTimeVolunteerWorkSchema = yup.object({
    params: yup.object({
        idVolunteerWork: yup.number()
            .required("O id do trabalho voluntário é obrigatório")
            .integer("O id do trabalho voluntário deve ser um número inteiro")
            .positive("O id do trabalho voluntário deve ser um número positivo")
    }),
    body: yup.object({
        timeVolunteerWork: yup.string()
            .required("O horário do trabalho voluntário é obrigatório")
            .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Formato de hora inválido (HH:MM:SS)"),
    })
})
