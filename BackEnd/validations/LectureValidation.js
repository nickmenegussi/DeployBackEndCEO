import * as yup from 'yup';

export const createLectureSchema = yup.object({
    body: yup.object({
        nameLecture: yup.string().required('Nome da palestra é obrigatório').max(255),
        description: yup.string().required('Descrição é obrigatória'),
        dateLecture: yup.date().required('Data da palestra é obrigatória'),
        timeLecture: yup.string().required('Hora da palestra é obrigatória').matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, 'Formato de hora inválido (HH:MM)'),
        link_url: yup.string().url('Link inválido').nullable(),
        video_url: yup.string().url('Link do vídeo inválido').nullable(),
    }),
});
