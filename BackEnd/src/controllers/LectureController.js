const pool = require("../config/promise");

exports.viewAllLectures = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM Lecture`);

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
  }
};

exports.viewLecturesById = async (req, res) => {
  const { idLecture } = req.params;

  try {
    const [result] = await pool.query(
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
  }
};

exports.createLecture = async (req, res) => {
  const {
    nameLecture,
    description,
    dateLecture,
    link_url,
    timeLecture,
    video_url,
  } = req.body;

  if (!nameLecture || !description || !dateLecture || !link_url || !timeLecture || !video_url) {
    return res.status(400).json({
      message: "Preencha todos os campos de cadastro.",
      success: false,
    });
  }

  try {
    const [existingLecture] = await pool.query(
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

    const [result] = await pool.query(
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
  }
};

exports.updateLectureName = async (req, res) => {
  const { idLecture } = req.params;
  const { nameLecture } = req.body;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};

exports.updateLectureDate = async (req, res) => {
  const { idLecture } = req.params;
  const { dateLecture } = req.body;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};

exports.updateLectureTime = async (req, res) => {
  const { idLecture } = req.params;
  const { timeLecture } = req.body;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};

exports.updateLectureDescription = async (req, res) => {
  const { idLecture } = req.params;
  const { description } = req.body;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};

exports.updateLecturelink_url = async (req, res) => {
  const { idLecture } = req.params;
  const { link_url } = req.body;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};

exports.updateLectureVideoUrl = async (req, res) => {
  const { idLecture } = req.params;
  const { video_url } = req.body;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};

exports.deleteLecture = async (req, res) => {
  const { idLecture } = req.params;

  try {
    const [existingLecture] = await pool.query(
      `SELECT * FROM Lecture WHERE idLecture = ?`,
      [idLecture]
    );

    if (existingLecture.length === 0) {
      return res.status(404).json({
        message: "Nenhuma palestra encontrada.",
        success: false,
      });
    }

    const [result] = await pool.query(
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
  }
};