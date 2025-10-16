const getConnection = require("../config/promise");
<<<<<<< HEAD
=======

/* ========================= FACILITADORES CONTROLLER ========================= */
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32

exports.viewAllFacilitadores = async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
<<<<<<< HEAD
    const [result] = await connection.execute("SELECT * FROM Facilitadores");

    return res.status(200).json({
      message: "Sucesso ao exibir os usuários facilitadores.",
      success: true,
      data: result,
=======
    const [result] = await connection.execute('SELECT * FROM Facilitadores');

    return res.status(200).json({
      message: 'Sucesso ao exibir os usuários facilitadores.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.viewOnlyFacilitadorById = async (req, res) => {
  let connection;
<<<<<<< HEAD

  const User_idUser = req.params.User_idUser;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * 
             FROM Facilitadores f
             JOIN User u ON u.idUser = f.User_idUser
             WHERE f.User_idUser = ?`,
=======
  const User_idUser = req.params.User_idUser;

  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      `SELECT * 
       FROM Facilitadores f
       JOIN User u ON u.idUser = f.User_idUser
       WHERE f.User_idUser = ?`, 
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      [User_idUser]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitador não encontrado.",
        success: false,
      });
    }

    return res.status(200).json({
<<<<<<< HEAD
      message: "Sucesso ao exibir o facilitador desejado.",
      success: true,
      data: result,
=======
      message: 'Sucesso ao exibir o facilitador desejado.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao buscar facilitador:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.viewFacilitadoresByGroupoESDE = async (req, res) => {
  let connection;
<<<<<<< HEAD

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Facilitadores WHERE category = 'ESDE'`
    );

=======
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(`SELECT * FROM Facilitadores WHERE category = 'ESDE'`);

>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitadores não encontrados.",
        success: false,
      });
    }

    return res.status(200).json({
<<<<<<< HEAD
      message: "Sucesso ao exibir os facilitadores do grupo ESDE.",
      success: true,
      data: result,
=======
      message: 'Sucesso ao exibir os facilitadores do grupo ESDE.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores ESDE:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.viewFacilitadoresByGroupoCIEDE = async (req, res) => {
  let connection;
<<<<<<< HEAD

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Facilitadores WHERE category = 'CIEDE'`
    );

=======
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(`SELECT * FROM Facilitadores WHERE category = 'CIEDE'`);

>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitadores não encontrados.",
        success: false,
      });
    }

    return res.status(200).json({
<<<<<<< HEAD
      message: "Sucesso ao exibir os facilitadores do grupo CIEDE.",
      success: true,
      data: result,
=======
      message: 'Sucesso ao exibir os facilitadores do grupo CIEDE.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores CIEDE:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.viewFacilitadoresByGroupoMEDIUNICO = async (req, res) => {
  let connection;
<<<<<<< HEAD

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Facilitadores WHERE category = 'MEDIUNIDADE'`
    );

=======
  try {
    connection = await pool.getConnection();
    const [result] = await connection.execute(`SELECT * FROM Facilitadores WHERE category = 'MEDIUNIDADE'`);

>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    if (result.length === 0) {
      return res.status(404).json({
        message: "Facilitadores não encontrados.",
        success: false,
      });
    }

    return res.status(200).json({
<<<<<<< HEAD
      message: "Sucesso ao exibir os facilitadores do grupo MEDIUNIDADE.",
      success: true,
      data: result,
=======
      message: 'Sucesso ao exibir os facilitadores do grupo MEDIUNIDADE.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao buscar facilitadores MEDIUNIDADE:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.createFacilitadores = async (req, res) => {
  let connection;
<<<<<<< HEAD

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
=======
  const { User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen } = req.body;

  if (!User_idUser || !description || !apelido || !espiritaSinceTime || !category || !memberSinceWhen) {
    return res.status(400).json({
      message: "Dados inválidos.",
      success: false
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  }

  try {
<<<<<<< HEAD
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
=======
    connection = await pool.getConnection();
    const [result] = await connection.execute(
      `INSERT INTO Facilitadores(User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen) VALUES (?, ?, ?, ?, ?, ?)`, 
      [User_idUser, description, apelido, espiritaSinceTime, category, memberSinceWhen]
    );

    return res.status(201).json({
      message: 'Facilitador criado com sucesso.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao criar facilitador:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
  }
};

exports.deleteFacilitadores = async (req, res) => {
  let connection;
<<<<<<< HEAD

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
=======
  const idFacilitador = req.params.idFacilitador;

  try {
    connection = await pool.getConnection();
    const [existingFacilitador] = await connection.execute(
      'SELECT * FROM Facilitadores WHERE idFacilitador = ?', 
      [idFacilitador]
    );

    if (existingFacilitador.length === 0) {
      return res.status(404).json({
        message: "Facilitador não encontrado.",
        success: false
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      });
    }

    const [result] = await connection.execute(
<<<<<<< HEAD
      `DELETE FROM Facilitadores WHERE idFacilitador = ?`,
=======
      `DELETE FROM Facilitadores WHERE idFacilitador = ?`, 
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
      [idFacilitador]
    );

    return res.status(200).json({
<<<<<<< HEAD
      message: "Facilitador deletado com sucesso.",
      success: true,
      data: result,
=======
      message: 'Facilitador deletado com sucesso.',
      success: true,
      data: result
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
    });
  } catch (error) {
    console.error("Erro ao deletar facilitador:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
<<<<<<< HEAD
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
=======
      success: false
    });
  } finally {
    if (connection) connection.end();
  }
};
>>>>>>> 76e7996f6e64171b329bcd6edd870df3b3344d32
