import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CreateAppointmentService } from './create-appointment.service';
import { CreateAppointmentDTO } from './create-appointment.dto';
import { Appointment } from '../../appointment.model';
import { Response } from "express"
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('/appointments')
export class CreateAppointmentController {
    constructor(private readonly appService: CreateAppointmentService) { }

    @UseGuards(AuthGuard)
    @Post('/create')
    @ApiOperation({summary:"Create a new appointment"})
    @ApiResponse({
        status: 201,
        description:"Return an object of the new appointment created"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async createAppointment(@Res() res: Response, @Body() body: CreateAppointmentDTO): Promise<Appointment> {
        try {
            const response = this.appService.createAppointment(body)
            
            res.status(HttpStatus.CREATED).send(response)
            return response

        } catch (error) { console.log(error) }
    }
}
