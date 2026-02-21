export default function userResponseDTO(user) {
  return {
    idUser: user.idUser,
    nameUser: user.nameUser,
    email: user.email,
    image_profile: user.image_profile,
    status_permission: user.status_permission,
  };
}
