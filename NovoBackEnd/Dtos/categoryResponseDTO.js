export default function categoryResponseDTO(category) {
  return {
    idCategory: category.idCategory,
    nameCategory: category.nameCategory,
    User_idUser: category.User_idUser,
    create_at: category.create_at,
  };
}
