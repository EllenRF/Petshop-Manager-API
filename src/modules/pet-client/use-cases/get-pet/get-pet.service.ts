import { HttpException, Injectable } from '@nestjs/common';
import { PetClient } from 'src/modules/pet-client/pet-client.model';

@Injectable()
export class GetPetService {

    async getPetsFilter(queryParams?): Promise<any> {
        const { name, type, ownerName } = queryParams;
        const whereClause = {};
        name ? (whereClause['name'] = name) : null;
        type ? (whereClause['type'] = type) : null;
        ownerName ? (whereClause['ownerName'] = ownerName) : null;
    
        const petExist = await PetClient.findAll({
          where: whereClause
        })
    
        if (!petExist.length) {
          throw new HttpException("pet not found", 404);
        }
        return petExist;
      }
}
