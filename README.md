# FitTrack — Organizador de Treinos

## Sobre o projeto

O FitTrack é um aplicativo mobile desenvolvido para ajudar os usuários a organizar e acompanhar seus treinos físicos de maneira simples e prática.

O projeto foi desenvolvido como atividade acadêmica, utilizando React Native, Expo, Node.js, Express e MySQL.

## Objetivo

Facilitar a organização dos exercícios físicos, permitindo consultar treinos e, futuramente, cadastrar, editar e excluir treinos personalizados.

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- Node.js
- Express
- MySQL
- API REST
- Fetch API
- Git e GitHub

## Telas do aplicativo

- **Home:** apresenta a tela inicial e as informações do aplicativo.
- **Treinos:** apresenta treinos de exemplo e consulta os treinos cadastrados no banco de dados.
- **Perfil:** apresenta a área de informações do usuário.

## Requisitos funcionais

- RF01 — Permitir a navegação entre as telas do aplicativo.
- RF02 — Exibir treinos organizados por grupos musculares.
- RF03 — Consultar os treinos cadastrados no MySQL.
- RF04 — Permitir o cadastro de novos treinos pela API.
- RF05 — Exibir nome, descrição, categoria e duração dos treinos.
- RF06 — Permitir futuramente a edição e exclusão de treinos.
- RF07 — Implementar futuramente cadastro e login de usuários.
- RF08 — Implementar autenticação JWT e níveis de permissão nas próximas entregas.

## Fluxo do aplicativo

Home → Treinos → Consulta dos treinos

Home → Perfil

Na tela de Treinos, o aplicativo utiliza `fetch()` para consultar a API Express, que acessa o banco MySQL e retorna os dados em JSON.

## Estrutura do banco de dados

Banco de dados: `fittrack`

Tabela principal: `treinos`

| Campo | Tipo | Descrição |
|---|---|---|
| id | INT | Identificador do treino, chave primária |
| nome | VARCHAR(100) | Nome do treino |
| descricao | TEXT | Descrição dos exercícios |
| categoria | VARCHAR(50) | Categoria do treino |
| duracao | INT | Duração em minutos |
| criado_em | TIMESTAMP | Data e hora de criação |

O arquivo `backend/database.sql` contém o script de criação do banco e da tabela.

## Rotas da API

### GET /treinos

Consulta todos os treinos cadastrados no MySQL e retorna os resultados em JSON.

### POST /treinos

Permite cadastrar um novo treino no banco de dados.

Exemplo de requisição:

```json
{
  "nome": "Treino de Peito",
  "descricao": "Supino reto e crucifixo",
  "categoria": "Musculacao",
  "duracao": 60
}
```

As rotas GET e POST fazem parte da primeira integração do projeto. As operações PUT e DELETE estão previstas para a próxima entrega.

## Níveis de usuário e permissões previstas

**Usuário comum:**
- Consultar treinos.
- Gerenciar seus próprios treinos.
- Visualizar e atualizar seu perfil.

**Administrador:**
- Gerenciar os treinos cadastrados.
- Administrar usuários.
- Controlar permissões do sistema.

Essas funcionalidades serão implementadas nas próximas etapas, utilizando autenticação JWT e rotas protegidas.

## Como executar o projeto

### 1. Configurar o banco de dados

- Instalar o MySQL.
- Executar o arquivo `backend/database.sql`.
- Configurar as variáveis de ambiente do backend em um arquivo `.env`:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=fittrack
PORT=3000
```

O arquivo `.env` não deve ser enviado ao GitHub.

### 2. Iniciar o backend

No terminal:

```bash
cd backend
npm install
node server.js
```

O servidor será iniciado na porta 3000.

### 3. Iniciar o aplicativo

Em outro terminal, na pasta principal do aplicativo:

```bash
npm install
npx expo start
```

Para utilizar o aplicativo em um celular, o endereço da API em `src/services/api.js` deverá ser configurado com o IP local do computador que está executando o backend. O celular e o computador devem estar na mesma rede.

## Evolução do projeto

### Entrega 1

- Criação do projeto React Native com Expo.
- Desenvolvimento das telas Home, Treinos e Perfil.
- Organização inicial dos arquivos.
- Configuração da navegação.
- Criação do repositório GitHub.

### Entrega 2

- Criação do banco de dados MySQL.
- Criação da tabela de treinos.
- Desenvolvimento do backend com Node.js e Express.
- Configuração da conexão com o banco.
- Implementação das rotas GET e POST.
- Integração do React Native com a API utilizando `fetch()`.
- Exibição dos treinos cadastrados no banco.
- Criação do script SQL.
- Atualização da documentação.

## Próximas etapas

Na Entrega 3, serão desenvolvidas as funcionalidades de cadastro e login de usuários, autenticação JWT, níveis de acesso, rotas protegidas e CRUD completo.

## Desenvolvedor

Projeto acadêmico — FitTrack, Entregas 1 e 2.