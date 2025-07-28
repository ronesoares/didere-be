# APIs e Endpoints da Aplicação Didere

Com base nos requisitos funcionais e na arquitetura do sistema, as seguintes APIs e endpoints serão implementados:

## 1. APIs Públicas

### 1.1. Health Check
- **GET** `/health`
  - **Descrição**: Verifica a saúde da aplicação.
  - **Resposta**: `200 OK` se a aplicação estiver funcionando.

### 1.2. Busca de Propriedades
- **GET** `/properties`
  - **Descrição**: Retorna uma lista de propriedades disponíveis, com opções de filtro.
  - **Parâmetros de Query**: `typeActivity`, `state`, `city`, `neighborhood`, `minPrice`, `maxPrice`, `minArea`, `maxArea`, `features`.
  - **Resposta**: `200 OK` com lista de propriedades.

### 1.3. Detalhes da Propriedade
- **GET** `/properties/:id`
  - **Descrição**: Retorna os detalhes de uma propriedade específica.
  - **Parâmetros de Path**: `id` (ID da propriedade).
  - **Resposta**: `200 OK` com detalhes da propriedade.

### 1.4. Formulário de Interesse
- **POST** `/interest-form`
  - **Descrição**: Envia um formulário de interesse de locatário.
  - **Corpo da Requisição**: `name`, `phoneNumber`, `email`, `messageDetail`, `idProperty` (opcional).
  - **Resposta**: `201 Created`.

## 2. APIs Autenticadas (Requer JWT)

### 2.1. Autenticação
- **POST** `/auth/login`
  - **Descrição**: Realiza o login do usuário e retorna um JWT.
  - **Corpo da Requisição**: `login`, `password`.
  - **Resposta**: `200 OK` com `accessToken`.

- **POST** `/auth/google`
  - **Descrição**: Autentica o usuário via Google OAuth.
  - **Corpo da Requisição**: `idTokenGoogle`.
  - **Resposta**: `200 OK` com `accessToken`.

### 2.2. Gestão de Usuários (Módulo Admin)
- **GET** `/admin/users`
  - **Descrição**: Lista todos os usuários.
  - **Resposta**: `200 OK` com lista de usuários.

- **GET** `/admin/users/:id`
  - **Descrição**: Retorna os detalhes de um usuário específico.
  - **Resposta**: `200 OK` com detalhes do usuário.

- **POST** `/admin/users`
  - **Descrição**: Cria um novo usuário.
  - **Corpo da Requisição**: `name`, `login`, `password`, `idProfile`, `idOwner`, etc.
  - **Resposta**: `201 Created`.

- **PUT** `/admin/users/:id`
  - **Descrição**: Atualiza um usuário existente.
  - **Corpo da Requisição**: Campos a serem atualizados.
  - **Resposta**: `200 OK`.

- **DELETE** `/admin/users/:id`
  - **Descrição**: Exclui um usuário.
  - **Resposta**: `204 No Content`.

### 2.3. Gestão de Perfis (Módulo Admin)
- **GET** `/admin/profiles`
  - **Descrição**: Lista todos os perfis.
  - **Resposta**: `200 OK` com lista de perfis.

- **POST** `/admin/profiles`
  - **Descrição**: Cria um novo perfil.
  - **Corpo da Requisição**: `name`, `idOwner`, etc.
  - **Resposta**: `201 Created`.

- **PUT** `/admin/profiles/:id`
  - **Descrição**: Atualiza um perfil existente.
  - **Resposta**: `200 OK`.

- **DELETE** `/admin/profiles/:id`
  - **Descrição**: Exclui um perfil.
  - **Resposta**: `204 No Content`.

### 2.4. Gestão de Locadores (Módulo Locador)
- **GET** `/locators`
  - **Descrição**: Lista todos os locadores (para administradores) ou o locador logado.
  - **Resposta**: `200 OK` com lista de locadores.

- **POST** `/locators`
  - **Descrição**: Cria um novo locador.
  - **Corpo da Requisição**: `name`, `email`, `phoneOption1`, etc.
  - **Resposta**: `201 Created`.

- **PUT** `/locators/:id`
  - **Descrição**: Atualiza um locador existente.
  - **Resposta**: `200 OK`.

- **DELETE** `/locators/:id`
  - **Descrição**: Exclui um locador.
  - **Resposta**: `204 No Content`.

### 2.5. Gestão de Propriedades (Módulo Propriedade)
- **GET** `/properties/my`
  - **Descrição**: Lista as propriedades do locador logado.
  - **Resposta**: `200 OK` com lista de propriedades.

- **POST** `/properties`
  - **Descrição**: Cria uma nova propriedade.
  - **Corpo da Requisição**: `idLocator`, `title`, `description`, `idAddress`, `height`, `width`, `depth`, `value`, etc.
  - **Resposta**: `201 Created`.

- **PUT** `/properties/:id`
  - **Descrição**: Atualiza uma propriedade existente.
  - **Resposta**: `200 OK`.

- **DELETE** `/properties/:id`
  - **Descrição**: Exclui uma propriedade.
  - **Resposta**: `204 No Content`.

### 2.6. Gestão de Arquivos (Módulo Arquivos)
- **POST** `/files/upload`
  - **Descrição**: Realiza o upload de um arquivo para o FTP e registra no banco de dados.
  - **Corpo da Requisição**: `file` (multipart/form-data), `idModule`, `idKeyModule`, `idOwner`, `idSystem`, `idCreationUser`.
  - **Resposta**: `201 Created` com metadados do arquivo.

- **GET** `/files/download/:id`
  - **Descrição**: Realiza o download de um arquivo.
  - **Parâmetros de Path**: `id` (ID do arquivo).
  - **Resposta**: `200 OK` com o arquivo para download.

- **DELETE** `/files/:id`
  - **Descrição**: Exclui um arquivo do FTP e do banco de dados.
  - **Resposta**: `204 No Content`.

### 2.7. Gestão de Parâmetros de Sistema (Módulo Admin)
- **GET** `/admin/system-parameters`
  - **Descrição**: Lista todos os parâmetros de sistema.
  - **Resposta**: `200 OK` com lista de parâmetros.

- **PUT** `/admin/system-parameters/:id`
  - **Descrição**: Atualiza um parâmetro de sistema.
  - **Resposta**: `200 OK`.

## 3. Considerações Adicionais

- **Validação**: Todos os DTOs de entrada para as APIs devem ser validados usando Joi, conforme as especificações dos schemas SQL.
- **Swagger**: Todas as APIs devem ser documentadas automaticamente via Swagger.
- **Tratamento de Erros**: Respostas de erro padronizadas para falhas de validação, autenticação, autorização e erros internos do servidor.
- **Segurança**: Implementação de middlewares para JWT, CORS, e proteção contra ataques comuns.

