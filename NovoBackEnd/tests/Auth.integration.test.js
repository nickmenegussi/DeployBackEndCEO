import { jest } from '@jest/globals';
import { Sequelize } from 'sequelize';

// 1. Mockamos o EmailService para evitar erro do Resend
jest.unstable_mockModule('../services/EmailService.js', () => ({
  default: jest.fn(),
  sendLibraryReceiptEmail: jest.fn(),
}));

// 2. Criamos uma instância do Sequelize com SQLite em MEMÓRIA
// Usando 'sqlite::memory:' ou um objeto de config para evitar avisos
const sequelizeTest = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

// 3. Mockamos o arquivo de configuração do Sequelize REAL para usar o de TESTE
jest.unstable_mockModule('../config/sequelize.js', () => ({
  default: sequelizeTest,
  connectedDataBase: jest.fn(),
}));

// 4. Importamos o modelo e o serviço DINAMICAMENTE
// Corrigido: UserModel é um export NOMEADO ({ UserModel })
const { UserModel } = await import('../models/UserModel.js');
const { loginService } = await import('../services/AuthService.js');
const { default: bcrypt } = await import('bcrypt');

describe('Auth - Teste com SQLite em MEMÓRIA (Realista)', () => {
  
  beforeAll(async () => {
    // Sincroniza o banco de dados (cria as tabelas na memória)
    // O mock do sequelize.js garante que o UserModel use o sequelizeTest
    await sequelizeTest.sync({ force: true });
  });

  afterAll(async () => {
    await sequelizeTest.close();
  });

  it('Deve funcionar o login com um usuário REALMENTE gravado no SQLite', async () => {
    const hashedPassword = await bcrypt.hash('senha123', 10);
    
    // Agora usando UserModel corretamente
    await UserModel.create({
      nameUser: 'Nicolas',
      email: 'nicolas-sqlite@teste.com',
      password: hashedPassword,
      status_permission: 'admin'
    });

    const result = await loginService('nicolas-sqlite@teste.com', 'senha123');

    expect(result).toHaveProperty('token');
    expect(result.user.nameUser).toBe('Nicolas');
  });

  it('Deve falhar se a senha estiver errada no SQLite', async () => {
    await expect(loginService('nicolas-sqlite@teste.com', 'senha_errada'))
      .rejects.toThrow('Credenciais inválidas');
  });
});
