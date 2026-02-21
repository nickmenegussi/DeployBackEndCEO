import * as yup from 'yup';

export const updateReturnDateSchema = yup.object({
    body: yup.object({
        returnDate: yup.date().required('Data de devolução é obrigatória'),
    }),
});
