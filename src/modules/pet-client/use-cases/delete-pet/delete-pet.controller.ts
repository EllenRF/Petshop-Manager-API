import { Controller, Delete, Res, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { DeletePetService } from './delete-pet.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
@ApiTags('Pets')
@ApiBearerAuth()
@Controller('/pets')
export class DeletePetController {
    constructor(private readonly appService: DeletePetService) { }
    
    @UseGuards(AuthGuard)
    @Delete('/delete/:id')
    @ApiOperation({summary:"Delete pet"})
    @ApiResponse({
        status: 204,
        description:"Delete pet by ID"
    })
    @ApiBadRequestResponse({description:"Return status 400"})
    async deletePet(@Res() res: Response, @Param('id') petId: number): Promise<void> {
        try {
            const response = await this.appService.deletePet(petId);
            res.status(HttpStatus.NO_CONTENT).send(response)
            console.log(response);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    };
}
