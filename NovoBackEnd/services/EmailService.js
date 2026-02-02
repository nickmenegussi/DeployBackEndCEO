import {Resend} from "resend";
const resend = new Resend(process.env.API_KEY_RESEND);

export default async function sendOtpEmail(email, nameUser, otp) {
    const { error } = await resend.emails.send({
    from: "noreply@menegussiramos.com",
    to: email,
    subject: "Verificação de duas Etapas",
    html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #003B73;">Centro Espírita Online</h2>
                    <p>Olá, ${nameUser}</p>
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

  if (error) throw new Error(`Erro ao enviar e-mail de OTP. Erro: ${JSON.stringify(error)}`);

}