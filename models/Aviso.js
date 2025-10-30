/**
 * models/Aviso.js
 * ---------------------------------------------------------------------------
 * Model = camada responsável pelos dados com integração ao Supabase.
 * 
 * Supabase é um BaaS (Backend as a Service) que fornece:
 * - Banco de dados PostgreSQL gerenciado
 * - API REST e Realtime automáticas
 * - Autenticação integrada
 * - Storage de arquivos
 * 
 * Aqui usamos o cliente JavaScript do Supabase para interagir com o banco.
 */

// Importa o cliente do Supabase usando CommonJS (require)
const { createClient } = require('@supabase/supabase-js');

// Carrega credenciais das variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validação: garante que as variáveis estão configuradas
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Configuração do Supabase faltando! Certifique-se de ter SUPABASE_URL e SUPABASE_KEY no arquivo .env'
  );
}

// Cria e exporta a instância do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Função auxiliar: converte snake_case (do Supabase) para camelCase (do nosso código).
 * Isso garante compatibilidade entre o banco e o controller.
 * 
 * @param {Object} avisoDb - Aviso retornado do Supabase (snake_case)
 * @returns {Object} Aviso em camelCase
 */
function mapearAvisoParaCamelCase(avisoDb) {
  if (!avisoDb) return null;
  
  return {
    id: avisoDb.id,
    titulo: avisoDb.titulo,
    descricao: avisoDb.descricao,
    usuarioId: avisoDb.usuario_id,
    criadoEm: avisoDb.criado_em
  };
}

/**
 * Cria um novo aviso no banco de dados Supabase.
 * 
 * @param {Object} dados - { titulo, descricao, usuarioId }
 * @returns {Promise<Object>} Aviso criado com id gerado pelo banco
 * @throws {Error} Se houver erro na inserção
 */
async function create(dados) {
  // Insert no Supabase (tabela: avisos)
  // Por padrão, o Supabase gera o id automaticamente se a coluna for SERIAL/UUID
  const { data, error } = await supabase
    .from('avisos') // Nome da tabela no Supabase
    .insert([
      {
        titulo: dados.titulo,
        descricao: dados.descricao,
        usuario_id: dados.usuarioId, // Ajuste para snake_case se necessário
        // criado_em: Supabase pode gerar automaticamente com default now()
      }
    ])
    .select() // Retorna o registro inserido
    .single(); // Retorna apenas 1 objeto (não array)

  if (error) {
    throw new Error(`Erro ao criar aviso no Supabase: ${error.message}`);
  }

  // Converte snake_case para camelCase antes de retornar
  return mapearAvisoParaCamelCase(data);
}

/**
 * Lista todos os avisos do banco de dados Supabase.
 * 
 * @returns {Promise<Array>} Array de avisos
 * @throws {Error} Se houver erro na consulta
 */
async function findAll() {
  const { data, error } = await supabase
    .from('avisos')
    .select('*') // Seleciona todas as colunas
    .order('criado_em', { ascending: false }); // Ordena do mais recente ao mais antigo

  if (error) {
    throw new Error(`Erro ao listar avisos no Supabase: ${error.message}`);
  }

  // Converte cada aviso de snake_case para camelCase
  return (data || []).map(mapearAvisoParaCamelCase);
}

module.exports = {
  create,
  findAll,
  supabase // Exporta também o cliente, caso precise usar em outros lugares
};