const pool = require('../config/promise');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { Resend } = require("resend");
const resend = new Resend(process.env.API_KEY_RESEND);
const OtpGenerator = require("otp-generator");

// Admin Management
exports.ViewAllAdmins = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM User WHERE status_permission = 'Admin'`);

        if (result.length === 0) {
            return res.status(404).json({
                message: `Não foi possível encontrar um usuário com a permissão 'Admin'`,
                success: false,
            });
        }

        return res.status(200).json({
            message: 'Sucesso ao exibir os Admins.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao buscar admins:", error);
        return res.status(500).json({
            message: "Erro ao se conectar com o servidor.",
            success: false,
        });
    }
};

exports.ViewOnlyAdminByUser = async (req, res) => {
    const userData = req.data;
    const idUser = req.params.idUser;

    if (userData.role !== 'Admin' && userData.role !== 'SuperAdmin') {
        return res.status(403).json({
            message: "Você não tem permissão para visualizar um usuário.",
            success: false
        });
    }

    try {
        const [result] = await pool.query(
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
            message: 'Sucesso ao exibir o usuario desejado.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao buscar admin:", error);
        return res.status(500).json({
            message: "Erro ao se conectar com o servidor.",
            success: false,
        });
    }
};

exports.updateUserPermission = async (req, res) => {
    const userData = req.data;
    const idUser = req.params.idUser;
    const { status_permission } = req.body;

    if (userData.role !== 'SuperAdmin') {
        return res.status(403).json({
            message: "Você não tem permissão para alterar a permissão de um usuário.",
            success: false
        });
    }

    try {
        const [existingUser] = await pool.query(
            `SELECT * FROM User WHERE idUser = ? AND (status_permission = 'User' OR status_permission = 'Admin')`, 
            [idUser]
        );

        if (existingUser.length === 0) {
            return res.status(404).json({
                message: `Usuário não encontrado ou já possui permissão elevada.`,
                success: false,
            });
        }

        const [result] = await pool.query(
            `UPDATE User SET status_permission = ? WHERE idUser = ?`, 
            [status_permission, idUser]
        );

        return res.status(200).json({
            message: 'Sucesso ao mudar a permissão do usuário.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao atualizar permissão:", error);
        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar o status do user.",
        });
    }
};

exports.DeleteUserAdmin = async (req, res) => {
    const idUser = req.params.idUser;
    const role = req.data.role;

    // Implementar lógica de deleção aqui
    try {
        // Sua lógica de deleção
        return res.status(200).json({
            message: 'Usuário deletado com sucesso.',
            success: true,
        });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return res.status(500).json({
            message: "Erro ao deletar usuário.",
            success: false,
        });
    }
};

// Authentication
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de login",
        });
    }

    try {
        const query = "SELECT idUser, email, password, status_permission, image_profile FROM User WHERE email = ?";
        const [result] = await pool.query(query, [email]);

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
    }
};

exports.GenerateOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        });
    }

    try {
        // Limpa OTPs expirados
        await pool.execute("DELETE FROM OTP WHERE expiresAt < NOW()");

        // Busca usuário
        const [resulSetectUser] = await pool.query(
            "SELECT email, nameUser FROM User WHERE email = ?",
            [email]
        );

        if (resulSetectUser.length === 0) {
            return res.status(400).json({
                message: "Esse email não foi cadastrado no nosso sistema, por favor, se cadastre caso não possuir cadastro. Entretanto, caso possuas, digite novamente.",
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
        await pool.query(
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
                success: false
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
    }
};

exports.VerificationOtp = async (req, res) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.status(400).json({
            message: "Preencha todos os campos",
            success: false,
        });
    }

    try {
        // Limpa OTPs expirados
        await pool.query("DELETE FROM OTP WHERE expiresAt < NOW()");

        // Busca OTP
        const [result] = await pool.query(
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
    }
};

exports.viewOtp = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM OTP");

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
    }
};