import { VolunteerWorkModel } from "../models/VolunteerWorkModel.js";

export const VolunteerWorkRepository = {
  findAll() {
    return VolunteerWorkModel.findAll();
  },

  findById(idVolunteerWork) {
    return VolunteerWorkModel.findByPk(idVolunteerWork);
  },

  findExisting(nameVolunteerWork, address, dateVolunteerWork, work_description) {
    return VolunteerWorkModel.findOne({
      where: {
        nameVolunteerWork,
        address,
        dateVolunteerWork,
        work_description,
      },
    });
  },

  create(data) {
    return VolunteerWorkModel.create(data);
  },

  update(idVolunteerWork, data) {
    return VolunteerWorkModel.update(data, {
      where: { idVolunteerWork },
    });
  },

  delete(idVolunteerWork) {
    return VolunteerWorkModel.destroy({
      where: { idVolunteerWork },
    });
  },
};
