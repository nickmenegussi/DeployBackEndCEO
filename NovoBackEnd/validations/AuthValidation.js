import * as yup from 'yup';

export const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('A senha é obrigatória'),
  }),
});

export const registerSchema = yup.object({
  body: yup.object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
  }),
});
