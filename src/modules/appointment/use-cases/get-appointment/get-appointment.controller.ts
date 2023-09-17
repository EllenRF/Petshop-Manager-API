import { Controller, Get, HttpStatus, Param, Query, Res, UseGuards } from '@nestjs/common';
import { GetAppointmentService } from './get-appointment.service';
import { Response } from 'express'
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/appointments')
export class GetAppointmentController {
    constructor(private readonly appService: GetAppointmentService) { }

    @Get('/')
    @ApiOperation({ summary: "Get appointments" })
    @ApiResponse({
        status: 200,
        description: "Return all appointments"
    })
    @ApiBadRequestResponse({ description: "Return status 400" })
    async getAppointment(@Res() res: Response, @Query() query): Promise<void> {
        try {
            const response = await this.appService.getAppointment(query);
            res.status(HttpStatus.OK).send(response)
            console.log(response);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.NOT_FOUND).send(error);
        }
    };

    @Get('/:id')
    @ApiOperation({ summary: "Get appointments of a pet" })
    @ApiResponse({
        status: 200,
        description: "Return all appointments of certain pet"
    })
    @ApiBadRequestResponse({ description: "Return status 400" })
    async getPetAppointments(@Param('id') id: number, @Res() res: Response, @Query() query): Promise<void> {
        try {
            const response = await this.appService.getPetAppointments(id);
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.NOT_FOUND).send(error);
        }
    };
}
