#  MedClinic API

API REST desenvolvida em **Node.js** com **TypeScript**, focada em segurança, arquitetura em camadas (MVC), autenticação via **JWT** e controle de acesso baseado em papéis (**RBAC**).

Este projeto corresponde à **Etapa 1** do sistema MedClinic, cujo escopo é exclusivamente a construção da base de autenticação e autorização de usuários.

---

##  Tecnologias Utilizadas

- **Node.js** e **Express** — Ambiente de execução e framework HTTP.
- **TypeScript** — Tipagem estática e recursos modernos de POO.
- **TypeORM** e **PostgreSQL** — ORM e banco de dados relacional.
- **JWT (JSON Web Token)** — Autenticação stateless.
- **Bcryptjs** — Criptografia de senhas (hash).
- **Git** e **GitHub** — Versionamento com GitFlow.

---

##  Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL em execução
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/fernandopereira-tech/medclinic-api
cd medclinic-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=medclinic_db
JWT_SECRET=sua_chave_secreta_super_segura
PORT=3000
```

### 4. Crie o banco de dados e rode as migrations

Crie um banco de dados vazio chamado `medclinic_db` no seu PostgreSQL.

Em seguida, rode as migrations do TypeORM para criar a estrutura da tabela de usuários:

```bash
npm run migration:run
```

### 5. Execute a aplicação

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

---

##  Scripts Disponíveis

| Script | Descrição |
| :--- | :--- |
| `npm run dev` | Executa a aplicação em modo de desenvolvimento |
| `npm run build` | Compila o TypeScript para JavaScript |
| `npm start` | Executa a versão compilada |
| `npm run migration:run` | Roda as migrations pendentes |
| `npm run migration:generate` | Gera uma nova migration |
| `npm run migration:revert` | Reverte a última migration |

---

##  Documentação dos Endpoints

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| **POST** | `/users` | Cadastra um novo usuário (admin ou attendant) | Público |
| **POST** | `/auth/login` | Realiza o login e retorna o Token JWT | Público |
| **GET** | `/users/me` | Retorna os dados do usuário autenticado | Protegido (Bearer Token) |
| **GET** | `/admin/ping` | Rota de teste exclusiva para administradores | Restrito (admin) |

### Exemplos de Requisição

**Cadastro de Usuário (POST /users)**

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senhaSegura123",
  "perfil": "attendant"
}
```

**Login (POST /auth/login)**

```json
{
  "email": "joao@email.com",
  "senha": "senhaSegura123"
}
```

**Resposta do Login**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

##  Perfis de Acesso & Segurança (RBAC)

- **Autenticação**: O sistema valida o token enviado no header `Authorization: Bearer <token>`.
- **Autorização (roleMiddleware)**:
  - **`attendant`**: Acesso apenas às rotas gerais e de perfil próprio.
  - **`admin`**: Acesso total, incluindo rotas administrativas restritas (como `/admin/ping`).
- **Respostas de Erro**:
  - `401 Unauthorized`: Token ausente, inválido ou expirado.
  - `403 Forbidden`: Usuário autenticado sem permissão para o recurso.
  - `409 Conflict`: E-mail já cadastrado.

---

##  Arquitetura do Projeto

O projeto segue o padrão **MVC em camadas**, promovendo separação de responsabilidades e baixo acoplamento:

```
src/
├── controllers/      # Recebe requisições HTTP e retorna respostas
├── entities/         # Modelagem das entidades (User)
├── middlewares/      # Autenticação (JWT) e Autorização (RBAC)
├── routes/           # Definição dos endpoints
├── database/         # Configuração do DataSource do TypeORM e migrations
├── utils/            # Funções auxiliares (hash, JWT, AppError, asyncHandler)
├── @types/           # Tipagem customizada do Express
└── server.ts         # Ponto de entrada da aplicação
```

---

##  Observações

- Esta entrega compreende **exclusivamente** a base de autenticação e autorização.
- Funcionalidades de gerenciamento de especialidades, médicos, pacientes e consultas serão implementadas em etapas futuras.
- O projeto não inclui testes automatizados nem documentação Swagger nesta fase.

---

**Desenvolvido por [Fernando Pereira](https://github.com/fernandopereira-tech)**