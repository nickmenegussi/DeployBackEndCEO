import * as yup from 'yup';

export const createReserveSchema = yup.object({
    body: yup.object({
        Book_idLibrary: yup.number().integer().positive().required('ID do livro é obrigatório'),
    }),
});
