# 🚀 CEO Backend API

Bem-vindo à documentação oficial do **CEO Backend API**. Este projeto serve como a espinha dorsal para a plataforma **Centro Espírita Online**, fornecendo uma infraestrutura robusta, escalável e segura para gerenciamento de palestras, usuários, biblioteca, grupos de estudo e funcionalidades sociais.

O sistema foi arquitetado utilizando **Node.js** com **Express**, adotando padrões de design modernos e utilizando **Sequelize** como ORM para garantir integridade e eficiência na manipulação de dados.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração de Ambiente (.env)](#configuração-de-ambiente-env)
- [Instalação e Execução](#instalação-e-execução)
- [Endpoints da API](#endpoints-da-api)
- [Modelagem de Dados](#modelagem-de-dados)
- [Autenticação e Segurança](#autenticação-e-segurança)

---

## 🔍 Visão Geral

O **CEO Backend API** gerencia todo o fluxo de dados da aplicação, incluindo:
- **Autenticação**: Login seguro via JWT e verificação de duas etapas (OTP) via e-mail.
- **Gestão de Conteúdo**: Palestras, Postagens, Comentários e Avaliações.
- **Biblioteca**: Acervo de livros, Reservas e Carrinho de empréstimos.
- **Social**: Funcionalidades de Seguir e Favoritar.
- **Notificações**: Sistema de alertas para os usuários.
- **Voluntariado**: Gestão de oportunidades e inscrições de voluntários.

O projeto segue uma arquitetura em camadas (Controller, Service, Repository) para garantir a separação de responsabilidades e facilitar a manutenção.

---

## 🛠 Tecnologias Utilizadas

O stack tecnológico foi escolhido para oferecer performance e produtividade:

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework Web**: [Express.js](https://expressjs.com/)
- **ORM**: [Sequelize](https://sequelize.org/) (MySQL Dialect)
- **Banco de Dados**: MySQL
- **Autenticação**:
  - [JSON Web Token (JWT)](https://jwt.io/) para sessões stateless.
  - [Bcrypt](https://www.npmjs.com/package/bcrypt) para hashing de senhas.
  - [OTP Generator](https://www.npmjs.com/package/otp-generator) para códigos de verificação.
- **E-mails**: [Resend](https://resend.com/) para envio transacional de e-mails.
- **Utilitários**:
  - [Dotenv](https://www.npmjs.com/package/dotenv) para variáveis de ambiente.
  - [Nodemon](https://nodemon.io/) para hot-reloading em desenvolvimento.

---

## 📂 Estrutura do Projeto

O código fonte está localizado no diretório `NovoBackEnd`. A estrutura segue as melhores práticas de organização:

```bash
NovoBackEnd
├── config/         # Configuração do banco de dados (Sequelize)
├── controller/     # Controladores das rotas (Lógica de entrada/saída)
├── errors/         # Tratamento de erros personalizados (AppError)
├── middleware/     # Middlewares (Auth, Error Handler, etc.)
├── models/         # Definição dos modelos do banco de dados (Schema)
├── repository/     # Camada de acesso a dados (Consultas diretas ao DB)
├── routes/         # Definição das rotas da API
├── services/       # Regras de negócio complexas
└── index.js        # Ponto de entrada da aplicação
```

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (v18 ou superior recomendado)
- **npm** (Gerenciador de pacotes)
- **MySQL** (Servidor de banco de dados rodando localmente ou remotamente)

---

## 🔐 Configuração de Ambiente (.env)

Crie um arquivo `.env` dentro da pasta `NovoBackEnd/`. Este arquivo deve conter as chaves de configuração sensíveis. Utilize o modelo abaixo:

```ini
# Configurações do Servidor
PORT=3001
NODE_ENV=development

# Configurações do Banco de Dados (MySQL)
DB_NAME=seu_nome_do_banco
DB_USER=seu_usuario
DB_PASS=sua_senha
HOST=localhost
DB_PORT=3306

# Segurança (JWT)
JWT_SECRET=sua_chave_secreta_super_segura

# Serviço de E-mail (Resend)
API_KEY_RESEND=re_123456789_seu_api_key_aqui
```

> **Nota**: Nunca commite o arquivo `.env` no controle de versão.

---

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório** (se aplicável):
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Acesse a pasta do projeto**:
   ```bash
   cd NovoBackEnd
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Inicie o servidor em modo de desenvolvimento**:
   ```bash
   npm start
   ```
   *O comando `npm start` executa o `nodemon index.js`.*

5. **Teste a API**:
   O servidor iniciará (padrão porta 3001). Acesse `http://localhost:3001/` para verificar se está rodando.

---

## 📡 Endpoints da API

Abaixo estão listados os principais endpoints disponíveis. (A documentação completa pode ser expandida conforme o desenvolvimento avança).

### Autenticação (`/auth`)
- **POST** `/auth/login` - Realiza o login e retorna o Token JWT.
- **POST** `/auth/code` - Gera/Envia código OTP.
- **POST** `/auth/verify` - Verifica o código OTP.

### Palestras (`/lectures`)
*Requer Autenticação (Bearer Token)*
- **GET** `/lectures` - Lista todas as palestras.
- **GET** `/lectures/:idLecture` - Detalhes de uma palestra específica.
- **POST** `/lectures` - Cadastra uma nova palestra.

---

## 🗃 Modelagem de Dados

O sistema possui uma modelagem rica para suportar as operações complexas. Alguns dos principais modelos incluem:

- **Usuários e Acesso**: `UserModel`, `OtpModel`
- **Conteúdo Educacional**: `LectureModel`, `TopicModel`, `CategoryModel`
- **Interação Social**: `PostModel`, `CommentModel`, `LikeModel`, `FavoriteModel`, `ReviewModel`
- **Biblioteca**: `LibraryModel`, `ReserveModel`, `CartModel`
- **Gestão**: `VolunteerWorkModel`, `NotificationModel`, `FacilitatorModel`, `GroupOfStudy`

---

## 🛡 Autenticação e Segurança

O sistema utiliza **JWT (JSON Web Tokens)** para proteger rotas privadas.
- O token deve ser enviado no cabeçalho `Authorization` de cada requisição protegida: `Bearer <seu_token>`.
- Senhas são sempre armazenadas de forma criptografada utilizando **Bcrypt**.
- O fluxo de login suporta verificação de OTP para maior segurança.

---

*Documentação gerada automaticamente por Antigravity. Última atualização em Fevereiro de 2026.*