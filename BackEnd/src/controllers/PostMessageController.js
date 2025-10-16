const getConnection = require("../config/promise");

// Obter todos os posts
exports.getAllPosts = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(`
      SELECT
        p.idPost,
        p.content,
        p.image,
        p.Topic_idTopic,
        p.created_at,
        p.updated_at,
        u.idUser AS user_id,
        u.nameUser,
        u.image_profile,
        c.nameCategory,
        c.idCategory,
        (SELECT COUNT(*) FROM Likes l WHERE l.Post_idPost = p.idPost) AS likes_count,
        (SELECT COUNT(*) FROM Comments c WHERE c.Post_idPost = p.idPost) AS comments_count
      FROM Post p
      JOIN User u ON p.User_idUser = u.idUser
      JOIN Topic t ON p.Topic_idTopic = t.idTopic
      JOIN Category c ON t.Category_id = c.idCategory
      ORDER BY p.created_at DESC
    `);

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar posts." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Criar um novo post
exports.createPost = async (req, res) => {
  let connection;
  const { content, Topic_idTopic } = req.body;
  const User_idUser = req.data.id;
  const image = req.file ? req.file.filename : null;

  if (!content || !User_idUser) {
    return res
      .status(400)
      .json({ message: "Conteúdo e usuário são obrigatórios." });
  }

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      "INSERT INTO Post (title, content, image, User_idUser, Topic_idTopic) VALUES (?, ?, ?, ?, ?)",
      ["", content, image, User_idUser, Topic_idTopic || null]
    );
    res
      .status(201)
      .json({ message: "Post criado com sucesso!", postId: result.insertId });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor ao criar post." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Obter um único post por ID
exports.getPostById = async (req, res) => {
  let connection;
  const { postId } = req.params;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `
      SELECT
          p.idPost,
          p.content,
          p.image,
          p.created_at,
          p.updated_at,
          u.idUser AS user_id,
          u.nameUser,
          u.image_profile,
          (SELECT COUNT(*) FROM Likes l WHERE l.Post_idPost = p.idPost) AS likes_count,
          (SELECT COUNT(*) FROM Comments c WHERE c.Post_idPost = p.idPost) AS comments_count
      FROM Post p
      JOIN User u ON p.User_idUser = u.idUser
      WHERE p.idPost = ?
    `,
      [postId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post não encontrado." });
    }
    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error("Erro ao buscar post por ID:", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar post." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.toggleLike = async (req, res) => {
  let connection;
  const { postId } = req.params;
  const userId = req.data.id; // ID do usuário autenticado

  try {
    connection = await getConnection();
    const [existingLike] = await connection.execute(
      "SELECT idLikes FROM Likes WHERE Post_idPost = ? AND User_idUser = ?",
      [postId, userId]
    );

    if (existingLike.length > 0) {
      await connection.execute("DELETE FROM Likes WHERE idLikes = ?", [
        existingLike[0].idLikes,
      ]);
      res
        .status(200)
        .json({ message: "Like removido com sucesso.", liked: false });
    } else {
      await connection.execute(
        "INSERT INTO Likes (Post_idPost, User_idUser) VALUES (?, ?)",
        [postId, userId]
      );
      res
        .status(201)
        .json({ message: "Post curtido com sucesso.", liked: true });
    }
  } catch (error) {
    console.error("Erro ao curtir/descurtir post:", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ao curtir/descurtir post." });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateContentPost = async (req, res) => {
  let connection;
  const idPost = req.params.postId;
  const User_idUser = req.data.id;
  const { content } = req.body;

  try {
    connection = await getConnection();
    const [resultUpdate] = await connection.execute(
      "SELECT * FROM Post WHERE idPost = ?",
      [idPost]
    );

    if (resultUpdate.length === 0) {
      return res.status(404).json({
        success: false,
        message: `A postagem não foi encontrada para ser atualizada!`,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Post SET content = ? WHERE idPost = ? AND User_idUser = ?`,
      [content, idPost, User_idUser]
    );

    return res.status(201).json({
      message: "Conteúdo da postagem foi atualizado com sucesso!",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar conteúdo do post:", error);
    return res.status(500).json({
      message: "Erro ao atualizar o conteúdo da postagem.",
      success: false,
      data: error,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateImagePost = async (req, res) => {
  let connection;
  const idPost = req.params.postId;
  const User_idUser = req.data.id;
  const image = req.file ? req.file.filename : null;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      "SELECT * FROM Post WHERE idPost = ?",
      [idPost]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `A postagem não foi encontrada para ser atualizada!`,
      });
    }

    const [resultUpdate] = await connection.execute(
      `UPDATE Post SET image = ? WHERE idPost = ? AND User_idUser = ?`,
      [image, idPost, User_idUser]
    );

    return res.status(200).json({
      message: "A imagem da postagem foi atualizada com sucesso!",
      success: true,
      data: resultUpdate,
    });
  } catch (error) {
    console.error("Erro ao atualizar imagem do post:", error);
    return res.status(500).json({
      message: "Erro ao atualizar a imagem da postagem.",
      success: false,
      data: error,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deletePost = async (req, res) => {
  let connection;
  const idPost = req.params.postId;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      "SELECT * FROM Post WHERE idPost = ?",
      [idPost]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: `Não existe postagens ainda. Por favor, crie para poder deletar alguma.`,
        success: false,
      });
    }

    if (result[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        success: false,
        message: "Você não tem permissão para excluir esta postagem.",
      });
    }

    const [deleteResult] = await connection.execute(
      `DELETE FROM Post WHERE idPost = ? AND User_idUser = ?`,
      [idPost, User_idUser]
    );

    // Emitindo um evento para o socket.io
    // const io = getIO();
    // io.emit("postDeleted", {
    //   id: idPost,
    // });

    return res.status(200).json({
      message: "Exclusão da postagem realizada com sucesso",
      success: true,
      data: deleteResult,
    });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return res.status(500).json({
      message: "Erro ao excluir a postagem. Tente novamente.",
      success: false,
      data: error,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};