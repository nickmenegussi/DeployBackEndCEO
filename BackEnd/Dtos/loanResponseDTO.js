export default function loanResponseDTO(loan) {
  return {
    idLoans: loan.idLoans,
    User_idUser: loan.User_idUser,
    Book_idLibrary: loan.Book_idLibrary,
    quantity: loan.quantity,
    returnDate: loan.returnDate,
    status: loan.status,
    date_at_create: loan.date_at_create,
    // Flattened fields from joins
    nameBook: loan.book ? loan.book.nameBook : null,
    authorBook: loan.book ? loan.book.authorBook : null,
    image: loan.book ? loan.book.image : null,
    tagsBook: loan.book ? loan.book.tagsBook : null,
    bookCategory: loan.book ? loan.book.bookCategory : null,
  };
}
