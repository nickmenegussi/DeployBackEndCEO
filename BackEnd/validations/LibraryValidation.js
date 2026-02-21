import * as yup from 'yup';

export const createBookSchema = yup.object({
    body: yup.object({
        nameBook: yup.string().required('Nome do livro é obrigatório').max(255),
        author: yup.string().required('Autor é obrigatório').max(255),
        description: yup.string().required('Descrição é obrigatória'),
        publisher: yup.string().required('Editora é obrigatória').max(255),
        year: yup.number().integer().required('Ano é obrigatório'),
        language: yup.string().required('Idioma é obrigatório').max(100),
        pages: yup.number().integer().positive().required('Número de páginas é obrigatório'),
        stock: yup.number().integer().min(0).required('Estoque é obrigatório'),
    }),
});

export const updateBookSchema = yup.object({
    params: yup.object({
        idLibrary: yup.number().integer().positive().required(),
    }),
    body: yup.object({
        nameBook: yup.string().max(255),
        author: yup.string().max(255),
        description: yup.string(),
        publisher: yup.string().max(255),
        year: yup.number().integer(),
        language: yup.string().max(100),
        pages: yup.number().integer().positive(),
        stock: yup.number().integer().min(0),
    }),
});
