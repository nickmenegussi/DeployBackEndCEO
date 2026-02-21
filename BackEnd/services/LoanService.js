import appError from "../errors/AppError.js";
import { LoanRepository } from "../repository/LoanRepository.js";
import { LibraryRepository } from "../repository/LibraryRepository.js";
import { CartRepository } from "../repository/CartRepository.js";
import { sendLibraryReceiptEmail } from "./EmailService.js";
import loanResponseDTO from "../Dtos/loanResponseDTO.js";

export async function getAllLoansService() {
  const result = await LoanRepository.findAll();
  return {
    message: "Sucesso ao exibir os empréstimos.",
    success: true,
    data: result.map(loanResponseDTO),
  };
}

export async function getLoansByUserService(idUser) {
  const result = await LoanRepository.findByUser(idUser);

  if (!result || result.length === 0) {
    throw appError("Não conseguimos achar os empréstimos deste usuário.", 404);
  }

  // Permission check is usually done in controller based on req.data.id vs idUser
  // but if the service handles it:
  if (result[0].User_idUser !== idUser) {
    throw appError("Você não tem permissão para visualizar estes empréstimos.", 403);
  }

  return {
    message: `Sucesso ao exibir os empréstimos do usuario ${idUser}`,
    success: true,
    data: result.map(loanResponseDTO),
    isBookHasALoan: true,
  };
}

export async function processLoanService(item, User_idUser) {
  const { idCart, Book_idLibrary, quantity } = item;

  const cartItem = await CartRepository.findById(idCart);
  if (!cartItem) throw appError("Carrinho não encontrado", 404);
  if (cartItem.action !== "emprestar") throw appError("Ação inválida para empréstimo", 400);

  const book = await LibraryRepository.findById(Book_idLibrary);
  if (!book) throw appError("Livro não encontrado", 404);

  if (book.bookQuantity < quantity || book.status_Available === "indisponível") {
    throw appError(`Quantidade indisponível. Disponível: ${book.bookQuantity}`, 400);
  }

  // Insert Loan with return date (7 days)
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 7);

  const loan = await LoanRepository.create({
    User_idUser,
    Book_idLibrary,
    quantity,
    returnDate: returnDate,
    status: "active",
  });

  // Update Book Qty
  const newQty = book.bookQuantity - quantity;
  let newStatus = "disponível";
  if (newQty === 0) {
    newStatus = "emprestado";
  } else if (newQty < 0) {
    newStatus = "indisponível";
  }

  await LibraryRepository.update(Book_idLibrary, {
    bookQuantity: newQty,
    status_Available: newStatus,
  });

  // Send Email
  const receipt = await LoanRepository.findReceiptInfo(loan.idLoans);
  if (receipt) {
    try {
      await sendLibraryReceiptEmail({
        email: receipt.user.email,
        nameUser: receipt.user.nameUser,
        nameBook: receipt.book.nameBook,
        authorBook: receipt.book.authorBook,
        quantity: loan.quantity,
        image: receipt.book.image,
        date_at_create: new Date(loan.date_at_create).toLocaleDateString("pt-BR"),
        returnDate: returnDate.toLocaleDateString("pt-BR"),
      });
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
    }
  }

  // Remove from cart
  await CartRepository.delete(idCart);

  return {
    success: true,
    message: "Empréstimo realizado com sucesso",
    data: loanResponseDTO(loan),
  };
}

export async function updateLoanFieldService(idLoans, User_idUser, fieldData) {
  const loan = await LoanRepository.findById(idLoans);
  if (!loan) {
    throw appError(`O empréstimo do id ${idLoans} não existe no nosso sistema.`, 404);
  }

  if (loan.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para alterar o empréstimo.", 403);
  }

  const [affectedRows] = await LoanRepository.update(idLoans, User_idUser, fieldData);

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar o empréstimo.", 400);
  }

  return {
    success: true,
    message: "Empréstimo atualizado com sucesso.",
  };
}

export async function deleteLoanService(idLoans, User_idUser) {
  const loan = await LoanRepository.findById(idLoans);
  if (!loan) {
    throw appError(`O empréstimo do livro com o id ${idLoans}, não existe no nosso sistema.`, 404);
  }

  if (loan.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para deletar este empréstimo.", 403);
  }

  const deleted = await LoanRepository.delete(idLoans, User_idUser);

  if (deleted === 0) {
    throw appError("Erro ao deletar empréstimo.", 400);
  }

  return {
    message: "Empréstimo deletado com sucesso",
    success: true,
  };
}
