export default function GroupOfStudyDTO(data){
    return {
        IdFacilitador: data.IdFacilitador,
        NameStudy:  data.NameStudy,
        Description:  data.Description,
        DayOfWeek: data.DayOfWeek || null,
        StartTime: data.StartTime || null,
        EndTime: data.EndTime || null,
        TypeGroup: data.TypeGroup,
        Requirements: Requirements || null
    }
}