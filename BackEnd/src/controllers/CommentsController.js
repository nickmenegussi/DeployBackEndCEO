<<<<<<< HEAD
const getConnection = require("../config/promise");

// menos verboso, mais elegante e seguro... evita callbacks
// callbacks = É uma função passada como argumento para ser executada depois que uma operação terminar.
exports.getCommentsByPostId = async (req, res) => {
  let connection;

=======
exports.getCommentsByPostId = async (req, res) => {
  let connection;
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
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
<<<<<<< HEAD
    `,
=======
      `,
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      [postId]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
<<<<<<< HEAD
    return res
      .status(500)
      .json({ message: "Erro interno do servidor ao buscar comentários." });
=======
    return res.status(500).json({ message: "Erro interno do servidor ao buscar comentários." });
  } finally {
    if (connection) await connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.createComment = async (req, res) => {
  let connection;
<<<<<<< HEAD

  const { postId } = req.params;
  const { message } = req.body;
  const User_idUser = req.data.id;

  if (!postId || !message) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios não preenchidos" });
=======
  const { postId } = req.params;
  const { message } = req.body;
  const User_idUser = req.data.id;

  if (!postId || !message) {
    return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }

  try {
    connection = await getConnection();
<<<<<<< HEAD
    const [result] = await connection.execute(
=======

    const [existing] = await connection.execute(
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      `SELECT * FROM comments WHERE Post_idPost = ? AND User_idUser = ? AND message = ?`,
      [postId, User_idUser, message]
    );

<<<<<<< HEAD
    if (result.length > 0) {
=======
    if (existing.length > 0) {
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      return res.status(409).json({
        message: "Comentário duplicado: tente escrever algo diferente.",
        success: false,
      });
    }

<<<<<<< HEAD
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
=======
    const [result] = await connection.execute(
      `INSERT INTO comments (Post_idPost, User_idUser, message) VALUES (?, ?, ?)`,
      [postId, User_idUser, message]
    );

    return res.status(201).json({
      message: "Comentário criado com sucesso.",
      success: true,
      data: { idComments: result.insertId, UserId: User_idUser, content: message },
    });
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao criar comentário.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.updateComment = async (req, res) => {
  let connection;
  const idComments = req.params.idComments;
  const { message } = req.body;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();

    const [existing] = await connection.execute(
      `SELECT * FROM comments WHERE idComments = ? AND User_idUser = ?`,
      [idComments, User_idUser]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: "Comentário não encontrado.",
        success: false,
        data: existing,
      });
    }

    if (existing[0].User_idUser !== User_idUser) {
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      return res.status(403).json({
        message: "Você não tem permissão para acessar essa seção.",
        success: false,
      });
    }
<<<<<<< HEAD
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
=======

    const [result] = await connection.execute(
      `UPDATE comments SET message = ? WHERE idComments = ? AND User_idUser = ?`,
      [message, idComments, User_idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar comentário.",
        success: false,
        data: result,
      });
    }

    return res.status(201).json({
      message: "Comentário atualizado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.deleteComment = async (req, res) => {
  let connection;
  const idComments = req.params.idComments;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();

    const [existing] = await connection.execute(
      `SELECT * FROM comments WHERE idComments = ? AND User_idUser = ?`,
      [idComments, User_idUser]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: "Comentário não encontrado.",
        success: false,
        data: existing,
      });
    }

    if (existing[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para acessar essa seção.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM comments WHERE idComments = ? AND User_idUser = ?`,
      [idComments, User_idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao deletar comentário.",
        success: false,
        data: result,
      });
    }

    // Emitendo um evento para o socket.io (mantive a chamada conforme seu código original)
    try {
      const io = getIO()
      io.emit("commentDeleted", { idComments, User_idUser });
    } catch (emitErr) {
      // não bloqueia a resposta principal se o socket falhar
      console.error("Erro ao emitir evento socket:", emitErr);
    }

    return res.status(201).json({
      message: "Comentário deletado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
