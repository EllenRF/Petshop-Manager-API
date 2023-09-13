import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
    @ApiProperty({description:"User email", example:"example@hotmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({description:"User password", example:"Testing;123"})
    @IsNotEmpty()
    password: string;
}