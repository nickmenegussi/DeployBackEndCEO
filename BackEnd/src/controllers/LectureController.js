const getConnection = require("../config/promise");

exports.viewAllLectures = async (req, res) => {
  let connection;

  try {
    const [result] = await connection.execute(`SELECT * FROM Lecture`);

    if (result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
        data: result,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir palestras.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar palestras:", error);
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

exports.viewLecturesById = async (req, res) => {
  let connection;

  const { idLecture } = req.params;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
        data: result,
      });
    }

    return res.status(200).json({
      message: "Palestra encontrada.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar palestra:", error);
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

exports.createLecture = async (req, res) => {
  let connection;

  const {
    nameLecture,
    description,
    dateLecture,
    link_url,
    timeLecture,
    video_url,
  } = req.body;

  if (
    !nameLecture ||
    !description ||
    !dateLecture ||
    !link_url ||
    !timeLecture ||
    !video_url
  ) {
    return res.status(400).json({
      message: "Preencha todos os campos de cadastro.",
      success: false,
    });
  }

  try {
    connection = await getConnection();

    const [existingLecture] = await connection.execute(
      "SELECT * FROM Lecture WHERE nameLecture = ? AND description = ? AND dateLecture = ? AND link_url = ? AND timeLecture = ? AND video_url = ?",
      [nameLecture, description, dateLecture, link_url, timeLecture, video_url]
    );

    if (existingLecture.length > 0) {
      return res.status(409).json({
        message: "Palestra já cadastrada.",
        success: false,
        data: existingLecture,
      });
    }

    const [result] = await connection.execute(
      `INSERT INTO Lecture (nameLecture, dateLecture, timeLecture, description, link_url, video_url) VALUES (?, ?, ?, ?, ?, ?)`,
      [nameLecture, dateLecture, timeLecture, description, link_url, video_url]
    );

    return res.status(201).json({
      message: "Palestra criada com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar palestra:", error);
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

exports.updateLectureName = async (req, res) => {
  let connection;

  const { idLecture } = req.params;
  const { nameLecture } = req.body;

  try {
    connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Lecture SET nameLecture = ? WHERE idLecture = ?`,
      [nameLecture, idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Palestra atualizada com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar nome da palestra:", error);
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

exports.updateLectureDate = async (req, res) => {
  let connection;

  const { idLecture } = req.params;
  const { dateLecture } = req.body;

  try {
        connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Lecture SET dateLecture = ? WHERE idLecture = ?`,
      [dateLecture, idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar a data da palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Data da Palestra atualizada com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar data da palestra:", error);
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

exports.updateLectureTime = async (req, res) => {
  let connection;

  const { idLecture } = req.params;
  const { timeLecture } = req.body;

  try {
        connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Lecture SET timeLecture = ? WHERE idLecture = ?`,
      [timeLecture, idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar o horário da palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Horário da Palestra atualizado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar horário da palestra:", error);
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

exports.updateLectureDescription = async (req, res) => {
  let connection;

  const { idLecture } = req.params;
  const { description } = req.body;

  try {
        connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Lecture SET description = ? WHERE idLecture = ?`,
      [description, idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar a descrição da palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Descrição da Palestra atualizada com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar descrição da palestra:", error);
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

exports.updateLecturelink_url = async (req, res) => {
  let connection;

  const { idLecture } = req.params;
  const { link_url } = req.body;

  try {
        connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Lecture SET link_url = ? WHERE idLecture = ?`,
      [link_url, idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar o link_url da palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "link_url da Palestra atualizado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar link_url da palestra:", error);
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

exports.updateLectureVideoUrl = async (req, res) => {
  let connection;

  const { idLecture } = req.params;
  const { video_url } = req.body;

  try {
        connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Lecture SET video_url = ? WHERE idLecture = ?`,
      [video_url, idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao atualizar o link_url do vídeo da palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "link_url do vídeo da Palestra atualizado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar video_url da palestra:", error);
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

exports.deleteLecture = async (req, res) => {
  let connection;

  const { idLecture } = req.params;

  try {
        connection = await getConnection();

    const [existingLecture] = await connection.execute(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao deletar a palestra.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Palestra deletada com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar palestra:", error);
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
