import * as yup from 'yup';

export const createCartSchema = yup.object({
    body: yup.object({
        Book_idLibrary: yup.number().integer().positive().required('ID do livro é obrigatório'),
        quantity: yup.number().integer().positive().required('Quantidade é obrigatória'),
    }),
});

export const updateQuantitySchema = yup.object({
    body: yup.object({
        idCart: yup.number().integer().positive().required('ID do carrinho é obrigatório'),
        quantity: yup.number().integer().positive().required('Quantidade é obrigatória'),
    }),
});
