import bookResponseDTO from "../Dtos/BookResponseDTO.js";
import appError from "../errors/AppError.js";
import { LibraryRepository } from "../repository/LibraryRepository.js";

export async function viewAllBooksService(page, limit) {
  if (page < 1 || limit < 1) {
    throw appError("Parâmetros de paginação inválidos.", 400);
  }

  // Quantos registros pular antes de inciar o retorno
  const offset = (page - 1) * limit;

  const { rows, count } = await LibraryRepository.findPaginated(limit, offset);

  if (rows.length === 0) {
    throw appError("Não há registros na tabela para a paginação", 404);
  }

  return {
    message: "Livros encontrado com sucesso!",
    success: true,
    data: rows.map(bookResponseDTO),
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
}

export async function viewOnlyOneBookService(idLibrary) {
  if (!idLibrary || idLibrary < 1) {
    throw appError("ID do livro é obrigatório e tem que ser maior que 0", 400);
  }

  const userFetch = await LibraryRepository.findById(idLibrary);

  if (!userFetch) {
    throw appError("Livro não encontrado!", 404);
  }

  return {
    message: "Livro encontrado com sucesso!",
    success: true,
    data: userFetch,
  };
}

export async function createBookService(data) {
  const {
    nameBook,
    authorBook,
    overviewBook,
    curiosityBook,
    tagsBook,
    bookQuantity,
    status_Available,
    image,
    bookCategory,
  } = data;
  if (
    !nameBook ||
    !authorBook ||
    !image ||
    !tagsBook ||
    !overviewBook ||
    !curiosityBook ||
    bookQuantity === undefined ||
    bookQuantity === null ||
    !status_Available ||
    !bookCategory
  ) {
    throw appError("Preencha todos os campos de cadastro", 400);
  }

  if (tagsBook !== "Obras Básicas" && tagsBook !== "Obras complementares") {
    throw appError(
      "Você digitou uma opção que não é válida no nosso sistema para a tag do book. Tente novamente.",
      400,
    );
  }

  if (
    status_Available !== "reservado" &&
    status_Available !== "disponível" &&
    status_Available !== "emprestado" &&
    status_Available !== "indisponível"
  ) {
    throw appError(
      "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
      400,
    );
  }

  if (bookCategory !== "empréstimo" && bookCategory !== "reserva") {
    throw appError(
      "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
      400,
    );
  }

  const bookExists = await LibraryRepository.findByName(data.nameBook);

  if (bookExists) throw appError("Livro já cadastrado", 400);

  const library = await LibraryRepository.create(data);

  return {
    message: "Novo livro criado com sucesso!",
    success: true,
    data: bookResponseDTO(library),
  };
}

export async function updateNameBookService(idLibrary, nameBook) {
  if (!nameBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);

  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    nameBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar o nome do livro.", 400);
  }

  return {
    message: "Nome do livro atualizado com sucesso.",
    success: true,
  };
}

export async function updateAuthorBookService(idLibrary, authorBook) {
  if (!authorBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);

  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    author: authorBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar o autor.", 400);
  }

  return {
    message: "Autor atualizado com sucesso.",

    success: true,
  };
}

export async function updateBookImageService(idLibrary, imageBook) {
  if (!imageBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);
  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    imageBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar imagem do livro.", 400);
  }

  return {
    message: "Imagem do livro atualizada com sucesso.",
    success: true,
  };
}

export async function updateBookCategoryService(idLibrary, categoryBook) {
  if (!categoryBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);
  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    categoryBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar categoria do livro.", 400);
  }

  return {
    message: "Categoria do livro atualizada com sucesso.",

    success: true,
  };
}

export async function updateTagBookService(idLibrary, tagsBook) {
  if (!tagsBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);
  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    tagsBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar a classificação do livro.", 400);
  }

  return {
    message: "Classificação do livro atualizada com sucesso.",

    success: true,
  };
}

export async function updateOverViewService(idLibrary, overviewBook) {
  if (!overviewBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);
  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    overviewBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar a descrição do livro.", 400);
  }

  return {
    message: "Descrição do livro atualizada com sucesso.",
    success: true,
  };
}

export async function updateCuriosityBookService(idLibrary, curiosityBook) {
  if (!curiosityBook || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);
  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    curiosityBook,
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar a curiosidade do livro.", 400);
  }

  return {
    message: "Curiosidade do livro atualizada com sucesso.",

    success: true,
  };
}
export async function updateBookQuantityService(idLibrary, bookQuantity) {
  if (!bookQuantity || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);
  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    bookQuantity
  });

  if (affectedRows.length === 0) {
    throw appError("Erro ao atualizar a quantidade do livro.", 400);
  }

  return {
    message: "Quantidade do livro atualizada com sucesso.",
        success: true

  };
}


export async function updateStatusAvailableService(
  idLibrary,
  status_Available,
) {
  if (!status_Available || !idLibrary) {
    throw appError("Preencha todos os campos.", 400);
  }

  if (
    status_Available !== "disponível" &&
    status_Available !== "reservado" &&
    status_Available !== "emprestado" &&
    status_Available !== "indisponível"
  ) {
    throw appError(
      "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
      400,
    );
  }

  const bookFetch = await LibraryRepository.findById(idLibrary);

  if (!bookFetch) throw appError("Livro não encontrado", 404);

  const affectedRows = await LibraryRepository.update(idLibrary, {
    status_Available: status_Available,
  });

  if (affectedRows.length === 0) throw appError("");

  return {
    message: "Status de disponibilidade mudado com sucesso!",
    success: true,
  };
}

export async function deleteBookService(idLibrary) {
  if (!idLibrary) {
    throw appError("ID do livro é obrigatório", 400);
  }
}
