export default function reviewSocietyResponseDTO(review) {
  return {
    idReviewSociety: review.idReviewSociety,
    descriptionReview: review.descriptionReview,
    ratingReview: review.ratingReview,
    create_at: review.create_at,
    userId: review.userId,
    // Flattened user fields to match old SQL response
    nameUser: review.user ? review.user.nameUser : null,
    image_profile: review.user ? review.user.image_profile : null,
  };
}
