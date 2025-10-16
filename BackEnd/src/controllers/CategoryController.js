<<<<<<< HEAD
const getConnection = require("../config/promise");

// para executar uma estrutura mais limpa no backend teremos que usar uma promise para o async await e try catch funcionarem
exports.getCategories = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [rows] = await connection.execute(
      "SELECT nameCategory, idCategory FROM Category"
    );

    if (rows.length === 0) {
    }
    return res
      .status(200)
      .json({
        message: "Sucesso ao exibir categorias de tópicos",
        success: true,
        data: rows,
      });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return res
      .status(500)
      .json({
        message: "Erro interno do servidor ao buscar categoria de tópico.",
        success: false,
        data: error,
      });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
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
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.getTopicbyCategory = async (req, res) => {
  let connection;
<<<<<<< HEAD

  const { nameCategory } = req.params;
  try {
    connection = await getConnection();

    const [rows] = await connection.execute(
      `
            
        SELECT *
        FROM Topic t
        JOIN Category c on c.idCategory = t.Category_id 
        WHERE c.nameCategory = ?
        ORDER BY created_at DESC`,
=======
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
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      [nameCategory]
    );

    if (rows.length === 0) {
<<<<<<< HEAD
      return res
        .status(404)
        .json({ message: "Nenhum tópico encontrado para essa categoria." });
    }

    return res
      .status(200)
      .json({
        message: "Sucesso ao exibir tópico por categoria",
        success: true,
        data: rows,
      });
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return res
      .status(500)
      .json({
        message: "Erro interno do servidor ao buscar categoria de tópico.",
      });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
      return res.status(404).json({ message: "Nenhum tópico encontrado para essa categoria." });
    }

    return res.status(200).json({ message: "Sucesso ao exibir tópico por categoria", success: true, data: rows });
  } catch (error) {
    console.error("Erro ao buscar tópicos por categoria:", error);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar categoria de tópico." });
  } finally {
    if (connection) await connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.createCategory = async (req, res) => {
  let connection;
<<<<<<< HEAD

  const { nameCategory } = req.body;
  const user_id = req.data.id;

  if (!user_id || !nameCategory) {
    return res
      .status(400)
      .json({ message: "Dados incomplementos!", success: false });
  }

  try {
    connection = await getConnection();

    const [isAlreadyCreated] = await connection.execute(
      "SELECT * FROM Category WHERE nameCategory = ? AND User_id = ?",
      [nameCategory, user_id]
    );

=======
  const { nameCategory } = req.body;
  const user_id = req.data.id;

  if (!user_id || !nameCategory) {
    return res.status(400).json({ message: "Dados incompletos!", success: false });
  }

  try {
    connection = await getConnection();
    const [isAlreadyCreated] = await connection.execute('SELECT * FROM Category WHERE nameCategory = ? AND User_id = ?', [nameCategory, user_id]);

>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    if (isAlreadyCreated.length > 0) {
      return res.status(409).json({
        message: "Categoria já existe",
        success: false,
      });
    }

<<<<<<< HEAD
    const [result] = await connection.execute(
      "INSERT INTO Category(nameCategory, User_idUser) VALUES (?, ?)",
      [nameCategory, user_id]
    );
=======
    const [result] = await connection.execute('INSERT INTO Category(nameCategory, User_idUser) VALUES (?, ?)', [nameCategory, user_id]);
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32

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
<<<<<<< HEAD
    return res
      .status(500)
      .json({
        message: "Erro interno do servidor ao criar uma categoria",
        success: false,
      });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
    return res.status(500).json({ message: "Erro interno do servidor ao criar uma categoria", success: false });
  } finally {
    if (connection) await connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};
