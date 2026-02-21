import appError from "../errors/AppError.js";
import { ReserveRepository } from "../repository/ReserveRepository.js";
import { LibraryRepository } from "../repository/LibraryRepository.js";
import { CartRepository } from "../repository/CartRepository.js";
import { sendLibraryReceiptEmail } from "./EmailService.js";
import reserveResponseDTO from "../Dtos/reserveResponseDTO.js";

export async function getAllReservesService() {
  const result = await ReserveRepository.findAll();
  if (!result || result.length === 0) {
    throw appError("Sem dados", 400);
  }
  return {
    message: "Sucesso ao exibir os livros reservados",
    success: true,
    data: result.map(reserveResponseDTO),
  };
}

export async function getReservesByUserService(idUser, roleUser, loggedUserId) {
  if (roleUser !== "Admin" && roleUser !== "SuperAdmin" && loggedUserId !== idUser) {
    throw appError("Você não tem permissão para ver as reservas deste usuário.", 403);
  }

  const result = await ReserveRepository.findByUser(idUser);

  if (!result || result.length === 0) {
    return {
      success: false,
      message: `Não há itens reservados ainda!`,
      reserves: [],
      HasAReserve: false,
    };
  }

  return {
    message: "Sucesso ao exibir os livros reservados",
    success: true,
    data: result.map(reserveResponseDTO),
    HasAReserve: true,
  };
}

export async function processReservationService(item, User_idUser) {
  const { idCart, Book_idLibrary, quantity } = item;

  const cartItem = await CartRepository.findById(idCart);
  if (!cartItem) {
    throw appError("Carrinho não encontrado", 404);
  }

  if (cartItem.action !== "reservar") {
    throw appError("Ação inválida para reservar", 400);
  }

  const book = await LibraryRepository.findById(Book_idLibrary);
  if (!book) {
    throw appError("Livro não encontrado", 404);
  }

  if (book.bookQuantity < quantity || book.status_Available === "indisponível") {
    throw appError(`Livro indisponível para reserva. Disponível: ${book.bookQuantity}`, 400);
  }

  // Calculate dates (Default 7 days for expiration)
  const now = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(now.getDate() + 7);

  const reserve = await ReserveRepository.create({
    User_idUser,
    Book_idLibrary,
    quantity,
    reserveDate: now,
    expirationDate: expirationDate,
    status: "active",
  });

  // Update book quantity
  const newQty = book.bookQuantity - quantity;
  let newStatus = "disponível";
  if (newQty === 0) {
    newStatus = "reservado";
  } else if (newQty < 0) {
    newStatus = "indisponível";
  }

  await LibraryRepository.update(Book_idLibrary, {
    bookQuantity: newQty,
    status_Available: newStatus,
  });

  // Send Email
  const receipt = await ReserveRepository.findReceiptInfo(reserve.idReserved);
  if (receipt) {
    try {
      await sendLibraryReceiptEmail({
        email: receipt.user.email,
        nameUser: receipt.user.nameUser,
        nameBook: receipt.book.nameBook,
        authorBook: receipt.book.authorBook,
        quantity: reserve.quantity,
        image: receipt.book.image,
        date_at_create: new Date(reserve.date_at_create).toLocaleDateString("pt-BR"),
        returnDate: expirationDate.toLocaleDateString("pt-BR"),
      });
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
    }
  }

  // Remove from cart
  await CartRepository.delete(idCart);

  return {
    success: true,
    message: "Reserva realizada com sucesso",
    data: reserveResponseDTO(reserve),
  };
}

export async function deleteReserveService(idReserved, idUser, roleUser, loggedUserId) {
  const reserve = await ReserveRepository.findById(idReserved);

  if (!reserve) {
    throw appError("A reserva do livro respectivo não existe no nosso sistema.", 404);
  }

  if (reserve.User_idUser !== idUser && roleUser !== "Admin" && roleUser !== "SuperAdmin") {
    throw appError("Você não tem permissão para deletar esta reserva.", 403);
  }

  const deleted = await ReserveRepository.delete(idReserved, idUser);

  if (deleted === 0) {
    throw appError("Erro ao deletar reserva do livro. Verifique os dados e tente novamente.", 400);
  }

  return {
    message: "Reserva do livro deletado com sucesso",
    success: true,
  };
}
