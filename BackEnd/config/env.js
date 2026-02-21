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
  DB_NAME: yup.string().required('A variável DB_NAME é obrigatória'),
  DB_USER: yup.string().required('A variável DB_USER é obrigatória'),
  DB_PASS: yup.string().required('A variável DB_PASS é obrigatória'),
  HOST: yup.string().required('A variável HOST (host do banco) é obrigatória'),
  DB_PORT: yup.number().default(3306),
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
