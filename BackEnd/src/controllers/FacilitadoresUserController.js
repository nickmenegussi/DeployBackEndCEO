const getConnection = require("../config/promise");

exports.viewAllFacilitadores = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.execute("SELECT * FROM Facilitadores");

    return res.status(200).json({
      message: "Sucesso ao exibir os usuários facilitadores.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores:", error);
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

exports.viewOnlyFacilitadorById = async (req, res) => {
  let connection;

  const User_idUser = req.params.User_idUser;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * 
             FROM Facilitadores f
             JOIN User u ON u.idUser = f.User_idUser
             WHERE f.User_idUser = ?`,
      [User_idUser]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitador não encontrado.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir o facilitador desejado.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar facilitador:", error);
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

exports.viewFacilitadoresByGroupoESDE = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Facilitadores WHERE category = 'ESDE'`
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitadores não encontrados.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir os facilitadores do grupo ESDE.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores ESDE:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.viewFacilitadoresByGroupoCIEDE = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Facilitadores WHERE category = 'CIEDE'`
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitadores não encontrados.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir os facilitadores do grupo CIEDE.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores CIEDE:", error);
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

exports.viewFacilitadoresByGroupoMEDIUNICO = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Facilitadores WHERE category = 'MEDIUNIDADE'`
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitadores não encontrados.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir os facilitadores do grupo MEDIUNIDADE.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores MEDIUNIDADE:", error);
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

exports.createFacilitadores = async (req, res) => {
  let connection;

  const {
    User_idUser,
    description,
    apelido,
    espiritaSinceTime,
    category,
    memberSinceWhen,
  } = req.body;

  if (
    !User_idUser ||
    !description ||
    !apelido ||
    !espiritaSinceTime ||
    !category ||
    !memberSinceWhen
  ) {
    return res.status(400).json({
      message: "Dados inválidos.",
      success: false,
    });
  }

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `INSERT INTO Facilitadores(User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        User_idUser,
        description,
        apelido,
        espiritaSinceTime,
        category,
        memberSinceWhen,
      ]
    );

    return res.status(201).json({
      message: "Facilitador criado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar facilitador:", error);
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

exports.deleteFacilitadores = async (req, res) => {
  let connection;

  const idFacilitador = req.params.idFacilitador;

  try {
    connection = await getConnection();

    const [existingFacilitador] = await connection.execute(
      "SELECT * FROM Facilitadores WHERE idFacilitador = ?",
      [idFacilitador]
    );

    if (existingFacilitador.length === 0) {
      return res.status(404).json({
        message: "Facilitador não encontrado.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM Facilitadores WHERE idFacilitador = ?`,
      [idFacilitador]
    );

    return res.status(200).json({
      message: "Facilitador deletado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar facilitador:", error);
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
