/**
 * models/Aviso.js
 * ---------------------------------------------------------------------------
 * Model = camada responsável pelos dados:
 * - Estrutura do recurso (campos).
 * - Operações de persistência (create, find, update, delete).
 * 
 * Neste exemplo simples, usamos um array em memória para simular um "banco".
 * Em um projeto real, aqui você integraria com um banco (SQLite, Postgres, etc.)
 * usando uma biblioteca/ORM (Knex, Sequelize, Prisma) ou drivers nativos.
 *
 * Por que ainda usamos async/await mesmo sem I/O real?
 * - Para manter a mesma assinatura do que seria um acesso a DB real.
 * - Facilita substituir por uma implementação real no futuro sem quebrar o Controller.
 */

// "Banco de dados" em memória (escopo de módulo).
// Em ambiente real, nada disso persistirá quando o processo cair.
const _avisos = []; // cada item: { id, titulo, descricao, usuarioId, criadoEm }

// Gerador simples de IDs incrementais (não use isso em produção).
let _ultimoId = 0;
// Observação: incrementos ingênuos de ID funcionam "ok" aqui pois não há concorrência
// real. Em bancos de dados, prefira auto-incremento do próprio DB ou UUIDs.

/**
 * Cria um novo aviso no "banco" em memória.
 * @param {Object} dados - Objeto com { titulo, descricao, usuarioId }
 * @returns {Promise<Object>} Aviso criado
 */
/**
 * Cria e retorna um novo aviso.
 *
 * @param {{ titulo: string, descricao: string, usuarioId: number|string }} dados
 * @returns {Promise<{ id: number, titulo: string, descricao: string, usuarioId: any, criadoEm: string }>}
 */
async function create(dados) {
  // Em um banco real, haveria operações assíncronas de I/O; aqui usamos async
  // para manter a assinatura semelhante e permitir await no Controller.

  const agora = new Date();

  const novo = {
    id: ++_ultimoId,              // auto-incremento simplificado
    titulo: dados.titulo,
    descricao: dados.descricao,
    usuarioId: dados.usuarioId,
    criadoEm: agora.toISOString() // carimbo de criação em ISO-8601
  };

  _avisos.push(novo);

  // Retornamos uma cópia para evitar que quem chamou modifique nosso "banco".
  return { ...novo };
}

/**
 * (Opcional) Lista todos os avisos (útil para depurar/testar rapidamente).
 * @returns {Promise<Array>}
 */
/**
 * Retorna todos os avisos existentes.
 *
 * @returns {Promise<Array<{ id: number, titulo: string, descricao: string, usuarioId: any, criadoEm: string }>>}
 */
async function findAll() {
  // Retorna cópias superficiais para preservar imutabilidade externa.
  return _avisos.map(a => ({ ...a }));
}

// Exporta as funções do "Model".
module.exports = {
  create,
  findAll
};
