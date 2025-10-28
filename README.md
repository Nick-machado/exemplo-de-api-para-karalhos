# API de Avisos - Exemplo de Mural

Uma API REST simples para gerenciamento de avisos/murais, desenvolvida com Node.js e Express. Este projeto serve como exemplo educacional de uma arquitetura MVC básica.

## 📋 Sobre o Projeto

Esta API permite criar e gerenciar avisos em um mural digital. Cada aviso contém título, descrição e identificação do usuário que o criou. O projeto foi estruturado seguindo o padrão MVC (Model-View-Controller) para organização e manutenibilidade do código.

### Funcionalidades

- ✅ Criar novos avisos
- ✅ Listar todos os avisos
- ✅ Validação de dados de entrada
- ✅ Tratamento de erros
- ✅ Estrutura organizacional MVC
- ✅ Documentação de código

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **JavaScript** - Linguagem de programação

## 📁 Estrutura do Projeto

```
├── server.js              # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts
├── controllers/
│   └── avisoController.js # Lógica de negócio dos avisos
├── models/
│   └── Aviso.js          # Modelo de dados (simulação em memória)
├── routes/
│   └── avisoRoutes.js    # Definição das rotas
└── README.md             # Documentação
```

## 🧭 Conceitos rápidos: REST, métodos HTTP e MVC

### O que é uma API REST?
- Uma API REST expõe recursos (ex.: Avisos) por meio de URLs (endpoints) e padrões HTTP.
- É stateless: cada requisição carrega tudo que o servidor precisa para processá-la.
- Normalmente troca dados em JSON.

### Recursos e endpoints
- Recurso: “Aviso”.
- Endpoints típicos: `/avisos` (coleção), `/avisos/:id` (item específico).

### Métodos HTTP principais
- GET: lê dados (idempotente). Ex.: `GET /avisos` lista todos.
- POST: cria dados. Ex.: `POST /avisos` cria um aviso (retorna 201 Created).
- PUT/PATCH: atualiza dados (PUT substitui, PATCH altera parcialmente).
- DELETE: remove dados (geralmente 204 No Content ou 200 OK).

### Códigos de status (resumo útil)
- 2xx: sucesso (200 OK, 201 Created, 204 No Content).
- 4xx: erro do cliente (400 Bad Request, 404 Not Found, 422 Unprocessable Entity).
- 5xx: erro no servidor (500 Internal Server Error).

### MVC neste projeto (onde cada papel vive)
- Routes (`routes/avisoRoutes.js`): definem os caminhos e métodos HTTP e encaminham para o controller.
- Controllers (`controllers/avisoController.js`): validam entrada, aplicam regras e chamam o Model; montam a resposta HTTP.
- Models (`models/Aviso.js`): cuidam dos dados (criar, listar, etc.). Aqui usamos um “banco” em memória para fins didáticos.

Fluxo de uma requisição (resumo):
Cliente → Rota → Controller → Model → Controller → Resposta HTTP

Observação: Como a persistência é em memória, os dados são perdidos ao reiniciar o servidor.

## 🚀 Como Instalar e Executar

### Pré-requisitos

- **Node.js** (versão 14 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (geralmente vem com o Node.js)

### Passo a passo

1. **Clone ou baixe o projeto**
   ```bash
   git clone <url-do-repositorio>
   # ou baixe e extraia o arquivo ZIP
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd exemplo-de-api-para-karalhos
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Execute a aplicação**
   ```bash
   npm start
   ```

5. **Verifique se está funcionando**
   - A aplicação estará rodando em `http://localhost:3000`
   - Teste a rota de saúde: `GET http://localhost:3000/health`

## 📚 Como Usar a API

### Endpoints Disponíveis

#### `GET /avisos` - Listar todos os avisos

Retorna todos os avisos armazenados em memória.

**Exemplo de resposta (200 OK):**
```json
{
  "total": 2,
  "avisos": [
    {
      "id": 1,
      "titulo": "Prova de Matemática",
      "descricao": "Prova na sexta às 10h, sala 12.",
      "usuarioId": 123,
      "criadoEm": "2025-10-28T10:30:00.000Z"
    },
    {
      "id": 2,
      "titulo": "Reunião de equipe",
      "descricao": "Reunião para discutir os próximos projetos",
      "usuarioId": 456,
      "criadoEm": "2025-10-28T11:00:00.000Z"
    }
  ]
}
```

#### `POST /avisos` - Criar um novo aviso

**Corpo da requisição (JSON):**
```json
{
  "titulo": "Título do aviso",
  "descricao": "Descrição detalhada do aviso",
  "usuarioId": 123
}
```

**Exemplo de resposta (201 Created):**
```json
{
  "mensagem": "Aviso criado com sucesso.",
  "aviso": {
    "id": 1,
    "titulo": "Título do aviso",
    "descricao": "Descrição detalhada do aviso",
    "usuarioId": 123,
    "criadoEm": "2025-10-28T10:30:00.000Z"
  }
}
```

#### `GET /health` - Verificar status da API

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-28T10:30:00.000Z"
}
```

### Testando com curl ou Postman

**Listar avisos:**
```bash
curl http://localhost:3000/avisos
```

**Criar aviso:**
```bash
curl -X POST http://localhost:3000/avisos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Reunião de equipe",
    "descricao": "Reunião para discutir os próximos projetos",
    "usuarioId": 456
  }'
```

## ⚠️ Limitações Atuais

- **Persistência:** Os dados são armazenados apenas em memória, sendo perdidos quando a aplicação é reiniciada
- **Autenticação:** Não há sistema de autenticação implementado
- **Banco de dados:** Não utiliza banco de dados real

## 🔧 Possíveis Melhorias

- [ ] Integração com banco de dados (SQLite, PostgreSQL, MongoDB)
- [ ] Sistema de autenticação e autorização
- [ ] Endpoints para listar, editar e excluir avisos
- [ ] Paginação para listagem de avisos
- [ ] Testes automatizados
- [ ] Logs estruturados
- [ ] Dockerização

## 📝 Scripts Disponíveis

- `npm start` - Inicia a aplicação em modo produção
- `npm test` - Executa os testes (ainda não implementado)

## 📄 Licença

ISC

