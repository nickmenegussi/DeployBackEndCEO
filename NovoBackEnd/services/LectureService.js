import appError from "../errors/AppError.js";
import { LectureRepository } from "../repository/LectureRepository.js";
import lectureSerializer from "../serializer/lecturesSerializer.js";

export async function listLecture(){
  const lectureResult = await LectureRepository.findAll()

  if(!lectureResult || lectureResult.length === 0){
    throw appError("Nenhuma palestra encontrada", 404)
  }

  return {
    data: lectureResult
  }
}

export async function getLectureById(idLecture) {

  if(!idLecture) throw appError("Id não informado", 400)

  const existsLecture = await LectureRepository.findById(idLecture)

  if(!existsLecture) throw appError("Nenhuma palestra encontrada.", 404)

  return {
    idLecture: existsLecture.idLecture,
    nameLecture: existsLecture.nameLecture,
    dateLecture: existsLecture.dateLecture,
    timeLecture: existsLecture.timeLecture,
    description: existsLecture.description,
    link_url: existsLecture.link_url,
    video_url: existsLecture.video_url,
    yearOfPublication: existsLecture.yearOfPublication,
    created_at: existsLecture.createdAt,
    updated_at: existsLecture.updatedAt,
  };
}

export async function register(data) {
  const {
    nameLecture,
    dateLecture,
    timeLecture,
    description,
    link_url,
    video_url,
    yearOfPublication,
  } = data;

  if (!nameLecture || !dateLecture || !timeLecture || !yearOfPublication || !description) {
    throw new appError("Preencha todos os dados obrigatórios.", 400);
  }

  const exists = await LectureRepository.findByNameAndDate(nameLecture, dateLecture);

  if (exists) throw new appError("Palestra já cadastrada!", 400);

  const lecture = await LectureRepository.create({
    nameLecture,
    dateLecture,
    timeLecture,
    description,
    link_url,
    video_url,
    yearOfPublication,
  });

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

export async function updateLectureNameService(idLecture, nameLecture) {
}

export async function updateLectureDateService(idLecture, dateLecture) {
}

export async function updateLectureTimeService(idLecture, timeLecture) {
}

export async function updateLectureDescriptionService(idLecture, description) {
}

export async function updateLectureLinkUrlService(idLecture, link_url) {
}

export async function updateLectureVideoUrlService(idLecture, video_url) {
}

export async function deleteLectureService(idLecture) {
}

