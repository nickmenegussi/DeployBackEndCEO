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

  if (exists) throw new appError("Palestra já cadastrada!", 409);

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
  
  if(!idLecture || !nameLecture) {
    throw appError("Código da palestra e o nome são obrigatórios!", 400)
  }

  const affectedRows = await LectureRepository.update(idLecture, {
    nameLecture: nameLecture
  })

  if(affectedRows.length === 0){
    throw appError("Não foi possível modificar o nome da palestra.", 400);
  }

  return {
    message: "Sucesso ao alterar o nome da Palestra!",
    success: true,
  }
}

export async function updateLectureDateService(idLecture, dateLecture) {
  if(!idLecture || !dateLecture) {
    throw appError("Código da palestra e a data são obrigatórios!", 400)
  }

  const affectedRows = await LectureRepository.update(idLecture, {
    dateLecture: dateLecture
  })

  if(affectedRows.length === 0){
    throw appError("Não foi possível modificar o nome da palestra.", 400);
  }

  return {
    message: "Sucesso ao alterar o dia da Palestra!",
    success: true,
  }
}

export async function updateLectureTimeService(idLecture, timeLecture) {
  if(!idLecture || !timeLecture) {
    throw appError("Código da palestra e o horário são obrigatórios!", 400)
  }

  const affectedRows = await LectureRepository.update(idLecture, {
    timeLecture: timeLecture
  })

  if(affectedRows.length === 0){
    throw appError("Não foi possível modificar o nome da palestra.", 400);
  }

  return {
    message: "Sucesso ao alterar o horário da Palestra!",
    success: true,
  }
}

export async function updateLectureDescriptionService(idLecture, description) {
  if(!idLecture || !description) {
    throw appError("Código da palestra e a descrição são obrigatórios!", 400)
  }

  const affectedRows = await LectureRepository.update(idLecture, {
    description: description
  })

  if(affectedRows.length === 0){
    throw appError("Não foi possível modificar o nome da palestra.", 400);
  }

  return {
    message: "Sucesso ao alterar a descrição da Palestra!",
    success: true,
  }

}

export async function updateLectureLinkUrlService(idLecture, link_url) {
  if(!idLecture, link_url) {
    throw appError("Código da palestra e o link_url são obrigatórios!", 400)
  }

  const affectedRows = await LectureRepository.update(idLecture, {
    link_url: link_url
  })

  if(affectedRows.length === 0){
    throw appError("Não foi possível modificar o nome da palestra.", 400);
  }

  return {
    message: "Link da palestra alterado com sucesso!",
    success: true,
  }
}

export async function updateLectureVideoUrlService(idLecture, video_url) {
  if(!idLecture, video_url) {
    throw appError("Código da palestra e o link_url são obrigatórios!", 400)
  }

  const affectedRows = await LectureRepository.update(idLecture, {
    video_url: video_url
  })

  if(affectedRows.length === 0){
    throw appError("Não foi possível modificar o nome da palestra.", 400);
  }

  return {
    message: "Sucesso ao alterar a url do vídeo da Palestra!",
    success: true,
  }

}

export async function deleteLectureService(idLecture) {
  if(!idLecture ) {
    throw appError("Código da palestra é obrigatório!", 400)
  }

  const existsLecture = await LectureRepository.findById(idLecture)

  if(!existsLecture) throw appError("Palestra não encontrada", 400)

  await LectureRepository.delete(idLecture)

  return {
    message: "Palestra deletada com sucesso!",
    success: true
  }
}

