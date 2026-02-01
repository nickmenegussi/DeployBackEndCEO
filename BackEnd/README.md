# Backend do Projeto [Centro Espírita Online/CEO]

Este é o backend do projeto **[CEO/Centro Espírita Online]**, desenvolvido com Node.js e Express. Ele fornece a base para a comunicação entre o front-end e o banco de dados, incluindo autenticação, gerenciamento de usuários e recursos adicionais.

## 🌟 Funcionalidades

- **Autenticação e autorização:** Implementação de JWT para garantir a segurança das rotas e proteção dos dados do usuário.
- **CRUD para gerenciamento de usuários e livros:** Permite a criação, leitura, atualização e exclusão de registros de usuários e livros.
- **Middlewares para controle de permissões:** Implementação de middlewares que garantem que apenas usuários autorizados possam acessar determinadas rotas.
- **Upload de imagens:** Utilização do Multer para gerenciar o upload de arquivos de imagem de forma eficiente.
- **Conexão com banco de dados MySQL:** Integração com um banco de dados relacional para armazenamento persistente de dados.

## 🚀 Tecnologias Utilizadas

### Back-End:

- **Node.js:** Ambiente de execução JavaScript no lado do servidor, utilizado como framework principal.
- **Express.js:** Framework minimalista para Node.js, utilizado para gerenciamento de rotas e middlewares.
- **MySQL:** Sistema de gerenciamento de banco de dados relacional, utilizado para armazenamento de dados.
- **Multer:** Middleware para gerenciamento de uploads de arquivos, facilitando a manipulação de dados de entrada.

## 📦 Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd <NOME_DO_DIRETORIO>
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## 📄 Documentação da API

A documentação da API pode ser acessada em [Swagger](<URL_DO_SWAGGER>).

## Script para adição de informações no Banco de Dados.

-- Lecture
INSERT INTO Lecture (title, duration, description, video_url, thumbnail_url, created_at)
VALUES (
    'A Força do Perdão: Libertando a Alma',
    '03:00:00',
    'Nesta palestra, refletiremos sobre o poder transformador do perdão à luz da Doutrina Espírita',
    'https://www.youtube.com/watch?v=HAQQUDbuudY&list=RDbePCRKGUwAY&index=2',
    'https://www.youtube.com/watch?v=HAQQUDbuudY&list=RDbePCRKGUwAY&index=2',
    '2025-07-05 19:28:48'
);

-- Topic
INSERT INTO Topic (title, description, image_url, user_id, created_at)
VALUES (
    'Espiritismo e Ciência',
    'Discussão sobre a relação entre o espiritismo e os avanços científicos.',
    'https://example.com/images/topic-espiritismo.jpg',
    1,
    '2025-08-02 10:05:10'
);

-- VolunteerWork
INSERT INTO VolunteerWork (title, description, start_time, location, created_at)
VALUES (
    'Recepcionista',
    'teste',
    '2025-07-17 00:00:00',
    'teste',
    '2025-07-05 19:44:25'
);


-- ========================================
-- Inserindo dados na tabela Book
-- ========================================
INSERT INTO Book (idLibrary, nameBook, authorBook, image, overviewBook, curiosityBook, tagsBook, bookCategory, bookQuantity, date_aquisition, status_Available)
VALUES
(1, 'O livro dos Espiritos', 'Allan Kardec', 'download.jfif.jfif', 'Teste', 'Teste', 'Obras Básicas', 'reserva', 5, '2025-07-05 19:11:36', 'disponível'),
(2, 'Ação e Reação', 'Chico Xavier', 'produtos-woocomerce-900-x-1200-px-860-x-1200-px-43.png.png', 'teste', 'teste', 'Obras Complementares', 'emprestimo', 0, '2025-07-05 19:12:52', 'emprestado'),
(3, 'Memorias de um Suicida', 'Yvone Pereira', 'download (1).jfif.jfif', 'teste', 'teste', 'Obras Complementares', 'reserva', 2, '2025-07-05 19:14:03', 'disponível'),
(4, 'Cinquenta Anos Depois', 'Chico Xavier / Emmanuel', 'download (2).jfif.jfif', 'Somente os séculos de trabalho e dor poderão anular o período de egoísmo...', 'teste', 'Obras Complementares', 'reserva', 1, '2025-07-05 19:15:30', 'disponível'),
(5, 'Allan Kardec', 'Allan Kardec', 'download (3).jfif.jfif', 'teste', 'teste', 'Obras Básicas', 'emprestimo', 5, '2025-07-05 19:16:39', 'emprestado'),
(6, 'A genese', 'Allan Kardec', 'download (4).jfif.jfif', 'teste', 'teste', 'Obras Básicas', 'emprestimo', 0, '2025-07-05 19:17:16', 'emprestado'),
(7, 'O essencial', 'Divaldo Franco', '81ss4NsJlqL._AC_UL320_.jpg.jpg', 'principal tarefa de Jesus Cristo em nosso planeta foi...', 'teste', 'Obras Complementares', 'emprestimo', 0, '2025-07-12 21:34:29', 'emprestado'),
(8, 'Coletânea de preces espíritas', 'Allan Kardec', '61hq5RLTHxL._SY385_.jpg.jpg', 'Esta valiosa obra é constituída de 3 partes...', 'teste', 'Obras Complementares', 'emprestimo', 1, '2025-07-12 21:35:14', 'disponível'),
(9, 'Meditações diárias', 'Chico Xavier', '81Bavq5EW0L._SY425_.jpg.jpg', 'Emmanuel foi o dedicado Guia Espiritual de Chico Xavier...', 'teste', 'Obras Complementares', 'emprestimo', 0, '2025-07-12 21:36:11', 'emprestado'),
(10, 'A vida na visão do espiritismo: Reflexões sobre o sentido da vida e o caminho para a evolução espiritual', 'Alexandre Caldini', '518VjjeAo6L._SY425_.jpg.jpg', 'Por que encarnamos? Quem é nossa família?...', 'teste', 'Obras Complementares', 'emprestimo', 2, '2025-07-12 21:36:58', 'disponível'),
(11, 'Paciência', 'Chico Xavier', '61OsFLV03jL._SY385_.jpg.jpg', 'Doença, desemprego, turbulência...', 'teste', 'Obras Complementares', 'emprestimo', 2, '2025-07-12 21:37:47', 'disponível'),
(12, 'Os Animais Conforme o Espiritismo', 'Marcel Benedeti', '4155UZMp4KL._SY342_.jpg.jpg', 'Estudo de comentários de Kardec acerca do assunto animais...', 'teste', 'Obras Complementares', 'reserva', 3, '2025-07-12 21:38:34', 'disponível'),
(13, 'Obreiros da Vida Eterna: Coleção A vida no mundo espiritual', 'Chico Xavier', '81E3bdP2QyL._SY425_.jpg.jpg', 'Obra clássica da literatura espírita...', 'teste', 'Obras Complementares', 'reserva', 3, '2025-07-12 21:39:28', 'disponível'),
(14, 'O Livro dos Médiuns', 'Chico Xavier', '71muoBF1+XL._SY425_.jpg.jpg', 'O livro dos médiuns é uma das cinco obras...', 'teste', 'Obras Complementares', 'reserva', 1, '2025-07-12 21:40:10', 'disponível'),
(15, 'O Espiritismo na Arte', 'Léon Denis', '61U1nDmsZ0L._SY425_.jpg.jpg', 'Desvende os mistérios da beleza eterna e da criação artística...', 'teste', 'Obras Complementares', 'reserva', 3, '2025-07-12 21:40:46', 'disponível');

-- ========================================
-- Inserindo dados na tabela Comments
-- ========================================
INSERT INTO Comments (idComments, Post_idPost, User_idUser, message, createdDate)
VALUES
(1, 12, 1, 'Jdhdndnd', '2025-08-04 10:21:38'),
(2, 12, 1, 'Testando comentários', '2025-08-04 10:23:25'),
(3, 12, 1, 'Testando desatualização', '2025-08-04 10:35:05'),
(4, 12, 1, 'Testando de nivo', '2025-08-04 10:38:04'),
(5, 12, 1, 'Tegsgs', '2025-08-04 10:38:52'),
(6, 12, 1, 'Ywgshshsh', '2025-08-04 10:42:15'),
(7, 12, 1, 'Ywgshshshjkk', '2025-08-04 10:42:52'),
(8, 12, 1, 'Yhjfdhjgdfgh', '2025-08-04 10:43:22'),
(9, 12, 1, 'Hgfvnjtdgk', '2025-08-04 10:43:31'),
(10, 12, 1, 'Yhvb', '2025-08-04 10:45:54'),
(11, 12, 1, 'Hsfho', '2025-08-04 10:46:23'),
(12, 12, 1, 'Tedtnsodikk', '2025-08-04 10:46:35'),
(13, 12, 1, 'Tstshshshsjsushshshshshddhdhdhdhdhdh', '2025-08-04 10:47:24'),
(14, 12, 1, 'Hshshshsjsusjshsjaj', '2025-08-04 10:47:28'),
(15, 12, 1, 'Gwbsnskskjd', '2025-08-04 10:49:55'),
(16, 12, 1, 'Habananasjsj', '2025-08-04 10:50:04'),
(17, 11, 1, 'Twvwndk', '2025-08-04 10:50:17'),
(18, 12, 1, 'Ggh', '2025-08-04 11:06:35'),
(19, 12, 1, 'Sjsjskdkdkdk', '2025-08-04 11:22:17'),
(20, 12, 1, 'Hfrfgbhh', '2025-08-04 11:33:53'),
(21, 12, 1, 'kakajakakaka', '2025-08-04 11:52:07'),
(22, 12, 1, 'Testando layout', '2025-08-04 11:52:45'),
(23, 12, 1, 'Sjsjsjsjsksksk', '2025-08-05 09:40:49');

-- ========================================
-- Inserindo dados na tabela Loans (exemplo)
-- ========================================
INSERT INTO Loans (idLoans, User_idUser, Book_idLibrary, quantity, returnDate, date_at_create)
VALUES
(1, 1, 5, 1, '2025-07-14 17:31:23', '2025-07-07 17:31:23'),
(2, 1, 6, 3, '2025-07-16 17:46:36', '2025-07-09 17:46:36'),
(3, 1, 7, 1, '2025-07-21 16:46:07', '2025-07-14 16:46:07'),
(4, 1, 2, 1, '2025-07-21 16:48:35', '2025-07-14 16:48:35'),
(5, 1, 7, 2, '2025-07-21 16:54:16', '2025-07-14 16:54:16'),
(9, 1, 9, 3, '2025-07-21 17:26:47', '2025-07-14 17:26:47'),
(10, 1, 6, 2, '2025-07-21 17:31:01', '2025-07-14 17:31:01'),
(11, 1, 9, 1, '2025-07-21 17:45:59', '2025-07-14 17:45:59'),
(12, 1, 8, 1, '2025-07-21 18:22:50', '2025-07-14 18:22:50'),
(13, 1, 2, 1, '2025-07-23 08:28:36', '2025-07-16 08:28:36'),
(14, 1, 8, 2, '2025-08-19 17:37:37', '2025-08-12 17:37:37');

-- ========================================
-- Inserir dados nas demais tabelas segue o mesmo padrão
-- Exemplo para ReviewSociety:
-- ========================================
INSERT INTO ReviewSociety (descriptionReview, ratingReview, userId)
VALUES
('Ótimo projeto! Contribuiu bastante para a comunidade.', 5, 1),
('Gostei da iniciativa, mas pode melhorar em alguns pontos.', 4, 1),
('Faltou organização nas atividades propostas.', 3, 1);

-- Inserindo dados
INSERT INTO User (name, email, password, status_permission, date_at_create)
VALUES
('admin123','nicolasmramos09@gmail.com','$2b$15$JvV2dZdv7LY0AEhQGn4VAONCZIGtBSz99iLhbdjI89LQmFBG0guSa','SuperAdmin','2025-07-05 15:32:18'),
('Calro','Este','$2b$15$7yr2XVyw0gG741cm9.yC7eYmtuFJTEKPcnhfXuN.YuesHWuHZDyEC','User','2025-07-16 16:18:54');

-- ========================================

-- Inserindo dados
INSERT INTO Post (title, image, user_id, category_id, created_at, updated_at)
VALUES
('Aprendendo sobre as leis morais',NULL,1,2,'2025-08-02 10:05:23','2025-08-02 10:05:23'),
('Evangelho no lar: capítulo 8 lido com fé',NULL,1,1,'2025-08-02 10:05:23','2025-08-02 10:05:23'),
('Novo ciclo de palestras: toda terça-feira!','ciclo1.jpg',1,1,'2025-08-02 10:05:23','2025-08-02 10:05:23'),
('Teste','photo_1754248890522.jpg.jpg',1,1,'2025-08-03 16:22:02','2025-08-03 16:22:02'),
('Testandk','photo_1754249348692.jpg.jpg',1,1,'2025-08-03 16:29:41','2025-08-03 16:29:41');

INSERT INTO CalendarEvents (title, link, description, startDate, endDate, attachment, created_at, user_id)
VALUES
('Palestra: A Força do Pensamento','https://meet.google.com/pensamento-espiritual','Reflexões sobre como o pensamento molda nossa realidade e influencia a vida espiritual.','2025-07-10 19:30:00','2025-07-10 21:00:00','https://site.com/slides/forca_pensamento.pdf','2025-07-01 12:00:00',1);
