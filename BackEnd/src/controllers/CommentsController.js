const getConnection = require("../config/promise");

// menos verboso, mais elegante e seguro... evita callbacks
// callbacks = É uma função passada como argumento para ser executada depois que uma operação terminar.
exports.getCommentsByPostId = async (req, res) => {
  let connection;

  const { postId } = req.params;
  try {
    connection = await getConnection();
    const [rows] = await connection.execute(
      `
      SELECT
        c.idComments,
        c.message AS content,
        c.createdDate,
        u.idUser AS user_id,
        u.nameUser,
        u.image_profile
      FROM Comments c
      JOIN User u ON c.User_idUser = u.idUser
      WHERE c.Post_idPost = ?
      ORDER BY c.createdDate ASC
    `,
      [postId]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar comentários." });
  }
};

exports.createComment = async (req, res) => {
  let connection;

  const { postId } = req.params;
  const { message } = req.body;
  const User_idUser = req.data.id;

  if (!postId || !message) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });
  }

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM comments WHERE Post_idPost = ? AND User_idUser = ? AND message = ?`,
      [postId, User_idUser, message]
    );

    if (result.length > 0) {
      return res.status(409).json({
        message: "Comentário duplicado: tente escrever algo diferente.",
        success: false,
      });
    }

    const [createComment] = await connection.execute(
      `INSERT INTO comments (Post_idPost, User_idUser, message) 
        VALUES (?, ?, ?)
        `,
      [postId, User_idUser, message]
    );
    if (createComment.affectedRows > 0) {
      return res.status(201).json({
        message: "Comentário criado com sucesso.",
        success: true,
        data: {
          idComments: createComment.insertId,
          UserId: User_idUser,
          content: message,
        },
      });
    }
  } catch (error) {
    console.error("Erro ao criar um comentário:", error);

    return res.status(500).json({
      message: "Erro interno do servidor ao criar comentário.",
      success: false,
      data: error,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateComment = async (req, res) => {
  let connection;

  const idComments = req.params.idComments;
  const { message } = req.body;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM comments WHERE idComments = ? AND User_idUser = ?`
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Comentário não encontrado.",
        success: false,
        data: result,
      });
    }

    if (result[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para acessar essa seção.",
        success: false,
      });
    }
    const [updatedComment] = await connection.execute(
      `UPDATE comments SET message = ? WHERE idComments = ? AND User_idUser = ?`,
      [message, idComments, User_idUser]
    );
    if (updatedComment.affectedRows > 0) {
      return res.status(201).json({
        message: "Comentário atualizado com sucesso.",
        success: true,
        data: result,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar um comentário: ", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
      data: err,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deleteComment = async (req, res) => {
  let connection;

  const idComments = req.params.idComments;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM comments WHERE idComments = ? AND User_idUser = ?`
    );

    if (result[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para acessar essa seção.",
        success: false,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Comentário não encontrado.",
        success: false,
        data: result,
      });
    }
    const [ResultDeleteComment] = await connection.execute();
    if (ResultDeleteComment.affectedRows > 0) {
      const io = getIO();
      io.emit("commentDeleted", { idComments, User_idUser });

      return res.status(201).json({
        message: "Comentário deletado com sucesso.",
        success: true,
        data: result,
      });
    }
  } catch (error) {
    console.error("Erro ao deletar comentário: ", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
      data: error,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
