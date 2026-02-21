export default function facilitatorResponseDTO(facilitator) {
  return {
    idFacilitadores: facilitator.idFacilitadores,
    description: facilitator.description,
    apelido: facilitator.apelido,
    espiritaSinceTime: facilitator.espiritaSinceTime,
    category: facilitator.category,
    memberSinceWhen: facilitator.memberSinceWhen,
    User_idUser: facilitator.User_idUser,
    // Flattened user fields
    nameUser: facilitator.user ? facilitator.user.nameUser : null,
    image_profile: facilitator.user ? facilitator.user.image_profile : null,
  };
}
