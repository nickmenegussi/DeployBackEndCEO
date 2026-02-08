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

export async function sendLibraryReceiptEmail(data) {
  const { email, nameUser, nameBook, authorBook, quantity, image, date_at_create, returnDate } = data;

  const { error } = await resend.emails.send({
    from: "noreply@menegussiramos.com",
    to: email,
    subject: "📘 Confirmação de Empréstimo Realizado",
    html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9f9f9; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">📚 Empréstimo Confirmado</h2>
        </div>
        <div style="padding: 24px; text-align: center;">
          <p style="font-size: 16px; color: #333;">Olá <strong>${nameUser}</strong>,</p>
          <p style="font-size: 15px; color: #333;">Seu empréstimo foi registrado com sucesso. Abaixo estão os detalhes do seu pedido:</p>
          <div style="margin: 20px 0;">
             ${image ? `<img src="http://192.168.1.10:3001/uploads/${image}" alt="Capa do livro" style="max-width: 180px; width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>` : ""}
            <p style="font-size: 14px; color: #666; margin-top: 8px;">Capa do livro <strong>${nameBook}</strong></p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📖 Livro</td><td style="padding: 10px; border: 1px solid #e0e0e0;">${nameBook}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">✍️ Autor</td><td style="padding: 10px; border: 1px solid #e0e0e0;">${authorBook}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">🔢 Quantidade</td><td style="padding: 10px; border: 1px solid #e0e0e0;">${quantity}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📅 Retirada</td><td style="padding: 10px; border: 1px solid #e0e0e0;">${date_at_create}</td></tr>
            <tr><td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📅 Devolução</td><td style="padding: 10px; border: 1px solid #e0e0e0;">${returnDate}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 15px; color: #333;">Agradecemos por utilizar nossa biblioteca. Desejamos uma ótima leitura! 😊</p>
        </div>
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #555;">
          — Equipe da Biblioteca Espírita Digital<br />
          Este e-mail é automático, por favor, não responda.
        </div>
      </div>
    `,
  });

  if (error) throw new Error(`Erro ao enviar e-mail de confirmação. Erro: ${JSON.stringify(error)}`);
}
