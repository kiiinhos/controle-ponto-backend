# Controle de Ponto Ilumeo - Backend

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

## 🚀 Começando

Esta API foi desenvolvido como parte de um desafio técnico proposto pela Ilumeo Data Science para a posição de Fullstack. O objetivo é criar uma aplicação de controle de ponto para os colaboradores, permitindo a visualização das horas trabalhadas no dia atual, a possibilidade de iniciar ou finalizar um turno, e o acompanhamento do total de horas trabalhadas nos dias anteriores.
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

## Tabela de Conteúdos

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Instalação e Configuração](#instalação-e-configuração)
3. [Uso](#uso)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Endpoints da API](#endpoints-da-api)
6. [Testes](#testes)
7. [Docker](#docker)

## Tecnologias Utilizadas

- Node.js
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Jest
- Eslint e Prettier

## 🔧 Instalação e Configuração

### 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker
- PostgreSQL

### Passo a Passo

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/controle-ponto-backend.git
   ```

2. Navegue até o diretório do backend:

   ```sh
   cd controle-ponto-backend
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente:

   Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

   ```sh
   DB_HOST=seu_host
   DB_PORT=5432
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=seu_banco_de_dados
   DB_SSL=true
   ```

5. Execute as migrações do banco de dados:

   ```sh
   npm run typeorm migration:run
   ```

## 💻 Executando o Servidor

Para iniciar o servidor em modo de desenvolvimento, utilize o comando:

```sh
npm run start:dev
```

O servidor estará disponível em http://localhost:3000.

## 📄 Scripts Disponíveis

- npm run build: Compila o projeto.
- npm run format: Formata o código utilizando Prettier.
- npm run start: Inicia o servidor em modo de produção.
- npm run start:dev: Inicia o servidor em modo de desenvolvimento.
- npm run start:debug: Inicia o servidor em modo de debug.
- npm run start:prod: Inicia o servidor com o build de produção.
- npm run lint: Executa o ESLint para verificar a qualidade do código.
- npm run test: Executa os testes unitários.
- npm run test:watch: Executa os testes em modo watch.
- npm run test:cov: Executa os testes e gera o relatório de cobertura.
- npm run test:debug: Executa os testes em modo debug.
- npm run test:e2e: Executa os testes end-to-end.

## 📥 Endpoints da API

```http request

    POST /registers/entry

        {
          "userCode": "string",
          "hourEntry": "string",
          "dateEntry": "string"
        }

    POST /registers/exit

        {
          "userCode": "string",
          "hourExit": "string",
          "dateExit": "string"
        }

    GET /registers/exit/:userCode

        {
            "userCode": "string",
            "dateExit": "string",
            "hourExit": "string"
        }

    GET /registers/entry/:userCode

        {
            "userCode": "string",
            "dateEntry": "string",
            "hourEntry": "string"
        }

    GET /registers/entry/:userCode

        {
            "userCode": "string",
            "dateEntry": "string",
            "hourEntry": "string"
        }

    GET /users/:userCode
        {
            "userCode": "string",
            "id": number
        }
```

## 🧪 Testes

Para rodar os testes unitários, utilize o comando:

```
npm run test
```

Para rodar os testes de cobertura, utilize o comando:

```
npm run test:cov
```

- A configuração do Jest pode ser encontrada no arquivo jest.config.js.

## 🐳 Docker

Construindo a Imagem Docker

Para rodar os testes unitários, utilize o comando:

```
docker build -t controle-ponto-backend .
```

Para rodar o container Docker, utilize o comando:

```
docker run -p 3000:3000 controle-ponto-backend
```

Crie um arquivo docker-compose.yml na raiz do projeto com o seguinte conteúdo:

```
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    env_file:
      - .env
    depends_on:
      - db

  db:
    image: postgres:13
    restart: always
    environment:
      POSTGRES_DB: ${DB_DATABASE}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
'
```

Para iniciar os serviços com Docker Compose, utilize o comando:

```
docker-compose up --build
```

## ☕ Conclusão

Este projeto fornece uma API escalável para o controle de ponto dos colaboradores da Ilumeo Data Science. A aplicação segue boas práticas de desenvolvimento, incluindo princípios S.O.L.I.D., uso de TypeScript, testes automatizados, ESLint e Prettier para manter a consistência do código, e Docker para facilitar a execução e o desenvolvimento da aplicação
