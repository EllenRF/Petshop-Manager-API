import { HttpException, Injectable } from '@nestjs/common';
import { UpdatePetDTO } from './update-pet.dto';
import { PetClient } from '../../pet-client.model';

@Injectable()
export class UpdatePetService {
async updatePet(petId: number, updatePet: UpdatePetDTO ): Promise<PetClient> {
    const pet = await PetClient.findByPk(petId);
    if (!pet) {
      throw new HttpException("pet not found", 404);
    }
    await pet.update(updatePet)
    return pet.reload(); // Refresh the user instance to get updated data
  }
}

