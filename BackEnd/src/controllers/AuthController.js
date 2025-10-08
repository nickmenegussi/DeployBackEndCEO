const pool = require("../config/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { Resend } = require("resend");
const resend = new Resend(process.env.API_KEY_RESEND);
const OtpGenerator = require("otp-generator");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de login",
    });
  }

  try {
    const query =
      "SELECT idUser, email, password, status_permission, image_profile FROM User WHERE email = ?";
    const [result] = await pool.promise().query(query, [email]);

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
      {
        expiresIn: "4days",
      }
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
      body: null,
    });
  }
};

exports.GenerateOtp = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  } else {
    pool.query(
      "SELECT email, nameUser FROM User WHERE email = ?",
      [email],
      async (err, resulSetectUser) => {
        if (err) {
          return res.status(500).json({
            message: "Erro ao se conectar com o servidor.",
            success: false,
            body: err,
          });
        }

        if (resulSetectUser.length === 0) {
          return res.status(400).json({
            message:
              "Esse email não foi cadastrado no nosso sistema, por favor, se cadastre caso não possuir cadastro. Entretanto, caso possuas, digite novamente. ",
          });
        } else {
          const otp = OtpGenerator.generate(4, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });

          const expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + 5);

          pool.query(
            "INSERT INTO OTP(email, otp, expiresAt) VALUES(?, ?, ?)",
            [email, otp, expiresAt],
            async (err, result) => {
              if (err) {
                return result.status(500).json({
                  message: "Erro ao se conectar com o servidor.",
                  success: false,
                  body: err,
                });
              } else {
                try {
                  // versão que funciona apenas local:
                  // const transporter = nodemailer.createTransport({
                  //   service: "gmail",
                  //   auth: {
                  //     user: process.env.EMAILAPP,
                  //     pass: process.env.SENHAEMAILAPP,
                  //   },
                  //   tls: {
                  //     rejectUnauthorized: false, // <<< ISSO IGNORA O ERRO DE CERTIFICADO
                  //   },
                  // });
                  // utilizando o resend para funcionar com a vercel!
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
                    console.error("Erro ao enviar otp pelo email utilizando resend", error);
                    return res.status(500).json({
                      message: "Erro ao enviar otp pelo email.",
                      success: false
                    })
                  }

                  return res.status(200).json({
                    message: "Sucesso ao criar OTP. Email enviado!",
                    success: true,
                    data: [email],
                  });
                } catch (erro) {
                  res.status(400).send("Erro ao gerar OTP");
                  throw erro;
                }
              }
            }
          );
        }
      }
    );
  }
};

exports.VerificationOtp = (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Preencha todos os campos",
      success: false,
    });
  }

  pool.query("DELETE FROM OTP WHERE expiresAt < NOW()")

  pool.query(
    "SELECT * FROM OTP where email = ? and otp = ?",
    [email, otp],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Erro ao se conectar com o servidor.",
          success: false,
          body: err,
        });
      }

      if (result.length === 0) {
        return res.status(400).json({
          message: `Não foi encontrado no nosso sistema essas informações.`,
          success: false,
          data: err,
        });
      } else {
        const otpInformation = result[0];

        // verificar se o OTP expirou
        const currentTime = new Date();
        if (currentTime > new Date(otpInformation.expiresAt)) {
          return res.status(400).json({
            message: "Otp expirado",
            success: false,
            data: err,
          });
        } else {
          return res.status(200).json({
            message: "Otp verificado com sucesso!",
            success: true,
          });
        }
      }
    }
  );
};

exports.viewOtp = (req, res) => {
  pool.query("SELECT * FROM OTP", (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao se conectar com o servidor.",
        success: false,
        body: err,
      });
    } else {
      return res.status(200).json({
        message: "Successo ao exibir as informações",
        success: true,
        data: result,
      });
    }
  });
};
