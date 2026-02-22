import dotenv from 'dotenv';
import * as yup from 'yup';

dotenv.config();

const envSchema = yup.object({
  NODE_ENV: yup
    .mixed()
    .oneOf(['local', 'test', 'production'])
    .default('production'),
  JWT_SECRET: yup.string().required('A variável JWT_SECRET é obrigatória'),
  PORT: yup.number().default(3001),
  API_KEY_RESEND: yup.string().required('A variável API_KEY_RESEND é obrigatória para o envio de e-mails'),
  MYSQL_ADDON_DB: yup.string().required('A variável MYSQL_ADDON_DB é obrigatória'),
  MYSQL_ADDON_USER: yup.string().required('A variável MYSQL_ADDON_USER é obrigatória'),
  MYSQL_ADDON_PASSWORD: yup.string().required('A variável MYSQL_ADDON_PASSWORD é obrigatória'),
  MYSQL_ADDON_HOST: yup.string().required('A variável MYSQL_ADDON_HOST é obrigatória'),
  MYSQL_ADDON_PORT: yup.number().default(3306),
});

let validatedEnv;

try {
  validatedEnv = envSchema.validateSync(process.env, { abortEarly: false, stripUnknown: true });
  console.log('✅ Variáveis de ambiente validadas com sucesso.');
} catch (error) {
  const messages = error.inner?.map((err) => `   - ${err.message}`).join('\n') ?? error.message;
  // Lança erro (não usa process.exit) para que a Vercel consiga capturar nos logs
  throw new Error(`❌ Variáveis de ambiente inválidas ou ausentes:\n${messages}`);
}

export const env = validatedEnv;
