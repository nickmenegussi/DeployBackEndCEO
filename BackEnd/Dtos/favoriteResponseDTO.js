export default function favoriteResponseDTO(favorite) {
  return {
    idFavorite: favorite.idFavorite,
    User_idUser: favorite.User_idUser,
    Book_idLibrary: favorite.Book_idLibrary,
    // Flattened book fields
    nameBook: favorite.book ? favorite.book.nameBook : null,
    authorBook: favorite.book ? favorite.book.authorBook : null,
    image: favorite.book ? favorite.book.image : null,
    tagsBook: favorite.book ? favorite.book.tagsBook : null,
    bookCategory: favorite.book ? favorite.book.bookCategory : null,
    date_at_create: favorite.date_at_create,
  };
}
