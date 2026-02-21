import * as yup from 'yup';

export const createCalendarEventSchema = yup.object({
    body: yup.object({
        title: yup.string().required('Título é obrigatório').max(255),
        description: yup.string().required('Descrição é obrigatória'),
        start: yup.date().required('Data de início é obrigatória'),
        end: yup.date().required('Data de término é obrigatória'),
        dateEvent: yup.date().required('Data do evento é obrigatória'),
        link: yup.string().url('Link inválido').nullable(),
    }),
});

export const updateCalendarEventSchema = yup.object({
    params: yup.object({
        idCalendarEvents: yup.number().integer().positive().required(),
    }),
    body: yup.object({
        title: yup.string().max(255),
        description: yup.string(),
        start: yup.date(),
        end: yup.date(),
        dateEvent: yup.date(),
        link: yup.string().url('Link inválido').nullable(),
    }),
});
