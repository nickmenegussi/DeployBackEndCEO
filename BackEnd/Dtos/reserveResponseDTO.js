export default function reserveResponseDTO(reserve) {
  return {
    idReserved: reserve.idReserved,
    User_idUser: reserve.User_idUser,
    Book_idLibrary: reserve.Book_idLibrary,
    quantity: reserve.quantity,
    reserveDate: reserve.reserveDate,
    expirationDate: reserve.expirationDate,
    status: reserve.status,
    date_at_create: reserve.date_at_create,
    // Flattened book fields to match original SQL response (e.g. viewReservesByUser)
    nameBook: reserve.book ? reserve.book.nameBook : null,
    authorBook: reserve.book ? reserve.book.authorBook : null,
    image: reserve.book ? reserve.book.image : null,
    tagsBook: reserve.book ? reserve.book.tagsBook : null,
    bookCategory: reserve.book ? reserve.book.bookCategory : null,
    // Note: Old SQL used 'returnDate' for what is now 'expirationDate' in some contexts, 
    // but based on your SQL table definition it's expirationDate.
  };
}
