export default function commentResponseDTO(comment) {
  return {
    idComments: comment.idComments,
    content: comment.message,
    createdDate: comment.createdDate,
    user_id: comment.User_idUser,
    nameUser: comment.user ? comment.user.nameUser : null,
    image_profile: comment.user ? comment.user.image_profile : null,
  };
}
