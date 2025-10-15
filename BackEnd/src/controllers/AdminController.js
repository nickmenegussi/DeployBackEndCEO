const getConnection = require("../config/promise");

// ==========================
// ViewAllAdmins
// ==========================
exports.ViewAllAdmins = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(`SELECT * FROM User WHERE status_permission = 'Admin'`);

    if (result.length === 0) {
      return res.status(404).json({
        message: `Não foi possível encontrar um usuário com a permissão 'Admin'`,
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Sucesso ao exibir os Admins.',
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar admins:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

// ==========================
// ViewOnlyAdminByUser
// ==========================
exports.ViewOnlyAdminByUser = async (req, res) => {
  let connection;
  const userData = req.data;
  const idUser = req.params.idUser;

  if (userData.role !== 'Admin' && userData.role !== 'SuperAdmin') {
    return res.status(403).json({
      message: "Você não tem permissão para visualizar um usuário.",
      success: false,
    });
  }

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM User WHERE idUser = ? AND status_permission = 'Admin'`,
      [idUser]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: `Não foi possível encontrar o usuario desejado.`,
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Sucesso ao exibir o usuario desejado.',
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar admin:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

// ==========================
// updateUserPermission
// ==========================
exports.updateUserPermission = async (req, res) => {
  let connection;
  const userData = req.data;
  const idUser = req.params.idUser;
  const { status_permission } = req.body;

  if (userData.role !== 'SuperAdmin') {
    return res.status(403).json({
      message: "Você não tem permissão para alterar a permissão de um usuário.",
      success: false,
    });
  }

  try {
    connection = await getConnection();

    const [existingUser] = await connection.execute(
      `SELECT * FROM User WHERE idUser = ? AND (status_permission = 'User' OR status_permission = 'Admin')`,
      [idUser]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        message: `Usuário não encontrado ou já possui permissão elevada.`,
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE User SET status_permission = ? WHERE idUser = ?`,
      [status_permission, idUser]
    );

    return res.status(200).json({
      message: 'Sucesso ao mudar a permissão do usuário.',
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar permissão:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar o status do user.",
    });
  } finally {
    if (connection) await connection.end();
  }
};

// ==========================
// DeleteUserAdmin
// ==========================
exports.DeleteUserAdmin = async (req, res) => {
  let connection;
  const idUser = req.params.idUser;

  try {
    connection = await getConnection();
    await connection.execute(`DELETE FROM User WHERE idUser = ? AND status_permission = 'Admin'`, [idUser]);

    return res.status(200).json({
      message: 'Usuário deletado com sucesso.',
      success: true,
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({
      message: "Erro ao deletar usuário.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};
