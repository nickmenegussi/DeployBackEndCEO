import * as yup from 'yup';

export const createPostSchema = yup.object({
    body: yup.object({
        content: yup.string().required('Conteúdo do post é obrigatório').min(1),
        Topic_idTopic: yup.number().integer().positive().required('ID do tópico é obrigatório'),
    }),
});

export const updatePostSchema = yup.object({
    body: yup.object({
        content: yup.string().min(1),
    }),
});
