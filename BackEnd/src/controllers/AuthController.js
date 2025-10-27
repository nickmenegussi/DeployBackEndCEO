const getConnection = require("../config/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Resend } = require("resend");
const resend = new Resend(process.env.API_KEY_RESEND);
const OtpGenerator = require("otp-generator");

// Authentication
exports.login = async (req, res) => {
  let connection;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de login",
    });
  }

  try {
    connection = await getConnection();
    const execute =
      "SELECT idUser, email, password, status_permission, image_profile FROM User WHERE email = ?";
    const [result] = await connection.execute(execute, [email]);

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
      { expiresIn: "4days" }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso",
      success: true,
      data: { user: user, token: token },
    });
  } catch (error) {
    console.error("Erro ao criar um login do usuário: ", error);
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

exports.GenerateOtp = async (req, res) => {
  let connection;

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection()
    // Limpa OTPs expirados
    await connection.execute("DELETE FROM OTP WHERE expiresAt < NOW()");

    // Busca usuário
    const [resulSetectUser] = await connection.execute(
      "SELECT email, nameUser FROM User WHERE email = ?",
      [email]
    );

    if (resulSetectUser.length === 0) {
      return res.status(400).json({
        message:
          "Esse email não foi cadastrado no nosso sistema, por favor, se cadastre caso não possuir cadastro. Entretanto, caso possuas, digite novamente.",
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

    // Insere OTP
    await connection.execute(
      "INSERT INTO OTP(email, otp, expiresAt) VALUES(?, ?, ?)",
      [email, otp, expiresAt]
    );

    // Envia email
    const { data, error } = await resend.emails.send({
      from: "noreply@menegussiramos.com",
      to: email,
      subject: "Verificação de duas Etapas",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #003B73;">Centro Espírita Online</h2>
                    <p>Olá, ${resulSetectUser[0].nameUser}</p>
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
      text: `Olá,\n\nRecebemos uma solicitação para acessar sua conta.\nSeu código de verificação é:\n\n🔐 ${otp}\n\nEste código é válido por 5 minutos.\nPor segurança, não compartilhe este código com ninguém.\n\nSe você não solicitou este acesso, ignore esta mensagem.\n\nAtenciosamente,\nEquipe Centro Espírita Online`,
    });

    if (error) {
      console.error("Erro ao enviar OTP pelo email utilizando resend", error);
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
    if (connection) {
      await connection.end();
    }
  }
};

exports.VerificationOtp = async (req, res) => {
  let connection;
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Preencha todos os campos",
      success: false,
    });
  }

  try {
    connection = await getConnection();
    // Limpa OTPs expirados
    // await connection.execute("DELETE FROM OTP WHERE NOW() > expiresAt");

    // Busca OTP
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

    // Verificar se o OTP expirou
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
    if (connection) {
      await connection.end();
    }
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
    if (connection) {
      await connection.end();
    }
  }
};
