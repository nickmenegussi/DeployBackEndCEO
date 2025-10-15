exports.getCategories = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute("SELECT nameCategory, idCategory FROM Category");

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Categoria não existe!",
        success: false,
      });
    }
    return res.status(200).json({ message: "Sucesso ao exibir categorias de tópicos", success: true, data: rows });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar categoria de tópico.", success: false, data: error });
  } finally {
    if (connection) await connection.end();
  }
};

exports.getTopicbyCategory = async (req, res) => {
  let connection;
  const { nameCategory } = req.params;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `
      SELECT *
      FROM Topic t
      JOIN Category c on c.idCategory = t.Category_id 
      WHERE c.nameCategory = ?
      ORDER BY created_at DESC
    `,
      [nameCategory]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Nenhum tópico encontrado para essa categoria." });
    }

    return res.status(200).json({ message: "Sucesso ao exibir tópico por categoria", success: true, data: rows });
  } catch (error) {
    console.error("Erro ao buscar tópicos por categoria:", error);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar categoria de tópico." });
  } finally {
    if (connection) await connection.end();
  }
};

exports.createCategory = async (req, res) => {
  let connection;
  const { nameCategory } = req.body;
  const user_id = req.data.id;

  if (!user_id || !nameCategory) {
    return res.status(400).json({ message: "Dados incompletos!", success: false });
  }

  try {
    connection = await getConnection();
    const [isAlreadyCreated] = await connection.execute('SELECT * FROM Category WHERE nameCategory = ? AND User_id = ?', [nameCategory, user_id]);

    if (isAlreadyCreated.length > 0) {
      return res.status(409).json({
        message: "Categoria já existe",
        success: false,
      });
    }

    const [result] = await connection.execute('INSERT INTO Category(nameCategory, User_idUser) VALUES (?, ?)', [nameCategory, user_id]);

    return res.status(201).json({
      message: "Categoria criada com sucesso",
      success: true,
      data: {
        idCategory: result.insertId,
        nameCategory,
        user_id,
      },
    });
  } catch (error) {
    console.error("Erro ao criar uma categoria: ", error);
    return res.status(500).json({ message: "Erro interno do servidor ao criar uma categoria", success: false });
  } finally {
    if (connection) await connection.end();
  }
};
