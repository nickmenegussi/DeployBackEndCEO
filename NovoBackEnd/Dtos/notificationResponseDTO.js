export default function notificationResponseDTO(notification) {
  return {
    idNotifications: notification.idNotifications,
    message: notification.message,
    isRead: notification.isRead,
    expoPushToken: notification.expoPushToken,
    User_idUser: notification.User_idUser,
    created_at: notification.created_at,
    // Flattened user fields
    nameUser: notification.user ? notification.user.nameUser : null,
    image_profile: notification.user ? notification.user.image_profile : null,
  };
}
