import { jest } from '@jest/globals';

// 1. Definir os mocks ANTES de qualquer importação dos arquivos do projeto
jest.unstable_mockModule('../repository/UserRepository.js', () => ({
  UserRepository: {
    findByEmail: jest.fn(),
  },
}));

jest.unstable_mockModule('../services/EmailService.js', () => ({
  default: jest.fn(),
  sendLibraryReceiptEmail: jest.fn(),
}));

jest.unstable_mockModule('bcrypt', () => ({
  default: {
    compare: jest.fn(),
    hash: jest.fn(),
  },
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn(),
  },
}));

jest.unstable_mockModule('../errors/AppError.js', () => ({
  default: (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  },
}));

// 2. Importar as dependências e o serviço DINAMICAMENTE
const { UserRepository } = await import('../repository/UserRepository.js');
const { loginService } = await import('../services/AuthService.js');
const bcrypt = (await import('bcrypt')).default;
const jwt = (await import('jsonwebtoken')).default;

describe('AuthService - loginService (Simulação de Teste de Mesa)', () => {
  const mockUser = {
    idUser: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
    status_permission: 'admin',
    nameUser: 'Test User'
  };

  // antes de cada teste ele limpa os mocks
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('Cenário 1: Deve lançar erro se email ou senha não forem fornecidos (Campos Vazios)', async () => {
    await expect(loginService('', '123456')).rejects.toThrow('Preencha todos os campos de login!');
    await expect(loginService('test@example.com', '')).rejects.toThrow('Preencha todos os campos de login!');
  });

  it('Cenário 2: Deve lançar erro se o usuário não for encontrado no banco', async () => {
    UserRepository.findByEmail.mockResolvedValue(null);
    await expect(loginService('inexistente@test.com', 'password')).rejects.toThrow('Usuário não existe.');
  });

  it('Cenário 3: Deve lançar erro se a senha estiver incorreta', async () => {
    // mockedResolvedValue é para simular o retorno do banco de dados
    UserRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);
    await expect(loginService('test@example.com', 'errada')).rejects.toThrow('Credenciais inválidas');
  });

  it('Cenário 4: Deve retornar sucesso com token se as credenciais forem válidas', async () => {
    UserRepository.findByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token-abc');

    const result = await loginService('test@example.com', 'certa');

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token', 'token-abc');
    expect(result.user.idUser).toBe(1);
  });
});
