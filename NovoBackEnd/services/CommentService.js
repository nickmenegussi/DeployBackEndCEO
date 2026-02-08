import appError from "../errors/AppError.js";
import { CommentRepository } from "../repository/CommentRepository.js";
import commentResponseDTO from "../Dtos/commentResponseDTO.js";

export async function getCommentsByPostIdService(postId) {
  const result = await CommentRepository.findByPostId(postId);
  return result.map(commentResponseDTO);
}

export async function createCommentService(data) {
  const { postId, User_idUser, message } = data;

  if (!postId || !message) {
    throw appError("Campos obrigatórios não preenchidos", 400);
  }

  const existing = await CommentRepository.findDuplicate(postId, User_idUser, message);

  if (existing) {
    throw appError("Comentário duplicado: tente escrever algo diferente.", 409);
  }

  const result = await CommentRepository.create({
    Post_idPost: postId,
    User_idUser,
    message,
  });

  return {
    message: "Comentário criado com sucesso.",
    success: true,
    data: { idComments: result.idComments, UserId: User_idUser, content: message },
  };
}

export async function updateCommentService(idComments, User_idUser, message) {
  const comment = await CommentRepository.findById(idComments);

  if (!comment) {
    throw appError("Comentário não encontrado.", 404);
  }

  if (comment.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para acessar essa seção.", 403);
  }

  const [affectedRows] = await CommentRepository.update(idComments, User_idUser, { message });

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar comentário.", 400);
  }

  return {
    message: "Comentário atualizado com sucesso.",
    success: true,
  };
}

export async function deleteCommentService(idComments, User_idUser) {
  const comment = await CommentRepository.findById(idComments);

  if (!comment) {
    throw appError("Comentário não encontrado.", 404);
  }

  if (comment.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para acessar essa seção.", 403);
  }

  const deleted = await CommentRepository.delete(idComments, User_idUser);

  if (deleted === 0) {
    throw appError("Erro ao deletar comentário.", 400);
  }

  return {
    message: "Comentário deletado com sucesso.",
    success: true,
  };
}
