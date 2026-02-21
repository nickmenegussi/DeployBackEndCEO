import appError from "../errors/AppError.js";
import { createBookService, viewAllBooksService, viewOnlyOneBookService } from "../services/LibraryService.js";

export async function getBookByIdController(req, res, next) {
    try {
        const {idLibrary} = req.params
        const bookResult = await viewOnlyOneBookService(idLibrary)

        if(!bookResult) throw appError("Livro não encontrado!", 404)

        return res.status(200).json({
            ...bookResult
        })

    } catch (error) {
        next(error)
    }
}

export async function findAllBookController(req, res, next) {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const bookResult = await viewAllBooksService(page, limit)

        if(!bookResult) throw appError("Não há registro na tabela de livros!", 404)
        return res.status(200).json({
            ...bookResult,
        })
    } catch (error) {
        next(error)
    }
}

export async function createBookController(req, res, next) {
    try {
        const {nameBook, authorBook,image,overviewBook,curiosityBook ,tagsBook , bookQuantity ,status_Available, bookCategory} = req.body
        const data = {
            nameBook,
            authorBook,
            image,
            overviewBook,
            curiosityBook,
            tagsBook,
            bookCategory,
            bookQuantity,
            status_Available
        }

        const creatingBook = await createBookService(data)

        return res.status(201).json({
            ...creatingBook
        })

    } catch (error) {
        next(error)
    }
}

export async function updateBookByNameController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { nameBook } = req.body;

    const result = await updateNameBookService(idLibrary, nameBook);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export async function updateBookAuthorController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { authorBook } = req.body;

    const result = await updateAuthorBookService(idLibrary, authorBook);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export async function updateBookImageController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { image } = req.body;

    const result = await updateBookImageService(idLibrary, image);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export async function updateBookOverviewController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { overviewBook } = req.body;

    const result = await updateOverViewService(idLibrary, overviewBook);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateBookCuriosityController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { curiosityBook } = req.body;

    const result = await updateCuriosityBookService(idLibrary, curiosityBook);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateBookTagController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { tagsBook } = req.body;

    const result = await updateTagBookService(idLibrary, tagsBook);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateBookCategoryController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { bookCategory } = req.body;

    const result = await updateBookCategoryService(idLibrary, bookCategory);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export async function updateBookQuantityController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { bookQuantity } = req.body;

    const result = await updateBookQuantityService(idLibrary, bookQuantity);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateBookStatusAvailableController(req, res, next) {
  try {
    const { idLibrary } = req.params;
    const { status_Available } = req.body;

    const result = await updateStatusAvailableService(
      idLibrary,
      status_Available
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
