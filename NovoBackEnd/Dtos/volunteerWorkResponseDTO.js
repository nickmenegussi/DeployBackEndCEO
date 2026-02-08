export default function volunteerWorkResponseDTO(work) {
  return {
    idVolunteerWork: work.idVolunteerWork,
    nameVolunteerWork: work.nameVolunteerWork,
    address: work.address,
    dateVolunteerWork: work.dateVolunteerWork,
    timeVolunteerWork: work.timeVolunteerWork,
    work_description: work.work_description,
  };
}
