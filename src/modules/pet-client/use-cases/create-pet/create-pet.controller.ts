import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from "express"
import { CreatePetService } from './create-pet.service';
import { CreatePetDTO } from './create-pet.dto';
import { PetClient } from '../../pet-client.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Pets')
@ApiBearerAuth()
@Controller('/pets')
export class CreatePetController {
    constructor(private readonly appservice: CreatePetService) { }

    @UseGuards(AuthGuard)
    @Post('/create')
    @ApiOperation({summary:"Create a new pet"})
    @ApiResponse({
        status: 201,
        description:"Return an object of the new pet created"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async createPet(@Res() res: Response, @Body() pet: CreatePetDTO): Promise<PetClient | string> {
        try {
            const response = await this.appservice.createPet(pet);
            res.status(HttpStatus.CREATED).send(response)
            return response;
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
}
