const getConnection = require("../config/promise");
const nodemailer = require("nodemailer");

exports.viewAllLoans = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute("SELECT * FROM Loans");

    return res.status(200).json({
      message: "Sucesso ao exibir os empréstimos.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar empréstimos:", error);
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

exports.viewLoansByUser = async (req, res) => {
  let connection;

  const idUser = req.data.id;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT idLoans, quantity, User_idUser, Book_idLibrary, nameBook, authorBook, image, tagsBook, bookCategory, date_aquisition, returnDate 
       FROM Loans l, Book b, User u
       WHERE b.idLibrary = l.Book_idLibrary
       AND u.idUser = l.User_idUser
       AND u.idUser = ?`,
      [idUser]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Não conseguimos achar os empréstimos deste usuário.`,
      });
    }

    // verificar se o usuário logado é o mesmo que criou o empréstimo
    if (result[0].User_idUser !== idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para visualizar estes empréstimos.",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Sucesso ao exibir os empréstimos do usuario ${idUser}`,
      success: true,
      data: result,
      isBookHasALoan: true,
    });
  } catch (error) {
    console.error("Erro ao buscar empréstimos do usuário:", error);
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

async function sendEmailPurchase(dataRecibo) {
  const { data, error } = await resend.emails.send({
    from: "noreply@menegussiramos.com",
    to: dataRecibo.email,
    subject: "Confirmação de Empréstimo Realizado",
    html: `
  <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f9f9f9; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
    
    <!-- Header -->
    <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
      <h2 style="color: white; margin: 0;">📚 Empréstimo Confirmado</h2>
    </div>

    <!-- Body -->
    <div style="padding: 24px; text-align: center;">
      <p style="font-size: 16px; color: #333;">Olá <strong>${dataRecibo.nameUser}</strong>,</p>
      <p style="font-size: 15px; color: #333;">
        Seu empréstimo foi registrado com sucesso. Abaixo estão os detalhes do seu pedido:
      </p>

      <div style="margin: 20px 0;">
        <img
          src="http://192.168.1.10:3001/uploads/${dataRecibo.image}"
          alt="Capa do livro ${dataRecibo.nameBook}"
          style="max-width: 180px; width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
        />
        <p style="font-size: 14px; color: #666; margin-top: 8px;">
          Capa do livro <strong>${dataRecibo.nameBook}</strong>
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📖 Livro</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${dataRecibo.nameBook}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">✍️ Autor</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${dataRecibo.authorBook}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">🔢 Quantidade</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${dataRecibo.quantity}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📅 Retirada</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${dataRecibo.date_at_create}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">📅 Devolução</td>
          <td style="padding: 10px; border: 1px solid #e0e0e0;">${dataRecibo.returnDate}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 15px; color: #333;">
        Agradecemos por utilizar nossa biblioteca. Desejamos uma ótima leitura! 😊
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #555;">
      — Equipe da Biblioteca Espírita Digital
      <br />
      Este e-mail é automático, por favor, não responda.
    </div>
  </div>`,
  });

  if (error) {
    console.error("Erro ao enviar recibo pelo email utilizando resend", error);
    return res.status(500).json({
      message: "Erro ao enviar Recibo pelo email.",
      success: false,
    });
  }
}

exports.createLoan = async (req, res) => {
  let connection;

  const Cart_idCart = req.params.Cart_idCart;
  const User_idUser = req.data.id;
  const { Book_idLibrary, quantity } = req.body;

  if (!User_idUser || !Book_idLibrary || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    // Primeiro verifica se o carrinho existe e se a ação é de empréstimo
    const [cartResult] = await connection.execute(
      `SELECT * FROM Cart WHERE idCart = ?`,
      [Cart_idCart]
    );

    if (cartResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Não conseguimos localizar o carrinho do item.`,
      });
    }

    if (cartResult[0].action !== "emprestar") {
      return res.status(400).json({
        success: false,
        message:
          "Ação inválida. Apenas carrinhos com a ação 'empréstimo' podem gerar empréstimos.",
      });
    }

    // Verificar duplicidade de empréstimos
    const [existingLoan] = await connection.execute(
      "SELECT * FROM Loans WHERE Book_idLibrary = ? AND User_idUser = ?",
      [Book_idLibrary, User_idUser]
    );

    if (existingLoan.length > 0) {
      return res.status(400).json({
        message: "Você já possui um empréstimo deste livro.",
        success: false,
      });
    }

    // Verificar quantidade disponível
    const [bookResult] = await connection.execute(
      "SELECT bookQuantity FROM Book WHERE idLibrary = ?",
      [Book_idLibrary]
    );

    if (bookResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Livro não encontrado.",
      });
    }

    const available = bookResult[0].bookQuantity;

    if (available < quantity) {
      return res.status(400).json({
        success: false,
        message: `Quantidade indisponível. Só há ${available} unidade(s) disponível(is).`,
      });
    }

    // Criar empréstimo
    const [loanResult] = await connection.execute(
      `INSERT INTO Loans(User_idUser, Book_idLibrary, quantity, returnDate) 
       VALUES(?, ?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY))`,
      [User_idUser, Book_idLibrary, quantity]
    );

    // Atualizar quantidade do livro
    await connection.execute(
      "UPDATE Book SET bookQuantity = bookQuantity - ? WHERE idLibrary = ?",
      [quantity, Book_idLibrary]
    );

    // Verificar nova quantidade para definir o status
    const [newQtyResult] = await connection.execute(
      "SELECT bookQuantity FROM Book WHERE idLibrary = ?",
      [Book_idLibrary]
    );

    const newQty = newQtyResult[0].bookQuantity;
    let newStatus = "disponível";
    if (newQty === 0) {
      newStatus = "emprestado";
    } else if (newQty < 0) {
      newStatus = "indisponível";
    }

    // Atualizar o status do livro
    await connection.execute(
      "UPDATE Book SET status_Available = ? WHERE idLibrary = ?",
      [newStatus, Book_idLibrary]
    );

    // Buscar dados para o recibo
    const [receiptResult] = await connection.execute(
      `SELECT 
        l.idLoans,
        u.nameUser,
        u.email,
        b.nameBook,
        b.authorBook,
        b.image,
        l.quantity,
        DATE_FORMAT(l.date_at_create, '%d/%m/%Y') AS date_at_create,
        DATE_FORMAT(l.returnDate, '%d/%m/%Y') AS returnDate
       FROM Loans l
       JOIN User u ON l.User_idUser = u.idUser
       JOIN Book b ON l.Book_idLibrary = b.idLibrary
       WHERE u.idUser = ? AND b.idLibrary = ?
       ORDER BY l.idLoans DESC
       LIMIT 1`,
      [User_idUser, Book_idLibrary]
    );

    if (receiptResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Nenhum empréstimo encontrado para gerar recibo.",
      });
    }

    const recibo = receiptResult[0];

    try {
      await sendEmailPurchase(recibo);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
    }

    // Remover item do carrinho
    await connection.execute(`DELETE FROM Cart WHERE idCart = ?`, [
      Cart_idCart,
    ]);

    return res.status(201).json({
      success: true,
      message: "Empréstimo realizado com sucesso! Recibo enviado por e-mail.",
    });
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao processar o empréstimo.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateReturnDate = async (req, res) => {
  let connection;

  const idLoans = req.params.LoansId;
  const { returnDate } = req.body;
  const idUser = req.data.id;

  if (!returnDate || !idLoans) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingLoan] = await connection.execute(
      `SELECT * FROM Loans WHERE idLoans = ?`,
      [idLoans]
    );

    if (existingLoan.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O empréstimo do id ${idLoans} não existe no nosso sistema.`,
      });
    }

    if (existingLoan[0].User_idUser !== idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para alterar este empréstimo.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `UPDATE Loans SET returnDate = ? WHERE idLoans = ? AND User_idUser = ?`,
      [returnDate, idLoans, idUser]
    );

    return res.status(200).json({
      success: true,
      message: "Retorno do livro atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar data de retorno:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a data do empréstimo do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deleteLoan = async (req, res) => {
  let connection;

  const idLoans = req.params.LoansId;
  const idUser = req.data.id;

  try {
    connection = await getConnection();

    const [existingLoan] = await connection.execute(
      `SELECT * FROM Loans WHERE idLoans = ?`,
      [idLoans]
    );

    if (existingLoan.length === 0) {
      return res.status(404).json({
        message: `O empréstimo do livro com o id ${idLoans}, não existe no nosso sistema.`,
        success: false,
      });
    }

    if (existingLoan[0].User_idUser !== idUser) {
      return res.status(403).json({
        message: "Você não tem permissão para deletar este empréstimo.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM Loans WHERE idLoans = ? AND User_idUser = ?`,
      [idLoans, idUser]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message:
          "Erro ao deletar empréstimo. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Empréstimo deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar empréstimo:", error);
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
