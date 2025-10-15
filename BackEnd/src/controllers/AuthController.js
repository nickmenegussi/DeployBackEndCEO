const getConnection = require("../config/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Resend } = require("resend");
const resend = new Resend(process.env.API_KEY_RESEND);
const OtpGenerator = require("otp-generator");

// ==========================================================
// ================== ADMIN MANAGEMENT =======================
// ==========================================================

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
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.ViewOnlyAdminByUser = async (req, res) => {
  const userData = req.data;
  const idUser = req.params.idUser;
  let connection;

  if (userData.role !== "Admin" && userData.role !== "SuperAdmin") {
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
      message: "Sucesso ao exibir o usuario desejado.",
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

exports.updateUserPermission = async (req, res) => {
  const userData = req.data;
  const idUser = req.params.idUser;
  const { status_permission } = req.body;
  let connection;

  if (userData.role !== "SuperAdmin") {
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
      message: "Sucesso ao mudar a permissão do usuário.",
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

exports.DeleteUserAdmin = async (req, res) => {
  const idUser = req.params.idUser;
  const role = req.data.role;
  let connection;

  try {
    connection = await getConnection();

    // Aqui entra sua lógica real de deleção
    await connection.execute(`DELETE FROM User WHERE idUser = ?`, [idUser]);

    return res.status(200).json({
      message: "Usuário deletado com sucesso.",
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

// ==========================================================
// ==================== AUTENTICAÇÃO ========================
// ==========================================================

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let connection;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de login",
    });
  }

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      "SELECT idUser, email, password, status_permission, image_profile FROM User WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(400).json({
        message: "Usuário não existe.",
        success: false,
      });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Email ou senha estão incorretos.",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user.idUser, email: user.email, role: user.status_permission },
      process.env.JWT_SECRET || "senhaSuperSecreto",
      { expiresIn: "4d" }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso",
      success: true,
      data: { user, token },
    });
  } catch (error) {
    console.error("Erro ao criar um login do usuário:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.GenerateOtp = async (req, res) => {
  const { email } = req.body;
  let connection;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    await connection.execute("DELETE FROM OTP WHERE expiresAt < NOW()");

    const [resulSelectUser] = await connection.execute(
      "SELECT email, nameUser FROM User WHERE email = ?",
      [email]
    );

    if (resulSelectUser.length === 0) {
      return res.status(400).json({
        message:
          "Esse email não foi cadastrado no nosso sistema. Cadastre-se ou tente novamente.",
      });
    }

    const otp = OtpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    await connection.execute(
      "INSERT INTO OTP(email, otp, expiresAt) VALUES(?, ?, ?)",
      [email, otp, expiresAt]
    );

    const { error } = await resend.emails.send({
      from: "noreply@menegussiramos.com",
      to: email,
      subject: "Verificação de duas Etapas",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #003B73;">Centro Espírita Online</h2>
            <p>Olá, ${resulSelectUser[0].nameUser}</p>
            <p>Recebemos uma solicitação para acessar sua conta.</p>
            <p style="font-size: 24px; font-weight: bold; color: #003B73; text-align: center; margin: 20px 0;">
                🔐 ${otp}
            </p>
            <p><strong>Este código é válido por 5 minutos.</strong></p>
            <p>Por segurança, não compartilhe este código com ninguém.</p>
            <p>Se você não solicitou este acesso, ignore esta mensagem.</p>
            <br>
            <p>Atenciosamente,<br>Equipe Centro Espírita Online</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro ao enviar OTP:", error);
      return res.status(500).json({
        message: "Erro ao enviar OTP pelo email.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao criar OTP. Email enviado!",
      success: true,
      data: [email],
    });
  } catch (error) {
    console.error("Erro ao gerar OTP:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.VerificationOtp = async (req, res) => {
  const { email, otp } = req.body;
  let connection;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Preencha todos os campos",
      success: false,
    });
  }

  try {
    connection = await getConnection();

    await connection.execute("DELETE FROM OTP WHERE expiresAt < NOW()");

    const [result] = await connection.execute(
      "SELECT * FROM OTP WHERE email = ? AND otp = ?",
      [email, otp]
    );

    if (result.length === 0) {
      return res.status(400).json({
        message: `Não foi encontrado no nosso sistema essas informações.`,
        success: false,
      });
    }

    const otpInformation = result[0];
    const currentTime = new Date();

    if (currentTime > new Date(otpInformation.expiresAt)) {
      return res.status(400).json({
        message: "OTP expirado",
        success: false,
      });
    }

    return res.status(200).json({
      message: "OTP verificado com sucesso!",
      success: true,
    });
  } catch (error) {
    console.error("Erro na verificação OTP:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.viewOtp = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.execute("SELECT * FROM OTP");

    return res.status(200).json({
      message: "Sucesso ao exibir as informações",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar OTPs:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};
