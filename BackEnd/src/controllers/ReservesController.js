const getConnection = require("../config/promise");

exports.viewReserves = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute("SELECT * FROM Reserves");

    return res.status(200).json({
      message: "Sucesso ao exibir as reservas",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
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

exports.viewReservesByUser = async (req, res) => {
  let connection;

  const Cart_idCart = req.params.cartId;
  const idUser = req.params.userId;
  const userData = req.data;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      `SELECT * 
             FROM Reserves r, Cart c, User u, Book b
             WHERE r.Cart_idCart = c.idCart
             AND u.idUser = c.User_idUser
             AND b.idLibrary = c.Book_idLibrary
             AND u.idUser = ? AND r.Cart_idCart = ?`,
      [idUser, Cart_idCart]
    );

    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Não há itens reservados ainda!`,
      });
    }

    if (
      result[0].User_idUser !== idUser &&
      userData.role !== "Admin" &&
      userData.role !== "SuperAdmin"
    ) {
      return res.status(403).json({
        message: "Você não tem permissão para ver estas reservas.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir os livros reservados",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar reservas do usuário:", error);
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

exports.createReserves = async (req, res) => {
  let connection;

  const { Cart_idCart } = req.body;

  if (!Cart_idCart) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

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

    if (cartResult[0].action !== "reserva") {
      return res.status(400).json({
        success: false,
        message:
          "Ação inválida. Apenas carrinhos com a ação 'reserva' podem gerar reserva.",
      });
    }

    const [existingReserve] = await connection.execute(
      "SELECT Cart_idCart FROM Reserves WHERE Cart_idCart = ?",
      [Cart_idCart]
    );

    if (existingReserve.length > 0) {
      return res.status(400).json({
        message: "Esse pedido já foi finalizado.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      "INSERT INTO Reserves(Cart_idCart) VALUES(?)",
      [Cart_idCart]
    );

    return res.status(201).json({
      success: true,
      message: "Livro reservado foi cadastrado com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return res.status(500).json({
      message: "Erro ao reservar livro.",
      success: false,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deleteReserve = async (req, res) => {
  let connection;

  const idReserved = req.params.ReserveId;
  const idUser = req.data.id;
  const userData = req.data;

  try {
    connection = await getConnection();

    const [existingReserve] = await connection.execute(
      `SELECT * FROM Reserves WHERE idReserved = ?`,
      [idReserved]
    );

    if (existingReserve.length === 0) {
      return res.status(404).json({
        message: `A reserva do livro respectivo não existe no nosso sistema.`,
        success: false,
      });
    }

    if (
      existingReserve[0].User_idUser !== idUser &&
      userData.role !== "Admin" &&
      userData.role !== "SuperAdmin"
    ) {
      return res.status(403).json({
        message: "Você não tem permissão para deletar esta reserva.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      `DELETE FROM Reserves WHERE idReserved = ?`,
      [idReserved]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: `Erro ao deletar reserva do livro. Verifique os dados e tente novamente.`,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Reserva do livro deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar reserva:", error);
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
