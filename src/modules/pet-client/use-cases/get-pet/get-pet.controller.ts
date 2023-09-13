import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GetPetService } from './get-pet.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets')
@ApiBearerAuth()
@Controller('/pets')
export class GetPetController {
    constructor(private readonly appService: GetPetService){}
    
    @UseGuards(AuthGuard)
    @Get('/')
    @ApiOperation({summary:"Get pets"})
    @ApiResponse({
        status: 200,
        description:"Return all created pets or specific ones by using parameters"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async getPetsFilter(@Res() res: Response, @Query() query): Promise<void> {
        try {
            const response = await this.appService.getPetsFilter(query);
            res.status(HttpStatus.OK).send(response)
            console.log(response);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.NOT_FOUND).send(error);
        }
    };
}
