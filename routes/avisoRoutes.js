/**
 * routes/avisoRoutes.js
 * ---------------------------------------------------------------------------
 * Define as rotas relacionadas ao recurso "Aviso".
 *
 * Por que usar express.Router()? 
 * - Ele permite agrupar rotas de um domínio específico (ex.: avisos) em um
 *   módulo isolado, facilitando manutenção e testes.
 * - No server.js montamos este router em app.use('/avisos', router), o que
 *   significa que a rota local '/' aqui equivale a '/avisos' na aplicação.
 *
 * Design REST básico aplicado:
 * - GET /avisos    -> lista recursos
 * - POST /avisos   -> cria recurso
 * - (futuro) GET /avisos/:id, PUT/PATCH /avisos/:id, DELETE /avisos/:id
 */

const express = require('express');
const router = express.Router();

// Importa o controlador responsável por coordenar a lógica da rota.
const avisoController = require('../controllers/avisoController');

/** Lista todos os avisos existentes. (GET /avisos) */
router.get('/', avisoController.listarAvisos);

/**
 * Cria um novo aviso no mural. (POST /avisos)
 * Campos esperados no corpo (JSON):
 *  - titulo: string (obrigatório)
 *  - descricao: string (obrigatório)
 *  - usuarioId: number | string (obrigatório - identifica o autor)
 */
router.post('/', avisoController.criarAviso);

module.exports = router;