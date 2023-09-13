import { Injectable } from '@nestjs/common';
import { Appointment } from '../../appointment.model';
import { PetClient } from 'src/modules/pet-client/pet-client.model';

@Injectable()
export class UpdateAppointmentService {

    async update(AppointmentId: number, body): Promise<any> {
        const appointment = await Appointment.findOne({ where: { id: AppointmentId } });
        const pet = await PetClient.findOne({
            where: { id: appointment.petClientId }
        });
        if (pet) {
            appointment.set({
                startDate: body.startDate,
                endDate: body.endDate
            })
            await appointment.save();
        }
        await pet.update(
            { nextSchedule: appointment.startDate },
            { where: { id: appointment.petClientId } }
        )
    }
}
