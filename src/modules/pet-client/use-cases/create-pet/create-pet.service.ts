import { Injectable } from '@nestjs/common';
import { PetClient } from '../../pet-client.model';
import { CreatePetDTO } from './create-pet.dto';
@Injectable()
export class CreatePetService {

    async createPet(pet: CreatePetDTO) {
        const { name, ownerName, ownerNumber } = pet
        const petAlreadyCreated = await PetClient.findOne({
            where: {
                name,
                ownerName,
                ownerNumber
            },
        });
        if (petAlreadyCreated) {
            const resp = "Pet already exists"
            return resp;
        }
        const newPet = await PetClient.create({ ...pet });
        return newPet;
    }
}
