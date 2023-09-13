import { Controller, Delete, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { DeleteAppointmentService } from './delete-appointment.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('/appointments')
export class DeleteAppointmentController {

    constructor(private readonly appService: DeleteAppointmentService) { }

    @UseGuards(AuthGuard)
    @Delete('/delete/:id')
    @ApiOperation({summary:"Delete appointment"})
    @ApiResponse({
        status: 204,
        description:"Delete appointment by Id"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async deletePet(@Res() res: Response, @Param('id') petId: number): Promise<void> {
        try {
            const response = await this.appService.deleteAppointment(petId);
            res.status(HttpStatus.NO_CONTENT).send(response)
            console.log(response);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    };
}
