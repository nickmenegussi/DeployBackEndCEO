export default function topicResponseDTO(topic) {
  return {
    idTopic: topic.idTopic,
    title: topic.title,
    description: topic.description,
    image: topic.image,
    User_idUser: topic.User_idUser,
    Category_id: topic.Category_id,
    created_at: topic.created_at,
  };
}
