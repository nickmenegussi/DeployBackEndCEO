# 🚀 CEO Backend: Roadmap de Melhorias e Segurança (Production Ready)

Este documento detalha a evolução técnica da API, justificando as escolhas arquiteturais e de segurança feitas para transformar um protótipo de desenvolvimento em um sistema pronto para produção.

---

## 1. 🆔 Justificativa Técnica: Migração para UUID v4

### Por que sair do ID Inteiro Automático?
Historicamente, usamos inteiros sequenciais (1, 2, 3...) por simplicidade. No entanto, para produção, isso apresenta dois riscos críticos:
- **Scraping e Enumeração:** Um atacante pode prever IDs de usuários ou registros apenas somando +1. Isso facilita o vazamento de dados em massa através de ataques de **IDOR** (Insecure Direct Object Reference).
- **Vazamento de Métricas:** IDs sequenciais revelam o tamanho da sua base de dados para concorrentes.

### A Abordagem UUID (Universally Unique Identifier)
- **Segurança:** O UUID v4 é uma string aleatória de 128 bits. É matematicamente impossível prever o próximo ID.
- **Idempotência:** Facilita a sincronização entre sistemas distribuídos, pois o ID pode ser gerado no cliente ou no servidor sem risco de colisão.
- **Performance:** Mantemos o ID Inteiro como chave primária interna (PK) no MySQL para performance de indexação, mas usamos o UUID como identificador público nas rotas da API.

---

## 2. ☁️ Arquitetura Serverless: Desafios do MySQL na Vercel

### O Problema: Esgotamento de Conexões
A Vercel escala sua API horizontalmente com instâncias efêmeras. Sem um **Connection Pool** ajustado, cada nova instância abre uma conexão persistente com o Clever Cloud. Com poucos usuários simultâneos, o banco atingiria o erro `Too many connections`.

### Solução: Connection Pool Otimizado
Configuramos o Sequelize (`config/sequelize.js`) especificamente para o ciclo de vida Serverless:
- **max: 5**: Limita o impacto de cada instância no banco.
- **idle: 10000**: Força o fechamento de conexões inativas após 10 segundos. Isso permite que a conexão "volte para a prateleira" do Clever Cloud rapidamente para ser usada por outra requisição.
- **acquire: 30000**: Garante que a aplicação aguarde um tempo justo antes de falhar por falta de conexão disponível.

---

## 3. 🔐 Segurança de Produção: Melhores Práticas

### Variáveis de Ambiente e Secrets
- **Remoção de Fallbacks:** O código foi limpo para não aceitar valores padrão para chaves sensíveis (ex: `JWT_SECRET`). Se a variável não existir no ambiente, a API trava, impedindo que rode em "modo inseguro" por engano.
- **Segurança de Hashes:** 
    - **Passwords:** Uso de Bcrypt com 10 rounds para proteção contra força bruta.
    - **OTP:** Implementamos o hashing de códigos OTP. Mesmo que o banco de dados seja exposto, os códigos de recuperação de senha não podem ser lidos por terceiros.

---

## 4. ✅ Validação e Integridade (Yup)
Implementamos uma camada de validação global utilizando a biblioteca **Yup**. 
- **Por quê?** Protegemos o banco de dados de dados inconsistentes ou maliciosos antes mesmo de chegarem à lógica de negócio. Isso garante que as Regras de Negócio operem sempre sobre dados limpos e confiáveis.

---

## 5. 🛠️ Guia de Manutenção e Backups (MySQL)

Para garantir a continuidade do sistema, siga estas diretrizes:

### Monitoramento de Saúde
Acesse periodicamente o endpoint `/health` para verificar a conectividade real entre a Vercel e o Clever Cloud.

### Estratégia de Backup
- **Automático:** Utilize ferramentas como o **Clever Cloud Addon Backups** ou configure uma **Cron Job** externa que execute o comando `mysqldump` e envie o arquivo para um bucket seguro (ex: AWS S3).
- **Manual (Emergencial):**
  ```bash
  mysqldump -h <host_clever> -u <user> -p <database> > backup_$(date +%d-%m-%Y).sql
  ```
- **Frequência:** Recomendamos backups diários para produção e retenção de pelo menos 7 dias.

---

**Objetivo Final:** Entregar uma API resiliente, onde os dados sensíveis nunca sejam expostos via URL e o sistema seja capaz de lidar com picos de tráfego sem derrubar a infraestrutura de banco de dados.
