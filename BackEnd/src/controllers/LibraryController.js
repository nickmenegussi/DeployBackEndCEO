const getConnection = require("../config/promise");

exports.viewAllBooks = async (req, res) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.execute("SELECT * FROM Book");

    return res.status(200).json({
      message: "Sucesso ao exibir os livros.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
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

exports.viewOnlyOneBook = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;

  try {
    connection = await getConnection();

    const [result] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    return res.status(200).json({
      message: "Sucesso ao exibir o livro.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
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

exports.createBook = async (req, res) => {
  let connection;

  const image = req.file;
  const {
    namebook,
    authorBook,
    overviewBook,
    curiosityBook,
    tagsBook,
    bookQuantity,
    status_Available,
    bookCategory,
  } = req.body;

  if (
    !namebook ||
    !authorBook ||
    !tagsBook ||
    !overviewBook ||
    !image ||
    !curiosityBook ||
    !bookQuantity ||
    !status_Available ||
    !bookCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  if (tagsBook !== "Obras Básicas" && tagsBook !== "Obras complementares") {
    return res.status(400).json({
      success: false,
      message:
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
    });
  }

  if (
    status_Available !== "disponível" &&
    status_Available !== "reservado" &&
    status_Available !== "emprestado" &&
    status_Available !== "indisponível"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
    });
  }

  if (bookCategory !== "empréstimo" && bookCategory !== "reserva") {
    return res.status(400).json({
      success: false,
      message:
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE status_Available = ? AND image = ? AND bookCategory = ? AND namebook = ? AND authorBook = ? AND tagsBook = ? AND overviewBook = ? AND curiosityBook = ?",
      [
        status_Available,
        image,
        bookCategory,
        namebook,
        authorBook,
        tagsBook,
        overviewBook,
        curiosityBook,
      ]
    );

    if (existingBook.length > 0) {
      return res.status(400).json({
        message:
          "Esse livro já possui um cadastro, por favor, tente outras informações.",
      });
    }

    const [result] = await connection.execute(
      "INSERT INTO Book(namebook, authorBook, image, overviewBook, curiosityBook, tagsBook, bookQuantity, status_Available, bookCategory) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        namebook,
        authorBook,
        image,
        overviewBook,
        curiosityBook,
        tagsBook,
        bookQuantity,
        status_Available,
        bookCategory,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Livro cadastrado com sucesso",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
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

// Atualizar Nome do Livro
exports.updateNameBook = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { nameBook } = req.body;

  if (!nameBook) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET nameBook = ? WHERE idLibrary = ?",
      [nameBook, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Nome do livro atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar nome do livro:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar o nome do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Atualizar Autor do Livro
exports.updateAuthorBook = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { authorBook } = req.body;

  if (!authorBook) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET authorBook = ? WHERE idLibrary = ?",
      [authorBook, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Autor atualizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar o autor.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Atualizar Tag do Livro
exports.updateTagBook = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { tagsBook } = req.body;

  if (!tagsBook) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET tagsBook = ? WHERE idLibrary = ?",
      [tagsBook, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Classificação do livro atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar tag:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a classificação do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Atualizar Descrição do Livro
exports.updateOverView = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { overviewBook } = req.body;

  if (!overviewBook) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET overviewBook = ? WHERE idLibrary = ?",
      [overviewBook, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Descrição do livro atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar overview:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a descrição do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Atualizar Curiosidade do Livro
exports.updateCuriosityBook = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { curiosityBook } = req.body;

  if (!curiosityBook) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET curiosityBook = ? WHERE idLibrary = ?",
      [curiosityBook, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Curiosidade do livro atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar curiosidade:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a curiosidade do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateBookQuantity = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { bookQuantity } = req.body;

  if (!bookQuantity) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET bookQuantity = ? WHERE idLibrary = ?",
      [bookQuantity, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Quantidade do livro atualizada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a quantidade do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.updateStatusAvailable = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;
  const { status_Available } = req.body;

  if (!status_Available) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos.",
    });
  }

  if (
    status_Available !== "disponível" &&
    status_Available !== "reservado" &&
    status_Available !== "emprestado" &&
    status_Available !== "indisponível"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
    });
  }

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        success: false,
        message: `O livro com o id ${idLibrary} não existe no nosso sistema.`,
      });
    }

    const [result] = await connection.execute(
      "UPDATE Book SET status_Available = ? WHERE idLibrary = ?",
      [status_Available, idLibrary]
    );

    return res.status(200).json({
      success: true,
      message: "Disponibilidade do livro atualizada com sucesso.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar a disponibilidade do livro.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.deleteBook = async (req, res) => {
  let connection;

  const idLibrary = req.params.LibraryId;

  try {
    connection = await getConnection();

    const [existingBook] = await connection.execute(
      "SELECT * FROM Book WHERE idLibrary = ?",
      [idLibrary]
    );

    if (existingBook.length === 0) {
      return res.status(404).json({
        message: `O Livro com o id ${idLibrary} não existe no nosso sistema.`,
        success: false,
      });
    }

    const [result] = await connection.execute("DELETE FROM Book WHERE idLibrary = ?", [
      idLibrary,
    ]);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Erro ao deletar Livro. Verifique os dados e tente novamente.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Livro deletado com sucesso",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
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
