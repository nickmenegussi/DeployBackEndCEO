import * as yup from 'yup';

export const createFavoriteSchema = yup.object({
    body: yup.object({
        Book_idLibrary: yup.number().integer().positive().required('ID do livro é obrigatório'),
    }),
});

export const createGroupSchema = yup.object({
    body: yup.object({
        nameGroup: yup.string().required('Nome do grupo é obrigatório').max(255),
        TypeGroup: yup.string().oneOf(['ESDE', 'MEDIUNICO', 'EVANGELIZACAO', 'CIEDE'], 'Tipo de grupo inválido').required('Tipo de grupo é obrigatório'),
        descriptionGroup: yup.string().required('Descrição do grupo é obrigatória'),
    }),
});

export const createReviewSocietySchema = yup.object({
    body: yup.object({
        titleReview: yup.string().required('Título da análise é obrigatório').max(255),
        descriptionReview: yup.string().required('Descrição da análise é obrigatória'),
        dateReview: yup.date().required('Data da análise é obrigatória'),
    }),
});

export const createNotificationSchema = yup.object({
    body: yup.object({
        messageNotification: yup.string().required('Mensagem é obrigatória'),
        User_idUser: yup.number().integer().positive().required('ID do usuário é obrigatório'),
        statusNotification: yup.string().oneOf(['read', 'unread'], 'Status inválido'),
    }),
});
