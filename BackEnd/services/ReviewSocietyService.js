import appError from "../errors/AppError.js";
import { ReviewSocietyRepository } from "../repository/ReviewSocietyRepository.js";
import reviewSocietyResponseDTO from "../Dtos/reviewSocietyResponseDTO.js";

export async function createReviewSocietyService(data) {
  const { descriptionReview, ratingReview, userId } = data;

  if (!descriptionReview || !ratingReview || !userId) {
    throw appError("Preencha todos os campos.", 400);
  }

  const existing = await ReviewSocietyRepository.findByUserAndContent(userId, descriptionReview, ratingReview);

  if (existing) {
    throw appError("Você já fez uma avalição com os mesmos comentários e avaliações. Faça outro diferente.", 422);
  }

  const result = await ReviewSocietyRepository.create({
    descriptionReview,
    ratingReview,
    userId,
  });

  return {
    message: "Avaliação criada com sucesso.",
    success: true,
    data: reviewSocietyResponseDTO(result),
  };
}

export async function getAllReviewSocietyService(sortOrder = "newSet") {
  const order = sortOrder === "newSet" ? "DESC" : "ASC";
  const result = await ReviewSocietyRepository.findAll(order);

  return {
    message: "Avaliações carregadas com sucesso.",
    success: true,
    data: result.map(reviewSocietyResponseDTO),
  };
}

export async function updateReviewSocietyService(idReviewSociety, userId, data) {
  const { descriptionReview, ratingReview } = data;

  if (!idReviewSociety || !descriptionReview || !ratingReview || !userId) {
    throw appError("Preencha todos os campos.", 400);
  }

  const exists = await ReviewSocietyRepository.findById(idReviewSociety);

  if (!exists) {
    throw appError("Essa avaliação ainda não existe.", 400);
  }

  const [affectedRows] = await ReviewSocietyRepository.update(idReviewSociety, userId, {
    descriptionReview,
    ratingReview,
  });

  if (affectedRows === 0) {
    throw appError("Não foi possível atualizar a avaliação ou você não tem permissão.", 403);
  }

  const updatedReview = await ReviewSocietyRepository.findById(idReviewSociety);

  return {
    message: "Avaliação atualizada com sucesso.",
    success: true,
    data: reviewSocietyResponseDTO(updatedReview),
  };
}

export async function deleteReviewSocietyService(idReviewSociety, userId) {
  if (!idReviewSociety || !userId) {
    throw appError("Preencha todos os campos.", 400);
  }

  const exists = await ReviewSocietyRepository.findById(idReviewSociety);

  if (!exists) {
    throw appError("Essa avaliação ainda não existe.", 400);
  }

  const deleted = await ReviewSocietyRepository.delete(idReviewSociety, userId);

  if (deleted === 0) {
    throw appError("Não foi possível deletar a avaliação ou você não tem permissão.", 403);
  }

  return {
    message: "Avaliação deletada com sucesso.",
    success: true,
  };
}
