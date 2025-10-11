const pool = require("../config/promise");

exports.viewAllFavoritesByUser = async (req, res) => {
  const User_idUser = req.data.id;

  try {
    const [result] = await pool.query(
      `SELECT idFavorite, User_idUser, Book_idLibrary, nameBook, authorBook, image, tagsBook, bookCategory, f.date_at_create
       FROM Favorite f, Book b, User u
       WHERE b.idLibrary = f.Book_idLibrary
       AND u.idUser = f.User_idUser
       AND u.idUser = ?`,
      [User_idUser]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Erro ao encontrar os dados procurados.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sucesso ao Exibir os itens favoritados.",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao se conectar com o backend",
    });
  }
};

exports.createFavoriteBook = async (req, res) => {
  const User_idUser = req.data.id;
  const { Book_idLibrary } = req.body;

  if (!User_idUser || !Book_idLibrary) {
    return res.status(400).json({
      success: false,
      message: "Preencha todos os campos de cadastro",
    });
  }

  try {
    const [existingFavorite] = await pool.query(
      "SELECT * FROM Favorite WHERE User_idUser = ? AND Book_idLibrary = ?",
      [User_idUser, Book_idLibrary]
    );

    if (existingFavorite.length > 0) {
      return res.status(400).json({
        message: "Esse item já está favoritado!",
        success: false,
      });
    }

    const [result] = await pool.query(
      "INSERT INTO Favorite(User_idUser, Book_idLibrary) VALUES(?, ?)",
      [User_idUser, Book_idLibrary]
    );

    return res.status(201).json({
      message: "Livro Favoritado com sucesso.",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Erro ao criar favorito:", error);
    return res.status(500).json({
      message: "Erro ao se conectar com o servidor.",
      success: false,
    });
  }
};