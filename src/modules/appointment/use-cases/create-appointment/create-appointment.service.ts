import { PetClient } from 'src/modules/pet-client/pet-client.model';
import { CreateAppointmentDTO } from './create-appointment.dto';
import { Appointment } from '../../appointment.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAppointmentService {
  async createAppointment(newAppointment: CreateAppointmentDTO) {
        const appointment = await Appointment.create({ ...newAppointment });
        console.log(appointment)
    // Update the lastScheduledAt column of the coresponding client
    await PetClient.update(
      { nextSchedule: new Date() },
      { where: { id: newAppointment.petClientId } }
    )
    return appointment;
  }
}
