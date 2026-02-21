export default function bookResponseDTO(book) {
  return {
    nameBook: book.nameBook,
    authorBook: book.authorBook,
    overviewBook: book.overviewBook,
    curiosityBook: book.curiosityBook,
    tagsBook: book.tagsBook,
    bookQuantity: book.bookQuantity,
    status_Available: book.status_Available,
    bookCategory: book.bookCategory,
    image: book.image,
  };
}
