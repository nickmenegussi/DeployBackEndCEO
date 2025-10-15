exports.viewCartAll = async (req, res) => {
  let connection;
  const idUser = req.data.id;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT c.*, b.*
       FROM Cart c
       JOIN Book b ON c.Book_idLibrary = b.idLibrary
       WHERE c.User_idUser = ?`,
      [idUser]
    );

    return res.status(200).json({
      message: "Sucesso ao exibir os livros reservados",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.viewCartByUser = async (req, res) => {
  let connection;
  const idUser = req.params.idUser;
  const idLibrary = req.params.idLibrary;

  try {
    connection = await getConnection();
    const [result] = await connection.execute(
      `SELECT * FROM Cart c, User u, Book b
       WHERE c.User_idUser = u.idUser 
       AND c.Book_idLibrary = b.idLibrary
       AND u.idUser = ? AND b.idLibrary = ?`,
      [idUser, idLibrary]
    );

    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Não há itens adicionados ao carrinho ainda!",
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir o carrinho.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.updateAction = async (req, res) => {
  let connection;
  const idCart = req.params.id;
  const { action } = req.body;

  if (!action || !idCart) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingCart] = await connection.execute(
      "SELECT * FROM Cart WHERE idCart = ?",
      [idCart]
    );

    if (existingCart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Não foi possível encontrar o respectivo carrinho.",
      });
    }

    const [result] = await connection.execute(
      "UPDATE Cart SET action = ? WHERE idCart = ?",
      [action, idCart]
    );

    return res.status(200).json({
      success: true,
      message: "A categoria do item do carrinho foi atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar ação:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a categoria do item do carrinho",
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.updateQuantity = async (req, res) => {
  let connection;
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

    const [existingItem] = await connection.execute(
      `SELECT * FROM User u
       INNER JOIN Cart c ON u.idUser = c.User_idUser
       INNER JOIN Book b ON b.idLibrary = c.Book_idLibrary 
       WHERE u.idUser = ? AND b.idLibrary = ?`,
      [User_idUser, Book_idLibrary]
    );

    if (existingItem.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Não foi possível encontrar o item no carrinho.",
      });
    }

    const [result] = await connection.execute(
      "UPDATE Cart SET quantity = ? WHERE User_idUser = ? AND Book_idLibrary = ?",
      [quantity, User_idUser, Book_idLibrary]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum item foi atualizado.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quantidade do item no carrinho atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a quantidade do item no carrinho.",
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.createCart = async (req, res) => {
  let connection;
  const User_idUser = req.data.id;
  const { Book_idLibrary, action, quantity } = req.body;

  if (!User_idUser || !Book_idLibrary || !action || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    connection = await getConnection();

    // Verifica se o usuário existe
    const [userResult] = await connection.execute(
      "SELECT * FROM User WHERE idUser = ?",
      [User_idUser]
    );

    if (userResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    // Verifica se o livro existe
    const [bookResult] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [Book_idLibrary]
    );

    if (bookResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Livro não encontrado.",
      });
    }

    // Verifica se já existe no carrinho como empréstimo
    const [existingLoan] = await connection.execute(
      `SELECT * FROM Cart c
       INNER JOIN Loans l ON c.User_idUser = l.User_idUser AND c.Book_idLibrary = l.Book_idLibrary
       WHERE c.User_idUser = ? AND c.Book_idLibrary = ?`,
      [User_idUser, Book_idLibrary]
    );

    if (existingLoan.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Esse produto já foi finalizado como um empréstimo, por isso não pode ser adicionado de novo no carrinho.",
      });
    }

    // Insere no carrinho
    const [insertResult] = await connection.execute(
      "INSERT INTO Cart(User_idUser, Book_idLibrary, action, quantity) VALUES(?, ?, ?, ?)",
      [User_idUser, Book_idLibrary, action, quantity]
    );

    return res.status(201).json({
      success: true,
      message: "Carrinho cadastrado com sucesso",
      data: insertResult,
    });
  } catch (error) {
    console.error("Erro ao criar carrinho:", error);
    return res.status(500).json({
      message: "Erro ao criar carrinho.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};

exports.deleteCart = async (req, res) => {
  let connection;
  const idCart = req.params.idCart;

  try {
    connection = await getConnection();

    const [existingCart] = await connection.execute(
      "SELECT idCart FROM Cart WHERE idCart = ?",
      [idCart]
    );

    if (existingCart.length === 0) {
      return res.status(404).json({
        message: "Infelizmente, o item ainda não foi adicionado para o carrinho ser removido.",
        success: false,
      });
    }

    const [result] = await connection.execute(
      "DELETE FROM Cart WHERE idCart = ?",
      [idCart]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao deletar carrinho.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Carrinho deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar carrinho:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  } finally {
    if (connection) await connection.end();
  }
};