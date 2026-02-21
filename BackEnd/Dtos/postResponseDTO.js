export default function postResponseDTO(post) {
  return {
    idPost: post.idPost,
    content: post.content,
    image: post.image,
    Topic_idTopic: post.Topic_idTopic,
    created_at: post.created_at,
    updated_at: post.updated_at,
    // User fields
    user_id: post.User_idUser,
    nameUser: post.user ? post.user.nameUser : null,
    image_profile: post.user ? post.user.image_profile : null,
    // Category/Topic fields if joined
    nameCategory: post.topic && post.topic.category ? post.topic.category.nameCategory : null,
    idCategory: post.topic ? post.topic.Category_id : null,
    // Counts
    likes_count: post.getDataValue('likes_count') || 0,
    comments_count: post.getDataValue('comments_count') || 0,
  };
}
