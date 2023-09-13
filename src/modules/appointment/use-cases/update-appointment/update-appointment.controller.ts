import { Body, Controller, HttpStatus, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { UpdateAppointmentService } from './update-appointment.service';
import { Response } from 'express';
import { UpdateAppointmentDTO } from './update-appointment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/appointments')
export class UpdateAppointmentController {
    constructor(private readonly appService: UpdateAppointmentService) { }

    @Patch('/update/:id')
    @ApiOperation({summary:"Update appointments"})
    @ApiResponse({
        status: 200,
        description:"Update appointment by Id"
    })
    @ApiBadRequestResponse({description:"Return status 404"})
    async update(@Res() res: Response, @Body() body: UpdateAppointmentDTO,@Param('id') id: number): Promise<void> {
        try {
            const response = await this.appService.update(id, body);
            res.status(HttpStatus.OK).send(response)
            console.log(response);
        }
        catch (error) {
            console.log(error);
            res.send(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}
