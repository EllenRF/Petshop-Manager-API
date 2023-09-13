import { Module } from '@nestjs/common';
import { CreatePetService } from './use-cases/create-pet/create-pet.service';
import { CreatePetController } from './use-cases/create-pet/create-pet.controller';
import { GetPetService } from './use-cases/get-pet/get-pet.service';
import { GetPetController } from './use-cases/get-pet/get-pet.controller';
import { UpdatePetController } from './use-cases/update-pet/update-pet.controller';
import { UpdatePetService } from './use-cases/update-pet/update-pet.service';
import { DeletePetController } from './use-cases/delete-pet/delete-pet.controller';
import { DeletePetService } from './use-cases/delete-pet/delete-pet.service';
@Module({
  controllers: [CreatePetController, GetPetController, UpdatePetController, DeletePetController],
  providers: [CreatePetService, GetPetService, UpdatePetService, DeletePetService]
})
export class PetClientModule {}
