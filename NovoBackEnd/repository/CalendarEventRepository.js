import { CalendarEventModel } from "../models/CalendarEventModel.js";
import { UserModel } from "../models/UserModel.js";

export const CalendarEventRepository = {
  findByUser(User_idUser) {
    return CalendarEventModel.findAll({
      where: { User_idUser },
      order: [['dateEvent', 'DESC']],
    });
  },

  findAllAdmin() {
    return CalendarEventModel.findAll({
      include: [
        {
          model: UserModel,
          as: 'user', // Need to check if association is defined, usually it's defined in models/index.js
          where: {
            status_permission: ['admin', 'SuperAdmin'],
          },
          attributes: ['idUser', 'status_permission'],
        },
      ],
      order: [['start', 'DESC']],
    });
  },

  // Alternative if associations aren't ready
  async findAllAdminRaw() {
    return CalendarEventModel.findAll({
        order: [['start', 'DESC']]
    });
  },

  findOne(conditions) {
    return CalendarEventModel.findOne({ where: conditions });
  },

  create(data) {
    return CalendarEventModel.create(data);
  },

  update(idCalendarEvents, User_idUser, data) {
    return CalendarEventModel.update(data, {
      where: { idCalendarEvents, User_idUser },
    });
  },

  delete(idCalendarEvents, User_idUser) {
    return CalendarEventModel.destroy({
      where: { idCalendarEvents, User_idUser },
    });
  },
};
