import { IsNotEmpty, IsPhoneNumber, IsEnum } from 'class-validator';
import { PetsSizes, PetsTypes, PetsGender } from '../../pet-client.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDTO {
    @ApiProperty({description:"Pet name", example:"Buddy"})
    @IsNotEmpty({ message: "Name is a required field!" })
    name: string;

    @ApiProperty({description:"Pet type", example:"Dog"})
    @IsNotEmpty({ message: "Type is a required field!" })
    @IsEnum(PetsTypes, {
        message: "Types must be only: Cat, Dog or Others",
    })
    type: string;

    @ApiProperty({description:"Pet Breed", example:"Chiaua"})
    @IsNotEmpty({ message: "Breed is a required field!" })
    breed: string;

    @ApiProperty({description:"Pet Size", example:"Small"})
    @IsNotEmpty({ message: "Size is a required field!" })
    @IsEnum(PetsSizes, {
        message: "Size must be only: Small, Medium or Large",
    })
    size: string;

    @ApiProperty({description:"Pet Gender", example:"Female"})
    @IsNotEmpty({ message: "Gender is a required field!" })
    @IsEnum(PetsGender, {
        message: "Gender must be Female or Male",
    })
    gender: string;

    @ApiProperty({description:"Owner name", example:"Joe Dohm"})
    @IsNotEmpty({ message: "Owner Name is a required field!" })
    ownerName: string;

    @ApiProperty({description:"Owner number", example:"13987654321"})
    @IsNotEmpty({ message: "Owner Number is a required field!" })
    @IsPhoneNumber('BR', { message: "Must be a valid Brazil Number" })
    ownerNumber: string;

}
