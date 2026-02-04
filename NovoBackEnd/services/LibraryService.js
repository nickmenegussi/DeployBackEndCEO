import appError from "../errors/AppError.js";

export async function viewAllBooksService() {
  try {

  } catch (error) {
    throw error;
  }
}

export async function viewOnlyOneBookService(idLibrary) {
  try {
    if (!idLibrary) {
      throw appError("ID do livro é obrigatório", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function createBookService(data) {
  try {
    const {
      namebook,
      authorBook,
      overviewBook,
      curiosityBook,
      tagsBook,
      bookQuantity,
      status_Available,
      bookCategory,
      image,
    } = data;

    if (
      !namebook ||
      !authorBook ||
      !tagsBook ||
      !overviewBook ||
      !image ||
      !curiosityBook ||
      !bookQuantity ||
      !status_Available ||
      !bookCategory
    ) {
      throw appError("Preencha todos os campos de cadastro", 400);
    }

    if (tagsBook !== "Obras Básicas" && tagsBook !== "Obras complementares") {
      throw appError(
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
        400
      );
    }

    if (
      status_Available !== "disponível" &&
      status_Available !== "reservado" &&
      status_Available !== "emprestado" &&
      status_Available !== "indisponível"
    ) {
      throw appError(
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
        400
      );
    }

    if (bookCategory !== "empréstimo" && bookCategory !== "reserva") {
      throw appError(
        "Você digitou uma opção que não é válida no nosso sistema. Tente novamente.",
        400
      );
    }

  } catch (error) {
    throw error;
  }
}

export async function updateNameBookService(idLibrary, nameBook) {
  try {
    if (!nameBook) {
      throw appError("Preencha todos os campos.", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateAuthorBookService(idLibrary, authorBook) {
  try {
    if (!authorBook) {
      throw appError("Preencha todos os campos.", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateTagBookService(idLibrary, tagsBook) {
  try {
    if (!tagsBook) {
      throw appError("Preencha todos os campos.", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateOverViewService(idLibrary, overviewBook) {
  try {
    if (!overviewBook) {
      throw appError("Preencha todos os campos.", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateCuriosityBookService(idLibrary, curiosityBook) {
  try {
    if (!curiosityBook) {
      throw appError("Preencha todos os campos.", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateBookQuantityService(idLibrary, bookQuantity) {
  try {
    if (!bookQuantity) {
      throw appError("Preencha todos os campos.", 400);
    }

  } catch (error) {
    throw error;
  }
}

export async function updateStatusAvailableService(idLibrary, status_Available) {
  try {
    if (!status_Available) {
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
        400
      );
    }

  } catch (error) {
    throw error;
  }
}

export async function deleteBookService(idLibrary) {
  try {
    if (!idLibrary) {
      throw appError("ID do livro é obrigatório", 400);
    }

  } catch (error) {
    throw error;
  }
}
