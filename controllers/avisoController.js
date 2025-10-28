/**
 * controllers/avisoController.js
 * ---------------------------------------------------------------------------
 * Controller = camada que recebe a requisição (vinda da rota), valida dados,
 * chama o Model (responsável pelos dados) e monta a resposta HTTP.
 * 
 * Dicas:
 * - Toda a validação específica da requisição pode ficar aqui.
 * - Regras de negócio mais sofisticadas podem ficar aqui ou em serviços
 *   separados, chamando o Model quando necessário.
 */

const Aviso = require('../models/Aviso');

/**
 * Contrato (simplificado) dos Controllers
 * ---------------------------------------------------------------------------
 * Entrada: objetos Express { req, res, next }
 * - req: dados da requisição (headers, params, query, body)
 * - res: utilitário para montar a resposta HTTP (status, json, send)
 * - next: função que delega para próximos middlewares; se chamado com erro,
 *         ativa o middleware de erro global (em server.js)
 * Saída: resposta HTTP com status e JSON coerentes.
 */

/**
 * Cria um novo aviso.
 *
 * Rota: POST /avisos
 * Regras:
 * - Valida campos obrigatórios e tamanhos aceitáveis
 * - Normaliza strings (trim)
 * - Em caso de sucesso, responde 201 (Created)
 * - Em caso de erro de validação, responde 400 (Bad Request)
 * - Erros inesperados são encaminhados via next(err) para o middleware global
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.criarAviso = async (req, res, next) => {
  try {
    // Extrai os campos do corpo da requisição.
    const { titulo, descricao, usuarioId } = req.body;

    // ---------------------------
    // Validações simples (exemplo)
    // ---------------------------

    // Verifica obrigatoriedade:
    if (!titulo || !descricao || (usuarioId === undefined || usuarioId === null)) {
      return res.status(400).json({
        erro: 'Campos obrigatórios ausentes. Envie "titulo", "descricao" e "usuarioId".'
      });
    }

    // Normaliza/trim para evitar espaços extras:
    const tituloLimpo = String(titulo).trim();
    const descricaoLimpa = String(descricao).trim();

    // Regras de tamanho (exemplo): evita títulos/descrições absurdamente longos:
    // Nota: 400 (Bad Request) pois o cliente enviou dados inválidos.
    // Alguns projetos usam 422 (Unprocessable Entity) para validações.
    if (tituloLimpo.length === 0 || tituloLimpo.length > 120) {
      return res.status(400).json({
        erro: 'O "titulo" deve ter entre 1 e 120 caracteres.'
      });
    }
    if (descricaoLimpa.length === 0 || descricaoLimpa.length > 2000) {
      return res.status(400).json({
        erro: 'A "descricao" deve ter entre 1 e 2000 caracteres.'
      });
    }

    // Aqui não impomos um tipo específico para usuarioId,
    // mas poderíamos garantir número, por exemplo:
    // const usuarioIdNumero = Number(usuarioId);
    // if (Number.isNaN(usuarioIdNumero)) { ... }

    // --------------------------------
    // Chama o Model para "persistir"
    // --------------------------------
    // Este create simula persistência em memória (array). Em produção,
    // a implementação do Model falaria com um banco de dados.
    const novo = await Aviso.create({
      titulo: tituloLimpo,
      descricao: descricaoLimpa,
      usuarioId
    });

    // Retorna o recurso criado com HTTP 201 (Created).
    return res.status(201).json({
      mensagem: 'Aviso criado com sucesso.',
      aviso: novo
    });

  } catch (err) {
    // Encaminha para o middleware de erro global (server.js).
    next(err);
  }
};

/**
 * Lista todos os avisos existentes (em memória).
 * GET /avisos
 */
/**
 * Lista todos os avisos.
 *
 * Rota: GET /avisos
 * Regras:
 * - Obtém os itens via Model e retorna 200 (OK)
 * - Inclui um metadado "total" útil para paginação futura
 * - Em caso de erro inesperado, delega ao middleware global via next(err)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.listarAvisos = async (req, res, next) => {
  try {
    const avisos = await Aviso.findAll();

    // Retorna uma listagem simples com metadados úteis.
    return res.status(200).json({
      total: avisos.length,
      avisos
    });
  } catch (err) {
    next(err);
  }
};
