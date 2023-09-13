import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Appointment } from '../../appointment.model';

@Injectable()
export class DeleteAppointmentService {
    async deleteAppointment(appointmentId: number): Promise<void> {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            throw new HttpException("pet not found", HttpStatus.NOT_FOUND);
        }
        await Appointment.destroy({
            where: {
                id: appointment.id
            }
        })
    }
}
