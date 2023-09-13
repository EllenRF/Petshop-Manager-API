import { Body, Controller, HttpStatus, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { UpdatePetService } from './update-pet.service';
import { UpdatePetDTO } from './update-pet.dto';
import { PetClient } from '../../pet-client.model';
import { Response } from 'express'
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets')
@ApiBearerAuth()
@Controller('/pets')
export class UpdatePetController {
    constructor(private readonly appService: UpdatePetService) { }

    @UseGuards(AuthGuard)
    @Patch('/update/:id')
    @ApiOperation({summary:"Update pet"})
    @ApiResponse({
        status: 200,
        description:"Update am select pet by an id"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async updatePet(@Res() res: Response, @Param('id') petId: number, @Body() body: UpdatePetDTO): Promise<PetClient> {
        try {
            const response = await this.appService.updatePet(petId, body);
            res.status(HttpStatus.OK).send(response)
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }

    }
}
