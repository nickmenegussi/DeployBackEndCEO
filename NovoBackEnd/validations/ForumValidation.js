import * as yup from 'yup';

export const createCategorySchema = yup.object({
    body: yup.object({
        nameCategory: yup.string().required('Nome da categoria é obrigatório').max(100),
    }),
});

export const createTopicSchema = yup.object({
    body: yup.object({
        titleTopic: yup.string().required('Título do tópico é obrigatório').max(255),
        descriptionTopic: yup.string().required('Descrição do tópico é obrigatória'),
        Category_id: yup.number().integer().positive().required('ID da categoria é obrigatório'),
    }),
});

export const createCommentSchema = yup.object({
    body: yup.object({
        contentComment: yup.string().required('Conteúdo do comentário é obrigatório'),
    }),
});
