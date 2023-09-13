import { Module } from '@nestjs/common';
import { CreateAppointmentService } from './use-cases/create-appointment/create-appointment.service';
import { CreateAppointmentController } from './use-cases/create-appointment/create-appointment.controller';
import { GetAppointmentService } from './use-cases/get-appointment/get-appointment.service';
import { GetAppointmentController } from './use-cases/get-appointment/get-appointment.controller';
import { UpdateAppointmentService } from './use-cases/update-appointment/update-appointment.service';
import { UpdateAppointmentController } from './use-cases/update-appointment/update-appointment.controller';
import { DeleteAppointmentService } from './use-cases/delete-appointment/delete-appointment.service';
import { DeleteAppointmentController } from './use-cases/delete-appointment/delete-appointment.controller';

@Module({
  providers: [CreateAppointmentService, GetAppointmentService, UpdateAppointmentService, DeleteAppointmentService],
  controllers: [CreateAppointmentController, GetAppointmentController, UpdateAppointmentController, DeleteAppointmentController]
})
export class AppointmentModule { }