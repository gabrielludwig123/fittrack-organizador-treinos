# FitTrack — Organizador de Treinos

## Sobre o projeto

O FitTrack é um aplicativo mobile desenvolvido para ajudar usuários a organizar e gerenciar seus treinos físicos. O projeto foi criado como atividade acadêmica, utilizando React Native, Expo, Node.js, Express e MySQL.

## Objetivo

Facilitar a organização dos treinos, permitindo cadastrar, consultar, editar e excluir exercícios de forma prática e segura.

## Tecnologias utilizadas

- React Native e Expo
- React Navigation
- JavaScript
- Node.js e Express
- MySQL
- API REST e Fetch API
- JWT (JSON Web Token)
- bcryptjs
- Git e GitHub

## Funcionalidades

- Cadastro de usuários.
- Login com autenticação JWT.
- Proteção de senhas utilizando bcrypt.
- Dois níveis de acesso: usuário e administrador.
- Rotas protegidas por Bearer Token.
- Cadastro, consulta, edição e exclusão de treinos.
- Controle de permissões no backend.
- Logout com retorno à tela de login.

## Telas do aplicativo

**Login e cadastro:** permite criar uma conta e entrar no sistema.

**Home:** apresenta o aplicativo e permite acessar as outras telas.

**Treinos:** permite cadastrar, consultar, editar e excluir treinos.

**Perfil:** apresenta informações do usuário e disponibiliza a opção de logout.

## Banco de dados

Banco: `fittrack`

**Tabela usuarios:** armazena os dados dos usuários, incluindo identificador, nome, e-mail, senha protegida por hash e nível de acesso.

**Tabela treinos:** armazena os treinos cadastrados, incluindo identificador, nome, descrição, categoria, duração e identificador do usuário responsável.

O arquivo `backend/database.sql` contém o script SQL do projeto e deve ser mantido atualizado com a estrutura utilizada.

## Rotas da API

| Método | Rota | Função |
|---|---|---|
| POST | /auth/cadastro | Cadastrar usuário |
| POST | /auth/login | Realizar login |
| GET | /treinos | Consultar treinos |
| POST | /treinos | Cadastrar treino |
| PUT | /treinos/:id | Atualizar treino |
| DELETE | /treinos/:id | Excluir treino |

As rotas de treinos exigem autenticação JWT.

## Níveis de acesso

**Usuário comum:** pode cadastrar treinos e consultar, editar e excluir apenas seus próprios registros.

**Administrador:** pode consultar, editar e excluir treinos de todos os usuários, além de cadastrar seus próprios treinos.

O controle de permissões é realizado no backend.

## Autenticação e segurança

O sistema utiliza bcryptjs para proteger as senhas armazenadas no banco de dados.

Após o login, a API gera um token JWT contendo o identificador e o nível do usuário.

O token é enviado nas requisições protegidas utilizando o cabeçalho `Authorization: Bearer TOKEN`.

O middleware verifica a validade do token antes de permitir o acesso às rotas protegidas.

## Como executar

### 1. Configurar o banco

Instalar o MySQL e executar o script `backend/database.sql`.

### 2. Configurar o backend

Criar um arquivo `.env` dentro da pasta `backend` com as variáveis:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=fittrack
JWT_SECRET=defina_uma_chave_secreta_forte
PORT=3000
```

Não enviar o arquivo `.env` ao GitHub.

### 3. Iniciar o backend

```bash
cd backend
npm install
node server.js
```

### 4. Iniciar o aplicativo

Na pasta principal do aplicativo:

```bash
npm install
npx expo start
```

Configurar o endereço da API em `src/services/api.js` com o IP do computador que executa o backend.

## Evolução do projeto

### Entrega 1 — Estrutura inicial

- Criação do projeto Expo.
- Desenvolvimento das primeiras telas.
- Configuração da navegação.
- Criação do repositório GitHub.

### Entrega 2 — Banco de dados e API

- Criação do banco MySQL.
- Desenvolvimento da API Express.
- Implementação das rotas iniciais.
- Integração do aplicativo com a API.

### Entrega 3 — JWT e CRUD

- Cadastro e login de usuários no backend.
- Senhas protegidas com bcrypt.
- Geração e validação de JWT.
- Implementação dos níveis de acesso.
- Rotas protegidas.
- CRUD completo no backend.

### Entrega 4 — Finalização

- Implementação da interface de cadastro de usuários.
- Implementação das operações de CRUD na tela de treinos.
- Adição do botão de logout.
- Revisão da navegação e da interface.
- Exportação do pacote JavaScript para Android realizada com sucesso.
- Testes funcionais e geração do APK final ainda pendentes de confirmação.

## Testes

O backend foi testado com sucesso nas operações de login, consulta, cadastro, atualização e exclusão de treinos.

A exportação do aplicativo para Android também foi concluída sem erros de empacotamento.

Ainda é necessário validar as funcionalidades no aplicativo em execução, testar os níveis de acesso e confirmar a instalação e o funcionamento do APK final.

## Desenvolvedor

Projeto acadêmico — FitTrack — Organizador de Treinos.

Desenvolvido por Gabriel Ludwig.