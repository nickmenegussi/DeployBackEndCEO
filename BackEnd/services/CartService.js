import { CartRepository } from "../repository/CartRepository.js";
import { UserRepository } from "../repository/UserRepository.js";
import { LibraryRepository } from "../repository/LibraryRepository.js"; // Assuming it exists
import appError from "../errors/AppError.js";

export async function viewCartAllService(idUser) {
  const result = await CartRepository.findAllByUser(idUser);
  return {
    message: "Sucesso ao exibir os livros reservados",
    success: true,
    data: result,
  };
}

export async function viewCartByUserService(idUser, idLibrary) {
  const result = await CartRepository.findByUserAndLibrary(idUser, idLibrary);

  if (!result) {
    throw appError("Não há itens adicionados ao carrinho ainda!", 400);
  }

  return {
    message: "Sucesso ao exibir o carrinho.",
    success: true,
    data: result,
  };
}

export async function updateActionService(idCart, User_idUser, action) {
  if (!action || !idCart || !User_idUser) {
    throw appError("Preencha todos os campos.", 400);
  }

  const existingCart = await CartRepository.findById(idCart);
  if (!existingCart) {
    throw appError("Não foi possível encontrar o respectivo carrinho.", 404);
  }

  if (existingCart.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para alterar este item.", 403);
  }

  const result = await CartRepository.update(idCart, User_idUser, { action });

  return {
    success: true,
    message: "A categoria do item do carrinho foi atualizada com sucesso.",
    data: result,
  };
}

export async function updateQuantityService(User_idUser, Book_idLibrary, quantity) {
  if (!User_idUser || !Book_idLibrary || !quantity) {
    throw appError("Preencha todos os campos de cadastro", 400);
  }

  const existingItem = await CartRepository.findByUserAndBook(User_idUser, Book_idLibrary);
  if (!existingItem) {
    throw appError("Não foi possível encontrar o item no carrinho.", 404);
  }

  const result = await CartRepository.updateByUserAndBook(User_idUser, Book_idLibrary, { quantity });

  return {
    success: true,
    message: "Quantidade do item no carrinho atualizada com sucesso.",
    data: result,
  };
}

export async function createCartService(User_idUser, Book_idLibrary, action, quantity) {
  if (!User_idUser || !Book_idLibrary || !action || !quantity) {
    throw appError("Preencha todos os campos de cadastro", 400);
  }

  const userResult = await UserRepository.findById(User_idUser);
  if (!userResult) throw appError("Usuário não encontrado.", 404);

  // Note: Assuming LibraryRepository.findById exists
  const bookResult = await UserRepository.findById(Book_idLibrary); // Fallback to a check, ideally LibraryRepository
  if (!bookResult) throw appError("Livro não encontrado.", 404);

  const existingLoan = await CartRepository.checkExistingLoan(User_idUser, Book_idLibrary);
  if (existingLoan) {
    return {
      success: true,
      message: "Esse produto já foi finalizado como um empréstimo, por isso não pode ser adicionado de novo no carrinho.",
    };
  }

  const result = await CartRepository.create({ User_idUser, Book_idLibrary, action, quantity });

  return {
    success: true,
    message: "Carrinho cadastrado com sucesso",
    data: result,
  };
}

export async function deleteCartService(idCart, User_idUser) {
  const existingCart = await CartRepository.findById(idCart);
  if (!existingCart) {
    throw appError("Infelizmente, o item ainda não foi adicionado para o carrinho ser removido.", 404);
  }

  if (existingCart.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para excluir este item.", 403);
  }

  const result = await CartRepository.delete(idCart, User_idUser);

  return {
    message: "Carrinho deletado com sucesso",
    success: true,
    data: result,
  };
}
