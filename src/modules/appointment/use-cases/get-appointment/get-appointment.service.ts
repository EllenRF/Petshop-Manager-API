import { HttpException, Injectable } from '@nestjs/common';
import { Appointment } from '../../appointment.model';
import { Op } from 'sequelize';

@Injectable()
export class GetAppointmentService {

  async getPetAppointments(id): Promise<any> {
    const appointments = await Appointment.findAll({
      where: { petClientId: id }
    })
    if (!appointments.length) {
      throw new HttpException("No appointments", 404);
    }
    return appointments
  }

  async getAppointment(queryParams?): Promise<any> {
    const { startDate } = queryParams;
    const whereClause = {};
    startDate ? (whereClause['startDate'] = startDate) : null;
    
    if (startDate) {
      const startDateDate = new Date(startDate);
  
      const startDateRange = {
        [Op.gte]: startDateDate,
        [Op.lt]: new Date(startDateDate.getTime() + 24 * 60 * 60 * 1000),
      };
  
      whereClause['startDate'] = startDateRange;
    }

    const existAppointments = await Appointment.findAll({
      where: whereClause
    })

    if (!existAppointments.length) {
      throw new HttpException("appointment not found", 404);
    }
    return existAppointments;
  }

}
