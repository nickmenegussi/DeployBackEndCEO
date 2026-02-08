export default function cartResponseDTO(cart) {
  return {
    idCart: cart.idCart,
    User_idUser: cart.User_idUser,
    Book_idLibrary: cart.Book_idLibrary,
    action: cart.action,
    quantity: cart.quantity,
    added_at: cart.added_at,
    // Flattened book fields
    nameBook: cart.book ? cart.book.nameBook : null,
    authorBook: cart.book ? cart.book.authorBook : null,
    image: cart.book ? cart.book.image : null,
    bookQuantity: cart.book ? cart.book.bookQuantity : null,
    status_Available: cart.book ? cart.book.status_Available : null,
  };
}
