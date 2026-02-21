# 🛡️ Relatório de Auditoria de Segurança (AppSec) - NovoBackEnd

**Auditor:** Especialista em AppSec / Sr. Software Engineer
**Data:** 13 de Fevereiro de 2026
**Foco:** Vazamento de Dados e Exposição de Informações Sensíveis

---

## 1. 🔍 Análise de Vulnerabilidades

### 🚨 [CRÍTICO] Exposição de Entidades (Entity Exposure)
*   **Localização:** `UserRepository.findById` e `UserService.getByIdService`.
*   **Falha:** O método `findById` no repositório não exclui o campo `password`. No `UserService.js`, o objeto `existsUser` é retornado integralmente para o Controller.
*   **Impacto:** Um atacante ou usuário autenticado pode obter o hash da senha de outros usuários ao consultar o perfil, facilitando ataques de força bruta offline ou quebra de hash.

### 🔴 [ALTO] Mass Assignment (Atribuição em Massa)
*   **Localização:** `UserController.registerController`.
*   **Falha:** Embora não use o operador spread direto do `req.body`, o código extrai `status_permission` diretamente do corpo da requisição (JSON enviado pelo cliente) e o repassa para o serviço de registro.
*   **Impacto:** Qualquer pessoa pode se registrar na plataforma enviando `"status_permission": "SuperAdmin"` no JSON e ganhar privilégios totais imediatamente.

### 🟡 [MÉDIO] User Enumeration (Enumeração de Usuários)
*   **Localização:** `UserService.register`.
*   **Falha:** A mensagem de erro ao tentar cadastrar um email existente é `"Usuário já cadastrado!"`.
*   **Impacto:** Permite que um atacante valide se um e-mail específico (ex: um CEO ou alvo específico) possui conta no sistema através de tentativas de registro ou esqueci minha senha.
*   **Observação:** O serviço de Login (`AuthService.loginService`) está correto ao usar uma mensagem genérica.

### ✅ [BAIXO] Leak de Infraestrutura & Ambiente
*   **Localização:** `errorHandler.js` e `config/env.js`.
*   **Status:** **SEGURO.**
*   **Análise:** O `errorHandler` oculta Stack Traces em produção, e o `config/env.js` garante que a aplicação não suba em estado inconsistente.

---

## 🛠️ Sugestões de Mitigação (Código)

### Correção 1: Proteção de Dados Sensíveis no Repositório
Alterar `UserRepository.js` para nunca retornar a senha, a menos que seja explicitamente solicitado (ex: no login).

```javascript
// repository/UserRepository.js
findById(id) {
    return UserModel.findByPk(id, {
        attributes: { exclude: ['password'] } // Proteção global
    });
}
```

### Correção 2: Blindagem contra Mass Assignment
Remover a possibilidade de definir permissões no registro público.

```javascript
// controller/UserController.js
export async function registerController(req, res) {
    // ...
    const { nameUser, email, password } = req.body; // Remove status_permission daqui
    
    const user = await register({
        nameUser,
        email,
        password,
        status_permission: 'User', // Fixa o valor padrão por segurança
        image_profile: imageUrl,
    });
    // ...
}
```

### Correção 3: Padronização de DTO no Login
Garantir que o objeto retornado no login seja filtrado.

```javascript
// services/AuthService.js
return {
    user: {
        idUser: userResult.idUser,
        nameUser: userResult.nameUser,
        email: userResult.email,
        role: userResult.status_permission
    },
    token: token
}
```

---

## 📈 Conclusão
A aplicação possui boas bases (Helmet, Rate Limit, Env Validation), mas falha em pontos capitais de **Controle de Acesso** e **Privacidade**. A aplicação das correções acima elevará o nível de maturidade de segurança significativamente.
