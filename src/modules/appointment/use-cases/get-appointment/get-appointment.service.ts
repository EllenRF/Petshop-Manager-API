import { HttpException, Injectable } from '@nestjs/common';
import { Appointment } from '../../appointment.model';

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
    const { name, startDate, endDate } = queryParams;
    const whereClause = {};
    startDate ? (whereClause['startDate'] = startDate) : null;
    endDate ? (whereClause['endDate'] = endDate) : null;
    name ? (whereClause['name'] = name) : null;

    const existAppointments = await Appointment.findAll({
      where: whereClause
    })

    if (!existAppointments.length) {
      throw new HttpException("appointment not found", 404);
    }
    return existAppointments;
  }

}
