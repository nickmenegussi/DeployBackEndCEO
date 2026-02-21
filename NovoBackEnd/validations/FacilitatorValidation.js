import * as yup from 'yup';

export const createFacilitatorSchema = yup.object({
    body: yup.object({
        User_idUser: yup.number().integer().positive().required('ID do usuário é obrigatório'),
        grupo: yup.string().oneOf(['ESDE', 'CIEDE', 'MEDIUNICO'], 'Grupo inválido').required('Grupo é obrigatório'),
        bio: yup.string().max(500),
    }),
});
