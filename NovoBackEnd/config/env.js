import dotenv from 'dotenv';
import * as yup from 'yup';

dotenv.config();

const envSchema = yup.object({
  NODE_ENV: yup.mixed().oneOf(['local', 'test', 'production']).required('A variável NODE_ENV é obrigatória no .env'),
  JWT_SECRET: yup.string().required('A variável JWT_SECRET é obrigatória no .env'),
  PORT: yup.number().default(3001),
  API_KEY_RESEND: yup.string().required('A variável API_KEY_RESEND é obrigatória para o envio de e-mails'),
  // Adicione outras variáveis aqui conforme o projeto crescer
});

let validatedEnv;

try {
  validatedEnv = envSchema.validateSync(process.env, { abortEarly: false, stripUnknown: true });
  console.log('✅ Variáveis de ambiente validadas com sucesso.');
} catch (error) {
  console.error('❌ Erro na validação do .env:');
  error.inner.forEach((err) => console.error(`   - ${err.message}`));
  process.exit(1); // Para o processo se o .env estiver errado
}

export const env = validatedEnv;
