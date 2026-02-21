# 🚀 Roadmap de Melhorias e Segurança: Production Ready

Este documento detalha as mudanças arquiteturais e de segurança implementadas para elevar a API do Centro Espírita Online (CEO) de um estado de desenvolvimento para um ambiente de produção robusto, escalável e seguro.

---

## 1. 🛡️ Justificativa Técnica: IDs Sequenciais vs UUID v4

### O Problema: IDs Inteiros (1, 2, 3...)
O uso de chaves primárias sequenciais expõe a API a falhas de segurança conhecidas como **IDOR (Insecure Direct Object Reference)**. 
- **Enumeração:** Um atacante pode facilmente prever o ID do próximo usuário ou registro, permitindo raspagem de dados (scraping) em massa.
- **Vazamento de Métricas:** Através dos IDs, é possível estimar o volume de negócios ou usuários da plataforma.

### A Solução: UUID v4 (Universally Unique Identifier)
Estamos migrando para UUID v4 para identificação pública (URLs e payloads de API).
- **Segurança:** São strings aleatórias de 128 bits, impossíveis de prever.
- **Idempotência:** Facilita a criação de registros em sistemas distribuídos, garantindo que o mesmo ID nunca seja gerado duas vezes, mesmo sem consulta prévia ao banco.
- **Abordagem:** Mantemos o ID Inteiro internamente (como chave estrangeira) para performance de indexação no SQL, mas usamos o UUID para qualquer comunicação externa.

---

## 2. ☁️ Arquitetura Serverless: Connection Pool (Vercel + Clever Cloud)

### O Desafio
A Vercel utiliza **Serverless Functions**, o que significa que cada requisição pode "acordar" uma nova instância da sua API. Se cada instância abrir uma conexão persistente com o MySQL no Clever Cloud sem controle, o limite de conexões do banco (`Too many connections`) será atingido em minutos.

### Ajuste de Connection Pool
Configuramos o Sequelize com um Pool agressivo em `config/sequelize.js`:
- **max: 5**: Limita o número de conexões por instância.
- **idle: 10000**: Fecha conexões inativas após 10 segundos. Isso é crucial para "devolver" a conexão ao banco rapidamente.
- **evict**: O Sequelize limpa conexões "mortas" periodicamente, garantindo que as instâncias da Vercel sempre tenham conexões saudáveis.

---

## 3. 🔐 Segurança de Produção: Variáveis e Criptografia

### Variáveis de Ambiente (.env)
- **Hardcoded Fallbacks:** Removemos todos os fallbacks de segurança no código (ex: `JWT_SECRET || "senhaSecreta"`). Em produção, a API agora trava se as chaves não estiverem configuradas, garantindo que nunca rode desprotegida.
- **Environment Separation:** Recomendamos o uso de segredos diferentes para `development` e `production`.

### Hashes de Senha e OTP
- **Bcrypt (10 Rounds):** Utilizamos um fator de custo balanceado para evitar ataques de força bruta sem sacrificar a latência da API.
- **OTP Hashing:** Códigos de recuperação de senha agora são salvos como hashes. Mesmo que o banco de dados seja comprometido, os códigos de 6 dígitos não podem ser lidos diretamente.

---

## 4. ✅ Validação de Dados (Arquitetura Defensiva)
Implementamos **Yup Validations** em 100% das rotas de escrita. 
- **Objetivo:** Impedir que dados inválidos, maliciosos ou incompletos cheguem à camada de serviço. Isso reduz bugs, evita corrupção de banco de dados e fornece mensagens de erro claras para o desenvolvedor Frontend.

---

## 5. 🛠️ Guia de Manutenção e Backup

### Monitoramento Proativo
- **Endpoint `/health`**: Utilize este endpoint para monitorar a saúde da API. Ele verifica se a conexão com o banco de dados está ativa. Se retornar `503 Service Unavailable`, há um problema de infraestrutura.

### Estratégia de Backup MySQL
Para quem assumir a manutenção, estas são as rotas recomendadas:

#### Backup Automático (Recomendado)
Configure uma **GitHub Action** que executa o comando `mysqldump` diariamente e salva o arquivo em um storage externo (AWS S3 ou alternativo).
```bash
mysqldump -h host_clever -u user -p password database_name > backup_$(date +%F).sql
```

#### Backup Manual
Periodicamente, utilize o painel do Clever Cloud para exportar o dump ou gere manualmente via CLI para garantir que você possui uma cópia local "fria" (offline) dos dados sensíveis.

---

**Status Atual:** Production Ready 🚀
**Autor:** Antigravity (IA Architect)
**Data:** Fevereiro de 2026
