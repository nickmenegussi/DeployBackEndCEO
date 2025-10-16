const getConnection = require("../config/promise");

exports.viewNotificationsByUser = async (req, res) => {
  let connection;

  const idNotifications = req.params.idNotification;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM notifications 
             WHERE User_idUser = ? AND idNotifications = ?
             ORDER BY created_at DESC`,
      [User_idUser, idNotifications]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Notificação não encontrada.",
        success: false,
      });
    }

    if (result[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para acessar essa seção.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir as notificações do usuário desejado.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
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

exports.viewAllNotifications = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM notifications 
             ORDER BY created_at DESC`
    );

    return res.status(200).json({
      message: "Sucesso ao exibir as notificações.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
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

exports.createNotification = async (req, res) => {
  let connection;

  const { message } = req.body;
  const User_idUser = req.data.id;

  if (!message) {
    return res.status(400).json({
      message: "Por favor, insira uma mensagem.",
      success: false,
    });
  }

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `INSERT INTO notifications (message, isRead, User_idUser)
             VALUES (?, ?, ?)`,
      [message, false, User_idUser]
    );

    return res.status(201).json({
      message: "Sucesso ao criar a notificação.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
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

exports.getNotificationsStatusofRead = async (req, res) => {
  let connection;

  const idNotifications = req.params.idNotification;
  const User_idUser = req.data.id;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM notifications 
             WHERE User_idUser = ? AND idNotifications = ?`,
      [User_idUser, idNotifications]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Notificação não encontrada.",
        success: false,
      });
    }

    if (result[0].isRead === true) {
      return res.status(200).json({
        message: "Notificação lida.",
        success: true,
        data: result,
      });
    }

    return res.status(200).json({
      message: "Notificação não lida.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar status da notificação:", error);
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

exports.updateNotificationStatusofRead = async (req, res) => {
  const idNotifications = req.params.idNotification;
  let connection;

  const User_idUser = req.data.id;

  try {
    connection = await getConnection();

    const [existingNotification] = await connection.execute(
      "SELECT * FROM notifications WHERE User_idUser = ? AND idNotifications = ?",
      [User_idUser, idNotifications]
    );

    if (existingNotification.length === 0) {
      return res.status(404).json({
        message: "Notificação não encontrada.",
        success: false,
      });
    }

    if (existingNotification[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para atualizar esta notificação.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE notifications 
             SET isRead = true
             WHERE User_idUser = ? AND idNotifications = ?`,
      [User_idUser, idNotifications]
    );

    return res.status(200).json({
      message: "O status da notificação foi atualizado.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar status da notificação:", error);
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

exports.updateNotificationMessage = async (req, res) => {
  const idNotifications = req.params.idNotifications;
  const User_idUser = req.data.id;
  const { message } = req.body;
  let connection;

  if (!message) {
    return res.status(400).json({
      message: "Por favor, insira uma mensagem.",
      success: false,
    });
  }

  try {
    connection = await getConnection();

    const [existingNotification] = await connection.execute(
      `SELECT * FROM notifications 
             WHERE User_idUser = ? AND idNotifications = ?`,
      [User_idUser, idNotifications]
    );

    if (existingNotification.length === 0) {
      return res.status(404).json({
        message: "Notificação não encontrada.",
        success: false,
      });
    }

    if (existingNotification[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para atualizar esta notificação.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE notifications 
             SET message = ?
             WHERE User_idUser = ? AND idNotifications = ?`,
      [message, User_idUser, idNotifications]
    );

    return res.status(200).json({
      message: "A mensagem foi atualizada.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar mensagem da notificação:", error);
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

exports.deleteNotification = async (req, res) => {
  const idNotifications = req.params.idNotifications;
  const User_idUser = req.data.id;
  let connection;

  try {
    connection = await getConnection();

    const [existingNotification] = await connection.execute(
      `SELECT * FROM notifications 
             WHERE User_idUser = ? AND idNotifications = ?`,
      [User_idUser, idNotifications]
    );

    if (existingNotification.length === 0) {
      return res.status(404).json({
        message: "Notificação não encontrada.",
        success: false,
      });
    }

    if (existingNotification[0].User_idUser !== User_idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para deletar esta notificação.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM notifications 
             WHERE User_idUser = ? AND idNotifications = ?`,
      [User_idUser, idNotifications]
    );

    return res.status(200).json({
      message: "A notificação foi deletada.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar notificação:", error);
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
