Salve Karalhos, não sei quando tu vai chegar a ver esse trampo ou ler alguma coisa dos arquivos de API, mas aqui eu vou deixar algumas dicas bacanudas e coisas que eu faria em questão de BackEnd, principalmente em questão de endpoints (routes/rotas)

Isso no caso é baseado naquela imagem em que você rascunhou o layout da página, é o que eu tenho entendido

Existem múltiplos fatores que tem que se considerar quando você monta uma api, como por exemplo:
- Estrutura das rotas (ex.: /login, /avisos)
- Métodos HTTP apropriados (GET, POST, PUT, DELETE)
- Validação de dados de entrada
- Tratamento de erros
- Autenticação e autorização

Mas foda-se isso por enquanto, vamos focar no básico, no caso, as rotas e os métodos HTTP e talvez a validação de dados

Avisos (Rotas relacionadas a avisos no mural, adicionar aviso, ver avisos por usuário, etc):

/avisos [GET] - Lista todos os avisos
/avisos/:id [GET] - Obtém um aviso específico pelo ID
/avisos?dataInicio=YYYY-MM-DD&dataFim=YYYY-MM-DD [GET] - Filtra avisos por intervalo de datas
/avisos?dataInicio=YYYY-MM-DD [GET] - Filtra avisos a partir de uma data específica
/avisos?dataFim=YYYY-MM-DD [GET] - Filtra avisos até uma data específica
/avisos/usuario/:usuarioId [GET] - Lista avisos de um usuário específico
/avisos [POST] - Cria um novo aviso
/avisos/:id [PUT] - Atualiza um aviso existente pelo ID
/avisos/:id [DELETE] - Deleta um aviso pelo ID