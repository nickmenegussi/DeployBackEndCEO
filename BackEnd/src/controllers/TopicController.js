const getConnection = require("../config/promise");
// const { getIO } = require("../socket/index");

exports.viewOnlyTopicById = async (req, res) => {
  let connection;

  const idTopic = req.params.topicId;

  try {
    connection = await getConnection();

    const [result] = await connection.execute("SELECT * FROM Topic WHERE idTopic = ?", [
      idTopic,
    ]);

    if (result.length === 0) {
      return res.status(404).json({
        message: `O tópico com o id ${idTopic} não existe no nosso sistema.`,
        success: false,
      });
    }

    // Emitindo um evento para o socket.io
    // const io = getIO()
    // io.emit('topicViewedById', {
    //   id: idTopic,
    //   title: result[0].title,
    //   description: result[0].description,
    //   User_idUser: result[0].User_idUser,
    // })

    return res.status(200).json({
      message: "Sucesso ao exibir o tópico da postagem.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar tópico:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.viewAllTopic = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      "SELECT * FROM Topic ORDER BY created_at DESC"
    );

    return res.status(200).json({
      message: "Sucesso ao exibir todos os tópicos das postagens.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar tópicos:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.createTopic = async (req, res) => {
  let connection;

  const { title, description, Category_id } = req.body;
  const User_idUser = req.data.id;
  const image = req.file ? req.file.filename : null;

  if (!title || !description || !image || !Category_id) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    const [existingTopic] = await connection.execute(
      "SELECT * FROM Topic WHERE title = ? AND description = ?",
      [title, description]
    );

    if (existingTopic.length > 0) {
      return res.status(409).json({
        message:
          "Já existe um tópico com o mesmo título e descrição. Por favor, tente novamente.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      "INSERT INTO Topic(title, description, image, User_idUser, Category_id) VALUES(?, ?, ?, ?, ?)",
      [title, description, image, User_idUser, Category_id]
    );

    // const io = getIO()
    // io.emit("newTopic", {
    //   id: result.insertId,
    //   title,
    //   description,
    //   image,
    //   User_idUser,
    //   Category_id
    // })

    return res.status(201).json({
      success: true,
      message: "Tópico cadastrado com sucesso",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar tópico:", error);
    return res.status(500).json({
      message: "Erro ao criar um novo tópico",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateTitle = async (req, res) => {
  let connection;

  const idTopic = req.params.topicId;
  const { title } = req.body;
  const User_idUser = req.data.id;

  if (!idTopic || !title) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    const [existingTopic] = await connection.execute(
      "SELECT * FROM Topic WHERE idTopic = ? AND User_idUser = ?",
      [idTopic, User_idUser]
    );

    if (existingTopic.length === 0) {
      return res.status(404).json({
        message: "Tópico não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    if (existingTopic[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para alterar o tópico.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Topic SET title = ? WHERE idTopic = ? AND User_idUser = ?`,
      [title, idTopic, User_idUser]
    );

    return res.status(200).json({
      message: "Sucesso ao alterar o tópico da postagem.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar título do tópico:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateDescription = async (req, res) => {
  let connection;

  const idTopic = req.params.topicId;
  const { description } = req.body;
  const User_idUser = req.data.id;

  if (!description) {
    return res.status(400).json({
      success: false,
      message: "O campo 'descrição' é obrigatório.",
    });
  }

  try {
    connection = await getConnection();

    const [existingTopic] = await connection.execute(
      "SELECT * FROM Topic WHERE idTopic = ? AND User_idUser = ?",
      [idTopic, User_idUser]
    );

    if (existingTopic.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Não foi possível encontrar o tópico.",
      });
    }

    if (existingTopic[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para alterar o tópico.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Topic SET description = ? WHERE idTopic = ? AND User_idUser = ?`,
      [description, idTopic, User_idUser]
    );

    return res.status(200).json({
      success: true,
      message: "Tópico atualizado com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar descrição do tópico:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao se conectar com o servidor.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateTopicImage = async (req, res) => {
  let connection;

  const image = req.file ? req.file.filename : null;
  const idTopic = req.params.topicId;
  const User_idUser = req.data.id;

  if (!image) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    const [existingTopic] = await connection.execute(
      "SELECT * FROM Topic WHERE idTopic = ? AND User_idUser = ?",
      [idTopic, User_idUser]
    );

    if (existingTopic.length === 0) {
      return res.status(404).json({
        message: "Tópico não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    if (existingTopic[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para alterar o tópico.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Topic SET image = ? WHERE idTopic = ? AND User_idUser = ?`,
      [image, idTopic, User_idUser]
    );

    return res.status(200).json({
      message: "Sucesso ao alterar a imagem do tópico.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar imagem do tópico:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deleteTopic = async (req, res) => {
  let connection;

  const idTopic = req.params.topicId;
  const User_idUser = req.data.id;

  if (!idTopic) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    const [existingTopic] = await connection.execute(
      "SELECT * FROM Topic WHERE idTopic = ? AND User_idUser = ?",
      [idTopic, User_idUser]
    );

    if (existingTopic.length === 0) {
      return res.status(400).json({
        message: "Tópico não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    if (existingTopic[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para alterar o tópico.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM Topic WHERE idTopic = ? AND User_idUser = ?`,
      [idTopic, User_idUser]
    );

    // const io = getIO()
    // io.emit('topicDeleted', { id: idTopic, User_idUser })

    return res.status(200).json({
      message: "Tópico deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar tópico:", error);
    return res.status(500).json({
      message: "Erro ao deletar tópico.",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
