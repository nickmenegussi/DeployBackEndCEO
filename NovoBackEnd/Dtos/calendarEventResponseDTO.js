export default function calendarEventResponseDTO(event) {
  return {
    idCalendarEvents: event.idCalendarEvents,
    title: event.title,
    link: event.link,
    description: event.description,
    start: event.start,
    end: event.end,
    attachment: event.attachment,
    dateEvent: event.dateEvent,
    User_idUser: event.User_idUser,
  };
}
