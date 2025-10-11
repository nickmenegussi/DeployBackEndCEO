const pool = require("../config/promise");
const bcrypt = require("bcrypt");
const cloudinary = require('../config/cloudinary')

exports.viewOnlyUser = async (req, res) => {
  const dataUser = req.data.id;
  const roleUser = req.data.role;
  const idUser = req.params.idUser;

  if (roleUser !== "Admin" && roleUser !== "SuperAdmin" && dataUser !== idUser) {
    return res.status(403).json({
      message: "Você não tem permissão para acessar este usuário.",
      success: false,
    });
  }

  try {
    const [result] = await pool.query(
      "SELECT * FROM User WHERE idUser = ?",
      [idUser]
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: `O usuário com o id ${idUser}, não existe no nosso sistema`,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir o usuario.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.viewAllUser = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM User`);

    return res.status(200).json({
      message: "Sucesso ao exibir os usuarios.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.register = async (req, res) => {
  const image_profile = null;
  const { nameUser, email, password } = req.body;

  if (!nameUser || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    const hash_password = await bcrypt.hash(password, 10);

    const [existingUser] = await pool.query(
      "SELECT * FROM User WHERE nameUser = ? AND email = ?",
      [nameUser, email]
    );

    if (existingUser.length > 0) {
      return res.status(422).json({
        message: "Esse usário já existe, por favor, faça login.",
        success: false,
      });
    }

    const [existingEmail] = await pool.query(
      "SELECT idUser FROM User WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        message: "Esse email já foi cadastrado, tente fazer login.",
        success: false
      });
    }

    const [result] = await pool.query(
      "INSERT INTO User(nameUser, email, password, image_profile, status_permission) VALUES(?, ?, ?, ?, ?)",
      [nameUser, email, hash_password, image_profile, "User"]
    );

    return res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.updateUser = async (req, res) => {
  const idUser = req.data.id;
  const { email } = req.body;

  if (!idUser || !email) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM User WHERE idUser = ?",
      [idUser]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        message: "Usuario não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    const [result] = await pool.query(
      "UPDATE User SET email = ? WHERE idUser = ?",
      [email, idUser]
    );

    return res.status(200).json({
      message: "Sucesso ao alterar informações do usuário.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.updateUserName = async (req, res) => {
  const idUser = req.data.id;
  const { nameUser } = req.body;

  if (!nameUser) {
    return res.status(400).json({
      success: false,
      message: "O campo 'nameUser' é obrigatório.",
    });
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM User WHERE idUser = ?",
      [idUser]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const [result] = await pool.query(
      "UPDATE User SET nameUser = ? WHERE idUser = ?",
      [nameUser, idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Erro ao atualizar o nome do Usuário.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Nome atualizado com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar nome do usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao se conectar com o servidor.",
    });
  }
};

exports.updateUserPassword = async (req, res) => {
  const idUser = req.data.id;
  const { newPassword, currentPassword, confirmedPassword } = req.body;

  if (!idUser || !newPassword || !currentPassword || !confirmedPassword) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM User WHERE idUser = ?",
      [idUser]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        message: "Usuario não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    const user = existingUser[0];
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "A senha atual está incorreta. Por favor, digite novamente.",
        success: false,
      });
    }

    if (newPassword !== confirmedPassword) {
      return res.status(400).json({
        message: "A nova senha digitada não coincide com a confirmada. Por favor, digite novamente.",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 15);

    const [result] = await pool.query(
      "UPDATE User SET password = ? WHERE idUser = ?",
      [hashPassword, idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Nenhuma alteração foi feita. Por favor, tente novamente.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao alterar a senha",
      success: true,
    });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.updateUserImageProfile = async (req, res) => {
  const image_profile = req.file;
  const idUser = req.data.id;

  if (!idUser || !image_profile) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    const resultUploadImage = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        folder: "profile_pictures",
        resource_type: "image"
      }, (error, result) => {
        if(error) reject(error)
        else resolve(result)
      })
      stream.end(image_profile.buffer)
    })
    const imageUrl = resultUploadImage.secure_url

    // const imageUrl = `/uploads/${image_profile.filename}`; // Usando caminho local

    const [existingUser] = await pool.query(
      "SELECT * FROM User WHERE idUser = ?",
      [idUser]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    const [result] = await pool.query(
      "UPDATE User SET image_profile = ? WHERE idUser = ?",
      [imageUrl, idUser]
    );

    return res.status(200).json({
      success: true,
      message: "Imagem de perfil atualizada com sucesso.",
      data: { image_profile: imageUrl },
    });
  } catch (error) {
    console.error("Erro ao atualizar imagem de perfil:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar imagem de perfil.",
    });
  }
};

exports.deleteAccountUser = async (req, res) => {
  const idUser = req.params.idUser;
  const roleUser = req.data.role;
  const dataUser = req.data.id;

  if (!idUser) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  if (roleUser !== "Admin" && roleUser !== "SuperAdmin" && dataUser !== idUser) {
    return res.status(403).json({
      message: "Você não tem permissão para deletar este usuário.",
      success: false,
    });
  }

  try {
    const [existingUser] = await pool.query(
      `SELECT * FROM User WHERE idUser = ? AND status_permission = 'User'`,
      [idUser]
    );

    if (existingUser.length === 0) {
      return res.status(400).json({
        message: "Usuario não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    const [result] = await pool.query(
      "DELETE FROM User WHERE idUser = ?",
      [idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Usuario não encontrado. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Usuário deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};

exports.updateUserForgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email e nova senha de redefinição são obrigatórios",
      });
    }

    const [user] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(404).json({ 
        message: "Nenhum usuário encontrado.",
        success: false 
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const [result] = await pool.query(
      "UPDATE User SET password = ? WHERE idUser = ?",
      [hashedPassword, user[0].idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Não foi possível atualizar a senha.",
      });
    }

    return res.status(200).json({
      message: "Sucesso ao atualizar senha!",
      success: true,
    });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao atualizar senha",
      success: false,
    });
  }
};