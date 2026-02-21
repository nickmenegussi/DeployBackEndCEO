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
      .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
      .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial')
      .max(12, 'A senha deve conter o máximo de 12 caracteres')
      .required('A senha é obrigatória'),
  }),
});

export const registerSchema = yup.object({
  body: yup.object({
    nameUser: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
  }),
});

export const verificationOtSchema = yup.object({
  body: yup.object({
    email: yup.string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
    otp: yup.string()
    .required('O OTP é obrigatório')
    .length(6, 'O OTP deve ter 6 dígitos')
  })
})

export const generateOtpSchema = yup.object({
  body: yup.object({
    email: yup.string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),

  })
})

// export const resetPasswordSchema = yup.object({
//   body: yup.object({
//     email: yup.string()
//     .required("O e-mail é obrigatório")
//     .email("E-mail inválido"),
//     otp: yup.string()
//     .required('O OTP é obrigatório')
//     .length(6, 'O OTP deve ter 6 dígitos'),
//     password: yup.string()
//     .min(6, 'A senha deve ter pelo menos 6 caracteres')
//     .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
//     .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
//     .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
//     .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial')
//     .max(12, 'A senha deve conter o máximo de 12 caracteres')
//     .required('A senha é obrigatória'),
//   })
// })