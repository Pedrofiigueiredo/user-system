# User System API

Um projeto desenvolvido para estudar as funcionalidades do Node.js com MongoDB

## Índice

* [Funcionalidades](#funcionalidades)
* [Tecnologias e ferramentas](#tecnologias)
* [Como rodar](#como-rodar)
* [Rotas](#rotas)
* [Exemplos](#exemplos)

## Funcionalidades
- [x] Registro de usuários
- [x] Autenticação
- [x] Recuperação de senha com envio de email
- [x] Criar projetos e tarefas (semelhante à um ToDo)

## Tecnologias e ferramentas

* Node.js
* Express
* Crypto
* MailTrap + Nodemailer
* Mongodb
* Insomnia
* JsonWebToken

## Como rodar

Requisitos:
  * Git instalado na sua máquina
  * Node v12.20.01+
  * Mongodb (local ou configurar `src/Database/connection.js` para remoto)
  * Yarn ou NPM

1. Clone esse repositório e instale as dependências
```
  git clone https://github.com/Pedrofiigueiredo/user-system
  cd user-system
  yarn install
```
2. Configure as variáveis ambiente
   * Crie uma pasta `config` em `/src`
   * Crie um arquivo `auth.json` para armazenar a chave de criptografia, como no exemplo abaixo.
   ```
    {
      "secret": "pabw783tsmdhs7ajsnfgxs67"
    }
   ```
   * Crie um arquivo `mail.json` para armazenar as configurações do **MainTrap**, como no exemplo. Acesse [mailtrap.com](https://mailtrap.io/), crie uma conta ou faça login e pegue os seus dados no formato `nodemailer`.
   ```
    {
      "host": "{YOUR_HOST}",
      "port": "{YOUR_PORT}",
      "user": "{YOUR_USER}",
      "pass": "{YOUR_PASS}"
    }
   ``` 


3. Para rodar o projeto utilize `yarn dev`


O servidor vai iniciar em `http://localhost:3000`


## Rotas

`Obs:` para rotas do tipo post utilizar o header `Content-Type` e `application/json`. (Já adicionado por padrão no insomnia)

**Para autenticação:**

- `POST /register` - Registrar novo usuário
- `POST /authenticate` - Login
- `POST /forgot_password` - Solicita email com *token* para atualizar senha
- `POST /reset_password` - Atualizar senha

**CRUD:**

`Obs:` exige autenticação (login) do usuário

- `POST /` - Criar novo projeto
- `PUT /:projectId` - Atualizar o projeto com id `projectId`
- `DELETE /:projectId` - Excluir o projeto com id `projectId`
- `GET /` - Listar todos os projetos
- `GET /:projectId` - Listar o projeto com id `projectId`

## Exemplos

### POST /register

Requisição:
```
POST /register

{
	"name": "Pedro",
	"email":  "pedro@figueiredo.com",
	"password": "123"
}
```

Resposta:
```
{
  "user": {
    "_id": "601c360d7c0e8b15d58c102d",
    "name": "Pedro",
    "email": "pedro@figueiredo.com",
    "createdAt": "2021-02-04T17:59:41.091Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWMzNjBkN2MwZThiMTVkNThjMTAyZCIsImlhdCI6MTYxMjQ2MTU4MSwiZXhwIjoxNjEyNTQ3OTgxfQ.6oc9qjk0MO1dyf3GszmGPyMattMA6dOkO1M--iakjys"
}
```

### POST /authenticate

Requisição:
```
POST /authenticate

{
	"email":  "pedro@figueiredo.com",
	"password": "123"
}
```

Resposta:
```
{
  "user": {
    "_id": "601c360d7c0e8b15d58c102d",
    "name": "Pedro",
    "email": "pedro@figueiredo.com",
    "createdAt": "2021-02-04T17:59:41.091Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWMzNjBkN2MwZThiMTVkNThjMTAyZCIsImlhdCI6MTYxMjQ2MTY3OSwiZXhwIjoxNjEyNTQ4MDc5fQ.YB3dUjv3l8ocgmLa54LSx1DkOZBcYHM4x9C_K3r6g00"
}
```


### POST /forgot_password

Requisição:
```
POST /forgot_password

{
	"email":  "pedro@figueiredo.com",
}
```

Resposta:
```
{
  "message": "Email sended"
}
```


### POST /reset_password

Requisição:
```
POST /reset_password

{
	"email":  "pedro@figueiredo.com",
  "token": "1005012a5609df4d90e4fd5ea76a8f7c2f924daf",
	"newPassword":  "12345678"
}
```

Resposta:
```
{ 
  message: "Reset password succeed" 
}
```

### POST /

**Observação:** a partir dessa rota, é preciso adicionar o *Token* de autenticação no cabeçalho da requisição no formato *Authorizaton* + `Bearer {TOKEN}` 

Requisição:
```
POST /

{
	"title": "Finalizar README.md",
	"description": "Documentação da API",
	"tasks": [
		{
			"title": "Aprendizados",
			"assignedTo": "601b650fccf2551cff1166c3"
		}
	]
}
```

Resposta:
```
{
  "project": {
    "tasks": [
      {
        "completed": false,
        "_id": "601c38c504fa351a2730df82",
        "title": "Aprendizados",
        "assignedTo": "601b650fccf2551cff1166c3",
        "project": "601c38c504fa351a2730df81",
        "__v": 0
      }
    ],
    "_id": "601c38c504fa351a2730df81",
    "title": "Finalizar README.md",
    "description": "Documentação da API",
    "user": "601b650fccf2551cff1166c3",
    "__v": 1
  }
}
```

### PUT /:projectId

Requisição:
```
PUT /601c38c504fa351a2730df81

{
	"title": "Finalizar README.md",
	"description": "Documentação da API",
	"tasks": [
		{
			"title": "Aprendizados",
			"assignedTo": "601b650fccf2551cff1166c3"
		},
		{
			"title": "Rotas",
			"assignedTo": "601b650fccf2551cff1166c3"
		},
		{
			"title": "Como rodar localmente",
			"assignedTo": "601b650fccf2551cff1166c3"
		}
	]
}
```

Resposta:
```
{
  "project": {
    "tasks": [
      {
        "completed": false,
        "_id": "601c393004fa351a2730df85",
        "title": "Rotas",
        "assignedTo": "601b650fccf2551cff1166c3",
        "project": "601c17027ec4432e6d60e921",
        "__v": 0
      },
      {
        "completed": false,
        "_id": "601c393004fa351a2730df84",
        "title": "Aprendizados",
        "assignedTo": "601b650fccf2551cff1166c3",
        "project": "601c17027ec4432e6d60e921",
        "__v": 0
      },
      {
        "completed": false,
        "_id": "601c393004fa351a2730df86",
        "title": "Como rodar localmente",
        "assignedTo": "601b650fccf2551cff1166c3",
        "project": "601c17027ec4432e6d60e921",
        "__v": 0
      }
    ],
    "_id": "601c17027ec4432e6d60e921",
    "title": "Finalizar README.md",
    "description": "Documentação da API",
    "user": "601b650fccf2551cff1166c3",
    "__v": 4
  }
}
```

### DELETE /:projectId

Requisição:
```
DELETE /601c38c504fa351a2730df81
```

Resposta:
```
{
  "message": "Project deleted"
}
```

### GET /

Requisição:
```
GET /
```

Resposta:
```
{
  "projects": [
    {
      "tasks": [
        {
          "completed": false,
          "_id": "601c38c504fa351a2730df82",
          "title": "Aprendizados",
          "assignedTo": "601b650fccf2551cff1166c3",
          "project": "601c38c504fa351a2730df81",
          "__v": 0
        }
      ],
      "_id": "601c38c504fa351a2730df81",
      "title": "Finalizar README.md",
      "description": "Documentação da API",
      "user": {
        "_id": "601b650fccf2551cff1166c3",
        "name": "Pedro",
        "email": "mnopedrodias@outlook.com",
        "createdAt": "2021-02-04T03:07:59.076Z",
        "__v": 0
      },
      "__v": 1
    },
    {
      "tasks": [
        {
          "completed": false,
          "_id": "601c3aaa0ec9171b46d0611a",
          "title": "Aprendizados",
          "assignedTo": "601b650fccf2551cff1166c3",
          "project": "601c3aaa0ec9171b46d06119",
          "__v": 0
        }
      ],
      "_id": "601c3aaa0ec9171b46d06119",
      "title": "Finalizar README.md",
      "description": "Documentação da API",
      "user": {
        "_id": "601b650fccf2551cff1166c3",
        "name": "Pedro",
        "email": "mnopedrodias@outlook.com",
        "createdAt": "2021-02-04T03:07:59.076Z",
        "__v": 0
      },
      "__v": 1
    }
  ]
}
```

### GET /:projectId

Requisição:
```
GET /601c38c504fa351a2730df81
```

Resposta:
```
{
  "project": {
    "tasks": [
      {
        "completed": false,
        "_id": "601c38c504fa351a2730df82",
        "title": "Aprendizados",
        "assignedTo": "601b650fccf2551cff1166c3",
        "project": "601c38c504fa351a2730df81",
        "__v": 0
      }
    ],
    "_id": "601c38c504fa351a2730df81",
    "title": "Finalizar README.md",
    "description": "Documentação da API",
    "user": {
      "_id": "601b650fccf2551cff1166c3",
      "name": "Pedro",
      "email": "mnopedrodias@outlook.com",
      "createdAt": "2021-02-04T03:07:59.076Z",
      "__v": 0
    },
    "__v": 1
  }
}
```

## Aprendizados

Para ver o passo a passo da criação desse projeto acesse [Artigo](./src/README.md)