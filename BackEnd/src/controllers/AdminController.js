const getConnection = require("../config/promise");

exports.ViewAllAdmins = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM User WHERE status_permission = 'Admin'`
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: `Não foi possível encontrar um usuário com a permissão 'Admin'`,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir os Admins.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar admins:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
      data: error
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.ViewOnlyAdminByUser = async (req, res) => {
  let connection;
  const userData = req.data;
  const idUser = req.params.idUser;

  try {
    connection = await getConnection();
    const [result] = connection.execute(
      `SELECT * FROM User WHERE idUser = ? and status_permission = 'Admin'`,
      [idUser]
    );

    if (userData.role !== "Admin" && userData.role !== "SuperAdmin") {
      return res.status(403).json({
        message: "Você não tem permissão para visualizar um usuário.",
        success: false,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: `Não foi possível encontrar o usuario desejado.`,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir o usuario desejado.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar somente o usuário admin", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
      data: error
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateUserPermission = async (req, res) => {
  let connection;
  const userData = req.data;
  const idUser = req.params.idUser;
  const { status_permission } = req.body;

  try {
    connection = await getConnection();
    const [resultResearch] = connection.execute(
      `SELECT * FROM User WHERE idUser = ? and (status_permission = 'User' or status_permission = 'Admin')`,
      [idUser]
    );
    if (userData.role !== "SuperAdmin") {
      return res.status(403).json({
        message:
          "Você não tem permissão para alterar a permissão de um usuário.",
        success: false,
      });
    }

    if (resultResearch.length === 0) {
      return res.status(404).json({
        message: `Usuário não encontrado ou já possui permissão elevada.`,
        success: false,
      });
    }

    const [ResultUpdatePermission] = connection.execute(
      `UPDATE User SET status_permission = ? WHERE idUser = ? `,
      [status_permission, idUser]
    );

    if (ResultUpdatePermission.length > 0) {
      return res.status(200).json({
        message: "Sucesso ao mudar a permissão do usuário.",
        success: true,
        data: resultResearch,
      });
    }
  } catch (error) {
    console.error("Erro ao mudar a permissão do usuário", error)
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

exports.DeleteUserAdmin = (req, res) => {
  const idUser = req.params.idUser;
  const role = req.data.role;
};
