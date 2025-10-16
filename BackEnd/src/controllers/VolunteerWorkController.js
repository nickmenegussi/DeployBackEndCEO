const getConnection = require("../config/promise");

exports.viewVolunteerWork = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute("SELECT * FROM VolunteerWork");

    return res.status(200).json({
      message: "Sucesso ao exibir os trabalhos voluntários.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar trabalhos voluntários:", error);
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

exports.viewOnlyVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: `Erro ao exibir o trabalho voluntário com o id ${idVolunteerWork}. Tente novamente!`,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir os trabalhos voluntários.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar trabalho voluntário:", error);
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

exports.updateTimeVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  const { timeVolunteerWork } = req.body;
  let connection;

  if (!timeVolunteerWork) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE VolunteerWork SET timeVolunteerWork = ? WHERE idVolunteerWork = ?",
      [timeVolunteerWork, idVolunteerWork]
    );

    return res.status(200).json({
      success: true,
      message: "Horário atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar horário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar o horário.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.createVolunteerWork = async (req, res) => {
  const { nameVolunteerWork, address, dateVolunteerWork, work_description } =
    req.body;
  let connection;

  if (
    !nameVolunteerWork ||
    !address ||
    !dateVolunteerWork ||
    !work_description
  ) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE nameVolunteerWork = ? AND address = ? AND dateVolunteerWork = ? AND work_description = ?",
      [nameVolunteerWork, address, dateVolunteerWork, work_description]
    );

    if (existingWork.length > 0) {
      return res.status(409).json({
        message: "Trabalho voluntário já cadastrado.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      "INSERT INTO VolunteerWork(nameVolunteerWork, address, dateVolunteerWork, work_description) VALUES(?, ?, ?, ?)",
      [nameVolunteerWork, address, dateVolunteerWork, work_description]
    );

    return res.status(201).json({
      success: true,
      message: "Trabalho Voluntário cadastrado com sucesso",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar trabalho voluntário:", error);
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

exports.updateNameVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  const { nameVolunteerWork } = req.body;
  let connection;

  if (!nameVolunteerWork) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        message: `Trabalho voluntário não encontrado no nosso sistema.`,
        success: false,
      });
    }

    const [result] = await connection.execute(
      "UPDATE VolunteerWork SET nameVolunteerWork = ? WHERE idVolunteerWork = ?",
      [nameVolunteerWork, idVolunteerWork]
    );

    return res.status(200).json({
      success: true,
      message: "Nome atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar nome do trabalho voluntário:", error);
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

exports.updateAddressVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  const { address } = req.body;
  let connection;

  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE VolunteerWork SET address = ? WHERE idVolunteerWork = ?",
      [address, idVolunteerWork]
    );

    return res.status(200).json({
      success: true,
      message: "Endereço atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar o endereço.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateDateVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  const { dateVolunteerWork } = req.body;
  let connection;

  if (!dateVolunteerWork) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE VolunteerWork SET dateVolunteerWork = ? WHERE idVolunteerWork = ?",
      [dateVolunteerWork, idVolunteerWork]
    );

    return res.status(200).json({
      success: true,
      message: "Data do trabalho atualizada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar data:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a data.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateWorkDescriptionVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  const { work_description } = req.body;
  let connection;

  if (!work_description) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O Trabalho voluntário com o id ${idVolunteerWork} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE VolunteerWork SET work_description = ? WHERE idVolunteerWork = ?",
      [work_description, idVolunteerWork]
    );

    return res.status(200).json({
      success: true,
      message: "Descrição do trabalho atualizada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar descrição:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a descrição.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deleteVolunteerWork = async (req, res) => {
  const idVolunteerWork = req.params.idVolunteerWork;
  let connection;

  try {
    connection = await getConnection();

    const [existingWork] = await connection.execute(
      "SELECT * FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (existingWork.length === 0) {
      return res.status(404).json({
        message: `O trabalho voluntário com o id ${idVolunteerWork}, não existe no nosso sistema.`,
        success: false,
      });
    }

    const [result] = await connection.execute(
      "DELETE FROM VolunteerWork WHERE idVolunteerWork = ?",
      [idVolunteerWork]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message:
          "Trabalho voluntario não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Trabalho voluntário deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar trabalho voluntário:", error);
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
