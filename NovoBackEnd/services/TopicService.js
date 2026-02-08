import appError from "../errors/AppError.js";
import { TopicRepository } from "../repository/TopicRepository.js";
import topicResponseDTO from "../Dtos/topicResponseDTO.js";

// Helper for socket (placeholder until socket is implemented)
const emitSocket = (event, data) => {
  console.log(`Socket signal: ${event}`, data);
};

export async function viewOnlyTopicByIdService(topicId) {
  if (!topicId) {
    throw appError("ID do tópico é obrigatório", 400);
  }

  const topic = await TopicRepository.findById(topicId);

  if (!topic) {
    throw appError(`O tópico com o id ${topicId} não existe no nosso sistema.`, 404);
  }

  emitSocket("topicViewedById", {
    id: topicId,
    title: topic.title,
    description: topic.description,
    User_idUser: topic.User_idUser,
  });

  return {
    message: "Sucesso ao exibir o topico da postagem.",
    success: true,
    data: topicResponseDTO(topic),
  };
}

export async function viewAllTopicService() {
  const result = await TopicRepository.findAll();

  return {
    message: "Sucesso ao exibir todos os tópicos das postagens.",
    success: true,
    data: result.map(topicResponseDTO),
  };
}

export async function createTopicService(data) {
  const { title, description, Category_id, User_idUser, image } = data;

  if (!title || !description || !image || !Category_id) {
    throw appError("Preencha todos os campos de cadastro", 400);
  }

  const existing = await TopicRepository.findByTitleAndDescription(title, description);

  if (existing) {
    throw appError("Já existe um tópico com o mesmo título e descrição. Por favor, tente novamente.", 409);
  }

  const result = await TopicRepository.create({
    title,
    description,
    image,
    User_idUser,
    Category_id,
  });

  emitSocket("newTopic", {
    id: result.idTopic,
    title,
    description,
    image,
    User_idUser,
    Category_id,
  });

  return {
    success: true,
    message: "Tópico cadastrado com sucesso",
    data: topicResponseDTO(result),
  };
}

export async function updateTopicFieldService(topicId, User_idUser, fieldData) {
  if (!topicId) {
    throw appError("ID do tópico é obrigatório", 400);
  }

  const topic = await TopicRepository.findById(topicId);

  if (!topic) {
    throw appError("Tópico não encontrado. Verifique os dados e tente novamente.", 404);
  }

  if (topic.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para alterar o tópico.", 403);
  }

  const [affectedRows] = await TopicRepository.update(topicId, User_idUser, fieldData);

  if (affectedRows === 0) {
    throw appError("Não foi possível alterar as informações. Tente novamente.", 400);
  }

  return {
    message: "Sucesso ao alterar o tópico da postagem.",
    success: true,
  };
}

export async function deleteTopicService(topicId, User_idUser) {
  if (!topicId) {
    throw appError("ID do tópico é obrigatório", 400);
  }

  const topic = await TopicRepository.findById(topicId);

  if (!topic) {
    throw appError("Tópico não encontrado. Verifique os dados e tente novamente.", 404);
  }

  if (topic.User_idUser !== User_idUser) {
    throw appError("Você não tem permissão para alterar/deletar o tópico.", 403);
  }

  const deleted = await TopicRepository.delete(topicId, User_idUser);

  if (deleted === 0) {
    throw appError("Erro ao deletar tópico.", 400);
  }

  emitSocket("topicDeleted", {
    id: topicId,
    User_idUser,
  });

  return {
    message: "Tópico deletado com sucesso",
    success: true,
  };
}
