export default function lectureResponseDTO(lecture) {
  return {
    idLecture: lecture.idLecture,
    nameLecture: lecture.nameLecture,
    dateLecture: lecture.dateLecture,
    timeLecture: lecture.timeLecture,
    description: lecture.description,
    link_url: lecture.link_url,
    video_url: lecture.video_url,
    yearOfPublication: lecture.yearOfPublication,
  };
}
