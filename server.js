/**
 * server.js
 * ---------------------------------------------------------------------------
 * Ponto de entrada da aplicação Express.
 * - Sobe o servidor HTTP.
 * - Configura middlewares globais (ex.: JSON parser).
 * - Registra as rotas da aplicação.
 * 
 * Obs.: Mantemos este arquivo enxuto; a lógica é delegada para pastas
 *       routes/, controllers/ e models/ (padrão MVC simplificado).
 */

require('dotenv').config(); // Carrega variáveis de ambiente do .env
const express = require('express');
const app = express();

/**
 * Sequência (fluxo) de uma requisição no Express
 * -------------------------------------------------------------------------
 * 1) Middlewares globais (app.use) são executados em ordem de declaração.
 *    - Aqui habilitamos o parser de JSON para popular req.body.
 * 2) Rotas (app.use('/prefixo', router)) são delegadas para seus respectivos
 *    routers (ex.: routes/avisoRoutes.js).
 * 3) Caso nenhuma rota atenda a requisição, caímos no middleware 404.
 * 4) Se algum middleware/rota chamar next(err) ou lançar erro, o Express
 *    redireciona para o middleware de erro (o que possui 4 parâmetros).
 *
 * Dica: a ordem em que você declara middlewares e rotas importa!
 */

// Middleware nativo do Express para interpretar JSON no corpo das requisições.
// Sem isso, req.body virá undefined para application/json.
app.use(express.json());

// Importa as rotas de "avisos" (mural).
const avisoRoutes = require('./routes/avisoRoutes');

// Prefixa as rotas de avisos em /avisos.
// Isso significa que, por exemplo, o POST para criar um aviso será: POST /avisos
app.use('/avisos', avisoRoutes);

// (Opcional) Rota de saúde do serviço, útil para monitoramento.
app.get('/health', (req, res) => {
  res.json({ status: 'Rodou porra', timestamp: new Date().toISOString() });
});

// Middleware simples de tratamento de rotas inexistentes (404).
app.use((req, res, next) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});

// Middleware simples de tratamento de erros não capturados.
// Em produção, você poderia logar stack traces e mascarar mensagens sensíveis.
app.use((err, req, res, next) => {
  console.error('[ERRO NÃO TRATADO]', err);
  res.status(500).json({
    erro: 'Erro interno do servidor'
  });
});

// Porta padrão 3000 (pode usar variável de ambiente para flexibilidade).
// Em produção, configure PORT via variável de ambiente (ex.: PORT=8080).
// Em desenvolvimento, 3000 é um padrão conveniente.
const PORT = process.env.PORT || 3000;

// Inicia o servidor HTTP.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
