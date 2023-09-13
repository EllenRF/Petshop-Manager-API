import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PetClient } from '../../pet-client.model';

@Injectable()
export class DeletePetService {
    async deletePet(petId: number): Promise<void> {
        const pet = await PetClient.findByPk(petId);
        if (!pet) {
            throw new HttpException("pet not found", HttpStatus.NOT_FOUND);
        }
        await PetClient.destroy({
            where: {
                id: pet.id
            }
        })
    }
}
