import appError from "../errors/AppError.js";
import { PostRepository } from "../repository/PostRepository.js";
import { LikeRepository } from "../repository/LikeRepository.js";
import postResponseDTO from "../Dtos/postResponseDTO.js";

const emitSocket = (event, data) => {
  console.log(`Socket signal: ${event}`, data);
};

export async function getAllPostsService() {
  const result = await PostRepository.findAll();
  return result.map(postResponseDTO);
}

export async function createPostService(data) {
  const { content, Topic_idTopic, User_idUser, image } = data;

  if (!content || !User_idUser) {
    throw appError("Conteúdo e usuário são obrigatórios.", 400);
  }

  const result = await PostRepository.create({
    content,
    Topic_idTopic: Topic_idTopic || null,
    User_idUser,
    image,
    title: "", // Legacy code says title is empty string
  });

  return {
    message: "Post criado com sucesso!",
    postId: result.idPost,
  };
}

export async function getPostByIdService(postId) {
  const post = await PostRepository.findById(postId);

  if (!post) {
    throw appError("Post não encontrado.", 404);
  }

  return { data: postResponseDTO(post) };
}

export async function toggleLikeService(postId, userId) {
  const existingLike = await LikeRepository.find(postId, userId);

  if (existingLike) {
    await LikeRepository.delete(existingLike.idLikes);
    return { message: "Like removido com sucesso.", liked: false };
  } else {
    await LikeRepository.create({ Post_idPost: postId, User_idUser: userId });
    return { message: "Post curtido com sucesso.", liked: true };
  }
}

export async function updatePostFieldService(postId, User_idUser, data) {
  const post = await PostRepository.findById(postId);

  if (!post) {
    throw appError("A postagem não foi encontrada para ser atualizada!", 404);
  }

  // The legacy code check for User_idUser is in the SQL update but I'll add an explicit check
  if (post.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para alterar esta postagem.", 403);
  }

  const [affectedRows] = await PostRepository.update(postId, User_idUser, data);

  if (affectedRows === 0) {
    throw appError("Erro ao atualizar a postagem.", 400);
  }

  return {
    message: "Postagem atualizada com sucesso!",
    success: true,
  };
}

export async function deletePostService(postId, User_idUser) {
  const post = await PostRepository.findById(postId);

  if (!post) {
    throw appError("Não existe postagens ainda. Por favor, crie para poder deletar alguma.", 404);
  }

  if (post.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para excluir esta postagem.", 403);
  }

  const deleted = await PostRepository.delete(postId, User_idUser);

  if (deleted === 0) {
    throw appError("Erro ao excluir a postagem. Tente novamente.", 400);
  }

  emitSocket("postDeleted", { id: postId });

  return {
    message: "Exclusão da postagem realizada com sucesso",
    success: true,
  };
}
